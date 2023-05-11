import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { User } from 'types';
import { fetchUser } from 'api';

interface UserStoreState {
  authToken: string;
  user: User | null;

  setAuthToken: (authToken: string) => void;
  setUser: (user?: User) => void;
  logout: () => void;

  getUser: () => Promise<void>;
}

export const useUserStore = create<UserStoreState>()(
  devtools(
    persist(
      (set, get) => ({
        authToken: '',
        user: null,

        setAuthToken: (newToken) => set({ authToken: newToken }),
        setUser: (newUser) => set({ user: newUser }),
        logout: () => set({ authToken: '', user: null }),

        getUser: async () => {
          const user = await fetchUser();

          if (user) {
            set({ user });
          } else {
            get().logout();
          }
        },
      }),
      {
        name: 'user-storage',
        partialize: (state) => ({ authToken: state.authToken }),
      }
    )
  )
);
