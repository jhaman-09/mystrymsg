import { z } from "zod";

export const signInSchema = z.object({
  identifier: z.string().min(1, "Email/Username is required"), // identifier = email
  password: z.string().min(6, "Password must be at least 6 characters"),
});
