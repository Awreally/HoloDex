import { ReactNode } from "react";
import { useAuth } from "../../../context/AuthContext";

export function SignedIn({ children }: { children: ReactNode }) {
  const { user, isLoading } = useAuth();
  if (isLoading || !user) return null;
  return <>{children}</>;
}

export function SignedOut({ children }: { children: ReactNode }) {
  const { user, isLoading } = useAuth();
  if (isLoading || user) return null;
  return <>{children}</>;
}
