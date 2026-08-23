import { useState } from "react";
import { useNavigate } from "react-router";
import { useLogin } from "../hooks/auth.hooks";
import { useRegister } from "../hooks/auth.hooks";
import TextInput from "../../../components/layout/ui/input/TextInput";
import { TabsAuth } from "./TabsAuth";
import { useAuth } from "../../../context/AuthContext";

export function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [active, setActive] = useState<"signin" | "register">("signin");
  const isSignin = active === "signin";
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const { login, isLoading: isLoginLoading, error: loginError } = useLogin();
  const {
    register,
    isLoading: isRegisterLoading,
    error: registerError,
  } = useRegister();

  const isSubmitting = isSignin ? isLoginLoading : isRegisterLoading;
  const error = isSignin ? loginError : registerError;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (isSignin) {
      const user = await login({ email, password });

      if (user) {
        setUser(user)
        navigate("/");
      }

      return;
    }

    const user = await register({
      firstname,
      lastname,
      username,
      email,
      password,
    });

    if (user) {
      setUser(user)
      navigate("/");
    }
  }

  return (
    <div className="flex w-full min-h-screen items-center justify-center bg-background px-6 py-12">
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
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {!isSignin && (
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-3.5">
                  <TextInput
                    label="First Name"
                    name="firstname"
                    type="text"
                    placeholder="Ada"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                    required
                  />
                  <TextInput
                    label="Last Name"
                    name="lastname"
                    type="text"
                    placeholder="Lovelace"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                    required
                  />
                </div>
                <TextInput
                  label="Username"
                  name="username"
                  type="text"
                  placeholder="Awsnap"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <TextInput
                label="Password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error instanceof Error && (
              <p className="text-sm text-error">{error.message}</p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center gap-2.5 rounded bg-primary py-3.5 text-label-sm uppercase tracking-widest text-on-primary transition-colors hover:bg-primary-container disabled:cursor-default disabled:bg-outline-variant"
            >
              {isSubmitting && (
                <svg
                  className="h-4 w-4 animate-spin"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
              )}
              {isSubmitting
                ? isSignin
                  ? "Logging in..."
                  : "Registering..."
                : isSignin
                  ? "Log in"
                  : "Register"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
