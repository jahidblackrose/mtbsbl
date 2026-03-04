/**
 * Queries Page API Adapter
 * ==========================
 */

import { ENV } from "@/config/env";
import type { ApiResponse } from "@/types/api";
import { apiSuccess } from "@/types/api";

export interface Query {
  id: string;
  applicationId: string;
  subject: string;
  status: "open" | "pending" | "resolved";
  createdAt: string;
}

const MOCK_QUERIES: Query[] = [
  { id: "Q-001", applicationId: "APP-2024-004", subject: "Missing trade license for guarantor", status: "open", createdAt: "2024-12-07" },
];

export async function fetchQueries(): Promise<ApiResponse<Query[]>> {
  if (ENV.MODE === "MOCK") return apiSuccess(MOCK_QUERIES);
  const token = localStorage.getItem("mtb_token");
  const res = await fetch(`${ENV.API_BASE_URL}/api/queries`, { headers: { Authorization: `Bearer ${token}` } });
  return res.json();
}
