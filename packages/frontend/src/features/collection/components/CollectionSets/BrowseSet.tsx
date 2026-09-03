import { CollectionSets } from "../../types/collection.types";
import { Link } from "react-router";
import { setLogoUrl } from "../../../../lib/images";

type BrowseSetProps = {
  sets: CollectionSets[];
};

export default function BrowseSet({ sets }: BrowseSetProps) {
  return (
    <div className="mx-auto max-w-295">
      <p className="mb-5.5 text-outline uppercase">Binder</p>
      <div className="mb-5.5 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-headline-lg">Collection</h1>
      </div>
      <div className="mb-5.5">
        <p className="text-headline-lg-sm">
          Pick a set to see the cards you've pulled.
        </p>
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4.5">
        {sets.map((s) => (
          <Link key={s.setId} to={`/collection/${s.setId}`}>
            <div className="flex cursor-pointer gap-4 rounded-2xl border border-[#e2e2e2] bg-white p-5.5 hover:border-outline">
              <div className="flex w-full flex-col items-start justify-between gap-3">
                <div className="flex w-full items-start justify-between gap-3">
                  <h2 className="min-w-0 truncate text-headline-lg-mobile">
                    {s.name}
                  </h2>
                  {s.logoUrl ? (
                    <img
                      src={setLogoUrl(s.logoUrl)}
                      alt={s.name}
                      className="h-10 w-10 shrink-0 object-contain"
                    />
                  ) : (
                    <div className="">{s.name}</div>
                  )}
                </div>
                <div className="font-body-md text-headline-lg-s text-outline">
                  <span>{s.releaseDate}</span>
                  <span>{s.total} cards</span>
                </div>
                <div className="w-full self-stretch">
                  <div className="mb-1 flex justify-between text-outline">
                    <span>
                      {s.owned} / {s.total}
                    </span>
                    <span>{s.percentComplete}%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-outline-variant">
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{ width: `${s.percentComplete}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
