/**
 * Authentication & User Role Types
 * ==================================
 * All auth-related data models live here.
 * Money/amounts are represented as STRING per fintech standards.
 */

export type UserRole =
  | "branch_rm"
  | "cib"
  | "underwriting"
  | "cad"
  | "mgl"
  | "sme_division"
  | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  branch?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  refreshToken: string;
  user: User;
}

export const ROLE_LABELS: Record<UserRole, string> = {
  branch_rm: "Branch SME RM",
  cib: "CIB Department",
  underwriting: "SME Underwriting",
  cad: "CAD",
  mgl: "MGL (Legal)",
  sme_division: "SME & Agri Division",
  admin: "System Admin",
};
