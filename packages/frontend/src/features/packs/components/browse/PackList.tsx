import { PackThumbnail } from "./PackThumbnail";
import { SetsPack } from "../../types/packs.types";

type PackListProps = {
  packs: SetsPack[];
};

export default function PackList({ packs }: PackListProps) {
  return (
    <div className="mx-auto w-full max-w-300">
      <div className="flex flex-col gap-1">
        <p className="text-headline-lg-s text-outline uppercase">
          Open Packs
        </p>
        <h1 className="text-headline-lg sm:font-headline-xl text-display-lg text-on-surface">
          Packs
        </h1>
        <p className="text-body-md text-on-surface">
          Select a pack that you wish to open
        </p>
      </div>
      <div className="mt-2 grid grid-cols-[repeat(auto-fit,minmax(160px,220px))] items-stretch justify-center gap-3 sm:mt-8">
        {packs.map((p) => (
          <PackThumbnail key={p.id} packsFace={p} />
        ))}
      </div>
    </div>
  );
}
