import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { env } from "./config/env";
import { prisma } from "./lib/prisma";
import { setsRouter } from "./features/sets/sets.routes";
import { packsRouter } from "./features/packs/packs.routes";
import { authRouter } from "./features/auth/auth.route";
import { errorHandler } from "./middleware/errorHandler";
import { collectionRouter } from "./features/collection/collection.route";

const app = express();

app.use(cookieParser());
app.use(
  cors({
    origin: env.FRONTEND_URL,
    credentials: true,
  }),
);

app.use(express.json());

app.use("/api/v1/sets", setsRouter);
app.use("/api/v1", packsRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/vi/", collectionRouter)

app.use(errorHandler);

app.get("/api/health", async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: "ok" });
  } catch {
    res.status(503).json({ status: "db unavailable" });
  }
});

app.listen(env.PORT, () => {
  console.log(`Server running on port ${env.PORT}`);
});
