import {
  Category,
  Dish,
  DishFull,
  Order,
  OrderFull,
  OrderStatusEnum,
  User,
} from 'types';
import { useUserStore } from 'store';
import axios from './axios';
import { CreateOrderRequest, LoginRequest, RegisterRequest } from './types';

export const login = async (body: LoginRequest) => {
  const { setAuthToken } = useUserStore.getState();

  try {
    const { data } = await axios.post<{ token: string }>('/auth/login', body);

    if (data?.token) {
      setAuthToken(data.token);

      return data?.token;
    }

    throw new Error();
  } catch (error) {
    throw new Error(JSON.stringify(error));
  }
};

export const register = async (body: RegisterRequest) => {
  const { setAuthToken } = useUserStore.getState();

  try {
    const { data } = await axios.post<{ token: string }>(
      '/auth/register',
      body
    );

    if (data?.token) {
      setAuthToken(data.token);

      return data?.token;
    }

    throw new Error();
  } catch (error) {
    throw new Error(JSON.stringify(error));
  }
};

export const fetchUser = async () => {
  try {
    const { data } = await axios.get<User>('/user');
    return data;
  } catch (error) {
    throw new Error(JSON.stringify(error));
  }
};

export const fetchCategories = async () => {
  try {
    const { data } = await axios.get<Category[]>('/category');
    return data;
  } catch (error) {
    throw new Error(JSON.stringify(error));
  }
};

export const fetchDishes = async (category?: string | null) => {
  try {
    const { data } = await axios.get<Dish[]>(`/dish`, { params: { category } });
    return data;
  } catch (error) {
    throw new Error(JSON.stringify(error));
  }
};

export const fetchDish = async (id: string) => {
  try {
    const { data } = await axios.get<DishFull>(`/dish/${id}`);
    return data;
  } catch (error) {
    throw new Error(JSON.stringify(error));
  }
};

export const fetchOrders = async () => {
  try {
    const { data } = await axios.get<Order[]>(`/order`);
    return data;
  } catch (error) {
    throw new Error(JSON.stringify(error));
  }
};

export const fetchOrder = async (id: string) => {
  try {
    const { data } = await axios.get<OrderFull>(`/order/${id}`);
    return data;
  } catch (error) {
    throw new Error(JSON.stringify(error));
  }
};

export const createOrder = async (body: CreateOrderRequest) => {
  try {
    const { data } = await axios.post<Order>('/order', {
      ...body,
      status: OrderStatusEnum.accepted,
    });
    return data;
  } catch (error) {
    throw new Error(JSON.stringify(error));
  }
};
