import { useState, useEffect } from "react";
import { fetchGetPacks } from "../../api/packs.api";
import { SetsPack, UseSetsResult } from "../../types/packs.types";

export function usePackSet(): UseSetsResult {
  const [sets, setSets] = useState<SetsPack[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    setIsLoading(true);
    setError(null);
    fetchGetPacks()
      .then((data) => {
        if (!cancelled) setSets(data);
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
  return { sets, isLoading, error };
}
