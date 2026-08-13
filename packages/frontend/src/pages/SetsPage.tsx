import { useEffect, useState } from "react";
import { apiFetch } from "../lib/api";
import { setLogoUrl } from "../lib/images";

type SetSummary = {
  id: string;
  name: string;
  logoUrl: string | null;
};

export function SetsPage() {
  const [sets, setSets] = useState<SetSummary[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    apiFetch<SetSummary[]>("/sets")
      .then(setSets)
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {sets.map((set) => (
        <div key={set.id} className="rounded-lg border p-4">
          {set.logoUrl ? (
            <img src={setLogoUrl(set.logoUrl)} alt={set.name} />
          ) : (
            <div className="flex h-32 items-center justify-center text-sm text-gray-400">
              {set.name}
            </div>
          )}
          <p>{set.name}</p>
        </div>
      ))}
    </div>
  );
}
