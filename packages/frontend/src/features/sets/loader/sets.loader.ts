import { fetchSets } from "../api/sets.api";

export function setsLoader() {
  return fetchSets();
}
