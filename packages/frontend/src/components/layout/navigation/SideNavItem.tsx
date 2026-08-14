import { NavLink } from "react-router";
import clsx from "clsx";
import type { NavLinkItem } from "./sideNavConfig";

export const SideNavItem = ({ to, label, end }: NavLinkItem) => (
  <li >
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        clsx(
           "flex items-center gap-2 rounded-lg border-l-4 px-4 py-3 transition-all hover:translate-x-1",
          isActive ? "border-primary bg-primary-fixed/20 font-bold text-primary" : "border-transparent text-on-surface-variant hover:border-surface-variant hover:bg-surface-container-low",
        )
      }
    >
      {label}
    </NavLink>
  </li>
);
