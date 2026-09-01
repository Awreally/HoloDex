import { useLoaderData } from "react-router";
import { CollectionResult } from "../types/collection.types";
import BrowseSet from "../components/CollectionSets/BrowseSet";

export default function CollectionGridPage() {
  const { collection, pagination } = useLoaderData() as CollectionResult;

  return <BrowseSet collection={collection} pagination={pagination} />;
}
