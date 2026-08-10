import dotenv from "dotenv";
dotenv.config();

const parsePort = (value: string | undefined): number => {
  if (!value) return 3000;
  const port = Number(value);
  if (!Number.isInteger(port) || port <= 0) {
    throw new Error("PORT must be a positive integer");
  }
  return port;
};

const getRequiredEnv = (name: string): string => {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`${name} is missing from environment variables`);
  }
  return value;
};

export const env = {
  PORT: parsePort(process.env.PORT),
  DATABASE_URL: getRequiredEnv("DATABASE_URL"),
  NODE_ENV: process.env.NODE_ENV?.trim() || "development",
  FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:5173",
};
