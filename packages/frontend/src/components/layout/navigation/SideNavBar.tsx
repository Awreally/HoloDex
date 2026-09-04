import { Link } from "react-router";
import clsx from "clsx";
import { navSections } from "./navigation.config";
import { SideNavItem } from "./SideNavItem";
import { useAuth } from "../../../context/AuthContext";
import { LogoutButton } from "../../../features/auth/components/LogoutButton";

type SideNavbarProps = {
  open: boolean;
  onClose: () => void;
};

export function SideNavbar({ open, onClose }: SideNavbarProps) {
  const { user } = useAuth();

  return (
    <>
      {open && (
        <div
          onClick={onClose}
          aria-hidden="true"
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
        />
      )}

      <aside
        className={clsx(
          "fixed inset-y-0 left-0 z-50 flex h-full w-72 shrink-0 flex-col gap-1 border-r border-surface-variant bg-surface-container-lowest px-3.5 py-6 shadow-xl transition-transform duration-300 ease-in-out",
          open ? "translate-x-0" : "-translate-x-full",
          "md:sticky md:top-20 md:z-40 md:h-[calc(100vh-5rem)] md:w-64 md:translate-x-0 md:shadow-none",
        )}
      >
        <div className="mb-2 flex items-center justify-between md:hidden">
          <span className="font-headline-lg text-headline-lg font-bold text-primary">
            HoloDex
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="rounded-full p-2 text-on-surface-variant transition hover:bg-surface-container-low hover:text-primary active:scale-90"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {navSections.map((section) => (
          <div key={section.title}>
            <div className="px-3 pt-4.5 pb-2.5 text-headline-lg-s text-outline uppercase first:pt-0">
              {section.title}
            </div>
            <ul className="flex flex-col gap-1">
              {section.links.map((link) => (
                <SideNavItem key={link.to} {...link} onNavigate={onClose} />
              ))}
            </ul>
          </div>
        ))}

        <div className="mt-auto flex flex-col gap-3 pt-6">
          {user ? (
            <LogoutButton />
          ) : (
            <Link
              to="/login"
              onClick={onClose}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-surface-variant font-title-md text-[15px] font-semibold text-on-surface transition-colors hover:bg-surface-container-low"
            >
              <span className="material-symbols-outlined text-[20px]">
                person
              </span>
              Log In
            </Link>
          )}

          <Link 
          to="/packs"
          onClick={onClose}
          className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary font-title-md text-[15px] font-bold text-on-primary shadow-[0_6px_16px_rgba(97,57,144,0.28)] transition-colors hover:bg-primary-container">
            <span className="material-symbols-outlined text-[20px]">
              shopping_cart
            </span>
            Shop Packs
          </Link>
        </div>
      </aside>
    </>
  );
}
