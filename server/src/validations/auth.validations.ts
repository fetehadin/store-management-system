import { z } from "zod";
import { Role } from "../generated/client/index.js";

// Regex matching valid Ethio Telecom (09/2519) and Safaricom Ethiopia (07/2517) numbers
const ETHIOPIAN_PHONE_REGEX = /^(?:\+251|0)[79]\d{8}$/;

export const registerSchema = z.object({
  fullName: z
    .string()
    .min(3, "Full name must be at least 3 characters")
    .max(100),
  phone: z
    .string()
    .regex(
      ETHIOPIAN_PHONE_REGEX,
      "Invalid Ethiopian phone number format (e.g., 0911223344 or +251911223344)"
    ),
  password: z
    .string()
    .min(6, "Password or PIN must be at least 6 characters long"),
  role: z.nativeEnum(Role).optional().default(Role.SALES_REP),
  creditLimit: z.number().nonnegative().optional().default(0),
});

export const loginSchema = z.object({
  phone: z
    .string()
    .regex(ETHIOPIAN_PHONE_REGEX, "Invalid Ethiopian phone number format"),
  password: z.string().min(1, "Password is required"),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;