import PackOpener from "../components/PackOpener";
import { openPack } from "../api/packs.api";

export function OpenPackPage() {
  return (
    <PackOpener
      setName="Base Set"
      drawCards={openPack}
      onComplete={(cards) => console.log(cards)}
    />
  );
}
