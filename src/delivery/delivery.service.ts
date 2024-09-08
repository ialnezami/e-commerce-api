import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Delivery, IDelivery } from './entities/delivery.entity';

@Injectable()
export class DeliveryService {
  constructor(
    @InjectModel('Delivery') private readonly deliveryModel: Model<IDelivery>,
  ) {}

  // Créer une livraison
  async createDelivery(
    orderId: string,
    deliveryData: Partial<Delivery>,
  ): Promise<IDelivery> {
    const newDelivery = new this.deliveryModel({
      ...deliveryData,
      orderId,
      status: 'pending',
    });
    return newDelivery.save();
  }

  // Mettre à jour le statut d'une livraison
  async updateDeliveryStatus(id: string, status: string): Promise<IDelivery> {
    return this.deliveryModel
      .findByIdAndUpdate(id, { status }, { new: true })
      .exec();
  }

  // Récupérer les informations d'une livraison
  async getDeliveryById(id: string): Promise<IDelivery> {
    return this.deliveryModel.findById(id).exec();
  }

  // Récupérer toutes les livraisons associées à une commande
  async getDeliveriesByOrderId(orderId: string): Promise<IDelivery[]> {
    return this.deliveryModel.find({ orderId }).exec();
  }
}
