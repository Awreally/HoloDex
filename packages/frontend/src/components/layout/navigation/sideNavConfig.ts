export type NavLinkItem = {
    to: string;
    label: string;
    end?: boolean;
};

export const navLinks: NavLinkItem[] = [
    { to: "/packs", label: "Open Packs" },
    { to: "/sets", label: "Sets" },
    { to: "/collection", label: "Collection"},
]
