import { useCollection } from "../hooks/collection.hooks";
import { cardImageUrl } from "../../../lib/images";

export default function CollectionPage() {
  const { collection, isLoading, error } = useCollection();
  if (isLoading) return <p>Loading ...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {collection.map((c) => (
        <div key={c.id}>
          {c.card.imageLarge ? (
            <img src={cardImageUrl(c.card.imageLarge)} alt={c.card.name} />
          ) : (
            <span>{c.card.name}</span>
          )}
          <span>
            {c.variant}
            {c.quantity}
            {c.card.rarity}
          </span>
        </div>
      ))}
    </div>
  );
}
