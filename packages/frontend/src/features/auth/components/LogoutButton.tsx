import { useLogout } from "../hooks/auth.hooks";

export function LogoutButton() {
    const { handleLogout, isLoggingOut } = useLogout();
    return (
        <button onClick={handleLogout} disabled={isLoggingOut}>
             Logout
        </button>
    );
}