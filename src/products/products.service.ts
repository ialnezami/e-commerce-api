import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './dto/product.dto'; // Ensure this DTO correctly represents your schema

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  // Retrieve all products from the database
  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  // Retrieve a single product by ID from the database
  async findOne(id: number): Promise<Product | null> {
    return this.productModel.findById(id).exec();
  }

  // Create a new product and save it to the database
  async create(product: Product): Promise<Product> {
    const newProduct = new this.productModel(product);
    return newProduct.save();
  }

  // Update an existing product by ID
  async update(id: number, updatedProduct: Product): Promise<Product | null> {
    return this.productModel
      .findByIdAndUpdate(id, updatedProduct, { new: true })
      .exec();
  }

  // Remove a product by ID
  async remove(id: number): Promise<void> {
    await this.productModel.findByIdAndDelete(id).exec();
  }
}
