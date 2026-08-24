import { useLogout } from "../hooks/useLogout";

export function LogoutButton() {
    const { error, handleLogout, isLoggingOut } = useLogout();
    return (
        <button onClick={handleLogout} disabled={isLoggingOut}>
             {isLoggingOut ? "Logging out..." : "Logout"}
        </button>
    );
}