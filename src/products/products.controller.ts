import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './dto/product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Post()
  create(@Body() product: Product) {
    return this.productsService.create(product);
  }

  @Get(':id')
  findOne(id: number) {
    return this.productsService.findOne(id);
  }

  @Put(':id')
  update(@Body() product: Product, @Param('id') id: number) {
    return this.productsService.update(id, product);
  }

  // Additional routes for update, delete...
}
