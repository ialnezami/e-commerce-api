import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Types } from 'mongoose';
import { Store } from 'src/store/entities/store.entity';

@Schema({
  collection: 'products',
  timestamps: true, // Ajoute les champs createdAt et updatedAt automatiquement
})
export class Product {
  @ApiProperty({
    type: Number,
    description: 'Unique identifier for the product',
  })
  @Prop({ required: true })
  id: number;

  @ApiProperty({
    type: String,
    description: 'Name of the product',
  })
  @Prop({ required: true })
  name: string;

  @ApiProperty({
    type: String,
    description: 'Detailed description of the product',
  })
  @Prop({ required: true })
  description: string;

  @ApiProperty({
    type: Number,
    description: 'Price of the product',
  })
  @Prop({ required: true })
  price: number;

  @ApiProperty({
    type: Number,
    description: 'Stock availability of the product',
  })
  @Prop({ required: true })
  stock: number;

  @ApiProperty({
    type: Number,
    description: 'Identifier of the category the product belongs to',
  })
  @Prop({ required: true })
  categoryId: number;

  @ApiProperty({
    type: Store,
    description: 'Store where the product is available',
  })
  @Prop({ required: true, type: Types.ObjectId, ref: 'Store' }) // Référence à Store
  store: Store;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
export type IProduct = Product & Document;
