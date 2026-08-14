import { navLinks } from "./sideNavConfig";
import { SideNavItem } from "./SideNavItem";

export function SideNavbar() {
    return(
        <aside>
            <ul>
                {navLinks.map((link) => (
                    <SideNavItem key={link.to} {...link} />
                ))}
            </ul>
        </aside>
    )
}