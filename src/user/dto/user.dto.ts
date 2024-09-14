import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

@Schema({
  collection: 'users',
  timestamps: true, // Automatically adds createdAt and updatedAt fields
})
export class User {
  @ApiProperty({
    type: String,
    description: 'The unique identifier of the user',
  })
  @Prop({ required: true, unique: true })
  id: string;

  @ApiProperty({
    type: String,
    description: 'The email address of the user',
  })
  @Prop({ required: true, unique: true })
  email: string;

  @ApiProperty({
    type: String,
    description: 'The hashed password of the user',
  })
  @Prop({ required: true })
  password: string;

  @ApiProperty({
    type: String,
    description: 'The first name of the user',
  })
  @Prop()
  firstName: string;

  @ApiProperty({
    type: String,
    description: 'The last name of the user',
  })
  @Prop()
  lastName: string;

  @ApiProperty({
    type: [String],
    description: 'The roles assigned to the user',
    example: ['user', 'admin'],
  })
  @Prop({ type: [String], default: ['user'] })
  roles: string[];

  @ApiProperty({
    type: Boolean,
    description: 'Indicates if the user is active',
  })
  @Prop({ default: true })
  isActive: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
export type IUser = User & Document;
