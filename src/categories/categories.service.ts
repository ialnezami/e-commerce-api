import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from './interface/category.interface'; // Define a Category interface

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel('Category') private readonly categoryModel: Model<Category>,
  ) {}

  findAll(): Promise<Category[]> {
    return this.categoryModel.find().exec();
  }

  findOne(id: string): Promise<Category> {
    return this.categoryModel.findById(id).exec();
  }

  async create(categoryData: Partial<Category>): Promise<Category> {
    const newCategory = new this.categoryModel(categoryData);
    return newCategory.save();
  }

  async update(id: string, updateData: Partial<Category>): Promise<Category> {
    return this.categoryModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();
  }

  async remove(id: string): Promise<void> {
    await this.categoryModel.findByIdAndDelete(id).exec();
  }
}
