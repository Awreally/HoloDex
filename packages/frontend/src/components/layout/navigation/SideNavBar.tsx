import { navSections } from "./navigation.config";
import { SideNavItem } from "./SideNavItem";

export function SideNavbar() {
  return (
    <aside className="sticky top-20 z-40 hidden h-[calc(100vh-5rem)] w-64 shrink-0 flex-col gap-1 border-r border-surface-variant bg-surface-container-lowest px-3.5 py-6 md:flex">
      {navSections.map((section) => (
        <div key={section.title}>
          <div className="px-3 pt-4.5 pb-2.5 text-[11px] font-semibold tracking-[0.08em] text-outline uppercase first:pt-0">
            {section.title}
          </div>
          <ul className="flex flex-col gap-1">
            {section.links.map((link) => (
              <SideNavItem key={link.to} {...link} />
            ))}
          </ul>
        </div>
      ))}

      <div className="mt-auto pt-6">
        <button className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary font-title-md text-[15px] font-bold text-on-primary shadow-[0_6px_16px_rgba(97,57,144,0.28)] transition-colors hover:bg-primary-container">
          <span className="material-symbols-outlined text-[20px]">
            shopping_cart
          </span>
          Shop Packs
        </button>
      </div>
    </aside>
  );
}
