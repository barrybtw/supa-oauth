import create from "zustand";
import { persist, PersistOptions } from "zustand/middleware";
import { Session } from "@supabase/supabase-js";
import { StateCreator } from "zustand";

type UserStore = {
  user: Session | null;
  setUser: (user: Session | null) => void;
};

type MyPersist = (
  config: StateCreator<UserStore>,
  options: PersistOptions<UserStore>,
) => StateCreator<UserStore>;

export const useUserStore = create<UserStore>(
  (persist as unknown as MyPersist)(
    (set, get) => ({
      user: {} as Session,
      setUser: (user: Session | null) => {
        set((state) => ({ ...state, user }));
      },
    }),
    {
      name: "user-storage",
    },
  ),
);
