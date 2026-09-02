import { useAuth } from "../context/AuthContext";
export function DashBoardPage() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col items-center">
      <h1>Welcome Back, {user?.username} ! </h1>

      <div className="mt-5 max-w-xl text-center">
        <p className="text-center">
          This is your HoloDex dashboard, your home base for browsing and
          organizing your card collections.
        </p>

        <p className="mt-5">
          From here you'll be able to track your sets, see collection progress
          at a glance, and jump straight into the cards you're missing.
        </p>
        <p className="mt-5">
          This area is still under construction, more features are on the way
          soon!
        </p>
      </div>
    </div>
  );
}
