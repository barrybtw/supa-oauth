import { Session } from "@supabase/supabase-js";
import React, { createContext, useEffect } from "react";
import { supabase } from "./Supabase";
import { useUserStore } from "./UserStore";

type Context = {
  getUser: () => Session | null;
};

const AuthContext = createContext({} as Context);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const store = useUserStore((state) => state);
  useEffect(() => {
    supabase.auth.onAuthStateChange((_, user) => {
      if (user) {
        console.log("User is logged in");
        store.setUser(user);
      } else {
        console.log("User is logged out");
        store.setUser(null);
      }
    });
  }, []);

  function getUser() {
    return useUserStore((state) => state.user);
  }

  return (
    <AuthContext.Provider value={{ getUser }}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
}
