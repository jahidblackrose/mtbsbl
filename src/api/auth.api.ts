/**
 * Auth API Adapter
 * =================
 * Handles login, logout, token refresh.
 * MOCK mode: returns demo users.
 * REAL mode: calls backend via API_BASE_URL.
 */

import { ENV } from "@/config/env";
import type { ApiResponse } from "@/types/api";
import { apiSuccess, apiError } from "@/types/api";
import type { User, LoginRequest, LoginResponse } from "@/types/auth";

// ─── Mock Data ──────────────────────────────────────────
const MOCK_USERS: Record<string, User> = {
  "rm@mtb.com": { id: "1", name: "Karim Ahmed", email: "rm@mtb.com", role: "branch_rm", branch: "Gulshan" },
  "cib@mtb.com": { id: "2", name: "Nadia Islam", email: "cib@mtb.com", role: "cib" },
  "uw@mtb.com": { id: "3", name: "Rafiq Hasan", email: "uw@mtb.com", role: "underwriting" },
  "cad@mtb.com": { id: "4", name: "Sadia Rahman", email: "cad@mtb.com", role: "cad" },
  "mgl@mtb.com": { id: "5", name: "Tanvir Alam", email: "mgl@mtb.com", role: "mgl" },
  "div@mtb.com": { id: "6", name: "Farhana Begum", email: "div@mtb.com", role: "sme_division" },
  "admin@mtb.com": { id: "7", name: "System Admin", email: "admin@mtb.com", role: "admin" },
};

// ─── API Functions ──────────────────────────────────────

export async function loginUser(request: LoginRequest): Promise<ApiResponse<LoginResponse>> {
  if (ENV.MODE === "MOCK") {
    const user = MOCK_USERS[request.email.toLowerCase()];
    if (!user) {
      return apiError("Invalid email or password.", 401);
    }
    return apiSuccess<LoginResponse>({
      token: "mock-jwt-token",
      refreshToken: "mock-refresh-token",
      user,
    }, "Login successful.");
  }

  // REAL mode
  const res = await fetch(`${ENV.API_BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  });
  return res.json();
}

export async function logoutUser(): Promise<ApiResponse> {
  if (ENV.MODE === "MOCK") {
    return apiSuccess(undefined, "Logged out.");
  }

  const token = localStorage.getItem("mtb_token");
  const res = await fetch(`${ENV.API_BASE_URL}/api/auth/logout`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

export async function refreshToken(): Promise<ApiResponse<{ token: string }>> {
  if (ENV.MODE === "MOCK") {
    return apiSuccess({ token: "mock-jwt-token-refreshed" });
  }

  const rt = localStorage.getItem("mtb_refresh_token");
  const res = await fetch(`${ENV.API_BASE_URL}/api/auth/refresh`, {
    method: "POST",
    headers: { Authorization: `Bearer ${rt}` },
  });
  return res.json();
}
