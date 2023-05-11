import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { CartDish, DishFull } from 'types';

interface UserStoreState {
  cart: CartDish[];

  addCartItem: (dish: CartDish) => void;
  removeFromCart: (dish: DishFull) => void;
  clearCart: () => void;

  dishAddedToCart: (dish: DishFull) => boolean;
}

export const useOrderStore = create<UserStoreState>()(
  devtools((set, get) => ({
    cart: [],

    addCartItem: (dish) =>
      set((state) => {
        const dishInCart = state.cart.find((item) => item._id === dish._id);

        if (dishInCart) {
          const filterCart = state.cart.filter((item) => item._id !== dish._id);

          return {
            cart: [
              ...filterCart,
              { ...dishInCart, count: dishInCart.count + dish.count },
            ],
          };
        } else {
          return { cart: [...state.cart, dish] };
        }
      }),
    removeFromCart: (dish) =>
      set((state) => ({
        cart: state.cart.filter((item) => item._id !== dish._id),
      })),
    clearCart: () => set({ cart: [] }),

    dishAddedToCart: (dish) => {
      return dish ? get().cart.some((item) => item._id === dish._id) : false;
    },
  }))
);
