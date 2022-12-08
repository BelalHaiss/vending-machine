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
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { BuyData, UpdateProductDto } from './dto/update-product.dto';
import { JwtGuard } from 'src/users/guards/jwt.guard';
import { RolesGuard } from 'src/users/guards/role.guard';
import { Roles } from 'src/users/decrator/roles.decorator';
import { Request } from 'express';
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Roles('seller')
  @UseGuards(JwtGuard, RolesGuard)
  @Post()
  create(@Req() request: Request, @Body() createProductDto: CreateProductDto) {
    return this.productsService.create(
      request.user._id.toString(),
      createProductDto,
    );
  }

  @Roles('buyer')
  @UseGuards(JwtGuard, RolesGuard)
  @Post('buy')
  buy(@Req() request: Request, @Body() product: BuyData) {
    return this.productsService.buy(request.user, product);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Roles('seller')
  @UseGuards(JwtGuard, RolesGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Req() request: Request,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(
      id,
      request.user._id.toString(),
      updateProductDto,
    );
  }

  @Roles('seller')
  @UseGuards(JwtGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() request: Request) {
    return this.productsService.remove(id, request.user._id.toString());
  }
}
