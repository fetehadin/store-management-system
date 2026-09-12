import { Request, Response, NextFunction } from "express";
import { db } from "../config/db.js";
import { hashPassword, comparePassword } from "../utils/password.js";
import { signToken } from "../utils/jwt.js";
import { ConflictError, UnauthorizedError, BadRequestError } from "../utils/errors.js";
import { registerSchema, loginSchema } from "../validations/auth.validation.js";
import { formatETB, toDecimal } from "../utils/decimal.js";

/**
 * @route   POST /api/v1/auth/register
 * @desc    Register a new Sales Rep or Admin user
 * @access  Public (for initial setup)
 */
export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const validated = registerSchema.parse(req.body);

    const existingUser = await db.user.findUnique({
      where: { username: validated.username },
    });

    if (existingUser) {
      throw new ConflictError("A user with this username is already registered");
    }

    const passwordHash = await hashPassword(validated.password);

    const user = await db.user.create({
      data: {
        fullName: validated.fullName,
        username: validated.username,
        passwordHash,
        role: validated.role,
        requiresPasswordChange: false,
        isActive: true,
        creditLimit: toDecimal(validated.creditLimit),
        creditBalance: toDecimal(0),
      },
    });

    const token = signToken({ userId: user.id, role: user.role });

    res.status(201).json({
      status: "success",
      message: "User registered successfully",
      token,
      data: {
        user: {
          id: user.id,
          fullName: user.fullName,
          username: user.username,
          role: user.role,
          isActive: user.isActive,
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
 * @desc    Authenticate user via username and password
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
      where: { username: validated.username },
    });

    if (!user) {
      throw new UnauthorizedError("Invalid username or password");
    }

    // Security Kill-Switch Trap
    if (!user.isActive) {
      throw new UnauthorizedError("This account has been disabled by an administrator.");
    }

    const isPasswordValid = await comparePassword(validated.password, user.passwordHash);

    if (!isPasswordValid) {
      throw new UnauthorizedError("Invalid username or password");
    }

    const token = signToken({ userId: user.id, role: user.role });

    res.status(200).json({
      status: "success",
      message: "Login successful",
      token,
      data: {
        user: {
          id: user.id,
          fullName: user.fullName,
          username: user.username,
          role: user.role,
          requiresPasswordChange: user.requiresPasswordChange,
          creditLimit: formatETB(user.creditLimit),
          creditBalance: formatETB(user.creditBalance),
          profilePic: user.profilePic,
        },
      },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @route   POST /api/v1/auth/update-pin
 * @desc    Force users to reset their default PIN on first login
 * @access  Protected
 */
export const updatePin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user) throw new UnauthorizedError("User not authenticated");

    const { newPin } = req.body;
    if (!newPin || newPin.length < 6) {
      throw new BadRequestError("New PIN must be at least 6 characters");
    }

    const passwordHash = await hashPassword(newPin);

    await db.user.update({
      where: { id: req.user.id },
      data: { 
        passwordHash,
        requiresPasswordChange: false 
      },
    });

    res.status(200).json({
      status: "success",
      message: "PIN updated successfully. You can now access the system.",
    });
  } catch (err) {
    next(err);
  }
};

export const getMe = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = await db.user.findUnique({
      where: { id: req.user!.id },
      select: {
        id: true,
        fullName: true,
        username: true,
        role: true,
        profilePic: true,
        creditLimit: true,
        creditBalance: true,
        isActive: true,
      },
    });

    if (!user) {
      res.status(404).json({ status: "error", message: "User not found" });
      return;
    }

    res.status(200).json({ status: "success", data: user });
  } catch (error) {
    next(error);
  }
};

export const updateAvatar = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ status: 'fail', message: 'No image file provided.' });
      return;
    }

    // Generate the public URL path
    const avatarUrl = `/uploads/avatars/${req.file.filename}`;

    // Update the database for the authenticated user
    const updatedUser = await db.user.update({
      where: { id: req.user?.id },
      data: { profilePic: avatarUrl }
    });

    res.status(200).json({
      status: 'success',
      data: { profilePic: updatedUser.profilePic }
    });
  } catch (err) {
    next(err);
  }
};

