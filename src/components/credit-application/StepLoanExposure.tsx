import type { LoanExposureRow } from "@/types/credit-application";
import { FormField, AddRowButton, RemoveRowButton, SectionCard } from "./shared";

interface Props { data: LoanExposureRow[]; onChange: (d: LoanExposureRow[]) => void; }

const empty = (): LoanExposureRow => ({
  businessName: "", fiName: "", facilityNature: "", existingLimit: "", existingOS: "",
  existingPricing: "", existingExpiry: "", insSize: "", dueEmi: "", paidEmi: "", overdue: "",
  proposedLimit: "", proposedPricing: "", proposedExpiryTenor: "", proposedPurpose: "",
});

const StepLoanExposure = ({ data, onChange }: Props) => {
  const add = () => onChange([...data, empty()]);
  const remove = (i: number) => onChange(data.filter((_, idx) => idx !== i));
  const update = (i: number, f: keyof LoanExposureRow, v: string) => {
    onChange(data.map((r, idx) => (idx === i ? { ...r, [f]: v } : r)));
  };

  return (
    <SectionCard title="3. Loan Exposure in All FIs" description="(NIL) if none. Enter existing and proposed exposures.">
      {data.map((row, i) => (
        <div key={i} className="rounded-md border border-border p-4 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs font-semibold text-muted-foreground">Exposure #{i + 1}</span>
            <RemoveRowButton onClick={() => remove(i)} />
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <FormField label="Business Name" value={row.businessName} onChange={v => update(i, "businessName", v)} />
            <FormField label="FI Name" value={row.fiName} onChange={v => update(i, "fiName", v)} />
            <FormField label="Nature of Facility" value={row.facilityNature} onChange={v => update(i, "facilityNature", v)} />
          </div>
          <p className="text-xs font-semibold text-muted-foreground pt-2">Existing</p>
          <div className="grid gap-3 sm:grid-cols-4">
            <FormField label="Limit (M)" value={row.existingLimit} onChange={v => update(i, "existingLimit", v)} type="number" />
            <FormField label="O/S (M)" value={row.existingOS} onChange={v => update(i, "existingOS", v)} type="number" />
            <FormField label="Pricing (%)" value={row.existingPricing} onChange={v => update(i, "existingPricing", v)} type="number" />
            <FormField label="Expiry" value={row.existingExpiry} onChange={v => update(i, "existingExpiry", v)} type="date" />
            <FormField label="Ins. Size (M)" value={row.insSize} onChange={v => update(i, "insSize", v)} type="number" />
            <FormField label="Due EMI" value={row.dueEmi} onChange={v => update(i, "dueEmi", v)} type="number" />
            <FormField label="Paid EMI" value={row.paidEmi} onChange={v => update(i, "paidEmi", v)} type="number" />
            <FormField label="Overdue" value={row.overdue} onChange={v => update(i, "overdue", v)} type="number" />
          </div>
          <p className="text-xs font-semibold text-muted-foreground pt-2">Proposed</p>
          <div className="grid gap-3 sm:grid-cols-4">
            <FormField label="Limit (M)" value={row.proposedLimit} onChange={v => update(i, "proposedLimit", v)} type="number" />
            <FormField label="Pricing (%)" value={row.proposedPricing} onChange={v => update(i, "proposedPricing", v)} type="number" />
            <FormField label="Expiry/Tenor" value={row.proposedExpiryTenor} onChange={v => update(i, "proposedExpiryTenor", v)} />
            <FormField label="Purpose" value={row.proposedPurpose} onChange={v => update(i, "proposedPurpose", v)} />
          </div>
        </div>
      ))}
      {data.length === 0 && <p className="text-sm text-muted-foreground italic">(NIL) — No exposure in other FIs.</p>}
      <AddRowButton onClick={add} label="Add Exposure" />
    </SectionCard>
  );
};

export default StepLoanExposure;
