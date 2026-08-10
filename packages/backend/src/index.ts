import express from "express";
import cors from "cors";
import { env } from "./config/env";
import { prisma } from "./lib/prisma";
import { setsRouter } from "./features/sets/sets.routes";

const app = express();

app.use(
  cors({
    origin: env.FRONTEND_URL,
  }),
);

app.use(express.json());

app.use("/api/v1/sets", setsRouter);

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
