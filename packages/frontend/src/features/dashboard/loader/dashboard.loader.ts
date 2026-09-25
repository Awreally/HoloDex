import { getDashboard } from "../api/dashboard.api";

export function dashLoader() {
    return getDashboard();
}