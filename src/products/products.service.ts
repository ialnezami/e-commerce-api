import { Injectable } from '@nestjs/common';
import { Product } from './dto/product.dto';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  findAll(): Product[] {
    return this.products;
  }

  findOne(id: number): Product {
    return this.products.find((product) => product.id === id);
  }

  create(product: Product) {
    this.products.push(product);
  }

  update(id: number, updatedProduct: Product) {
    const productIndex = this.products.findIndex((p) => p.id === id);
    if (productIndex > -1) {
      this.products[productIndex] = updatedProduct;
    }
  }

  remove(id: number) {
    this.products = this.products.filter((product) => product.id !== id);
  }
}
