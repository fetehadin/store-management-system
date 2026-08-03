import { Request, Response, NextFunction } from "express";
import { db } from "../config/db.js";
import { hashPassword, comparePassword } from "../utils/password.js";
import { signToken } from "../utils/jwt.js";
import { ConflictError, UnauthorizedError } from "../utils/errors.js";
import { registerSchema, loginSchema } from "../validations/auth.validation.js";
import { formatETB, toDecimal } from "../utils/decimal.js";

/**
 * @route   POST /api/v1/auth/register
 * @desc    Register a new Sales Rep or Admin user
 * @access  Public (for initial setup; in prod, can be wrapped with ADMIN authorize guard)
 */
export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const validated = registerSchema.parse(req.body);

    // 1. Check if Ethiopian phone is already registered
    const existingUser = await db.user.findUnique({
      where: { phone: validated.phone },
    });

    if (existingUser) {
      throw new ConflictError("A user with this phone number is already registered");
    }

    // 2. Hash password securely
    const passwordHash = await hashPassword(validated.password);

    // 3. Create user in PostgreSQL with strict Decimal ETB credit limit
    const user = await db.user.create({
      data: {
        fullName: validated.fullName,
        phone: validated.phone,
        passwordHash,
        role: validated.role,
        creditLimit: toDecimal(validated.creditLimit),
        creditBalance: toDecimal(0),
      },
    });

    // 4. Sign JWT
    const token = signToken({
      userId: user.id,
      role: user.role,
    });

    res.status(201).json({
      status: "success",
      message: "User registered successfully",
      token,
      data: {
        user: {
          id: user.id,
          fullName: user.fullName,
          phone: user.phone,
          role: user.role,
          creditLimit: formatETB(user.creditLimit),
          creditBalance: formatETB(user.creditBalance),
          createdAt: user.createdAt,
        },
      },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @route   POST /api/v1/auth/login
 * @desc    Authenticate user via phone and password
 * @access  Public
 */
export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const validated = loginSchema.parse(req.body);

    const user = await db.user.findUnique({
      where: { phone: validated.phone },
    });

    if (!user) {
      throw new UnauthorizedError("Invalid phone number or password");
    }

    const isPasswordValid = await comparePassword(
      validated.password,
      user.passwordHash
    );

    if (!isPasswordValid) {
      throw new UnauthorizedError("Invalid phone number or password");
    }

    const token = signToken({
      userId: user.id,
      role: user.role,
    });

    res.status(200).json({
      status: "success",
      message: "Login successful",
      token,
      data: {
        user: {
          id: user.id,
          fullName: user.fullName,
          phone: user.phone,
          role: user.role,
          creditLimit: formatETB(user.creditLimit),
          creditBalance: formatETB(user.creditBalance),
        },
      },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @route   GET /api/v1/auth/me
 * @desc    Get currently authenticated user's profile and live ETB balances
 * @access  Protected (Requires Bearer Token)
 */
export const getMe = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user) {
      throw new UnauthorizedError("User not authenticated");
    }

    res.status(200).json({
      status: "success",
      data: {
        user: {
          id: req.user.id,
          fullName: req.user.fullName,
          phone: req.user.phone,
          role: req.user.role,
          creditLimit: formatETB(req.user.creditLimit),
          creditBalance: formatETB(req.user.creditBalance),
          createdAt: req.user.createdAt,
        },
      },
    });
  } catch (err) {
    next(err);
  }
};