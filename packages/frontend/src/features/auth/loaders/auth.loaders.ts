import { ActionFunctionArgs } from "react-router";
import { fetchLoginUser, fetchRegisterUser } from "../api/auth.api";
import { redirect } from "react-router";

export async function loginAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const email = String(formData.get("email"));
  const password = String(formData.get("password"));

  try {
    await fetchLoginUser({
      email,
      password,
    });

    return redirect("/");
  } catch {
    return {
      error: "Invalid email or password",
    };
  }
}

export async function registerAction({ request }: ActionFunctionArgs) {
    const formData = await request.formData();

    const 
}
