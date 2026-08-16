import { navLinks } from "./navigation.config";
import { SideNavItem } from "./SideNavItem";

export function SideNavbar() {
  return (
    <aside className="sticky top-20 z-40 hidden h-[calc(100vh-5rem)] w-64 flex-col border-r border-surface-variant bg-surface py-8 md:flex">
      <nav aria-label="Main" className="flex flex-1 flex-col gap-1 px-3">
        <ul>
          {navLinks.map((link) => (
            <SideNavItem key={link.to} {...link} />
          ))}
        </ul>
        <div className="mt-auto px-6 pb-4">
          <button className="ambient-shadow-hover flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 font-title-md text-title-md text-sm text-on-primary shadow-sm transition-colors hover:bg-primary-container">
            <span className="material-symbols-outlined text-sm">
              shopping_cart
            </span>
            Shop Packs
          </button>
        </div>
      </nav>
    </aside>
  );
}
