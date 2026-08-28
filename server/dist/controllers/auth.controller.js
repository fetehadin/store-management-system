"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMe = exports.loginUser = exports.registerUser = void 0;
const db_js_1 = require("../config/db.js");
const password_js_1 = require("../utils/password.js");
const jwt_js_1 = require("../utils/jwt.js");
const errors_js_1 = require("../utils/errors.js");
const auth_validation_js_1 = require("../validations/auth.validation.js");
const decimal_js_1 = require("../utils/decimal.js");
/**
 * @route   POST /api/v1/auth/register
 * @desc    Register a new Sales Rep or Admin user
 * @access  Public (for initial setup; in prod, can be wrapped with ADMIN authorize guard)
 */
const registerUser = async (req, res, next) => {
    try {
        const validated = auth_validation_js_1.registerSchema.parse(req.body);
        // 1. Check if Ethiopian phone is already registered
        const existingUser = await db_js_1.db.user.findUnique({
            where: { phone: validated.phone },
        });
        if (existingUser) {
            throw new errors_js_1.ConflictError("A user with this phone number is already registered");
        }
        // 2. Hash password securely
        const passwordHash = await (0, password_js_1.hashPassword)(validated.password);
        // 3. Create user in PostgreSQL with strict Decimal ETB credit limit
        const user = await db_js_1.db.user.create({
            data: {
                fullName: validated.fullName,
                phone: validated.phone,
                passwordHash,
                role: validated.role,
                creditLimit: (0, decimal_js_1.toDecimal)(validated.creditLimit),
                creditBalance: (0, decimal_js_1.toDecimal)(0),
            },
        });
        // 4. Sign JWT
        const token = (0, jwt_js_1.signToken)({
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
 * @desc    Authenticate user via phone and password
 * @access  Public
 */
const loginUser = async (req, res, next) => {
    try {
        const validated = auth_validation_js_1.loginSchema.parse(req.body);
        const user = await db_js_1.db.user.findUnique({
            where: { phone: validated.phone },
        });
        if (!user) {
            throw new errors_js_1.UnauthorizedError("Invalid phone number or password");
        }
        const isPasswordValid = await (0, password_js_1.comparePassword)(validated.password, user.passwordHash);
        if (!isPasswordValid) {
            throw new errors_js_1.UnauthorizedError("Invalid phone number or password");
        }
        const token = (0, jwt_js_1.signToken)({
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
                    creditLimit: (0, decimal_js_1.formatETB)(user.creditLimit),
                    creditBalance: (0, decimal_js_1.formatETB)(user.creditBalance),
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
 * @route   GET /api/v1/auth/me
 * @desc    Get currently authenticated user's profile and live ETB balances
 * @access  Protected (Requires Bearer Token)
 */
const getMe = async (req, res, next) => {
    try {
        if (!req.user) {
            throw new errors_js_1.UnauthorizedError("User not authenticated");
        }
        res.status(200).json({
            status: "success",
            data: {
                user: {
                    id: req.user.id,
                    fullName: req.user.fullName,
                    phone: req.user.phone,
                    role: req.user.role,
                    creditLimit: (0, decimal_js_1.formatETB)(req.user.creditLimit),
                    creditBalance: (0, decimal_js_1.formatETB)(req.user.creditBalance),
                    createdAt: req.user.createdAt,
                },
            },
        });
    }
    catch (err) {
        next(err);
    }
};
exports.getMe = getMe;
