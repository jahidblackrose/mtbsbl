/**
 * Underwriting Page API Adapter
 * ===============================
 */

import { ENV } from "@/config/env";
import type { ApiResponse } from "@/types/api";
import { apiSuccess } from "@/types/api";

export interface UnderwritingCase {
  id: string;
  applicationId: string;
  customerName: string;
  status: "pending" | "under_review" | "decided";
}

const MOCK_CASES: UnderwritingCase[] = [
  { id: "UW-001", applicationId: "APP-2024-001", customerName: "Rahman Traders", status: "under_review" },
];

export async function fetchUnderwritingCases(): Promise<ApiResponse<UnderwritingCase[]>> {
  if (ENV.MODE === "MOCK") return apiSuccess(MOCK_CASES);
  const token = localStorage.getItem("mtb_token");
  const res = await fetch(`${ENV.API_BASE_URL}/api/underwriting/pending`, { headers: { Authorization: `Bearer ${token}` } });
  return res.json();
}
