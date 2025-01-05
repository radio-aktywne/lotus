import { z } from "zod";

export const searchParamsSchema = z.object({
  callbackUrl: z.string().optional(),
  error: z.string().optional(),
  prompt: z.enum(["account", "consent", "login", "none"]).optional(),
});
