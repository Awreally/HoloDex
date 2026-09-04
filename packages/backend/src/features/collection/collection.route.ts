import { Router } from "express";
import { getCollection, getCollectionSets } from "./collection.controller";
import { requireAuth } from "../../middleware/requireAuth";
import { validateRequest } from "../../middleware/validateRequest";
import {
  CollectionQuerySchema,
  SetParamsSchema,
} from "./collection.validation";

export const collectionRouter = Router();

collectionRouter.get("/sets", requireAuth, getCollectionSets);
collectionRouter.get(
  "/sets/:setId/cards",
  requireAuth,
  validateRequest({ params: SetParamsSchema, query: CollectionQuerySchema }),
  getCollection,
);
