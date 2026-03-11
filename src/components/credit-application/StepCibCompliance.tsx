import type { CibComplianceRow } from "@/types/credit-application";
import { FormField, FormSelect, AddRowButton, RemoveRowButton, SectionCard } from "./shared";

interface Props { data: CibComplianceRow[]; onChange: (d: CibComplianceRow[]) => void; }

const empty = (): CibComplianceRow => ({
  name: "", cibCode: "", inquiryDate: "", expiryDate: "", status: "",
});

const StepCibCompliance = ({ data, onChange }: Props) => {
  const add = () => { if (data.length < 4) onChange([...data, empty()]); };
  const remove = (i: number) => onChange(data.filter((_, idx) => idx !== i));
  const update = (i: number, f: keyof CibComplianceRow, v: string) => {
    onChange(data.map((r, idx) => (idx === i ? { ...r, [f]: v } : r)));
  };

  return (
    <SectionCard title="13. CIB Compliance" description="CIB of Mother Concern and guarantors. Up to 4 entries.">
      {data.map((row, i) => (
        <div key={i} className="rounded-md border border-border p-4 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs font-semibold text-muted-foreground">CIB #{i + 1}</span>
            <RemoveRowButton onClick={() => remove(i)} />
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <FormField label="Name" value={row.name} onChange={v => update(i, "name", v)} />
            <FormField label="CIB Code" value={row.cibCode} onChange={v => update(i, "cibCode", v)} />
            <FormField label="Inquiry Date" value={row.inquiryDate} onChange={v => update(i, "inquiryDate", v)} type="date" />
            <FormField label="Expiry Date" value={row.expiryDate} onChange={v => update(i, "expiryDate", v)} type="date" />
            <FormSelect label="Status" value={row.status} onChange={v => update(i, "status", v)}
              options={[{value:"Standard",label:"Standard"},{value:"SMA",label:"SMA"},{value:"Classified",label:"Classified"}]} />
          </div>
        </div>
      ))}
      {data.length === 0 && <p className="text-sm text-muted-foreground italic">No CIB entries.</p>}
      {data.length < 4 && <AddRowButton onClick={add} label="Add CIB Entry" />}
    </SectionCard>
  );
};

export default StepCibCompliance;
