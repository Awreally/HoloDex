import { useState, useEffect } from "react";
import { CollectionEntry } from "../types/collection.types";
import { fetchGetCollection } from "../api/collection.api";
import { UseCollectionResult } from "../types/collection.types";

export function useCollection(): UseCollectionResult {
  const [collection, setCollection] = useState<CollectionEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    setIsLoading(true);
    setError(null);
    fetchGetCollection()
      .then((data) => {
        if (!cancelled) setCollection(data);
      })
      .catch(() => {
        if (!cancelled) setError(error);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);
  return { collection, isLoading, error };
}
