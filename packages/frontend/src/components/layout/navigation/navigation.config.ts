export type NavLinkItem = {
    to: string;
    label: string;
    icon: string;
    end?: boolean;
};

export type NavSection = {
    title: string;
    links: NavLinkItem[];
};

export const navSections: NavSection[] = [
    {
        title: "Play",
        links: [
            { to: "/", label: "Dashboard", icon: "space_dashboard", end: true },
            { to: "/openpacks", label: "Open Packs", icon: "inventory_2" },
        ],
    },
    {
        title: "Collect",
        links: [
            { to: "/collection", label: "Collection", icon: "grid_view" },
            { to: "/sets", label: "Sets", icon: "layers" },
            { to: "/trade", label: "Trade", icon: "swap_horiz" },
        ],
    },
];
