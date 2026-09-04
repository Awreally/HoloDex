import { AuthForm } from "../components/AuthForm";

export default function Authpage() {
return (
<div className="flex flex-col items-center gap-4">
      <h1 >Welcome to HoloDex</h1>
      <p >
        Sign in below, or register if you're new.
      </p>
    <AuthForm />
    </div>
)
}