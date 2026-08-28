import { PackThumbnail } from "./PackThumbnail";
import { SetsPack } from "../../types/packs.types";

type PackListProps = {
  packs: SetsPack[];
};

export default function PackList({ packs }: PackListProps) {
  return (
    <div className="w-full">
      <div className="mt-8 grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] items-stretch gap-3">
        {packs.map((p) => (
          <PackThumbnail key={p.id} packsFace={p} />
        ))}
      </div>
    </div>
  );
}
