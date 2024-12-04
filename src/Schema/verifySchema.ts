import { z } from "zod";

export const varifySchema = z.object({
  code: z.string().length(6, "Verification code mush be 6 digits"),
});
