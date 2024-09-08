import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Store } from './entities/store.entity';

@Injectable()
export class StoreService {
  constructor(
    @InjectModel(Store.name) private readonly storeModel: Model<Store>,
  ) {}

  async findAll(): Promise<Store[]> {
    return this.storeModel.find().exec();
  }

  async findOne(id: string): Promise<Store> {
    return this.storeModel.findById(id).exec();
  }

  async create(storeData: Partial<Store>): Promise<Store> {
    const newStore = new this.storeModel(storeData);
    return newStore.save();
  }

  async update(id: string, storeData: Partial<Store>): Promise<Store> {
    return this.storeModel
      .findByIdAndUpdate(id, storeData, { new: true })
      .exec();
  }

  async remove(id: string): Promise<void> {
    await this.storeModel.findByIdAndDelete(id).exec();
  }
}
