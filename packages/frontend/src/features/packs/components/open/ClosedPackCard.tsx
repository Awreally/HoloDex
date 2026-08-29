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
    <div className="flex flex-col items-center animate-[fadeUp_0.4s_ease_both]">
      <div className="w-60 h-82.5 rounded-2xl bg-linear-to-b from-violet-200 to-violet-400 flex flex-col items-center justify-center gap-2 shadow-[0_16px_30px_rgba(124,58,237,0.18)]">
        <img src={packImageUrl ?? BasePack} alt={setName} className="h-56 w-32 rounded-xl object-cover shadow-md" />
        <div className="font-extrabold text-lg text-violet-950">{setName}</div>
        <div className="text-[12.5px] font-semibold text-violet-800">Booster Pack</div>
      </div>
      <div className="text-xs text-zinc-400 bg-zinc-100 px-3.5 py-1.5 rounded-full my-5">
        Cost: {packCost} Coins
      </div>
      <button
        onClick={onOpen}
        disabled={isLoading}
        className="border-none bg-linear-to-br from-violet-500 to-violet-700 text-white font-extrabold text-[15px] px-9 py-3.5 rounded-xl cursor-pointer hover:brightness-105 active:scale-[0.98] transition disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isLoading ? "Opening..." : "Open Pack"}
      </button>
    </div>
  );
}
