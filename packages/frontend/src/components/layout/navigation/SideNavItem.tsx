import { NavLink } from "react-router";
import clsx from "clsx";
import type { NavLinkItem } from "./navigation.config";

export const SideNavItem = ({ to, label, icon, end }: NavLinkItem) => (
  <li>
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        clsx(
          "relative flex h-11.5 cursor-pointer items-center gap-3 overflow-hidden rounded-[10px] px-3.5 transition-colors",
          isActive
            ? "font-semibold text-on-surface"
            : "text-on-surface-variant hover:bg-surface-container-low",
        )
      }
    >
      {({ isActive }) => (
        <>
          {isActive && (
            <div className="absolute inset-0 rounded-[10px] border-l-4 border-primary bg-primary/10" />
          )}
          <span className="material-symbols-outlined relative text-[21px] text-on-surface-variant">
            {icon}
          </span>
          <span className="relative text-[15px] font-semibold">{label}</span>
        </>
      )}
    </NavLink>
  </li>
);
