import { User, Order } from 'types';

export interface LoginRequest extends Pick<User, 'email' | 'password'> {}

export interface RegisterRequest
  extends Pick<User, 'email' | 'password' | 'phone' | 'name'> {}

export interface CreateOrderRequest
  extends Pick<Order, 'address' | 'payment_type' | 'order_list'> {}
