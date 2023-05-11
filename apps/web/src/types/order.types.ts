import { Dish } from './dish.types';
import { User } from './user.types';

export enum OrderStatusEnum {
  accepted = 'ACCEPTED',
  preparing = 'PREPARING',
  awaitingDelivery = 'AWAITING_DELIVERY',
  enRoute = 'EN_ROUTE',
  delivered = 'DELIVERED',
  cancelled = 'CANCELLED',
  completed = 'COMPLETED',
}

export enum PaymenTypeEnum {
  cash = 'CASH',
  card = 'CARD',
}

type OrderBase = {
  _id: string;
  address: string;
  status: OrderStatusEnum;
  price: number;
  payment_type: PaymenTypeEnum;
};

export interface Order extends OrderBase {
  order_list: string[];
  user: string;
}

export interface OrderFull extends OrderBase {
  order_list: Dish[];
  user: User;
}
