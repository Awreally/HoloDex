type MobileTopBarProps = {
  onOpenMenu: () => void;
};

export function MobileTopBar({ onOpenMenu }: MobileTopBarProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-surface-variant bg-surface px-4 shadow-sm md:hidden">
      <button
        type="button"
        onClick={onOpenMenu}
        aria-label="Open menu"
        className="rounded-full p-2 text-on-surface-variant transition hover:bg-surface-container-low hover:text-primary active:scale-90"
      >
        <span className="material-symbols-outlined">menu</span>
      </button>

      <span className="font-headline-lg text-headline-lg font-bold text-primary">
        HoloDex
      </span>
    </header>
  );
}
