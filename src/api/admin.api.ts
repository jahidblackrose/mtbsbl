/**
 * Admin Page API Adapter
 * ========================
 */

import { ENV } from "@/config/env";
import type { ApiResponse } from "@/types/api";
import { apiSuccess } from "@/types/api";

export async function fetchUsers(): Promise<ApiResponse<unknown[]>> {
  if (ENV.MODE === "MOCK") return apiSuccess([]);
  const token = localStorage.getItem("mtb_token");
  const res = await fetch(`${ENV.API_BASE_URL}/api/admin/users`, { headers: { Authorization: `Bearer ${token}` } });
  return res.json();
}
