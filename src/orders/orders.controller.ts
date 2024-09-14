import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from './dto/order.dto';
import { RolesGuard } from '../auth/roles.guard'; // Import the RolesGuard
import { Roles } from '../auth/roles.decorator'; // Import the Roles decorator

@Controller('orders')
@UseGuards(RolesGuard) // Apply RolesGuard to the entire controller
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  @Roles('admin', 'staff') // Only 'admin' and 'staff' can access this
  async getAllOrders(): Promise<Order[]> {
    return this.ordersService.findAll();
  }

  @Get(':id')
  @Roles('admin', 'staff', 'user') // Admin, staff, and the user who placed the order can access this
  async getOrderById(@Param('id') id: string): Promise<Order> {
    return this.ordersService.findById(id);
  }

  @Post()
  @Roles('user') // Only authenticated users can place an order
  async createOrder(@Body() order: Order): Promise<Order> {
    return this.ordersService.create(order);
  }

  @Patch(':id/status')
  async updateOrderStatus(
    @Param('id') orderId: string,
    @Body() statusDto: { status: string },
  ) {
    return this.ordersService.updateOrderStatus(orderId, statusDto.status);
  }
}
