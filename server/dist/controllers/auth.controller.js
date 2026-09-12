"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAvatar = exports.getMe = exports.updatePin = exports.loginUser = exports.registerUser = void 0;
const db_js_1 = require("../config/db.js");
const password_js_1 = require("../utils/password.js");
const jwt_js_1 = require("../utils/jwt.js");
const errors_js_1 = require("../utils/errors.js");
const auth_validation_js_1 = require("../validations/auth.validation.js");
const decimal_js_1 = require("../utils/decimal.js");
/**
 * @route   POST /api/v1/auth/register
 * @desc    Register a new Sales Rep or Admin user
 * @access  Public (for initial setup)
 */
const registerUser = async (req, res, next) => {
    try {
        const validated = auth_validation_js_1.registerSchema.parse(req.body);
        const existingUser = await db_js_1.db.user.findUnique({
            where: { username: validated.username },
        });
        if (existingUser) {
            throw new errors_js_1.ConflictError("A user with this username is already registered");
        }
        const passwordHash = await (0, password_js_1.hashPassword)(validated.password);
        const user = await db_js_1.db.user.create({
            data: {
                fullName: validated.fullName,
                username: validated.username,
                passwordHash,
                role: validated.role,
                requiresPasswordChange: false,
                isActive: true,
                creditLimit: (0, decimal_js_1.toDecimal)(validated.creditLimit),
                creditBalance: (0, decimal_js_1.toDecimal)(0),
            },
        });
        const token = (0, jwt_js_1.signToken)({ userId: user.id, role: user.role });
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
                    creditLimit: (0, decimal_js_1.formatETB)(user.creditLimit),
                    creditBalance: (0, decimal_js_1.formatETB)(user.creditBalance),
                    createdAt: user.createdAt,
                },
            },
        });
    }
    catch (err) {
        next(err);
    }
};
exports.registerUser = registerUser;
/**
 * @route   POST /api/v1/auth/login
 * @desc    Authenticate user via username and password
 * @access  Public
 */
const loginUser = async (req, res, next) => {
    try {
        const validated = auth_validation_js_1.loginSchema.parse(req.body);
        const user = await db_js_1.db.user.findUnique({
            where: { username: validated.username },
        });
        if (!user) {
            throw new errors_js_1.UnauthorizedError("Invalid username or password");
        }
        // Security Kill-Switch Trap
        if (!user.isActive) {
            throw new errors_js_1.UnauthorizedError("This account has been disabled by an administrator.");
        }
        const isPasswordValid = await (0, password_js_1.comparePassword)(validated.password, user.passwordHash);
        if (!isPasswordValid) {
            throw new errors_js_1.UnauthorizedError("Invalid username or password");
        }
        const token = (0, jwt_js_1.signToken)({ userId: user.id, role: user.role });
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
                    creditLimit: (0, decimal_js_1.formatETB)(user.creditLimit),
                    creditBalance: (0, decimal_js_1.formatETB)(user.creditBalance),
                    profilePic: user.profilePic,
                },
            },
        });
    }
    catch (err) {
        next(err);
    }
};
exports.loginUser = loginUser;
/**
 * @route   POST /api/v1/auth/update-pin
 * @desc    Force users to reset their default PIN on first login
 * @access  Protected
 */
const updatePin = async (req, res, next) => {
    try {
        if (!req.user)
            throw new errors_js_1.UnauthorizedError("User not authenticated");
        const { newPin } = req.body;
        if (!newPin || newPin.length < 6) {
            throw new errors_js_1.BadRequestError("New PIN must be at least 6 characters");
        }
        const passwordHash = await (0, password_js_1.hashPassword)(newPin);
        await db_js_1.db.user.update({
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
    }
    catch (err) {
        next(err);
    }
};
exports.updatePin = updatePin;
const getMe = async (req, res, next) => {
    try {
        const user = await db_js_1.db.user.findUnique({
            where: { id: req.user.id },
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
    }
    catch (error) {
        next(error);
    }
};
exports.getMe = getMe;
const updateAvatar = async (req, res, next) => {
    try {
        if (!req.file) {
            res.status(400).json({ status: 'fail', message: 'No image file provided.' });
            return;
        }
        // Generate the public URL path
        const avatarUrl = `/uploads/avatars/${req.file.filename}`;
        // Update the database for the authenticated user
        const updatedUser = await db_js_1.db.user.update({
            where: { id: req.user?.id },
            data: { profilePic: avatarUrl }
        });
        res.status(200).json({
            status: 'success',
            data: { profilePic: updatedUser.profilePic }
        });
    }
    catch (err) {
        next(err);
    }
};
exports.updateAvatar = updateAvatar;
