import BasePack from "../../../../assets/BasePack.png";

type ClosedPackCardProps = {
  setName: string;
  packImageUrl: string | null;
  packCost: number;
  isLoading: boolean;
  onOpen: () => void;
};

export default function PackCard({
  setName,
  packImageUrl,
  packCost,
  isLoading,
  onOpen,
}: ClosedPackCardProps) {
  return (
    <div className="flex flex-wrap sm:flex-nowrap flex-row items-center justify-center gap-10 px-6 pt-12 pb-10">
      <div className="flex-none w-65 h-81 rounded-lg bg-surface-container-low border border-surface-container-highest flex items-center justify-center shadow-[0_1px_2px_rgba(26,28,28,0.04)]">
        <img src={packImageUrl ?? BasePack} alt={setName} className="w-36 rounded-xl shadow-[0_16px_30px_rgba(26,28,28,0.18)] cursor-pointer hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-transform"/>
        </div>
        <div className="flex-1 max-w-85 min-w-0">
        <p className="text-headline-lg-s tracking-[0.08em] text-outline uppercase">Booster Pack</p>
        <h1 className="font-headline-lg text-display-lg text-on-surface">{setName}</h1>
      <p className="text-headline-lg-sm text-outline">Cost: {packCost} Coins</p>
        <div className="flex flex-col gap-2.5 p-4.5 rounded-2xl bg-[#f9f9f9] border border-[#e2e2e2] mb-6">

      <button
      onClick={onOpen}
      disabled={isLoading}
      className="border-none bg-linear-to-br from-violet-500 to-violet-700 text-white font-extrabold text-[15px] px-9 py-3.5 rounded-xl cursor-pointer hover:brightness-105 active:scale-[0.98] transition disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isLoading ? "Opening..." : "Open Pack"}
      </button>
        </div>
        </div>
    </div>
  );
}
