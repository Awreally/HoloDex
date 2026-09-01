import { CollectionCardTile } from "../components/CollectionCardTile";
import { useCollectionFilters } from "../hooks/collection.hooks";
import { CollectionEntry, PaginationMeta } from "../types/collection.types";

type BrowseSetProps = {
    collection: CollectionEntry[];
    pagination: PaginationMeta;
}

export default function BrowseSet({ collection, pagination }: BrowseSetProps) {

    const { goToPage, setId, setSetId, variant, setVariant, page, sortDir } = useCollectionFilters();
  return (
    <div className="max-w-295 mx-auto">
            <p className="mb-5.5 text-outline uppercase">Binder</p>
        <div className= "flex items-center justify-between mb-5.5 flex-wrap gap-4">
            <h1 className="text-headline-lg">Collection</h1>
        </div>
        <div className="mb-5.5">
            <p className="text-headline-lg-sm">Pick a set to see the cards you've pulled.</p>
        </div>

        <div className="grid gap-4.5 grid-cols-[repeat(auto-fill,minmax(300px, 1fr))]">
        <div className="bg-white border border-[#e2e2e2] rounded-2xl p-5.5 flex flex-col gap-4 cursor-pointer hover:border-outline">
            <div className="flex items-start justify-between gap-3">

            </div>
        </div>
        </div>
    </div>
  )
}