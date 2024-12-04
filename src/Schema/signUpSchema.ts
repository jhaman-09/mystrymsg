import { z } from "zod";

export const usernameValidation = z
  .string()
  .min(2, "username mush be 2 charactors")
  .max(20, "username must not contain more than 20 charactors")
  .regex(/^[a-zA-z0-9_]+$/, "Username must not contain special charactor");

export const signUpSchema = z.object({
  username: usernameValidation,
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "password must be atleast 6 charactors" }),
});
