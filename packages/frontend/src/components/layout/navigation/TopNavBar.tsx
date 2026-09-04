export default function TopNavBar() {
  return (
    <header className="sticky top-0 z-50 hidden w-full border-b border-surface-variant bg-surface shadow-sm md:block">
      <div className="relative mx-auto flex h-20 w-full max-w-container-max items-center justify-between px-margin-desktop">
        <div className="flex items-center gap-4">
          <span className="font-headline-lg text-headline-lg font-bold text-primary">
            HoloDex
          </span>
        </div>
      </div>
    </header>
  );
}
