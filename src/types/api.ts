/**
 * Standard API Response Contract
 * ===============================
 * ALL API adapter functions MUST return this shape.
 *
 * Rules:
 * - status === 200 → SUCCESS
 * - status !== 200 → ERROR (data MUST be undefined)
 * - UI displays `message` directly — never transforms it
 * - `status` is BUSINESS status, not HTTP status
 */
export interface ApiResponse<T = undefined> {
  status: number;
  message: string;
  data?: T;
}

/** Helper to create a success response */
export function apiSuccess<T>(data: T, message = "Success"): ApiResponse<T> {
  return { status: 200, message, data };
}

/** Helper to create an error response */
export function apiError(message: string, status = 400): ApiResponse<never> {
  return { status, message };
}
