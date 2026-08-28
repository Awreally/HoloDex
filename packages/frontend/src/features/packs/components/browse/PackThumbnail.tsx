import { Link } from "react-router";
import type { SetsPack } from "../../types/packs.types";

export function PackThumbnail({ packsFace }: { packsFace: SetsPack }) {
  return (
    <div className="flex h-full flex-col items-center gap-3 rounded-lg bg-surface-container-lowest p-3 shadow-sm">
      <div className="flex h-60 w-full items-center justify-center overflow-hidden rounded-lg">
        {packsFace.packImageUrl ? (
          <img
            src={packsFace.packImageUrl}
            alt={packsFace.name}
            className="h-full w-full object-contain"
          />
        ) : (
          <div className="px-2 text-center text-sm font-bold text-on-surface">
            {packsFace.name}
          </div>
        )}
      </div>
      <p className="text-[13px] font-bold tracking-[0.08em] text-on-surface uppercase">
        {packsFace.name}
      </p>
      <p className="text-[13px] font-semibold tracking-[0.08em] text-outline uppercase">
        {packsFace.total} Cards
      </p>

      <Link
        to={`/packs/${packsFace.id}`}
        className="flex h-15 w-full items-center justify-center rounded-lg bg-linear-to-br from-violet-500 to-violet-700 px-4 text-center text-[15px] font-extrabold text-white transition hover:brightness-105 active:scale-[0.98]"
      >
        Select Pack
      </Link>
    </div>
  );
}
