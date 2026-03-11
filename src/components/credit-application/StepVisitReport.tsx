import type { VisitReportData } from "@/types/credit-application";
import { FormField, FormSelect, FormTextarea, SectionCard } from "./shared";

interface Props { data: VisitReportData; onChange: (d: VisitReportData) => void; }

const StepVisitReport = ({ data, onChange }: Props) => {
  const u = (f: keyof VisitReportData, v: string) => onChange({ ...data, [f]: v });

  return (
    <SectionCard title="15. Visit Report" description="Details of business premises visit.">
      <FormTextarea label="Visit Notes" value={data.visitNotes} onChange={v => u("visitNotes", v)} rows={4} placeholder="Observations from the business visit..." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <FormField label="Visit Date" value={data.visitDate} onChange={v => u("visitDate", v)} type="date" required />
        <FormField label="Visitor 1 – Name" value={data.visitor1Name} onChange={v => u("visitor1Name", v)} />
        <FormField label="Visitor 1 – Designation" value={data.visitor1Designation} onChange={v => u("visitor1Designation", v)} />
        <FormField label="Visitor 1 – Department" value={data.visitor1Department} onChange={v => u("visitor1Department", v)} />
        <FormField label="Visitor 2 – Name" value={data.visitor2Name} onChange={v => u("visitor2Name", v)} />
        <FormField label="Visitor 2 – Designation" value={data.visitor2Designation} onChange={v => u("visitor2Designation", v)} />
        <FormField label="Visitor 2 – Department" value={data.visitor2Department} onChange={v => u("visitor2Department", v)} />
        <FormSelect label="Client Present" value={data.clientPresent} onChange={v => u("clientPresent", v)}
          options={[{value:"Yes",label:"Yes"},{value:"No",label:"No"}]} />
        <FormField label="Inventory Value (BDT M)" value={data.inventoryValue} onChange={v => u("inventoryValue", v)} type="number" />
        <FormField label="Receivable Value (BDT M)" value={data.receivableValue} onChange={v => u("receivableValue", v)} type="number" />
      </div>
    </SectionCard>
  );
};

export default StepVisitReport;
