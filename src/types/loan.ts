/**
 * Loan Application Data Models
 * ==============================
 * All loan-related DTOs and enumerations.
 * IMPORTANT: All monetary amounts are STRING (fintech compliance).
 */

export type LoanType = "SBL" | "SBL_PLUS" | "TOP_UP";

export type LoanStatus =
  | "draft"
  | "submitted"
  | "cib_pending"
  | "cib_completed"
  | "under_review"
  | "query_raised"
  | "query_resolved"
  | "approved"
  | "declined"
  | "sanction_generated"
  | "charge_docs_pending"
  | "charge_docs_submitted"
  | "limit_loaded"
  | "disbursed"
  | "closed";

export const LOAN_STATUS_LABELS: Record<LoanStatus, string> = {
  draft: "Draft",
  submitted: "Submitted",
  cib_pending: "CIB Pending",
  cib_completed: "CIB Completed",
  under_review: "Under Review",
  query_raised: "Query Raised",
  query_resolved: "Query Resolved",
  approved: "Approved",
  declined: "Declined",
  sanction_generated: "Sanction Generated",
  charge_docs_pending: "Charge Docs Pending",
  charge_docs_submitted: "Charge Docs Submitted",
  limit_loaded: "Limit Loaded",
  disbursed: "Disbursed",
  closed: "Closed",
};

export const LOAN_STATUS_VARIANT: Record<LoanStatus, string> = {
  draft: "secondary",
  submitted: "info",
  cib_pending: "warning",
  cib_completed: "info",
  under_review: "info",
  query_raised: "warning",
  query_resolved: "info",
  approved: "success",
  declined: "destructive",
  sanction_generated: "success",
  charge_docs_pending: "warning",
  charge_docs_submitted: "info",
  limit_loaded: "success",
  disbursed: "success",
  closed: "secondary",
};

export const LOAN_TYPE_LABELS: Record<LoanType, string> = {
  SBL: "SBL",
  SBL_PLUS: "SBL Plus",
  TOP_UP: "Top-up",
};

/** Summary row used in lists and tables */
export interface LoanApplicationSummary {
  id: string;
  customerName: string;
  loanType: LoanType;
  /** Formatted display amount, e.g. "৳25,00,000" */
  amount: string;
  status: LoanStatus;
  branch: string;
  rmName: string;
  date: string;
}

/** Full detail view of a single application */
export interface LoanApplicationDetail {
  id: string;
  customerName: string;
  loanType: string;
  /** Formatted display amount */
  amount: string;
  tenure: string;
  purpose: string;
  status: LoanStatus;
  branch: string;
  rmName: string;
  createdAt: string;
  documents: ApplicationDocument[];
}

export interface ApplicationDocument {
  name: string;
  uploaded: boolean;
}

/** Payload for creating a new loan application */
export interface CreateLoanApplicationRequest {
  loanType: LoanType;
  customerName: string;
  /** Raw numeric string, e.g. "2500000" */
  amount: string;
  /** Tenure in months as string */
  tenure: string;
  purpose: string;
  documentIds: string[];
}
