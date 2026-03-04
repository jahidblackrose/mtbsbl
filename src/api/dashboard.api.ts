/**
 * Dashboard Page API Adapter
 * ============================
 * Provides KPIs, recent applications, and pending tasks.
 */

import { ENV } from "@/config/env";
import type { ApiResponse } from "@/types/api";
import { apiSuccess } from "@/types/api";
import type { DashboardData } from "@/types/dashboard";

// ─── Mock Data ──────────────────────────────────────────
const MOCK_DASHBOARD: DashboardData = {
  kpis: {
    totalApplications: 128,
    pendingReview: 23,
    approved: 45,
    avgTatDays: "4.2",
  },
  recentApplications: [
    { id: "APP-2024-001", customer: "Rahman Traders", type: "SBL", amount: "৳25,00,000", status: "under_review", date: "2024-12-10" },
    { id: "APP-2024-002", customer: "Alam Garments", type: "SBL Plus", amount: "৳50,00,000", status: "cib_pending", date: "2024-12-09" },
    { id: "APP-2024-003", customer: "Hasan Enterprise", type: "Top-up", amount: "৳10,00,000", status: "approved", date: "2024-12-08" },
    { id: "APP-2024-004", customer: "Karim Motors", type: "SBL", amount: "৳35,00,000", status: "query_raised", date: "2024-12-07" },
    { id: "APP-2024-005", customer: "Fatima Foods", type: "SBL Plus", amount: "৳40,00,000", status: "sanction_generated", date: "2024-12-06" },
  ],
  pendingTasks: [
    { title: "CIB report upload pending for APP-2024-002", priority: "high", time: "2h ago" },
    { title: "Query response needed for APP-2024-004", priority: "medium", time: "5h ago" },
    { title: "Document review: Charge docs for APP-2024-005", priority: "low", time: "1d ago" },
    { title: "Sanction letter approval for APP-2024-003", priority: "medium", time: "1d ago" },
  ],
};

// ─── API Functions ──────────────────────────────────────

export async function fetchDashboardData(): Promise<ApiResponse<DashboardData>> {
  if (ENV.MODE === "MOCK") {
    return apiSuccess(MOCK_DASHBOARD);
  }

  const token = localStorage.getItem("mtb_token");
  const res = await fetch(`${ENV.API_BASE_URL}/api/dashboard`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}
