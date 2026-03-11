import type { KeyPersonData } from "@/types/credit-application";
import { FormField, FormSelect, FormTextarea, SectionCard } from "./shared";

interface Props { data: KeyPersonData; onChange: (d: KeyPersonData) => void; }

const StepKeyPerson = ({ data, onChange }: Props) => {
  const u = (f: keyof KeyPersonData, v: string) => onChange({ ...data, [f]: v });

  return (
    <SectionCard title="6. Key Person's Information" description="Primary borrower / key person details.">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <FormField label="Name" value={data.name} onChange={v => u("name", v)} required />
        <FormField label="Designation" value={data.designation} onChange={v => u("designation", v)} required />
        <FormField label="NID No." value={data.nidNo} onChange={v => u("nidNo", v)} required />
        <FormField label="Potential Successor Name" value={data.successorName} onChange={v => u("successorName", v)} />
        <FormField label="Contact Number" value={data.contactNumber} onChange={v => u("contactNumber", v)} required />
        <FormField label="Relationship (Key Person & Successor)" value={data.relationshipWithSuccessor} onChange={v => u("relationshipWithSuccessor", v)} />
        <FormField label="Business Experience (Years)" value={data.businessExperienceYears} onChange={v => u("businessExperienceYears", v)} type="number" />
        <FormSelect label="Residence Status" value={data.residenceStatus} onChange={v => u("residenceStatus", v)}
          options={[{value:"Permanent",label:"Permanent"},{value:"Rented",label:"Rented"}]} />
        <FormSelect label="Marital Status" value={data.maritalStatus} onChange={v => u("maritalStatus", v)}
          options={[{value:"Married",label:"Married"},{value:"Unmarried",label:"Unmarried"},{value:"Divorced",label:"Divorced"},{value:"Widowed",label:"Widowed"}]} />
        <FormField label="Doing Current Business for (years)" value={data.currentBusinessYears} onChange={v => u("currentBusinessYears", v)} type="number" />
        <FormField label="Date of Birth" value={data.dateOfBirth} onChange={v => u("dateOfBirth", v)} type="date" required />
        <FormField label="Other Source of Income" value={data.otherIncomeSource} onChange={v => u("otherIncomeSource", v)} />
        <FormField label="Tax Certificate & TIN No." value={data.taxCertificateTin} onChange={v => u("taxCertificateTin", v)} />
        <FormField label="No. of Dependent Family Members" value={data.dependentFamilyMembers} onChange={v => u("dependentFamilyMembers", v)} type="number" />
      </div>
      <FormTextarea label="Description of PEP (if any)" value={data.pepDescription} onChange={v => u("pepDescription", v)} placeholder="N/A if not applicable" rows={2} />
      <FormTextarea label="Present Address" value={data.presentAddress} onChange={v => u("presentAddress", v)} required rows={2} />
      <FormTextarea label="Permanent Address" value={data.permanentAddress} onChange={v => u("permanentAddress", v)} required rows={2} />
    </SectionCard>
  );
};

export default StepKeyPerson;
