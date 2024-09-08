import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, IOrder } from './dto/order.dto';

@Injectable()
export class OrdersService {
  constructor(@InjectModel('Order') private orderModel: Model<IOrder>) {}

  async findAll(): Promise<Order[]> {
    return this.orderModel.find().exec();
  }

  async findById(id: string): Promise<Order> {
    return this.orderModel.findOne({ id }).exec();
  }

  async create(order: Order): Promise<Order> {
    const newOrder = new this.orderModel(order);
    return newOrder.save();
  }

  async updateOrderStatus(orderId: string, status: string): Promise<Order> {
    return this.orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true },
    );
  }
}
