import { z } from "zod";

const PasswordSchema = z
  .string()
  .min(10, "Password must be at least 10 characters")
  .refine((value) => Buffer.byteLength(value, "utf8") <= 72, {
    message: "Password can't be longer than 72 bytes",
  });

const UsernameSchema = z
  .string()
  .trim()
  .min(3, "Username must be at least 3 characters")
  .max(20, "Username can't be longer than 20 characters")
  .regex(
    /^[a-zA-Z0-9_]+$/,
    "Username can only contain letters, numbers, and underscores",
  );

const EmailSchema = z
  .email("Must be a valid email address")
  .trim()
  .min(1)
  .max(254, "Email can't be longer than 254 characters")
  .toLowerCase();

export const RegisterSchema = z.object({
  firstname: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name can't be longer than 50 characters"),
  lastname: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name can't be longer than 50 characters"),
  email: EmailSchema,
  username: UsernameSchema,
  password: PasswordSchema,
});

export const LoginSchema = z.object({
  email: EmailSchema,
  password: z.string().min(1, "Password is required"),
});

export type RegisterInput = z.infer<typeof RegisterSchema>;
export type LoginInput = z.infer<typeof LoginSchema>;
