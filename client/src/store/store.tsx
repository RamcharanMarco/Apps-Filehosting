import {create} from 'zustand';
import { devtools, persist } from 'zustand/middleware'


type user = any

interface AppState {
  user: user;
  loginuser: (user: any) => void;
  logoutuser: () => void;
}

export const useStore = create<AppState>()(
  devtools(
    persist(
      (set) => ({
        user: false,
        loginuser: (user) => {
            set((state) => ({
              user: user,
            }),
            );
          },
          logoutuser: () => {
            set((state) => ({
              user: null,
            }));
          },
      }),
      {
        name: "file-hosting", // unique name
      }
))
  )

