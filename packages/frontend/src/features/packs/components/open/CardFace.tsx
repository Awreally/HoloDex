import {
  useEffect,
  useState,
  type CSSProperties,
  type MouseEvent,
} from "react";
import { CardSummary } from "../../types/packs.types";
import { cardImageUrl } from "../../../../lib/images";
import { variantLabels } from "../../config/packs.config";

type FoilStyle = CSSProperties & { "--px"?: string; "--py"?: string };

const FOIL_EFFECT_DURATION_MS = 3000;

export default function CardFace({ card }: { card: CardSummary }) {
  const [pointer, setPointer] = useState({ x: 50, y: 35 });
  const [foilActive, setFoilActive] = useState(true);
  const isHolo = card.pulledVariant === "holo";
  const isReverse = card.pulledVariant === "reverse";
  const hasFoil = isHolo || isReverse;

  useEffect(() => {
    const timer = setTimeout(
      () => setFoilActive(false),
      FOIL_EFFECT_DURATION_MS,
    );
    return () => clearTimeout(timer);
  }, [card.id]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPointer({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const glowStyle: FoilStyle = {
    "--px": `${pointer.x}%`,
    "--py": `${pointer.y}%`,
  };

  const foilVisible = hasFoil && foilActive;

  return (
    <div className="h-full w-full rounded-2xl border border-zinc-100">
      <div className="flex flex-col justify-center">
        {card.imageLarge ? (
          <div
            className="group relative overflow-hidden rounded-xl"
            style={foilVisible ? glowStyle : undefined}
            onMouseMove={foilVisible ? handleMouseMove : undefined}
            onMouseLeave={() => setPointer({ x: 50, y: 35 })}
          >
            <img
              src={cardImageUrl(card.imageLarge)}
              alt={card.name}
              className="block w-full"
            />

            {hasFoil && (
              <div
                className={`pointer-events-none absolute inset-0 transition-opacity duration-1000 ${
                  foilActive ? "opacity-100" : "opacity-0"
                }`}
              >
                {isHolo && (
                  <div
                    className="absolute inset-0 animate-[holoSheen_3.5s_linear_infinite] mix-blend-color-dodge"
                    style={{
                      opacity: 0.4,
                      backgroundSize: "220% 220%",
                      backgroundImage:
                        "linear-gradient(115deg, hsl(330 75% 60%) 0%, hsl(265 75% 60%) 20%, hsl(200 75% 60%) 40%, hsl(150 60% 55%) 60%, hsl(50 75% 60%) 80%, hsl(330 75% 60%) 100%)",
                    }}
                  />
                )}

                <div
                  className="absolute inset-0 animate-[shineSweep_2.4s_ease-in-out_infinite]"
                  style={{
                    mixBlendMode: isHolo ? "overlay" : "normal",
                    backgroundImage: isHolo
                      ? "linear-gradient(115deg,transparent 35%,rgba(255,255,255,0.85) 50%,transparent 65%)"
                      : "linear-gradient(115deg,transparent 35%,rgba(255,255,255,0.7) 50%,transparent 65%)",
                  }}
                />

                <div
                  className="absolute inset-0 opacity-0 mix-blend-overlay transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(circle at var(--px) var(--py), rgba(255,255,255,0.9), transparent 45%)",
                  }}
                />
              </div>
            )}
          </div>
        ) : (
          <span>{card.name}</span>
        )}
        <div className="mt-1.5 flex flex-col items-center">
          <p className="font-headline-lg text-headline-lg-sm text-on-surface">
            {card.name}
          </p>
          <p>{card.rarity}</p>
          <p className="text-xs tracking-wide text-outline uppercase">
            {variantLabels[card.pulledVariant]}
          </p>
        </div>
      </div>
    </div>
  );
}
