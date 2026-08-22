import { apiFetch } from "../../../lib/api";
import type { UserResponse, LoginInput, RegisterInput, ApiSuccess } from "../types/auth.types";

export async function fetchRegisterUser(input: RegisterInput):Promise<ApiSuccess<UserResponse>> {
 return apiFetch<ApiSuccess<UserResponse>>("/register", "POST", input )
}

export async function loginRegisterUser(input: LoginInput):Promise<ApiSuccess<UserResponse>> {
 return apiFetch<ApiSuccess<UserResponse>>("/login", "POST", input )
}