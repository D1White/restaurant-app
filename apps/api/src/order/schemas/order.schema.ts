import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Dish } from 'dish/schemas/dish.schema';
import mongoose, { Document, SchemaTypes } from 'mongoose';
import { User } from 'user/schemas/user.schema';

import { OrderStatusEnum, PaymenTypeEnum } from '../types';

export type OrderDocument = Order & Document;

@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
})
export class Order {
  @Prop({ required: true, type: SchemaTypes.String })
  address: string;

  @Prop({ type: SchemaTypes.String, default: OrderStatusEnum.accepted })
  status: OrderStatusEnum;

  @Prop({ required: true, type: SchemaTypes.Number })
  price: number;

  @Prop({ required: true, type: SchemaTypes.String })
  payment_type: PaymenTypeEnum;

  @Prop({ required: true, type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Dish' }] })
  order_list: Dish;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
