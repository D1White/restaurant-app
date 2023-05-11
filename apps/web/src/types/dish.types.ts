import { Category } from './category.types';

type DishBase = {
  _id: string;
  name: string;
  description: string;
  price: number;
  weight: string;
  photo: string;
};

export interface Dish extends DishBase {
  category: string;
}

export interface DishFull extends DishBase {
  category: Category;
}

export interface CartDish extends DishFull {
  count: number;
}
