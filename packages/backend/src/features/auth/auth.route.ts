import { Router } from "express";
import { registerUserHandler, loginUserHandler } from "./auth.controller";

export const authRouter = Router();

authRouter.post("/register", registerUserHandler);
authRouter.post("/login", loginUserHandler);


