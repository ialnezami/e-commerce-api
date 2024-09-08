import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

@Schema({
  collection: 'deliveries',
  timestamps: true,
})
export class Delivery {
  @ApiProperty({
    type: String,
    description: 'Unique identifier for the delivery',
  })
  @Prop({ required: true })
  id: string;

  @ApiProperty({
    type: String,
    description: 'Status of the delivery (e.g., pending, shipped, delivered)',
  })
  @Prop({ required: true })
  status: string;

  @ApiProperty({
    type: String,
    description: 'Order ID associated with the delivery',
  })
  @Prop({ required: true })
  orderId: string;

  @ApiProperty({
    type: String,
    description: 'Address where the delivery will be made',
  })
  @Prop({ required: true })
  deliveryAddress: string;

  @ApiProperty({
    type: String,
    description: 'Name of the delivery person',
  })
  @Prop({ required: true })
  deliveryPerson: string;

  @ApiProperty({
    type: Date,
    description: 'Estimated date of delivery',
  })
  @Prop()
  estimatedDeliveryDate: Date;
}

export const DeliverySchema = SchemaFactory.createForClass(Delivery);
export type IDelivery = Delivery & Document;
