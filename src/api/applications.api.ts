/**
 * Applications Page API Adapter
 * ===============================
 * Handles listing, detail, and creation of loan applications.
 */

import { ENV } from "@/config/env";
import type { ApiResponse } from "@/types/api";
import { apiSuccess, apiError } from "@/types/api";
import type {
  LoanApplicationSummary,
  LoanApplicationDetail,
  CreateLoanApplicationRequest,
} from "@/types/loan";

// ─── Mock Data ──────────────────────────────────────────
const MOCK_APPS: LoanApplicationSummary[] = [
  { id: "APP-2024-001", customerName: "Rahman Traders", loanType: "SBL", amount: "৳25,00,000", status: "under_review", branch: "Gulshan", rmName: "Karim Ahmed", date: "2024-12-10" },
  { id: "APP-2024-002", customerName: "Alam Garments", loanType: "SBL_PLUS", amount: "৳50,00,000", status: "cib_pending", branch: "Motijheel", rmName: "Karim Ahmed", date: "2024-12-09" },
  { id: "APP-2024-003", customerName: "Hasan Enterprise", loanType: "TOP_UP", amount: "৳10,00,000", status: "approved", branch: "Gulshan", rmName: "Rafiq Hasan", date: "2024-12-08" },
  { id: "APP-2024-004", customerName: "Karim Motors", loanType: "SBL", amount: "৳35,00,000", status: "query_raised", branch: "Dhanmondi", rmName: "Karim Ahmed", date: "2024-12-07" },
  { id: "APP-2024-005", customerName: "Fatima Foods", loanType: "SBL_PLUS", amount: "৳40,00,000", status: "sanction_generated", branch: "Gulshan", rmName: "Rafiq Hasan", date: "2024-12-06" },
  { id: "APP-2024-006", customerName: "Noor Textiles", loanType: "SBL", amount: "৳15,00,000", status: "disbursed", branch: "Chittagong", rmName: "Karim Ahmed", date: "2024-12-05" },
  { id: "APP-2024-007", customerName: "Star Electronics", loanType: "TOP_UP", amount: "৳8,00,000", status: "draft", branch: "Gulshan", rmName: "Karim Ahmed", date: "2024-12-04" },
];

const MOCK_DETAILS: Record<string, LoanApplicationDetail> = {
  "APP-2024-001": {
    id: "APP-2024-001",
    customerName: "Rahman Traders",
    loanType: "SBL",
    amount: "৳25,00,000",
    tenure: "36 months",
    purpose: "Working capital for garment business expansion",
    status: "under_review",
    branch: "Gulshan",
    rmName: "Karim Ahmed",
    createdAt: "2024-12-10",
    documents: [
      { name: "NID of Applicant", uploaded: true },
      { name: "Photograph of Applicant", uploaded: true },
      { name: "Trade Licenses (3 years)", uploaded: true },
      { name: "TIN with Return", uploaded: true },
      { name: "IT10B", uploaded: false },
      { name: "Bank Statements (1 year)", uploaded: true },
      { name: "Stock List with Value", uploaded: true },
      { name: "Guarantor NID", uploaded: true },
      { name: "Guarantor Trade License", uploaded: false },
      { name: "Fixed Assets List", uploaded: true },
    ],
  },
  "APP-2024-003": {
    id: "APP-2024-003",
    customerName: "Hasan Enterprise",
    loanType: "Top-up",
    amount: "৳10,00,000",
    tenure: "24 months",
    purpose: "Stock replenishment",
    status: "approved",
    branch: "Gulshan",
    rmName: "Rafiq Hasan",
    createdAt: "2024-12-08",
    documents: [
      { name: "Latest Trade Licenses", uploaded: true },
      { name: "Tax Certificates with Return", uploaded: true },
      { name: "IT10B", uploaded: true },
      { name: "Bank Statements (all banks)", uploaded: true },
      { name: "Photographs", uploaded: true },
    ],
  },
};

// ─── API Functions ──────────────────────────────────────

export async function fetchApplications(): Promise<ApiResponse<LoanApplicationSummary[]>> {
  if (ENV.MODE === "MOCK") {
    return apiSuccess(MOCK_APPS);
  }

  const token = localStorage.getItem("mtb_token");
  const res = await fetch(`${ENV.API_BASE_URL}/api/loan-applications`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

export async function fetchApplicationDetail(id: string): Promise<ApiResponse<LoanApplicationDetail>> {
  if (ENV.MODE === "MOCK") {
    const detail = MOCK_DETAILS[id];
    if (!detail) {
      return apiError("Application not found. Only APP-2024-001 and APP-2024-003 have detail views in this demo.", 404);
    }
    return apiSuccess(detail);
  }

  const token = localStorage.getItem("mtb_token");
  const res = await fetch(`${ENV.API_BASE_URL}/api/loan-applications/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

export async function createApplication(
  request: CreateLoanApplicationRequest
): Promise<ApiResponse<{ id: string }>> {
  if (ENV.MODE === "MOCK") {
    return apiSuccess(
      { id: `APP-2024-${String(Math.floor(Math.random() * 900) + 100)}` },
      `Loan application for ${request.customerName} has been submitted successfully.`
    );
  }

  const token = localStorage.getItem("mtb_token");
  const res = await fetch(`${ENV.API_BASE_URL}/api/loan-applications`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(request),
  });
  return res.json();
}
