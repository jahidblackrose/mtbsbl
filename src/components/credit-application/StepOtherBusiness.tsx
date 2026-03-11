import type { OtherBusinessData } from "@/types/credit-application";
import { FormField, FormSelect, SectionCard } from "./shared";

interface Props { data: OtherBusinessData; onChange: (d: OtherBusinessData) => void; }

const StepOtherBusiness = ({ data, onChange }: Props) => {
  const u = (f: keyof OtherBusinessData, v: string) => onChange({ ...data, [f]: v });

  return (
    <SectionCard title="9. Other Business Information" description="Manpower, sales distribution, and trade license details.">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <FormField label="Manpower – Male" value={data.manpowerMale} onChange={v => u("manpowerMale", v)} type="number" />
        <FormField label="Manpower – Female" value={data.manpowerFemale} onChange={v => u("manpowerFemale", v)} type="number" />
        <FormField label="Wholesale % of Sales" value={data.wholesalePercent} onChange={v => u("wholesalePercent", v)} type="number" />
        <FormField label="Retail % of Sales" value={data.retailPercent} onChange={v => u("retailPercent", v)} type="number" />
        <FormField label="Service % of Sales" value={data.servicePercent} onChange={v => u("servicePercent", v)} type="number" />
        <FormField label="Last Trade License No." value={data.tradeLicenseNo} onChange={v => u("tradeLicenseNo", v)} />
        <FormField label="Trade License Validity" value={data.tradeLicenseValidity} onChange={v => u("tradeLicenseValidity", v)} type="date" />
        <FormSelect label="Sales Keeping" value={data.salesKeeping} onChange={v => u("salesKeeping", v)}
          options={[{value:"Kacha Khata",label:"Kacha Khata"},{value:"Proper Books",label:"Proper Books"},{value:"Software",label:"Software"}]} />
      </div>
    </SectionCard>
  );
};

export default StepOtherBusiness;
