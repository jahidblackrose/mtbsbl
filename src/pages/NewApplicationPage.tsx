import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import { getDocumentChecklist, type DocumentItem } from "@/types/document-checklist";
import { createApplication } from "@/api/applications.api";
import type { LoanType } from "@/types/loan";
import { ArrowLeft, ArrowRight, Check, Upload, FileText, X } from "lucide-react";

const STEPS = ["Loan Details", "Document Upload", "Review & Submit"];

const LOAN_TYPE_OPTIONS: { value: LoanType; label: string; description: string }[] = [
  { value: "SBL", label: "SBL", description: "Small Business Loan – standard facility" },
  { value: "SBL_PLUS", label: "SBL Plus", description: "Enhanced SBL with higher limits" },
  { value: "TOP_UP", label: "Top-up", description: "Additional funding on existing loan" },
];

const NewApplicationPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [step, setStep] = useState(0);
  const [loanType, setLoanType] = useState<LoanType | "">("");
  const [customerName, setCustomerName] = useState("");
  const [amount, setAmount] = useState("");
  const [tenure, setTenure] = useState("");
  const [purpose, setPurpose] = useState("");
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, File | null>>({});
  const [submitting, setSubmitting] = useState(false);

  const handleLoanTypeChange = (value: string) => {
    setLoanType(value as LoanType);
    setDocuments(getDocumentChecklist(value));
    setUploadedFiles({});
  };

  const handleFileSelect = (docId: string, file: File | null) => {
    setUploadedFiles((prev) => ({ ...prev, [docId]: file }));
  };

  const isStep1Valid = loanType && customerName.trim() && amount && tenure && purpose.trim();

  const requiredDocs = documents.filter((d) => d.required);
  const uploadedRequired = requiredDocs.filter((d) => uploadedFiles[d.id]);
  const docProgress = requiredDocs.length ? Math.round((uploadedRequired.length / requiredDocs.length) * 100) : 0;

  const handleNext = () => {
    if (step === 0 && !isStep1Valid) {
      toast({ title: "Please fill all required fields", variant: "destructive" });
      return;
    }
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const handleBack = () => setStep((s) => Math.max(s - 1, 0));

  const handleSubmit = async () => {
    if (!loanType) return;
    setSubmitting(true);
    const response = await createApplication({
      loanType: loanType as LoanType,
      customerName,
      amount,
      tenure,
      purpose,
      documentIds: Object.keys(uploadedFiles).filter((k) => uploadedFiles[k]),
    });
    setSubmitting(false);

    if (response.status === 200) {
      toast({ title: "Application Submitted", description: response.message });
      navigate("/applications");
    } else {
      toast({ title: "Submission Failed", description: response.message, variant: "destructive" });
    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate("/applications")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">New Loan Application</h1>
          <p className="text-muted-foreground">Branch: {user?.branch || "Head Office"} &middot; RM: {user?.name}</p>
        </div>
      </div>

      {/* Step indicator */}
      <div className="flex items-center gap-2">
        {STEPS.map((label, i) => (
          <div key={label} className="flex items-center gap-2 flex-1">
            <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold shrink-0 ${
              i < step ? "bg-success text-success-foreground" : i === step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            }`}>
              {i < step ? <Check className="h-4 w-4" /> : i + 1}
            </div>
            <span className={`text-sm hidden sm:inline ${i === step ? "font-semibold text-foreground" : "text-muted-foreground"}`}>{label}</span>
            {i < STEPS.length - 1 && <Separator className="flex-1" />}
          </div>
        ))}
      </div>

      {/* Step 1 */}
      {step === 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Loan Details</CardTitle>
            <CardDescription>Select loan type and provide basic details.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label>Loan Type *</Label>
              <div className="grid gap-3 sm:grid-cols-3">
                {LOAN_TYPE_OPTIONS.map((opt) => (
                  <button key={opt.value} type="button" onClick={() => handleLoanTypeChange(opt.value)}
                    className={`rounded-lg border p-3 text-left transition-colors ${loanType === opt.value ? "border-primary bg-primary/5 ring-2 ring-primary/20" : "border-border hover:border-primary/40"}`}>
                    <div className="font-semibold text-sm">{opt.label}</div>
                    <div className="text-xs text-muted-foreground mt-1">{opt.description}</div>
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="customer">Customer / Business Name *</Label>
              <Input id="customer" value={customerName} onChange={(e) => setCustomerName(e.target.value)} placeholder="e.g. Rahman Traders" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="amount">Loan Amount (BDT) *</Label>
                <Input id="amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="e.g. 2500000" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tenure">Tenure (months) *</Label>
                <Input id="tenure" type="number" value={tenure} onChange={(e) => setTenure(e.target.value)} placeholder="e.g. 36" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="purpose">Purpose of Loan *</Label>
              <Textarea id="purpose" value={purpose} onChange={(e) => setPurpose(e.target.value)} placeholder="Describe the purpose of this loan facility…" rows={3} />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2 */}
      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Document Upload</CardTitle>
            <CardDescription>
              Upload required documents for {loanType === "TOP_UP" ? "Top-up" : loanType === "SBL_PLUS" ? "SBL Plus" : "SBL"} application.
            </CardDescription>
            <div className="mt-3 space-y-1">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Required documents uploaded</span>
                <span>{uploadedRequired.length}/{requiredDocs.length}</span>
              </div>
              <Progress value={docProgress} className="h-2" />
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {documents.map((doc) => {
              const file = uploadedFiles[doc.id];
              return (
                <div key={doc.id} className="flex items-center gap-3 rounded-lg border p-3">
                  <Checkbox checked={!!file} className="pointer-events-none" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium">
                      {doc.label} {doc.required && <span className="text-destructive">*</span>}
                    </div>
                    {file && (
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                        <FileText className="h-3 w-3" />
                        <span className="truncate">{file.name}</span>
                      </div>
                    )}
                  </div>
                  {file ? (
                    <Button size="sm" variant="ghost" onClick={() => handleFileSelect(doc.id, null)}>
                      <X className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button size="sm" variant="outline" asChild>
                      <label className="cursor-pointer">
                        <Upload className="h-3.5 w-3.5 mr-1" /> Upload
                        <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png,.docx"
                          onChange={(e) => {
                            const f = e.target.files?.[0] || null;
                            if (f && f.size > 5 * 1024 * 1024) {
                              toast({ title: "File too large", description: "Maximum file size is 5MB.", variant: "destructive" });
                              return;
                            }
                            handleFileSelect(doc.id, f);
                            e.target.value = "";
                          }}
                        />
                      </label>
                    </Button>
                  )}
                </div>
              );
            })}
          </CardContent>
        </Card>
      )}

      {/* Step 3 */}
      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Review & Submit</CardTitle>
            <CardDescription>Please review the application details before submitting.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2 text-sm">
              <div><span className="text-muted-foreground">Loan Type:</span> <span className="font-medium">{loanType === "SBL_PLUS" ? "SBL Plus" : loanType === "TOP_UP" ? "Top-up" : loanType}</span></div>
              <div><span className="text-muted-foreground">Customer:</span> <span className="font-medium">{customerName}</span></div>
              <div><span className="text-muted-foreground">Amount:</span> <span className="font-medium">৳{Number(amount).toLocaleString("en-IN")}</span></div>
              <div><span className="text-muted-foreground">Tenure:</span> <span className="font-medium">{tenure} months</span></div>
              <div className="sm:col-span-2"><span className="text-muted-foreground">Purpose:</span> <span className="font-medium">{purpose}</span></div>
              <div><span className="text-muted-foreground">Branch:</span> <span className="font-medium">{user?.branch || "Head Office"}</span></div>
              <div><span className="text-muted-foreground">RM:</span> <span className="font-medium">{user?.name}</span></div>
            </div>
            <Separator />
            <div>
              <h4 className="font-semibold text-sm mb-2">Documents ({Object.values(uploadedFiles).filter(Boolean).length}/{documents.length})</h4>
              <div className="space-y-1">
                {documents.map((doc) => {
                  const file = uploadedFiles[doc.id];
                  return (
                    <div key={doc.id} className="flex items-center gap-2 text-sm">
                      {file ? <Check className="h-4 w-4 text-success shrink-0" /> : <X className={`h-4 w-4 shrink-0 ${doc.required ? "text-destructive" : "text-muted-foreground"}`} />}
                      <span className={file ? "" : doc.required ? "text-destructive" : "text-muted-foreground"}>{doc.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-between">
        <Button variant="outline" onClick={step === 0 ? () => navigate("/applications") : handleBack}>
          {step === 0 ? "Cancel" : <><ArrowLeft className="h-4 w-4 mr-1" /> Back</>}
        </Button>
        {step < STEPS.length - 1 ? (
          <Button onClick={handleNext}>Next <ArrowRight className="h-4 w-4 ml-1" /></Button>
        ) : (
          <Button onClick={handleSubmit} disabled={submitting}>
            <Check className="h-4 w-4 mr-1" /> {submitting ? "Submitting…" : "Submit Application"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default NewApplicationPage;
