import PackOpener from "../components/PackOpener";
import { openPack } from "../api/packs.api";
import { useParams } from "react-router";

export function OpenPackPage() {
  
  const { setId } = useParams();

  if (!setId) {
    return <p>No set selected.</p>;
  }
  
  return (
    <PackOpener
      setName="Base Set"
      drawCards={() => openPack(setId)}
      onComplete={(cards) => console.log(cards)}
    />
  );
}
