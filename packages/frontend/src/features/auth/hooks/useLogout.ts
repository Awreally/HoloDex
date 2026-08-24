import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../../context/AuthContext";
import { fetchLogoutUser } from "../api/auth.api";

export function useLogout() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const { setUser } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    setError(null);
    setIsLoggingOut(true);
    try {
      await fetchLogoutUser();
      setUser(null);
      navigate("login");
    } catch (err) {
      setError(err);
    } finally {
        setIsLoggingOut(false);
    }
  }

  return {
    isLoggingOut,
    error,
    handleLogout,
  }
}
