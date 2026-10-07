import { createContext, useContext, useState, type ReactNode } from "react";

import { authService } from "@/features/auth/api/auth.service";
import type { Credentials } from "@/features/auth/auth.types";
import { credentialsStorage } from "@/lib/storage/credentialsStorage";

type AuthContextValue = {
  credentials: Credentials | null;
  isAuthenticated: boolean;
  signIn: (credentials: Credentials) => Promise<void>;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [credentials, setCredentials] = useState(() =>
    credentialsStorage.getCredentials(),
  );

  async function signIn(newCredentials: Credentials) {
    credentialsStorage.setCredentials(newCredentials);
    try {
      const { stateInstance } = await authService.getStateInstance();
      if (stateInstance !== "authorized") {
        throw new Error("Не авторизован");
      }
    } catch (error) {
      credentialsStorage.clearCredentials();
      throw error;
    }
    setCredentials(newCredentials);
  }

  function signOut() {
    credentialsStorage.clearCredentials();
    setCredentials(null);
  }

  return (
    <AuthContext.Provider
      value={{
        credentials,
        isAuthenticated: !!credentials,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
// eslint-disable-next-line
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
