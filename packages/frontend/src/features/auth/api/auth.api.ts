import { apiFetch } from "../../../lib/api";
import type {
  UserResponse,
  LoginInput,
  RegisterInput,
  ApiSuccess,
  ApiSuccessNoData,
} from "../types/auth.types";

export async function fetchRegisterUser(
  input: RegisterInput,
): Promise<UserResponse> {
  const res = await apiFetch<ApiSuccess<UserResponse>>(
    "/auth/register",
    "POST",
    input,
  );
  return res.data;
}

export async function fetchLoginUser(input: LoginInput): Promise<UserResponse> {
  const res = await apiFetch<ApiSuccess<UserResponse>>(
    "/auth/login",
    "POST",
    input,
  );
  return res.data;
}

export async function fetchLogoutUser() {
  const res = await apiFetch<ApiSuccessNoData>("/auth/logout", "POST");
  return res;
}

export async function fetchMe(): Promise<UserResponse> {
  const res = await apiFetch<ApiSuccess<UserResponse>>("/auth/me");
  return res.data;
}
