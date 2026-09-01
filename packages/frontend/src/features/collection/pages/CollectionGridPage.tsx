import { useLoaderData } from "react-router";
import { CollectionResult } from "../types/collection.types";
import CollectionCardGrid from "../components/CollectionCards/CollectionCardGrid";

export default function CollectionGridPage() {
  const { collection, pagination } = useLoaderData() as CollectionResult;

  return <CollectionCardGrid collection={collection} pagination={pagination} />;
}
