import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { Product } from './product'; // Associe le produit avec l'order si nécessaire

@Schema({
  collection: 'orders',
  timestamps: true, // Ajoute automatiquement createdAt et updatedAt
})
export class Order {
  @ApiProperty({
    type: String,
    description: 'Unique identifier for the order',
  })
  @Prop({ required: true })
  id: string;

  @ApiProperty({
    type: Number,
    description: 'Total price for the order',
  })
  @Prop({ required: true })
  totalPrice: number;

  @ApiProperty({
    type: String,
    description:
      'Current status of the order (e.g., pending, shipped, delivered)',
  })
  @Prop({ required: true })
  status: string;

  @ApiProperty({
    type: [Object], // Type de l'item dans l'order
    description: 'List of products in the order',
  })
  @Prop({ type: Array, required: true })
  orderItems: Array<{
    productId: string;
    quantity: number;
    price: number;
  }>;

  @ApiProperty({
    type: String,
    description: 'Unique identifier for the user placing the order',
  })
  @Prop({ required: true })
  userId: string;

  @ApiProperty({
    type: String,
    description: 'Shipping address for the order',
  })
  @Prop({ required: true })
  shippingAddress: string;

  @ApiProperty({
    type: String,
    description: 'Payment method used for the order',
  })
  @Prop({ required: true })
  paymentMethod: string;

  @ApiProperty({
    type: Date,
    description: 'Date when the order was placed',
  })
  @Prop({ required: true })
  orderDate: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
export type IOrder = Order & Document;
