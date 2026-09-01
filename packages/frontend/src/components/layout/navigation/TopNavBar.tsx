import { Link } from "react-router";
import { LogoutButton } from "../../../features/auth/components/LogoutButton";
import { useAuth } from "../../../context/AuthContext";

export default function TopNavBar() {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-surface-variant bg-surface shadow-sm">
      <div className="relative mx-auto flex h-20 w-full max-w-container-max items-center justify-between px-margin-desktop">
        <div className="flex items-center gap-4">
          <span className="font-headline-lg text-headline-lg font-bold text-primary">
            HoloDex
          </span>
        </div>

        <div className="absolute left-1/2 hidden w-full max-w-md -translate-x-1/2 md:block">
          <div className="relative w-full">
            <span className="material-symbols-outlined absolute top-1/2 left-3 -translate-y-1/2 text-on-surface-variant">
              search
            </span>
            <input
              type="text"
              placeholder="Search cards, sets..."
              className="w-full rounded-full border border-surface-variant bg-surface-container-low py-2 pr-4 pl-10 text-body-md transition-all focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
            />
          </div>
        </div>

        <div className="flex items-center gap-8">
          <div className="flex flex-col items-end">
          </div>

          <div className="flex items-center gap-6">
            <button className="rounded-full p-2 text-on-surface-variant transition hover:bg-surface-container-low hover:text-primary active:scale-90">
              <span className="material-symbols-outlined">
                account_balance_wallet
              </span>
            </button>
            {!user && (
              <Link
              to="login"
              aria-label="Login"
              className="rounded-full p-2 text-on-surface-variant transition hover:bg-surface-container-low hover:text-primary active:scale-90"
              >
              <span className="material-symbols-outlined">person</span>
            </Link>
            )}
            {user && <LogoutButton /> }
          </div>
        </div>
      </div>
    </header>
  );
}
