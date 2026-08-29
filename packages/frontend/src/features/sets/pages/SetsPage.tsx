import { useLoaderData } from "react-router"
import { SetSummary } from "../types/sets.types"
import { setLogoUrl } from "../../../lib/images";


export default function SetsPage() {
  const sets = useLoaderData() as SetSummary[];
  
  return (
    <div className="w-full">
      <p className="text-[11px] font-semibold tracking-[0.08em] text-outline uppercase">
        Binder
      </p>
      <h1 className="mt-1 text-[32px] font-extrabold text-on-surface">
        Sets
      </h1>
      <div className="mt-8 grid grid-cols-[repeat(auto-fill,minmax(132px,1fr))] gap-3">
      {sets.map((set) =>(
        <div key={set.id}>
           {set.logoUrl ? (
             <img src={setLogoUrl(set.logoUrl)} alt={set.name} />
            ) : (
              <div className="">
                        {set.name}
                      </div>
                    )}
        </div>
      ))}
      </div>
    </div>
  )
}