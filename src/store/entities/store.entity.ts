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
}

export const StoreSchema = SchemaFactory.createForClass(Store);
export type IStore = Store & Document;
