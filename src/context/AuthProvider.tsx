"use client";

import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";
import { getUserRole } from "@/lib/auth";

interface AuthContextValue {
  user: import("firebase/auth").User | null | undefined;
  loading: boolean;
  role: string | null;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, loading] = useAuthState(auth);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      getUserRole(user).then(setRole).catch(() => setRole("user"));
    } else {
      setRole(null);
    }
  }, [user]);

  const value: AuthContextValue = { user, loading, role };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
