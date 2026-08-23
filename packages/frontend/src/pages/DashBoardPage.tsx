import { useAuth } from "../context/AuthContext"


export function DashBoardPage() {
    const { user } = useAuth();
    return <h1>{user?.username}</h1>
}