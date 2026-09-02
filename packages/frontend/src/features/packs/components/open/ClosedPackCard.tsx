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
    <div className="flex w-full flex-col items-center justify-center gap-8 px-4 pt-8 pb-8 sm:flex-row sm:flex-nowrap sm:gap-10 sm:px-6 sm:pt-12 sm:pb-10">
      <div className="flex h-64 w-52 flex-none items-center justify-center rounded-lg border border-surface-container-highest bg-surface-container-low shadow-[0_1px_2px_rgba(26,28,28,0.04)] sm:h-81 sm:w-65">
        <img
          src={packImageUrl ?? BasePack}
          alt={setName}
          className="w-32 cursor-pointer rounded-xl shadow-[0_16px_30px_rgba(26,28,28,0.18)] transition-transform hover:-translate-y-0.5 active:translate-y-0 active:scale-95 sm:w-40"
        />
      </div>
      <div className="flex w-full max-w-sm flex-1 flex-col items-center text-center sm:max-w-none sm:items-start sm:text-left">
        <p className="text-headline-lg-s text-outline uppercase">
          Booster Pack
        </p>
        <h1 className="text-headline-xl text-on-surface">{setName}</h1>
        <div className="mb-6 flex w-full flex-col gap-2.5 rounded-2xl border border-[#e2e2e2] bg-[#f9f9f9] p-4.5">
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
          className="flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-xl border-none bg-linear-to-br from-violet-500 to-violet-700 px-9 py-3.5 text-[15px] font-extrabold text-white transition hover:brightness-105 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
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
