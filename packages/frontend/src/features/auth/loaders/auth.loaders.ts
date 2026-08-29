import { ActionFunctionArgs } from "react-router";
import {
  fetchLoginUser,
  fetchMe,
  fetchRegisterUser,
  fetchLogoutUser,
} from "../api/auth.api";
import { redirect } from "react-router";
import { isApiError } from "../../../lib/api";
import { RegisterInput } from "../types/auth.types";

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
      return { error: err.message };
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
    return redirect("/");
  } catch (err) {
    if (isApiError(err)) {
      return {
        error: err.message,
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
