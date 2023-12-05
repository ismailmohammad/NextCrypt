import { z } from "zod";

export const registerFormSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8),
    confirm: z.string().min(8),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords entered do not match",
    path: ["confirm"],
  });

export const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const emailSchema = z.string().email();
