import Decimal from "decimal.js";

// Configure strict financial precision for ETB currency
Decimal.set({
  precision: 20,
  rounding: Decimal.ROUND_HALF_UP,
});

/**
 * Safely converts string, number, or Decimal into an arbitrary-precision Decimal instance.
 */
export const toDecimal = (value: string | number | Decimal): Decimal => {
  return new Decimal(value);
};

/**
 * Formats a Decimal balance to a standard 2-decimal ETB string representation (e.g., "1500.50")
 * for database persistence or API payloads.
 */
export const formatETB = (value: Decimal | string | number): string => {
  const dec = new Decimal(value);
  return dec.toFixed(2);
};

/**
 * Helper to safely add multiple ETB amounts without floating-point drift.
 */
export const addETB = (...values: (Decimal | string | number)[]): Decimal => {
  return values.reduce<Decimal>((acc, val) => acc.plus(new Decimal(val)), new Decimal(0));
};

export { Decimal };