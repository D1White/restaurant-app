import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, SchemaTypes } from 'mongoose';
import { Order } from 'order/schemas/order.schema';

export type SecureUserDocument = Omit<UserDocument, 'password'>;

export type UserDocument = User & Document;

export type SecureUser = Omit<User, 'password'>;

@Schema()
export class User {
  @Prop({ required: true, type: SchemaTypes.String, unique: true })
  email: string;

  @Prop({ required: true, type: SchemaTypes.String })
  password: string;

  @Prop({ required: true, type: SchemaTypes.String })
  name: string;

  @Prop({ required: true, type: SchemaTypes.String, unique: true })
  phone: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
