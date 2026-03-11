/**
 * SME Credit Application (RM Memo for SBL) — Data Models
 * All monetary amounts are STRING type for fintech compliance.
 */

/* ─── Step 1: Key Summary ─── */
export interface KeySummaryData {
  memoDate: string;
  branchName: string;
  businessName: string;
  branchRefNo: string;
  businessType: string;
  cifNo: string;
  enterpriseType: string;
  existingLimit: string;
  existingOS: string;
  proposedLimit: string;
  legalStatus: string;
  earnings1: string;
  earnings2: string;
  earnings3: string;
  gender: string;
  clientApplicationDate: string;
  creditMemoType: string;
  lendingRelationSince: string;
  creditRating: string;
  depositRelationSince: string;
  riskWeight: string;
  incorporationDate: string;
  validity: string;
  refinanceScheme: string;
  ratedBy: string;
  keyPersonName: string;
  keyPersonPosition: string;
  doeRiskCategory: string;
  distanceFromBranch: string;
  esrrRating: string;
  sbsCode: string;
  doeValidity: string;
  registeredAddress: string;
  esddRequirement: string;
  businessDescription: string;
  aboutProprietor: string;
}

/* ─── Step 2: Proposed Facility ─── */
export interface ProposedFacilityRow {
  facilityNature: string;
  limit: string;
  pricing: string;
  tenor: string;
  gracePeriod: string;
  purpose: string;
  marginSecurity: string;
}

/* ─── Step 3: Loan Exposure in All FIs ─── */
export interface LoanExposureRow {
  businessName: string;
  fiName: string;
  facilityNature: string;
  existingLimit: string;
  existingOS: string;
  existingPricing: string;
  existingExpiry: string;
  insSize: string;
  dueEmi: string;
  paidEmi: string;
  overdue: string;
  proposedLimit: string;
  proposedPricing: string;
  proposedExpiryTenor: string;
  proposedPurpose: string;
}

/* ─── Step 4: Record of Bank Transaction ─── */
export interface BankTransactionRow {
  bankName: string;
  accountName: string;
  accountType: string;
  sanctionedLimit: string;
  fromDate: string;
  toDate: string;
  totalCreditTransaction: string;
  maxBalance: string;
  minBalance: string;
}

/* ─── Step 5: Previous Loan Closing History ─── */
export interface ClosingHistoryRow {
  fiName: string;
  accountName: string;
  facilityType: string;
  initialSanctionDate: string;
  initialSanctionLimit: string;
  lastSanctionDate: string;
  lastSanctionLimit: string;
  closingDate: string;
  closingType: string;
}

/* ─── Step 6: Key Person's Information ─── */
export interface KeyPersonData {
  name: string;
  designation: string;
  nidNo: string;
  successorName: string;
  contactNumber: string;
  relationshipWithSuccessor: string;
  businessExperienceYears: string;
  residenceStatus: string;
  maritalStatus: string;
  currentBusinessYears: string;
  dateOfBirth: string;
  otherIncomeSource: string;
  taxCertificateTin: string;
  dependentFamilyMembers: string;
  pepDescription: string;
  presentAddress: string;
  permanentAddress: string;
}

/* ─── Step 7: Owner's Information ─── */
export interface OwnerRow {
  name: string;
  designation: string;
  age: string;
  residentialAddress: string;
  permanentAddress: string;
  sharePercent: string;
  nidNo: string;
  mobileNumber: string;
  pnw: string;
  maritalStatus: string;
  relationWithKeyPerson: string;
  educationLevel: string;
  directorInBankNbfiPep: string;
}

/* ─── Step 8: Premise Ownership ─── */
export interface PremiseRow {
  premiseType: string;
  address: string;
  areaSft: string;
  ownershipStatus: string;
  supportingDocuments: string;
  deedValidity: string;
}

/* ─── Step 9: Other Business Information ─── */
export interface OtherBusinessData {
  manpowerMale: string;
  manpowerFemale: string;
  wholesalePercent: string;
  retailPercent: string;
  servicePercent: string;
  tradeLicenseNo: string;
  tradeLicenseValidity: string;
  salesKeeping: string;
}

/* ─── Step 10: Working Capital ─── */
export interface WorkingCapitalData {
  avgInventoryHolding: string;
  avgReceivableHolding: string;
  avgAdvancePayment: string;
  avgPayableAmount: string;
  totalWcRequirement: string;
  existingWcLoan: string;
  scopeAdditionalWc: string;
  proposedTlAsWc: string;
  projectedGrowthPercent: string;
  debtEquityRatio: string;
}

/* ─── Step 11: Sister/Allied Concern ─── */
export interface SisterConcernData {
  isNA: boolean;
  rows: SisterConcernRow[];
}
export interface SisterConcernRow {
  concernName: string;
  businessNature: string;
  legalForm: string;
  sharePercent: string;
  businessSince: string;
  totalInvestment: string;
  bankLiability: string;
  equity: string;
  turnover: string;
  profit: string;
}

/* ─── Step 12: AML/CFT Declaration ─── */
export interface AmlCftItem {
  label: string;
  status: string;
  remarks: string;
}

/* ─── Step 13: CIB Compliance ─── */
export interface CibComplianceRow {
  name: string;
  cibCode: string;
  inquiryDate: string;
  expiryDate: string;
  status: string;
}

/* ─── Step 14: Personal Guarantors ─── */
export interface GuarantorRow {
  name: string;
  age: string;
  relationWithBorrower: string;
  profession: string;
  residenceStatus: string;
  businessName: string;
  cellNo: string;
  pnw: string;
  fundedLoanLimit: string;
}

/* ─── Step 15: Visit Report ─── */
export interface VisitReportData {
  visitNotes: string;
  visitDate: string;
  visitor1Name: string;
  visitor1Designation: string;
  visitor1Department: string;
  visitor2Name: string;
  visitor2Designation: string;
  visitor2Department: string;
  clientPresent: string;
  inventoryValue: string;
  receivableValue: string;
}

/* ─── Step 16: Exceptions ─── */
export interface ExceptionRow {
  parameter: string;
  actualException: string;
}

/* ─── Step 17: Basis of Recommendation ─── */
export interface RecommendationData {
  freeText: string;
  bullets: RecommendationBullet[];
}
export interface RecommendationBullet {
  text: string;
  enabled: boolean;
  isCustom: boolean;
}

/* ─── Step 18: Signatures ─── */
export interface SignaturesData {
  makerName: string;
  makerDesignation: string;
  clusterHeadName: string;
  clusterHeadDesignation: string;
  checkerName: string;
  checkerDesignation: string;
  attachments: Record<string, boolean>;
}

/* ─── Master Application ─── */
export interface CreditApplication {
  keySummary: KeySummaryData;
  proposedFacilities: ProposedFacilityRow[];
  loanExposures: LoanExposureRow[];
  bankTransactions: BankTransactionRow[];
  closingHistory: ClosingHistoryRow[];
  keyPerson: KeyPersonData;
  owners: OwnerRow[];
  premises: PremiseRow[];
  otherBusiness: OtherBusinessData;
  workingCapital: WorkingCapitalData;
  sisterConcerns: SisterConcernData;
  amlCft: AmlCftItem[];
  cibCompliance: CibComplianceRow[];
  guarantors: GuarantorRow[];
  visitReport: VisitReportData;
  exceptions: ExceptionRow[];
  recommendation: RecommendationData;
  signatures: SignaturesData;
}

/* ─── Step Labels ─── */
export const STEP_LABELS = [
  "Key Summary",
  "Proposed Facility",
  "Loan Exposure",
  "Bank Transaction",
  "Closing History",
  "Key Person",
  "Owners",
  "Premises",
  "Other Business",
  "Working Capital",
  "Sister Concern",
  "AML/CFT",
  "CIB Compliance",
  "Guarantors",
  "Visit Report",
  "Exceptions",
  "Recommendation",
  "Signatures",
];

/* ─── AML/CFT Default Labels ─── */
export const AML_CHECKLIST_LABELS = [
  "Customer has been screened against Sanction List (UN, OFAC, EU, HMT etc.)",
  "Customer has been screened against Adverse Media",
  "Customer KYC/EKYC has been completed",
  "Transaction Profile (TP) has been completed",
  "Source of Fund has been verified",
  "Risk Rating/Assessment has been completed as per BFIU guidelines",
  "Customer CDD/EDD has been completed where applicable",
  "Politically Exposed Person (PEP) screening has been done",
  "Suspicious Transaction Report (STR) / Suspicious Activity Report (SAR) considerations reviewed",
];

/* ─── Default Recommendation Bullets ─── */
export const DEFAULT_RECOMMENDATION_BULLETS: RecommendationBullet[] = [
  { text: "Client has good repayment record", enabled: false, isCustom: false },
  { text: "Business bank transaction is satisfactory", enabled: false, isCustom: false },
  { text: "Client has good repayment record with MTB", enabled: false, isCustom: false },
  { text: "Applicant business experience is more than 5 years", enabled: false, isCustom: false },
];

/* ─── Attachment Checklist ─── */
export const ATTACHMENT_CHECKLIST = [
  "Audited/Management income statement",
  "Buyers and suppliers' details",
  "PNW Statements",
  "ICRRS qualitative indicator",
  "Other documents",
];

/* ─── Factory ─── */
export function createEmptyApplication(): CreditApplication {
  return {
    keySummary: {
      memoDate: "", branchName: "", businessName: "", branchRefNo: "",
      businessType: "", cifNo: "", enterpriseType: "", existingLimit: "",
      existingOS: "", proposedLimit: "", legalStatus: "", earnings1: "",
      earnings2: "", earnings3: "", gender: "", clientApplicationDate: "",
      creditMemoType: "", lendingRelationSince: "", creditRating: "",
      depositRelationSince: "", riskWeight: "", incorporationDate: "",
      validity: "", refinanceScheme: "", ratedBy: "", keyPersonName: "",
      keyPersonPosition: "", doeRiskCategory: "", distanceFromBranch: "",
      esrrRating: "", sbsCode: "", doeValidity: "", registeredAddress: "",
      esddRequirement: "", businessDescription: "", aboutProprietor: "",
    },
    proposedFacilities: [],
    loanExposures: [],
    bankTransactions: [],
    closingHistory: [],
    keyPerson: {
      name: "", designation: "", nidNo: "", successorName: "",
      contactNumber: "", relationshipWithSuccessor: "", businessExperienceYears: "",
      residenceStatus: "", maritalStatus: "", currentBusinessYears: "",
      dateOfBirth: "", otherIncomeSource: "", taxCertificateTin: "",
      dependentFamilyMembers: "", pepDescription: "", presentAddress: "",
      permanentAddress: "",
    },
    owners: [],
    premises: [],
    otherBusiness: {
      manpowerMale: "", manpowerFemale: "", wholesalePercent: "",
      retailPercent: "", servicePercent: "", tradeLicenseNo: "",
      tradeLicenseValidity: "", salesKeeping: "",
    },
    workingCapital: {
      avgInventoryHolding: "", avgReceivableHolding: "", avgAdvancePayment: "",
      avgPayableAmount: "", totalWcRequirement: "", existingWcLoan: "",
      scopeAdditionalWc: "", proposedTlAsWc: "", projectedGrowthPercent: "10",
      debtEquityRatio: "",
    },
    sisterConcerns: { isNA: true, rows: [] },
    amlCft: AML_CHECKLIST_LABELS.map((label) => ({ label, status: "", remarks: "" })),
    cibCompliance: [],
    guarantors: [],
    visitReport: {
      visitNotes: "", visitDate: "", visitor1Name: "", visitor1Designation: "",
      visitor1Department: "", visitor2Name: "", visitor2Designation: "",
      visitor2Department: "", clientPresent: "", inventoryValue: "", receivableValue: "",
    },
    exceptions: [],
    recommendation: { freeText: "", bullets: DEFAULT_RECOMMENDATION_BULLETS.map((b) => ({ ...b })) },
    signatures: {
      makerName: "", makerDesignation: "", clusterHeadName: "",
      clusterHeadDesignation: "", checkerName: "", checkerDesignation: "",
      attachments: Object.fromEntries(ATTACHMENT_CHECKLIST.map((a) => [a, false])),
    },
  };
}

/* ─── Sample Data: Khan Denim ─── */
export function createSampleApplication(): CreditApplication {
  return {
    keySummary: {
      memoDate: "2025-03-01",
      branchName: "Mirpur-2",
      businessName: "Khan Denim",
      branchRefNo: "MIR2-2025-0042",
      businessType: "Trading",
      cifNo: "20008262",
      enterpriseType: "Small",
      existingLimit: "0.00",
      existingOS: "0.00",
      proposedLimit: "0.40",
      legalStatus: "Proprietorship",
      earnings1: "2.00",
      earnings2: "0.00",
      earnings3: "4.00",
      gender: "Male",
      clientApplicationDate: "2025-02-15",
      creditMemoType: "New",
      lendingRelationSince: "2025-01-01",
      creditRating: "Unrated",
      depositRelationSince: "2024-06-01",
      riskWeight: "125%",
      incorporationDate: "2018-03-15",
      validity: "2026-03-31",
      refinanceScheme: "N/A",
      ratedBy: "CRAB",
      keyPersonName: "Md. Rayhan Khan",
      keyPersonPosition: "Proprietor",
      doeRiskCategory: "Green",
      distanceFromBranch: "2",
      esrrRating: "Low",
      sbsCode: "47710",
      doeValidity: "2026-03-31",
      registeredAddress: "Shop B/27, Hazrat Shah Ali School & College Market, Mirpur-1, Dhaka",
      esddRequirement: "No",
      businessDescription: "Khan Denim is a wholesale and retail denim fabric and garments trading business operating from Mirpur-1, Dhaka. The business sources raw denim materials from local mills and Chinese importers, supplying to local tailors and small garment manufacturers.",
      aboutProprietor: "Md. Rayhan Khan, aged 38, has been in the denim trading business for over 7 years. He has sound knowledge of the market and maintains good relationships with suppliers and buyers.",
    },
    proposedFacilities: [
      {
        facilityNature: "SBL PLUS",
        limit: "0.40",
        pricing: "14.50",
        tenor: "24",
        gracePeriod: "0",
        purpose: "Working Capital for Denim Trading",
        marginSecurity: "Personal Guarantee + Hypothecation of Stock",
      },
    ],
    loanExposures: [],
    bankTransactions: [
      {
        bankName: "Mutual Trust Bank",
        accountName: "Khan Denim",
        accountType: "CD",
        sanctionedLimit: "N/A",
        fromDate: "2024-01-01",
        toDate: "2024-12-31",
        totalCreditTransaction: "18.50",
        maxBalance: "3.20",
        minBalance: "0.15",
      },
    ],
    closingHistory: [],
    keyPerson: {
      name: "Md. Rayhan Khan",
      designation: "Proprietor",
      nidNo: "1990532XXXXXXX",
      successorName: "Md. Farhan Khan",
      contactNumber: "01712XXXXXX",
      relationshipWithSuccessor: "Brother",
      businessExperienceYears: "7",
      residenceStatus: "Permanent",
      maritalStatus: "Married",
      currentBusinessYears: "7",
      dateOfBirth: "1987-05-12",
      otherIncomeSource: "Rental Income from Family Property",
      taxCertificateTin: "TIN-302XXXXXXX",
      dependentFamilyMembers: "4",
      pepDescription: "N/A",
      presentAddress: "House 12, Road 5, Block C, Mirpur-2, Dhaka-1216",
      permanentAddress: "Village: Kaliganj, Dist: Gazipur",
    },
    owners: [
      {
        name: "Md. Rayhan Khan",
        designation: "Proprietor",
        age: "38",
        residentialAddress: "House 12, Road 5, Block C, Mirpur-2, Dhaka-1216",
        permanentAddress: "Village: Kaliganj, Dist: Gazipur",
        sharePercent: "100",
        nidNo: "1990532XXXXXXX",
        mobileNumber: "01712XXXXXX",
        pnw: "1.20",
        maritalStatus: "Married",
        relationWithKeyPerson: "Self",
        educationLevel: "HSC",
        directorInBankNbfiPep: "No",
      },
    ],
    premises: [
      {
        premiseType: "Showroom",
        address: "Shop B/27, Hazrat Shah Ali School & College Market, Mirpur-1, Dhaka",
        areaSft: "250",
        ownershipStatus: "Rented",
        supportingDocuments: "Rental Deed",
        deedValidity: "2026-12-31",
      },
    ],
    otherBusiness: {
      manpowerMale: "3",
      manpowerFemale: "1",
      wholesalePercent: "60",
      retailPercent: "40",
      servicePercent: "0",
      tradeLicenseNo: "DSCC-2024-TL-88421",
      tradeLicenseValidity: "2025-06-30",
      salesKeeping: "Kacha Khata",
    },
    workingCapital: {
      avgInventoryHolding: "0.35",
      avgReceivableHolding: "0.10",
      avgAdvancePayment: "0.05",
      avgPayableAmount: "0.08",
      totalWcRequirement: "0.42",
      existingWcLoan: "0.00",
      scopeAdditionalWc: "0.42",
      proposedTlAsWc: "0.40",
      projectedGrowthPercent: "10",
      debtEquityRatio: "0.33:1",
    },
    sisterConcerns: { isNA: true, rows: [] },
    amlCft: AML_CHECKLIST_LABELS.map((label) => ({ label, status: "Yes", remarks: "Verified" })),
    cibCompliance: [
      {
        name: "Md. Rayhan Khan",
        cibCode: "CIB-20008262",
        inquiryDate: "2025-02-20",
        expiryDate: "2025-08-20",
        status: "Standard",
      },
    ],
    guarantors: [
      {
        name: "Md. Farhan Khan",
        age: "35",
        relationWithBorrower: "Brother",
        profession: "Business",
        residenceStatus: "Permanent",
        businessName: "Khan Fabrics",
        cellNo: "01819XXXXXX",
        pnw: "0.85",
        fundedLoanLimit: "0.00",
      },
    ],
    visitReport: {
      visitNotes: "Visited the business premises at Mirpur-1 market. The shop is well-organized with adequate denim stock. Owner was present and cooperative. Business appears to have steady footfall and regular buyers.",
      visitDate: "2025-02-25",
      visitor1Name: "Md. Aminul Islam",
      visitor1Designation: "RM",
      visitor1Department: "SME Banking",
      visitor2Name: "Fatema Begum",
      visitor2Designation: "BM",
      visitor2Department: "Mirpur-2 Branch",
      clientPresent: "Yes",
      inventoryValue: "0.35",
      receivableValue: "0.10",
    },
    exceptions: [],
    recommendation: {
      freeText: "Based on the overall assessment, Khan Denim demonstrates a viable and established trading business with satisfactory bank transaction history. The proprietor has adequate experience and the proposed facility is well within the business capacity.",
      bullets: [
        { text: "Client has good repayment record", enabled: true, isCustom: false },
        { text: "Business bank transaction is satisfactory", enabled: true, isCustom: false },
        { text: "Client has good repayment record with MTB", enabled: false, isCustom: false },
        { text: "Applicant business experience is more than 5 years", enabled: true, isCustom: false },
      ],
    },
    signatures: {
      makerName: "Md. Aminul Islam",
      makerDesignation: "Relationship Manager, SME",
      clusterHeadName: "",
      clusterHeadDesignation: "",
      checkerName: "",
      checkerDesignation: "",
      attachments: {
        "Audited/Management income statement": true,
        "Buyers and suppliers' details": true,
        "PNW Statements": true,
        "ICRRS qualitative indicator": false,
        "Other documents": true,
      },
    },
  };
}
