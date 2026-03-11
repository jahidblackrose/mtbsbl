import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/hooks/use-toast";
import { ArrowLeft, ArrowRight, Save, Eye, FileText, Beaker } from "lucide-react";
import { STEP_LABELS, createEmptyApplication, type CreditApplication } from "@/types/credit-application";
import { saveDraft, submitCreditApplication, loadSampleData } from "@/api/credit-application.api";

import StepKeySummary from "@/components/credit-application/StepKeySummary";
import StepProposedFacility from "@/components/credit-application/StepProposedFacility";
import StepLoanExposure from "@/components/credit-application/StepLoanExposure";
import StepBankTransaction from "@/components/credit-application/StepBankTransaction";
import StepClosingHistory from "@/components/credit-application/StepClosingHistory";
import StepKeyPerson from "@/components/credit-application/StepKeyPerson";
import StepOwners from "@/components/credit-application/StepOwners";
import StepPremise from "@/components/credit-application/StepPremise";
import StepOtherBusiness from "@/components/credit-application/StepOtherBusiness";
import StepWorkingCapital from "@/components/credit-application/StepWorkingCapital";
import StepSisterConcern from "@/components/credit-application/StepSisterConcern";
import StepAmlCft from "@/components/credit-application/StepAmlCft";
import StepCibCompliance from "@/components/credit-application/StepCibCompliance";
import StepGuarantors from "@/components/credit-application/StepGuarantors";
import StepVisitReport from "@/components/credit-application/StepVisitReport";
import StepExceptions from "@/components/credit-application/StepExceptions";
import StepRecommendation from "@/components/credit-application/StepRecommendation";
import StepSignatures from "@/components/credit-application/StepSignatures";
import ApplicationPreview from "@/components/credit-application/ApplicationPreview";

const TOTAL_STEPS = STEP_LABELS.length;

const NewApplicationPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<CreditApplication>(createEmptyApplication);
  const [showPreview, setShowPreview] = useState(false);
  const [saving, setSaving] = useState(false);

  const updateField = useCallback(<K extends keyof CreditApplication>(key: K, value: CreditApplication[K]) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleSaveDraft = async () => {
    setSaving(true);
    const res = await saveDraft(formData);
    setSaving(false);
    if (res.status === 200) {
      toast({ title: "Draft Saved", description: res.message });
    } else {
      toast({ title: "Save Failed", description: res.message, variant: "destructive" });
    }
  };

  const handleSubmit = async () => {
    setSaving(true);
    const res = await submitCreditApplication(formData);
    setSaving(false);
    if (res.status === 200) {
      toast({ title: "Application Submitted", description: res.message });
      navigate("/applications");
    } else {
      toast({ title: "Submission Failed", description: res.message, variant: "destructive" });
    }
  };

  const handleLoadSample = async () => {
    const res = await loadSampleData();
    if (res.status === 200 && res.data) {
      setFormData(res.data);
      toast({ title: "Sample Loaded", description: "Khan Denim demo data loaded." });
    }
  };

  const handleNext = () => setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1));
  const handleBack = () => setStep((s) => Math.max(s - 1, 0));

  if (showPreview) {
    return (
      <div className="mx-auto max-w-4xl space-y-4 pb-8">
        <ApplicationPreview data={formData} onBack={() => setShowPreview(false)} />
      </div>
    );
  }

  const progress = ((step + 1) / TOTAL_STEPS) * 100;

  const renderStep = () => {
    switch (step) {
      case 0:  return <StepKeySummary data={formData.keySummary} onChange={(d) => updateField("keySummary", d)} />;
      case 1:  return <StepProposedFacility data={formData.proposedFacilities} onChange={(d) => updateField("proposedFacilities", d)} />;
      case 2:  return <StepLoanExposure data={formData.loanExposures} onChange={(d) => updateField("loanExposures", d)} />;
      case 3:  return <StepBankTransaction data={formData.bankTransactions} onChange={(d) => updateField("bankTransactions", d)} />;
      case 4:  return <StepClosingHistory data={formData.closingHistory} onChange={(d) => updateField("closingHistory", d)} />;
      case 5:  return <StepKeyPerson data={formData.keyPerson} onChange={(d) => updateField("keyPerson", d)} />;
      case 6:  return <StepOwners data={formData.owners} onChange={(d) => updateField("owners", d)} />;
      case 7:  return <StepPremise data={formData.premises} onChange={(d) => updateField("premises", d)} />;
      case 8:  return <StepOtherBusiness data={formData.otherBusiness} onChange={(d) => updateField("otherBusiness", d)} />;
      case 9:  return <StepWorkingCapital data={formData.workingCapital} onChange={(d) => updateField("workingCapital", d)} />;
      case 10: return <StepSisterConcern data={formData.sisterConcerns} onChange={(d) => updateField("sisterConcerns", d)} />;
      case 11: return <StepAmlCft data={formData.amlCft} onChange={(d) => updateField("amlCft", d)} />;
      case 12: return <StepCibCompliance data={formData.cibCompliance} onChange={(d) => updateField("cibCompliance", d)} />;
      case 13: return <StepGuarantors data={formData.guarantors} onChange={(d) => updateField("guarantors", d)} />;
      case 14: return <StepVisitReport data={formData.visitReport} onChange={(d) => updateField("visitReport", d)} />;
      case 15: return <StepExceptions data={formData.exceptions} onChange={(d) => updateField("exceptions", d)} />;
      case 16: return <StepRecommendation data={formData.recommendation} onChange={(d) => updateField("recommendation", d)} />;
      case 17: return <StepSignatures data={formData.signatures} onChange={(d) => updateField("signatures", d)} />;
      default: return null;
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-5 pb-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate("/applications")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-foreground">SME Credit Application</h1>
            <p className="text-xs text-muted-foreground">
              RM Memo for SBL &middot; Branch: {user?.branch || "Head Office"} &middot; RM: {user?.name}
            </p>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={handleLoadSample} className="text-xs">
          <Beaker className="h-3.5 w-3.5 mr-1" /> Load Sample
        </Button>
      </div>

      {/* Progress */}
      <div className="space-y-1">
        <div className="flex justify-between items-center text-xs text-muted-foreground">
          <span>Step {step + 1} of {TOTAL_STEPS}: <span className="font-medium text-foreground">{STEP_LABELS[step]}</span></span>
          <span>{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Step Indicator */}
      <div className="flex flex-wrap gap-1">
        {STEP_LABELS.map((label, i) => (
          <button
            key={label}
            onClick={() => setStep(i)}
            className={`text-[10px] px-2 py-1 rounded-full border transition-colors ${
              i === step
                ? "bg-primary text-primary-foreground border-primary"
                : i < step
                ? "bg-primary/10 text-primary border-primary/20"
                : "bg-muted text-muted-foreground border-border"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Step Content */}
      {renderStep()}

      {/* Navigation */}
      <div className="flex items-center justify-between pt-2 border-t border-border">
        <div className="flex gap-2">
          {step > 0 && (
            <Button variant="outline" onClick={handleBack}>
              <ArrowLeft className="h-4 w-4 mr-1" /> Back
            </Button>
          )}
          {step === 0 && (
            <Button variant="outline" onClick={() => navigate("/applications")}>Cancel</Button>
          )}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleSaveDraft} disabled={saving}>
            <Save className="h-4 w-4 mr-1" /> {saving ? "Saving..." : "Save Draft"}
          </Button>
          {step < TOTAL_STEPS - 1 ? (
            <Button onClick={handleNext}>
              Next <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          ) : (
            <>
              <Button variant="secondary" onClick={() => setShowPreview(true)}>
                <Eye className="h-4 w-4 mr-1" /> Preview
              </Button>
              <Button onClick={handleSubmit} disabled={saving}>
                <FileText className="h-4 w-4 mr-1" /> {saving ? "Submitting..." : "Submit"}
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewApplicationPage;
