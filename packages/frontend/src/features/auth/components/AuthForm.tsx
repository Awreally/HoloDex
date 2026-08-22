import { useState } from "react";
import { useNavigate } from "react-router";
import { useLogin } from "../hooks/auth.hooks";
import { useRegister } from "../hooks/auth.hooks";
import TextInput from "../../../components/layout/ui/input/TextInput";
import { TabsAuth } from "./TabsAuth";

export function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [active, setActive] = useState<"signin" | "register">("signin");
  const isSignin = active === "signin";
  const navigate = useNavigate();

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
      navigate("/");
    }
  }

  return (
    <div>
      <TabsAuth active={active} setActive={setActive} />
      <div>
        <h1>{isSignin ? "Welcome Back." : "Join us."}</h1>
        <p>
          {isSignin
            ? "Sign in to your HoloDex account."
            : "Create your HoloDex account."}
        </p>
        <form onSubmit={handleSubmit}>
          {!isSignin && (
            <div>
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
          <div>
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
          
          {error instanceof Error && <p>{error.message}</p>}

          <button type="submit" disabled={isSubmitting}>
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
  );
}
