import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

export type CategoryDocument = Category & Document;

@Schema()
export class Category {
  @Prop({ required: true, type: SchemaTypes.String })
  name: string;

  @Prop({ required: true, type: SchemaTypes.String, unique: true })
  slug: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
