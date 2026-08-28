import { SetsPack } from "../../types/packs.types";

export function PackCardFace({ packsFace }: { packsFace: SetsPack }) {
  return (
    <div>
      {packsFace.packImageUrl ? (
        <img src={packsFace.packImageUrl} />
      ) : (
        <div>{packsFace.name}</div>
      )}
    </div>
  );
}
