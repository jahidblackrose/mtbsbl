import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import StatusBadge from "@/components/common/StatusBadge";
import type { LoanStatus } from "@/types/loan";
import { LOAN_STATUS_LABELS } from "@/types/loan";
import { ArrowLeft, Clock, CheckCircle2, Circle, FileText, Check, X } from "lucide-react";

// Mock data for demo
interface MockDetail {
  id: string;
  customer: string;
  type: string;
  amount: string;
  tenure: string;
  purpose: string;
  status: LoanStatus;
  branch: string;
  rm: string;
  createdAt: string;
  documents: { name: string; uploaded: boolean }[];
}

const WORKFLOW_STAGES: { status: LoanStatus; label: string }[] = [
  { status: "draft", label: "Draft" },
  { status: "submitted", label: "Submitted" },
  { status: "cib_pending", label: "CIB Pending" },
  { status: "cib_completed", label: "CIB Completed" },
  { status: "under_review", label: "Under Review" },
  { status: "approved", label: "Approved" },
  { status: "sanction_generated", label: "Sanction Generated" },
  { status: "charge_docs_pending", label: "Charge Docs Pending" },
  { status: "charge_docs_submitted", label: "Charge Docs Submitted" },
  { status: "limit_loaded", label: "Limit Loaded" },
  { status: "disbursed", label: "Disbursed" },
];

const STATUS_ORDER = WORKFLOW_STAGES.map((s) => s.status);

const MOCK_DETAILS: Record<string, MockDetail> = {
  "APP-2024-001": {
    id: "APP-2024-001", customer: "Rahman Traders", type: "SBL", amount: "৳25,00,000", tenure: "36 months",
    purpose: "Working capital for garment business expansion", status: "under_review", branch: "Gulshan", rm: "Karim Ahmed", createdAt: "2024-12-10",
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
    id: "APP-2024-003", customer: "Hasan Enterprise", type: "Top-up", amount: "৳10,00,000", tenure: "24 months",
    purpose: "Stock replenishment", status: "approved", branch: "Gulshan", rm: "Rafiq Hasan", createdAt: "2024-12-08",
    documents: [
      { name: "Latest Trade Licenses", uploaded: true },
      { name: "Tax Certificates with Return", uploaded: true },
      { name: "IT10B", uploaded: true },
      { name: "Bank Statements (all banks)", uploaded: true },
      { name: "Photographs", uploaded: true },
    ],
  },
};

function daysSince(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

const ApplicationDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const app = id ? MOCK_DETAILS[id] : null;

  if (!app) {
    return (
      <div className="space-y-4">
        <Button variant="ghost" onClick={() => navigate("/applications")}>
          <ArrowLeft className="h-4 w-4 mr-2" /> Back
        </Button>
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            Application not found. Only APP-2024-001 and APP-2024-003 have detail views in this demo.
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentIdx = STATUS_ORDER.indexOf(app.status);
  const tat = daysSince(app.createdAt);
  const uploadedCount = app.documents.filter((d) => d.uploaded).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate("/applications")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight">{app.id}</h1>
            <StatusBadge status={app.status} />
          </div>
          <p className="text-muted-foreground">{app.customer} &middot; {app.type} &middot; {app.amount}</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left: Details + Documents */}
        <div className="lg:col-span-2 space-y-6">
          {/* Loan Info */}
          <Card>
            <CardHeader><CardTitle className="text-base">Loan Information</CardTitle></CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2 text-sm">
                <div><span className="text-muted-foreground">Customer:</span> <span className="font-medium">{app.customer}</span></div>
                <div><span className="text-muted-foreground">Loan Type:</span> <span className="font-medium">{app.type}</span></div>
                <div><span className="text-muted-foreground">Amount:</span> <span className="font-medium">{app.amount}</span></div>
                <div><span className="text-muted-foreground">Tenure:</span> <span className="font-medium">{app.tenure}</span></div>
                <div><span className="text-muted-foreground">Branch:</span> <span className="font-medium">{app.branch}</span></div>
                <div><span className="text-muted-foreground">RM:</span> <span className="font-medium">{app.rm}</span></div>
                <div className="sm:col-span-2"><span className="text-muted-foreground">Purpose:</span> <span className="font-medium">{app.purpose}</span></div>
              </div>
            </CardContent>
          </Card>

          {/* Document Checklist */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Document Checklist</CardTitle>
                <span className="text-xs text-muted-foreground">{uploadedCount}/{app.documents.length} uploaded</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              {app.documents.map((doc) => (
                <div key={doc.name} className="flex items-center gap-2 text-sm">
                  {doc.uploaded ? (
                    <Check className="h-4 w-4 text-success shrink-0" />
                  ) : (
                    <X className="h-4 w-4 text-destructive shrink-0" />
                  )}
                  <span className={doc.uploaded ? "" : "text-destructive"}>{doc.name}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right: Timeline + TAT */}
        <div className="space-y-6">
          {/* TAT Counter */}
          <Card>
            <CardHeader><CardTitle className="text-base">Turn Around Time</CardTitle></CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <Clock className={`h-8 w-8 ${tat > 7 ? "text-destructive" : tat > 3 ? "text-warning" : "text-success"}`} />
                <div>
                  <div className="text-2xl font-bold">{tat} days</div>
                  <div className="text-xs text-muted-foreground">Since application created</div>
                </div>
              </div>
              <div className="mt-3 text-xs text-muted-foreground">
                Created: {app.createdAt}
              </div>
            </CardContent>
          </Card>

          {/* Status Timeline */}
          <Card>
            <CardHeader><CardTitle className="text-base">Application Timeline</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-0">
                {WORKFLOW_STAGES.map((stage, i) => {
                  const stageIdx = STATUS_ORDER.indexOf(stage.status);
                  const isCompleted = stageIdx < currentIdx;
                  const isCurrent = stageIdx === currentIdx;
                  const isFuture = stageIdx > currentIdx;

                  return (
                    <div key={stage.status} className="flex gap-3">
                      {/* Connector */}
                      <div className="flex flex-col items-center">
                        {isCompleted ? (
                          <CheckCircle2 className="h-5 w-5 text-success shrink-0" />
                        ) : isCurrent ? (
                          <div className="h-5 w-5 rounded-full border-2 border-primary bg-primary/20 shrink-0" />
                        ) : (
                          <Circle className="h-5 w-5 text-muted-foreground/40 shrink-0" />
                        )}
                        {i < WORKFLOW_STAGES.length - 1 && (
                          <div className={`w-px flex-1 min-h-[24px] ${isCompleted ? "bg-success" : "bg-border"}`} />
                        )}
                      </div>
                      <div className={`pb-4 text-sm ${isCurrent ? "font-semibold text-foreground" : isCompleted ? "text-muted-foreground" : "text-muted-foreground/50"}`}>
                        {stage.label}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetailPage;
