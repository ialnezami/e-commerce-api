import { Controller, Post, Get, Param, Patch, Body } from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { Delivery } from './entities/delivery.entity';

@Controller('deliveries')
export class DeliveryController {
  constructor(private readonly deliveryService: DeliveryService) {}

  // Créer une nouvelle livraison
  @Post(':orderId')
  async createDelivery(
    @Param('orderId') orderId: string,
    @Body() deliveryData: Partial<Delivery>,
  ) {
    return this.deliveryService.createDelivery(orderId, deliveryData);
  }

  // Mettre à jour le statut d'une livraison
  @Patch(':id/status')
  async updateStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.deliveryService.updateDeliveryStatus(id, status);
  }

  // Récupérer une livraison par son ID
  @Get(':id')
  async getDelivery(@Param('id') id: string) {
    return this.deliveryService.getDeliveryById(id);
  }

  // Récupérer les livraisons associées à une commande
  @Get('order/:orderId')
  async getDeliveriesByOrder(@Param('orderId') orderId: string) {
    return this.deliveryService.getDeliveriesByOrderId(orderId);
  }
}
