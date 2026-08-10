import { useEffect, useState } from "react";
import { apiFetch } from "../lib/api";

type SetSummary = {
  id: string;
  name: string;
};

export function SetsPage() {
  const [sets, setSets] = useState<SetSummary[]>([]);

  useEffect(() => {
    apiFetch<SetSummary[]>("/sets")
      .then(setSets)
      .catch((err) => console.error(err));
  }, []);

  return (
    <ul>
      {sets.map((set) => (
        <li key={set.id}>{set.name}</li>
      ))}
    </ul>
  );
}
