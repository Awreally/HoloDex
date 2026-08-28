import { fetchGetPacks } from "../api/packs.api";

export async function packsLoader() {
    return fetchGetPacks()
};