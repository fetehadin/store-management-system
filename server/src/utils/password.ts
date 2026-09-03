import bcrypt from "bcryptjs";

const SALT_ROUNDS = 10; // Match your seed salt rounds

/**
 * Hashes a plaintext password or PIN using bcryptjs.
 */
export const hashPassword = async (plaintext: string): Promise<string> => {
  return bcrypt.hash(plaintext, SALT_ROUNDS);
};

/**
 * Safely compares a plaintext login attempt against the stored database bcrypt hash.
 */
export const comparePassword = async (
  plaintext: string,
  hash: string
): Promise<boolean> => {
  return bcrypt.compare(plaintext, hash);
};