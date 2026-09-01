import { z } from "zod";

export const CollectionQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(24),
  setId: z.string().trim().min(1).optional(),
  variant: z.enum(["normal", "reverse", "holo"]).optional(),
  sortDir: z.enum(["asc", "desc"]).default("asc"),
});

export type CollectionQuery = z.infer<typeof CollectionQuerySchema>;
