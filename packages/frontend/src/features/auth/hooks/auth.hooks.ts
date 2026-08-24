import { useState } from "react";
import { useNavigate } from "react-router";
import { LoginInput, RegisterInput } from "../types/auth.types";
import { fetchLoginUser, fetchRegisterUser, fetchLogoutUser } from "../api/auth.api";
import { useAuth } from "../../../context/AuthContext";

export function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  async function login(credentials: LoginInput) {
    setError(null);
    setIsLoading(true);
    try {
      const user = await fetchLoginUser(credentials);
      return user;
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }

  return {
    isLoading,
    error,
    login,
  };
}

export function useRegister() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  async function register(credentials: RegisterInput) {
    setError(null);
    setIsLoading(true);
    try {
      const registeruser = await fetchRegisterUser(credentials);
      return registeruser;
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }
  return { isLoading, error, register};
}

export function useLogout() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const { setUser } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    setIsLoggingOut(true);
    try {
      await fetchLogoutUser();
      setUser(null);
      navigate("login");
    } catch (err) {
    } finally {
        setIsLoggingOut(false);
    }
  }

  return {
    isLoggingOut,
    handleLogout,
  }
}
