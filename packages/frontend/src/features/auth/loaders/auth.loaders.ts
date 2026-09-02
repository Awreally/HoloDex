import { ActionFunctionArgs } from "react-router";
import {
  fetchLoginUser,
  fetchMe,
  fetchRegisterUser,
  fetchLogoutUser,
} from "../api/auth.api";
import { redirect } from "react-router";
import { ApiError, isApiError } from "../../../lib/api";
import { RegisterInput } from "../types/auth.types";

function extractFieldErrors(err: ApiError): Record<string, string> | undefined {
  const details = (err.data as { details?: { field: string; message: string }[] })
    ?.details;
  if (!details?.length) return undefined;

  const fieldErrors: Record<string, string> = {};
  for (const { field, message } of details) {
    const key = field.replace(/^body\./, "");
    if (!fieldErrors[key]) fieldErrors[key] = message;
  }
  return fieldErrors;
}

// Dashboard redirect
export async function dashboardLoader() {
  const { user } = await authLoader();
  if (!user) return redirect("/packs");
  return { user };
}

// Guest redirect
export async function guestOnlyLoader() {
  const { user } = await authLoader();
  if (user) return redirect("/");
  return null;
}

// Auth protector UX
export async function requireAuthLoader() {
  const { user } = await authLoader();
  if (!user) return redirect("/login");
  return { user };
}

export async function loginAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  try {
    await fetchLoginUser({ email, password });
    return redirect("/");
  } catch (err) {
    if (isApiError(err)) {
      return { error: err.message, fieldErrors: extractFieldErrors(err) };
    }
    return { error: "Couldn't reach the server. Check your connection." };
  }
}

export async function registerAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const values = Object.fromEntries(formData);

  const input: RegisterInput = {
    firstname: String(values.firstname ?? "").trim(),
    lastname: String(values.lastname ?? "").trim(),
    email: String(values.email ?? "").trim(),
    password: String(values.password ?? ""),
    username: String(values.username ?? "").trim(),
  };

  if (!input.email || !input.password || !input.username) {
    return {
      error: "All fields are required.",
      values: { email: input.email, username: input.username },
    };
  }

  try {
    await fetchRegisterUser(input);
    return redirect("/packs");
  } catch (err) {
    if (isApiError(err)) {
      return {
        error: err.message,
        fieldErrors: extractFieldErrors(err),
        values: { email: input.email, username: input.username },
      };
    }
    return {
      error: "Couldn't reach the server. Check your connection.",
      values: { email: input.email, username: input.username },
    };
  }
}

export async function authLoader() {
  try {
    const user = await fetchMe();
    return { user };
  } catch {
    return { user: null };
  }
}

export async function logoutAction() {
  await fetchLogoutUser();

  return redirect("/login");
}
