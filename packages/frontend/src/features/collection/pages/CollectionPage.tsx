import { useCollection } from "../hooks/collection.hooks";
import { CollectionCardTile } from "../components/CollectionCardTile";

export default function CollectionPage() {
  const { collection, isLoading, error } = useCollection();
  if (isLoading) return <p>Loading ...</p>;
  if (error) return <p>{error}</p>;
  if (collection.length === 0)
    return <p>No cards yet — open a pack to get started!</p>;

  return (
    <div className="w-full">
      <p className="text-[11px] font-semibold tracking-[0.08em] text-outline uppercase">
        Binder
      </p>
      <h1 className="mt-1 text-[32px] font-extrabold text-on-surface">
        Collection
      </h1>
      <p className="mt-1 text-sm text-on-surface-variant">
        {collection.length} card{collection.length === 1 ? "" : "s"} collected
      </p>

      <div className="mt-8 grid grid-cols-[repeat(auto-fill,minmax(132px,1fr))] gap-3.5">
        {collection.map((c) => (
          <CollectionCardTile key={c.id} entry={c} />
        ))}
      </div>
    </div>
  );
}
