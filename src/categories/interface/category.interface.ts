import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

@Schema({
  collection: 'categories',
  timestamps: true, // Ajoute les champs createdAt et updatedAt automatiquement
})
export class Category {
  @ApiProperty({
    type: String,
    description: 'The unique identifier of the category',
  })
  @Prop({ required: true })
  id: string;

  @ApiProperty({
    type: String,
    description: 'The name of the category',
  })
  @Prop({ required: true })
  name: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
export type ICategory = Category & Document;
