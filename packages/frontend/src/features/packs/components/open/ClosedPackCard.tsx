import BasePack from "../../../../assets/BasePack.png";

type ClosedPackCardProps = {
  setName: string;
  packImageUrl: string | null;
  packSize: number;
  packCost: number;
  isLoading: boolean;
  onOpen: () => void;
};

export default function PackCard({
  setName,
  packImageUrl,
  packSize,
  isLoading,
  onOpen,
}: ClosedPackCardProps) {
  return (
    <div className="flex flex-row flex-wrap items-center justify-center gap-10 px-6 pt-12 pb-10 sm:flex-nowrap">
      <div className="flex h-81 w-65 flex-none items-center justify-center rounded-lg border border-surface-container-highest bg-surface-container-low shadow-[0_1px_2px_rgba(26,28,28,0.04)]">
        <img
          src={packImageUrl ?? BasePack}
          alt={setName}
          className="w-40 cursor-pointer rounded-xl shadow-[0_16px_30px_rgba(26,28,28,0.18)] transition-transform hover:-translate-y-0.5 active:translate-y-0 active:scale-95"
        />
      </div>
      <div className="flex-1 flex-col">
        <p className="text-headline-lg-s text-outline uppercase">
          Booster Pack
        </p>
        <h1 className="text-headline-xl text-on-surface">{setName}</h1>
        <div className="mb-6 flex flex-col gap-2.5 rounded-2xl border border-[#e2e2e2] bg-[#f9f9f9] p-4.5">
          <p className="text-headline-lg-s text-outline uppercase">
            What's Inside
          </p>
          <div className="text-on-surface] flex items-center gap-2.5 text-headline-lg-sm">
            <span className="material-symbols-outlined text-[18px] text-primary">
              style
            </span>
            {packSize} cards guaranteed
          </div>
          <div className="flex items-center gap-2.5 text-headline-lg-sm text-on-surface">
            <span className="material-symbols-outlined text-[18px] text-primary">
              auto_awesome
            </span>
            Chance at holo &amp; secret rares
          </div>
        </div>
        <button
          onClick={onOpen}
          disabled={isLoading}
          className="flex cursor-pointer items-center justify-center gap-2.5 rounded-xl border-none bg-linear-to-br from-violet-500 to-violet-700 px-9 py-3.5 text-[15px] font-extrabold text-white transition hover:brightness-105 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <span className="material-symbols-outlined text-[21px]">
            auto_awesome
          </span>
          {isLoading ? "Opening..." : "Open Pack"}
        </button>
      </div>
    </div>
  );
}
