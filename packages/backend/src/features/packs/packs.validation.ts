import { z } from "zod";

export const OpenPackParamsSchema = z.object({
  setId: z.string().trim().min(1, "setId is required"),
});

export type OpenPackParams = z.infer<typeof OpenPackParamsSchema>;
