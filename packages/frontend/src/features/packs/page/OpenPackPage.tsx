import PackDisplay from "../components/browse/PackList";
import PackOpener from "../components/open/PackOpener";
import { fetchOpenPack } from "../api/packs.api";
import { useParams } from "react-router";
export function OpenPackPage() {
  const { setId } = useParams();

  if (!setId) {
    return <p>No set selected.</p>;
  }

  return (
    <div>
      <PackDisplay />
      <div>
        <PackOpener
          setName="Base Set"
          drawCards={() => fetchOpenPack(setId)}
          onComplete={(cards) => console.log(cards)}
        />
      </div>
    </div>
  );
}
