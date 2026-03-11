import type { KeySummaryData } from "@/types/credit-application";
import { FormField, FormSelect, FormTextarea, SectionCard } from "./shared";

interface Props { data: KeySummaryData; onChange: (d: KeySummaryData) => void; }

const StepKeySummary = ({ data, onChange }: Props) => {
  const u = (f: keyof KeySummaryData, v: string) => onChange({ ...data, [f]: v });

  return (
    <SectionCard title="1. Key Summary Fields" description="Basic application information and key identifiers.">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <FormField label="Business Memo Date" value={data.memoDate} onChange={v => u("memoDate", v)} required type="date" />
        <FormField label="Branch Name" value={data.branchName} onChange={v => u("branchName", v)} required />
        <FormField label="Name of Business" value={data.businessName} onChange={v => u("businessName", v)} required />
        <FormField label="Branch Reference No." value={data.branchRefNo} onChange={v => u("branchRefNo", v)} required />
        <FormSelect label="Business Type" value={data.businessType} onChange={v => u("businessType", v)} required
          options={[{value:"Trading",label:"Trading"},{value:"Service",label:"Service"},{value:"Manufacturing",label:"Manufacturing"}]} />
        <FormField label="CIF No." value={data.cifNo} onChange={v => u("cifNo", v)} required />
        <FormSelect label="Enterprise Type" value={data.enterpriseType} onChange={v => u("enterpriseType", v)} required
          options={[{value:"Small",label:"Small"},{value:"Medium",label:"Medium"},{value:"Micro",label:"Micro"}]} />
        <FormField label="Existing Limit (BDT M)" value={data.existingLimit} onChange={v => u("existingLimit", v)} type="number" />
        <FormField label="Outstanding (BDT M)" value={data.existingOS} onChange={v => u("existingOS", v)} type="number" />
        <FormField label="Proposed Limit (BDT M)" value={data.proposedLimit} onChange={v => u("proposedLimit", v)} required type="number" />
        <FormSelect label="Legal Status" value={data.legalStatus} onChange={v => u("legalStatus", v)} required
          options={[{value:"Proprietorship",label:"Proprietorship"},{value:"Partnership",label:"Partnership"},{value:"Ltd",label:"Limited Company"}]} />
        <FormField label="Earnings – Existing (M)" value={data.earnings1} onChange={v => u("earnings1", v)} type="number" />
        <FormField label="Earnings – New (M)" value={data.earnings2} onChange={v => u("earnings2", v)} type="number" />
        <FormField label="Earnings – Total (M)" value={data.earnings3} onChange={v => u("earnings3", v)} type="number" />
        <FormSelect label="Gender" value={data.gender} onChange={v => u("gender", v)} required
          options={[{value:"Male",label:"Male"},{value:"Female",label:"Female"}]} />
        <FormField label="Client Application Date" value={data.clientApplicationDate} onChange={v => u("clientApplicationDate", v)} required type="date" />
        <FormSelect label="Credit Memo Type" value={data.creditMemoType} onChange={v => u("creditMemoType", v)} required
          options={[{value:"New",label:"New"},{value:"Renewal",label:"Renewal"},{value:"Enhancement",label:"Enhancement"}]} />
        <FormField label="Lending Relationship Since" value={data.lendingRelationSince} onChange={v => u("lendingRelationSince", v)} type="date" />
        <FormField label="Credit Rating" value={data.creditRating} onChange={v => u("creditRating", v)} highlighted />
        <FormField label="Deposit Relationship Since" value={data.depositRelationSince} onChange={v => u("depositRelationSince", v)} type="date" />
        <FormField label="Risk Weight" value={data.riskWeight} onChange={v => u("riskWeight", v)} highlighted />
        <FormField label="Business Incorporation Date" value={data.incorporationDate} onChange={v => u("incorporationDate", v)} type="date" />
        <FormField label="Validity" value={data.validity} onChange={v => u("validity", v)} highlighted type="date" />
        <FormField label="Name of Refinance Scheme" value={data.refinanceScheme} onChange={v => u("refinanceScheme", v)} />
        <FormSelect label="Rated By" value={data.ratedBy} onChange={v => u("ratedBy", v)}
          options={[{value:"CRAB",label:"CRAB"},{value:"CRISL",label:"CRISL"},{value:"ECRL",label:"ECRL"},{value:"N/A",label:"N/A"}]} />
        <FormField label="Key Person Name" value={data.keyPersonName} onChange={v => u("keyPersonName", v)} required />
        <FormField label="Key Person Position" value={data.keyPersonPosition} onChange={v => u("keyPersonPosition", v)} required />
        <FormSelect label="DoE Risk Category" value={data.doeRiskCategory} onChange={v => u("doeRiskCategory", v)} required
          options={[{value:"Green",label:"Green"},{value:"Yellow",label:"Yellow"},{value:"Red",label:"Red"}]} />
        <FormField label="Distance from Branch (KM)" value={data.distanceFromBranch} onChange={v => u("distanceFromBranch", v)} type="number" />
        <FormSelect label="ESRR Rating" value={data.esrrRating} onChange={v => u("esrrRating", v)} required
          options={[{value:"Low",label:"Low Risk"},{value:"Medium",label:"Medium Risk"},{value:"High",label:"High Risk"}]} />
        <FormField label="SBS Code" value={data.sbsCode} onChange={v => u("sbsCode", v)} />
        <FormField label="DOE Validity" value={data.doeValidity} onChange={v => u("doeValidity", v)} type="date" />
      </div>
      <FormField label="Registered Business Address" value={data.registeredAddress} onChange={v => u("registeredAddress", v)} required className="mt-4" />
      <FormSelect label="ESDD Requirement" value={data.esddRequirement} onChange={v => u("esddRequirement", v)} required
        options={[{value:"Yes",label:"Yes"},{value:"No",label:"No"}]} />
      <FormTextarea label="Brief Description of Business" value={data.businessDescription} onChange={v => u("businessDescription", v)} required rows={4} />
      <FormTextarea label="About the Proprietor" value={data.aboutProprietor} onChange={v => u("aboutProprietor", v)} rows={3} />
    </SectionCard>
  );
};

export default StepKeySummary;
