import { Injectable } from '@nestjs/common';
import { CustomException } from 'src/exceptions/customError.exception';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { User } from 'src/users/schema/users.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { BuyData, UpdateProductDto } from './dto/update-product.dto';
import { Product } from './schema/product.schema';

@Injectable()
export class ProductsService {
  async create(userId: string, createProductDto: CreateProductDto) {
    return await Product.create({
      ...createProductDto,
      seller: userId,
    });
  }

  async findAll() {
    return await Product.find({}, '-seller');
  }

  async update(
    id: string,
    sellerId: string,
    updateProductDto: UpdateProductDto,
  ) {
    const product = await Product.findById(id);
    if (!product) throw new CustomException('theres no product ');
    if (product.seller.toString() !== sellerId)
      throw new CustomException('your are not authorized', 401);
    for (const key in updateProductDto) {
      product[key] = updateProductDto[key];
    }
    return product.save();
  }

  async remove(id: string, sellerId: string) {
    const product = await Product.findById(id);
    if (!product) throw new CustomException('theres no product ');
    if (product.seller.toString() !== sellerId)
      throw new CustomException('your are not authorized', 401);
    await product.deleteOne();
    return { message: 'product deleted successfly' };
  }

  async buy(user: UpdateUserDto, data: BuyData) {
    const product = await Product.findById(data.productId);
    if (!product) throw new CustomException('theres no product ');
    const total = data.qty * product.cost;

    if (user.deposit < total)
      throw new CustomException(
        `please make sure that you have  ${total} for buying the product `,
      );

    const userChange = user.deposit - total;
    // update user deposit
    await User.findByIdAndUpdate(user._id.toString(), {
      deposit: 0,
    });
    return {
      total,
      product: product.name,
      qty: data.qty,
      change: userChange,
    };
  }
}
