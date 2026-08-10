import { Router } from "express";
import { getSets } from "./sets.controller";

export const setsRouter = Router();

setsRouter.get("/", getSets)