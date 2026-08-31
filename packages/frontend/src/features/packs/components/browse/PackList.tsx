import { PackThumbnail } from "./PackThumbnail";
import { SetsPack } from "../../types/packs.types";

type PackListProps = {
  packs: SetsPack[];
};

export default function PackList({ packs }: PackListProps) {
  return (
    <div className="w-full">
      <div className="flex flex-col gap-1">
        <p className="text-headline-lg-s text-outline uppercase">
          Open Packs
        </p>
        <h1 className="font-headline-xl text-display-lg text-on-surface">
          Packs
        </h1>
        <p className="text-body-md text-outline">
          Select a pack that you wish to open
        </p>
      </div>
      <div className="mt-8 grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] items-stretch gap-3">
        {packs.map((p) => (
          <PackThumbnail key={p.id} packsFace={p} />
        ))}
      </div>
    </div>
  );
}
