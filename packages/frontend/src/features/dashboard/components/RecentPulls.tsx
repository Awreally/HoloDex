import { Recent } from "../types/dashboard.types";

type RecentPullsProps = {
    recent: Recent[];
}
export default function RecentPulls({ recent }: RecentPullsProps) {
    return (
        <div>
            {recent.map((r) => (
                <div key={r.id}>

                </div>
            ))}
        </div>
    )

}