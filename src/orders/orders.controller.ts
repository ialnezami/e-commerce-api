import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from './dto/order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  async getAllOrders(): Promise<Order[]> {
    return this.ordersService.findAll();
  }

  @Get(':id')
  async getOrderById(@Param('id') id: string): Promise<Order> {
    return this.ordersService.findById(id);
  }

  @Post()
  async createOrder(@Body() order: Order): Promise<Order> {
    return this.ordersService.create(order);
  }
}
