import { createContext, useContext, ReactNode } from "react";
import { UserResponse } from "../features/auth/types/auth.types";

type AuthContextType = {
  user: UserResponse | null;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
  user: UserResponse | null;
};

export function AuthProvider({ children, user }: AuthProviderProps) {
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
