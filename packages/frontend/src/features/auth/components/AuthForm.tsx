import { useState } from "react";
import { Form, useActionData, useNavigation } from "react-router";
import TextInput from "../../../components/layout/ui/input/TextInput";
import { TabsAuth } from "./TabsAuth";

export function AuthForm() {
  const [active, setActive] = useState<"signin" | "register">("signin");
  const isSignin = active === "signin";

  const navigation = useNavigation();
  const actionData = useActionData() as { error?: string } | undefined;
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="flex w-full items-center  bg-background px-6 py-12">
      <div className="w-full max-w-xl">
        <TabsAuth active={active} setActive={setActive} />
        <div className="mt-8 flex flex-col gap-5">
          <div>
            <h1 className="font-headline-lg text-headline-lg text-on-background">
              {isSignin ? "Welcome Back." : "Join us."}
            </h1>
            <p className="mt-2 text-sm font-normal text-on-surface-variant">
              {isSignin
                ? "Sign in to your HoloDex account."
                : "Create your HoloDex account."}
            </p>
          </div>
          <Form
            method="POST"
            action={isSignin ? "/login" : "/register"}
            className="flex flex-col gap-5"
          >
            {!isSignin && (
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-3.5">
                  <TextInput
                    label="First Name"
                    name="firstname"
                    type="text"
                    placeholder="Lollo"
                    required
                  />
                  <TextInput
                    label="Last Name"
                    name="lastname"
                    type="text"
                    placeholder="Lovelace"
                    required
                  />
                </div>
                <TextInput
                  label="Username"
                  name="username"
                  type="text"
                  placeholder="Lollo-p"
                  required
                />
              </div>
            )}
            <div className="flex flex-col gap-4">
              <TextInput
                label="Email Address"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
              />
              <TextInput
                label="Password"
                name="password"
                type="password"
                placeholder="••••••••"
                required
              />
            </div>

            {actionData?.error && (
              <p className="text-sm text-error">{actionData.error}</p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center gap-2.5 rounded bg-primary py-3.5 text-label-sm tracking-widest text-on-primary uppercase transition-colors hover:bg-primary-container disabled:cursor-default disabled:bg-outline-variant"
            >
              {isSubmitting
                ? isSignin
                  ? "Logging in..."
                  : "Registering..."
                : isSignin
                  ? "Log in"
                  : "Register"}
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
}
