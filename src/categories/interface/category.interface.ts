import { Schema } from 'mongoose';

export const Category = new Schema({
  name: { type: String, required: true },
});
