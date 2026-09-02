import { z } from "zod";
import { Role } from "../generated/client/index.js";

export const registerSchema = z.object({
  fullName: z
    .string()
    .min(3, "Full name must be at least 3 characters")
    .max(100),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(50),
  password: z
    .string()
    .min(4, "Password or PIN must be at least 4 characters long"),
  role: z.nativeEnum(Role).optional().default(Role.SALES_REP),
  creditLimit: z.number().nonnegative().optional().default(0),
});

export const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;