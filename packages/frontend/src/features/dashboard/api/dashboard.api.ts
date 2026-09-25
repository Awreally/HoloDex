import { apiFetch } from "../../../lib/api";
import { ApiSuccess } from "../../auth/types/auth.types";
import type { Dashboard } from "../types/dashboard.types";

export async function getDashboard(): Promise<Dashboard> {
  const res = await apiFetch<ApiSuccess<Dashboard>>("/dashboard");
  return res.data;
}
