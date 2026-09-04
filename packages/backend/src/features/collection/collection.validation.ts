import { z } from "zod";

export const CollectionQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(24),
  variant: z.enum(["normal", "reverse", "holo"]).optional(),
  sortDir: z.enum(["asc", "desc"]).default("asc"),
});

export const SetParamsSchema = z.object({
  setId: z.string().trim().min(1),
});

export type CollectionQuery = z.infer<typeof CollectionQuerySchema>;
