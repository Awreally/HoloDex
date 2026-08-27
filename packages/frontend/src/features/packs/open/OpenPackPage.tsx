import PackOpener from "../components/PackOpener";
import PackDisplay from "../components/PacksDisplay";
import { openPack } from "../api/packs.api";
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
      drawCards={() => openPack(setId)}
      onComplete={(cards) => console.log(cards)}
      />
      </div>
      </div>
  );
}
