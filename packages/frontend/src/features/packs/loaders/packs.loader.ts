import { fetchGetPacks, fetchOpenPack } from "../api/packs.api";
import { ActionFunctionArgs } from "react-router";

export async function packsLoader() {
  return fetchGetPacks();
}

export async function openPackAction({ params }: ActionFunctionArgs) {
  const setId = params.setId;

  if (!setId) {
    throw new Error("Missing setId");
  }
  return fetchOpenPack(setId);
}
