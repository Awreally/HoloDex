import { useLoaderData } from "react-router";
import { CollectionSets } from "../types/collection.types";
import BrowseSet from "../components/CollectionSets/BrowseSet";

export default function CollectionPage() {
  const collectionSets = useLoaderData() as CollectionSets[];

  return (
    <div>
      <BrowseSet sets={collectionSets} />
    </div>
  );
}
