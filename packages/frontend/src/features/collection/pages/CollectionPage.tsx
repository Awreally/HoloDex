import { useLoaderData } from "react-router";
import { CollectionResult } from "../types/collection.types";
import BrowseSet from "../components/BrowseSet";

export default function CollectionPage() {
  const { collection, pagination } = useLoaderData() as CollectionResult;


  return (
    <div className="w-full">
      <BrowseSet 
      collection={collection}
      pagination={pagination}
      />
      </div>
      
  );
}
