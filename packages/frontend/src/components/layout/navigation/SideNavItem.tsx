import { NavLink } from "react-router";
import clsx from "clsx";
import type { NavLinkItem } from "./sideNavConfig";

export const SideNavItem = ({ to, label, end}: NavLinkItem) => ( 
    <li>
        <NavLink
            to={to}
            end={end}
            className={({ isActive}) => 
                clsx(
                    "text-sm font-medium",
                isActive ? "text-accent" : "text-ink hover:text-accent"
                )
            }
            >
                {label}
        </NavLink>
    </li>
)