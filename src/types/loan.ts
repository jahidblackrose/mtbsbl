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

export interface LoanApplication {
  id: string;
  customerId: string;
  customerName: string;
  loanType: LoanType;
  amount: number;
  tenure: number;
  status: LoanStatus;
  branch: string;
  createdAt: string;
  updatedAt: string;
  rmName: string;
}
