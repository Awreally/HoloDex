export default function TopNavBar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-surface border-b border-surface-variant shadow-sm">
      <div className="relative w-full max-w-container-max mx-auto flex items-center justify-between h-20 px-margin-desktop">
        <div className="flex items-center gap-4">
          <span className="font-headline-lg text-headline-lg font-bold text-primary">
            HoloDex
          </span>
        </div>

        <div className="absolute left-1/2 -translate-x-1/2 w-full max-w-md hidden md:block">
          <div className="relative w-full">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">
              search
            </span>
            <input
              type="text"
              placeholder="Search cards, sets..."
              className="w-full bg-surface-container-low border border-surface-variant rounded-full py-2 pl-10 pr-4 text-body-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
            />
          </div>
        </div>

        <div className="flex items-center gap-8">
          <div className="flex flex-col items-end">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
              Level
            </span>
            <span className="font-title-md text-title-md font-bold text-primary">
              Lvl 42
            </span>
          </div>

          <div className="flex gap-6 items-center">
            <button
              title="5,000 Coins"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary-container/20 text-on-secondary-container hover:bg-secondary-container/30 transition-colors"
            >
              <span
                className="material-symbols-outlined text-secondary"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                toll
              </span>
              <span className="font-title-md text-title-md font-bold text-secondary">
                5,000
              </span>
            </button>
            <button className="p-2 rounded-full text-on-surface-variant hover:bg-surface-container-low hover:text-primary active:scale-90 transition">
              <span className="material-symbols-outlined">
                account_balance_wallet
              </span>
            </button>
            <button className="p-2 rounded-full text-on-surface-variant hover:bg-surface-container-low hover:text-primary active:scale-90 transition">
              <span className="material-symbols-outlined">person</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
