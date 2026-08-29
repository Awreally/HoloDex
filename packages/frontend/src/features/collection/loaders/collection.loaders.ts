import { fetchGetCollection } from "../api/collection.api";

export function collectionLoader() {
  return fetchGetCollection();
}
