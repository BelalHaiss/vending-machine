import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { DepositData, UpdateUserDto } from './dto/update-user.dto';
import * as argon2 from 'argon2';
import { CustomException } from 'src/exceptions/customError.exception';
import { User } from './schema/users.schema';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { allowedValues, isAllowedCoins } from 'src/products/utils/coins.util';

@Injectable()
export class UsersService {
  constructor(private config: ConfigService, private jwt: JwtService) {}
  async create(user: CreateUserDto) {
    try {
      const hash = await argon2.hash(user.password);
      user.password = hash;
      const registerdUser = await User.create(user);
      return this.signToken(
        registerdUser.username,
        registerdUser._id.toString(),
      );
    } catch (error) {
      if (error.code === 11000)
        throw new CustomException('برجاء استخدام اسم مستخدم اخر');
      throw new Error('try again later');
    }
  }

  async deposit(userId: string, coins: number) {
    if (!isAllowedCoins(coins)) {
      throw new CustomException(
        `the machine only accepts ${allowedValues.toString()}`,
      );
    }

    const user = await User.findByIdAndUpdate(
      userId,
      {
        $inc: { deposit: coins },
      },
      {
        new: true,
      },
    );

    return user.deposit;
  }

  async reset(user: UpdateUserDto) {
    await User.findByIdAndUpdate(user._id.toString(), {
      deposit: 0,
    });
    return { change: user.deposit };
  }

  async signToken(username: string, id: string): Promise<string> {
    const payLoad = {
      sub: id,
      username,
    };
    const token = await this.jwt.signAsync(payLoad, {
      expiresIn: '60s',
      secret: this.config.get('JWT_SECRET'),
    });
    return token;
  }
}
