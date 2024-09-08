import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  collection: 'stores',
  timestamps: true, // Ajoute les champs createdAt et updatedAt
})
export class Store {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  address: string;
  @Prop()
  address2: string;
  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  postalCode: string;

  @Prop({ required: true })
  country: string;
}

export const StoreSchema = SchemaFactory.createForClass(Store);
export type IStore = Store & Document;
