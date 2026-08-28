import { usePackSet } from "./usePackSet";
import { PackCardFace } from "./PackThumbnail";

export default function PackDisplay() {
    const { sets, isLoading, error } = usePackSet();

    if (isLoading) return <p>Loading ...</p>;
    if (error) return <p>{error}</p>;
    
    return (
        <div className="w-full">
            <div className="mt-8 grid grid-cols-[repeat(auto-fill,minmax(132px,1fr))] gap-3.5">

                {sets.map((s) => (
                    <PackCardFace key={s.id} packsFace={s} />
                ))}
                </div>
    </div>
)
}
