import { ReactNode } from "react";
import { useAuth } from "../../../context/AuthContext";

export function SignedIn({ children }: { children: ReactNode }) {
  const { user } = useAuth();

  return user ? <>{children}</> : null;
}

export function SignedOut({ children }: { children: ReactNode }) {
  const { user } = useAuth();

  return !user ? <>{children}</> : null;
}
