"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePassword = exports.hashPassword = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const SALT_ROUNDS = 12;
/**
 * Hashes a plaintext password or PIN using bcrypt with 12 salt rounds.
 */
const hashPassword = async (plaintext) => {
    return bcryptjs_1.default.hash(plaintext, SALT_ROUNDS);
};
exports.hashPassword = hashPassword;
/**
 * Safely compares a plaintext login attempt against the stored database bcrypt hash.
 */
const comparePassword = async (plaintext, hash) => {
    return bcryptjs_1.default.compare(plaintext, hash);
};
exports.comparePassword = comparePassword;
