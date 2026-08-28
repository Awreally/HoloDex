import PackList from "../components/browse/PackList";
import PackOpener from "../components/open/PackOpener";
import { useParams, useRouteLoaderData } from "react-router";
import type { SetsPack } from "../types/packs.types";

export function OpenPackPage() {
  const packs = useRouteLoaderData("packs") as SetsPack[];
  const setId = useParams().setId;
  const selectedPack = packs.find((pack) => pack.id === setId);

  if (!setId) {
    return <PackList packs={packs} />;
  }

  if (!selectedPack) {
    return <p>Pack not found.</p>;
  }

  return (
    <div>
      <PackOpener
        selectedPack={selectedPack}
        onComplete={(cards) => console.log(cards)}
      />
    </div>
  );
}
