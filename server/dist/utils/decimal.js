"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Decimal = exports.addETB = exports.formatETB = exports.toDecimal = void 0;
const decimal_js_1 = __importDefault(require("decimal.js"));
exports.Decimal = decimal_js_1.default;
// Configure strict financial precision for ETB currency
decimal_js_1.default.set({
    precision: 20,
    rounding: decimal_js_1.default.ROUND_HALF_UP,
});
/**
 * Safely converts string, number, or Decimal into an arbitrary-precision Decimal instance.
 */
const toDecimal = (value) => {
    return new decimal_js_1.default(value);
};
exports.toDecimal = toDecimal;
/**
 * Formats a Decimal balance to a standard 2-decimal ETB string representation (e.g., "1500.50")
 * for database persistence or API payloads.
 */
const formatETB = (value) => {
    const dec = new decimal_js_1.default(value);
    return dec.toFixed(2);
};
exports.formatETB = formatETB;
/**
 * Helper to safely add multiple ETB amounts without floating-point drift.
 */
const addETB = (...values) => {
    return values.reduce((acc, val) => acc.plus(new decimal_js_1.default(val)), new decimal_js_1.default(0));
};
exports.addETB = addETB;
