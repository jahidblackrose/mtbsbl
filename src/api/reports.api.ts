/**
 * Reports Page API Adapter
 * ==========================
 */

import { ENV } from "@/config/env";
import type { ApiResponse } from "@/types/api";
import { apiSuccess } from "@/types/api";

export async function fetchReportData(reportType: string): Promise<ApiResponse<unknown>> {
  if (ENV.MODE === "MOCK") return apiSuccess({ reportType, data: [] });
  const token = localStorage.getItem("mtb_token");
  const res = await fetch(`${ENV.API_BASE_URL}/api/reports/${reportType}`, { headers: { Authorization: `Bearer ${token}` } });
  return res.json();
}
