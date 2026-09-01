import { Router } from "express";
import { getCollection } from "./collection.controller";
import { requireAuth } from "../../middleware/requireAuth";
import { validateRequest } from "../../middleware/validateRequest";
import { CollectionQuerySchema } from "./collection.validation";

export const collectionRouter = Router();

collectionRouter.get(
    "/collection",
    requireAuth,
    validateRequest({ query: CollectionQuerySchema }),
    getCollection,
);