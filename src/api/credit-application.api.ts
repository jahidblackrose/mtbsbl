/**
 * Credit Application API Adapter
 * Page: /applications/new (RM Memo for SBL)
 *
 * Standard Response Contract: { status, message, data? }
 * MOCK mode: uses localStorage for draft persistence.
 */
import type { ApiResponse } from "@/types/api";
import type { CreditApplication } from "@/types/credit-application";
import { createSampleApplication } from "@/types/credit-application";
import { ENV } from "@/config/env";

const DRAFT_STORAGE_KEY = "sbl_credit_app_draft";

/** Save draft to backend (or localStorage in MOCK mode) */
export async function saveDraft(
  data: CreditApplication
): Promise<ApiResponse<{ draftId: string }>> {
  if (ENV.MODE === "MOCK") {
    await new Promise((r) => setTimeout(r, 400));
    localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(data));
    return { status: 200, message: "Draft saved successfully.", data: { draftId: "DRAFT-LOCAL" } };
  }
  // REAL mode: POST to backend
  const res = await fetch(`${ENV.API_BASE_URL}/api/v1/credit-applications/draft`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include",
  });
  return res.json();
}

/** Load draft from backend (or localStorage in MOCK mode) */
export async function loadDraft(): Promise<ApiResponse<CreditApplication>> {
  if (ENV.MODE === "MOCK") {
    await new Promise((r) => setTimeout(r, 300));
    const raw = localStorage.getItem(DRAFT_STORAGE_KEY);
    if (raw) {
      return { status: 200, message: "Draft loaded.", data: JSON.parse(raw) };
    }
    return { status: 404, message: "No saved draft found." };
  }
  const res = await fetch(`${ENV.API_BASE_URL}/api/v1/credit-applications/draft`, {
    credentials: "include",
  });
  return res.json();
}

/** Submit final application */
export async function submitCreditApplication(
  data: CreditApplication
): Promise<ApiResponse<{ applicationId: string }>> {
  if (ENV.MODE === "MOCK") {
    await new Promise((r) => setTimeout(r, 800));
    localStorage.removeItem(DRAFT_STORAGE_KEY);
    const id = `APP-${Date.now().toString(36).toUpperCase()}`;
    return { status: 200, message: "Application submitted successfully.", data: { applicationId: id } };
  }
  const res = await fetch(`${ENV.API_BASE_URL}/api/v1/credit-applications`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include",
  });
  return res.json();
}

/** Load sample/demo data for testing */
export async function loadSampleData(): Promise<ApiResponse<CreditApplication>> {
  await new Promise((r) => setTimeout(r, 200));
  return { status: 200, message: "Sample data loaded.", data: createSampleApplication() };
}
