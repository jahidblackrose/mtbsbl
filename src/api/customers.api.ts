/**
 * Customers Page API Adapter
 * ============================
 * Customer search, onboarding, and detail retrieval.
 */

import { ENV } from "@/config/env";
import type { ApiResponse } from "@/types/api";
import { apiSuccess } from "@/types/api";

export interface CustomerSummary {
  id: string;
  name: string;
  nid: string;
  mobile: string;
  businessName: string;
  branch: string;
}

// ─── Mock Data ──────────────────────────────────────────
const MOCK_CUSTOMERS: CustomerSummary[] = [
  { id: "C-001", name: "Abdul Rahman", nid: "1234567890", mobile: "01711000001", businessName: "Rahman Traders", branch: "Gulshan" },
  { id: "C-002", name: "Jahangir Alam", nid: "1234567891", mobile: "01711000002", businessName: "Alam Garments", branch: "Motijheel" },
  { id: "C-003", name: "Md. Hasan", nid: "1234567892", mobile: "01711000003", businessName: "Hasan Enterprise", branch: "Gulshan" },
];

// ─── API Functions ──────────────────────────────────────

export async function fetchCustomers(): Promise<ApiResponse<CustomerSummary[]>> {
  if (ENV.MODE === "MOCK") {
    return apiSuccess(MOCK_CUSTOMERS);
  }

  const token = localStorage.getItem("mtb_token");
  const res = await fetch(`${ENV.API_BASE_URL}/api/customers`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

export async function searchCustomer(query: string): Promise<ApiResponse<CustomerSummary[]>> {
  if (ENV.MODE === "MOCK") {
    const results = MOCK_CUSTOMERS.filter(
      (c) =>
        c.name.toLowerCase().includes(query.toLowerCase()) ||
        c.nid.includes(query) ||
        c.mobile.includes(query)
    );
    return apiSuccess(results);
  }

  const token = localStorage.getItem("mtb_token");
  const res = await fetch(`${ENV.API_BASE_URL}/api/customers/search?query=${encodeURIComponent(query)}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}
