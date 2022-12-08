import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { DepositData, UpdateUserDto } from './dto/update-user.dto';
import { JwtGuard } from './guards/jwt.guard';
import { RolesGuard } from './guards/role.guard';
import { Roles } from './decrator/roles.decorator';
import { Request } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Roles('buyer')
  @UseGuards(JwtGuard, RolesGuard)
  @Post('deposit')
  deposit(@Req() request: Request, @Body() data: DepositData) {
    return this.usersService.deposit(request.user._id.toString(), data.coins);
  }

  @Roles('buyer')
  @UseGuards(JwtGuard, RolesGuard)
  @Get('reset')
  reset(@Req() request: Request) {
    return this.usersService.reset(request.user);
  }
}
