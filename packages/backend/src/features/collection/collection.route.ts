import { Router } from "express";
import { getCollection } from "./collection.controller";
import { requireAuth } from "../../middleware/requireAuth";

export const collectionRouter = Router();

collectionRouter.get("/collection", requireAuth, getCollection);