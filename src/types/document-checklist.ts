export interface DocumentItem {
  id: string;
  label: string;
  required: boolean;
  uploaded?: boolean;
  fileName?: string;
}

export const SBL_DOCUMENTS: DocumentItem[] = [
  { id: "nid_applicant", label: "NID of Applicant", required: true },
  { id: "photo_applicant", label: "Photograph of Applicant", required: true },
  { id: "trade_license_3yr", label: "Trade Licenses (3 years)", required: true },
  { id: "tin_return", label: "TIN with Return", required: true },
  { id: "it10b", label: "IT10B", required: true },
  { id: "rental_business", label: "Rental Agreement – Business Premise", required: true },
  { id: "rental_godown", label: "Rental Agreement – Godown", required: false },
  { id: "bank_statements", label: "Bank Statements (1 year)", required: true },
  { id: "loan_sanction_letters", label: "Loan Sanction Letters (if any)", required: false },
  { id: "loan_account_statements", label: "Loan Account Statements (if any)", required: false },
  { id: "spouse_nid", label: "Spouse NID & Photograph", required: false },
  { id: "guarantor_nid", label: "3rd Party Guarantor – NID", required: true },
  { id: "guarantor_trade_license", label: "3rd Party Guarantor – Trade License", required: true },
  { id: "guarantor_photo", label: "3rd Party Guarantor – Photograph", required: true },
  { id: "stock_list", label: "Stock List with Value", required: true },
  { id: "accounts_receivable", label: "Accounts Receivable List", required: true },
  { id: "accounts_payable", label: "Accounts Payable List", required: true },
  { id: "fixed_assets", label: "Fixed Assets List", required: true },
];

export const TOPUP_DOCUMENTS: DocumentItem[] = [
  { id: "trade_license_latest", label: "Latest Trade Licenses", required: true },
  { id: "tax_cert_return", label: "Tax Certificates with Return", required: true },
  { id: "it10b", label: "IT10B", required: true },
  { id: "rental_deed", label: "Rental Deed Copies", required: true },
  { id: "bank_statements_all", label: "Bank Statements (1 year, all banks)", required: true },
  { id: "other_bank_sanctions", label: "Other Bank Loan Sanctions", required: false },
  { id: "stock_list", label: "Stock / Receivable / Payable / Fixed Assets Lists", required: true },
  { id: "guarantor_sanction", label: "Guarantor Latest Sanction", required: true },
  { id: "photographs", label: "Photographs", required: true },
  { id: "other_docs", label: "Other Business-specific Documents", required: false },
];

export function getDocumentChecklist(loanType: string): DocumentItem[] {
  if (loanType === "TOP_UP") return TOPUP_DOCUMENTS.map((d) => ({ ...d }));
  return SBL_DOCUMENTS.map((d) => ({ ...d }));
}
