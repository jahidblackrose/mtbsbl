/**
 * CIB Page API Adapter
 * ======================
 */

import { ENV } from "@/config/env";
import type { ApiResponse } from "@/types/api";
import { apiSuccess } from "@/types/api";

export interface CibRequest {
  id: string;
  applicationId: string;
  customerName: string;
  status: "pending" | "completed";
  requestedAt: string;
}

const MOCK_CIB: CibRequest[] = [
  { id: "CIB-001", applicationId: "APP-2024-002", customerName: "Alam Garments", status: "pending", requestedAt: "2024-12-09" },
];

export async function fetchCibRequests(): Promise<ApiResponse<CibRequest[]>> {
  if (ENV.MODE === "MOCK") return apiSuccess(MOCK_CIB);
  const token = localStorage.getItem("mtb_token");
  const res = await fetch(`${ENV.API_BASE_URL}/api/cib/requests`, { headers: { Authorization: `Bearer ${token}` } });
  return res.json();
}
