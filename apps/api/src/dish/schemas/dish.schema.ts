import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Category } from 'category/schemas/category.schema';
import mongoose, { Document, SchemaTypes } from 'mongoose';

export type DishDocument = Dish & Document;

@Schema()
export class Dish {
  @Prop({ required: true, type: SchemaTypes.String })
  name: string;

  @Prop({ type: SchemaTypes.String, default: '' })
  description: string;

  @Prop({ required: true, type: SchemaTypes.Number })
  price: number;

  @Prop({ required: true, type: SchemaTypes.String })
  weight: string;

  @Prop({ type: SchemaTypes.String, default: '' })
  photo: string;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
  category: Category;
}

export const DishSchema = SchemaFactory.createForClass(Dish);
