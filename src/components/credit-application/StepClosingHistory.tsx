import type { ClosingHistoryRow } from "@/types/credit-application";
import { FormField, FormSelect, AddRowButton, RemoveRowButton, SectionCard } from "./shared";

interface Props { data: ClosingHistoryRow[]; onChange: (d: ClosingHistoryRow[]) => void; }

const empty = (): ClosingHistoryRow => ({
  fiName: "", accountName: "", facilityType: "", initialSanctionDate: "",
  initialSanctionLimit: "", lastSanctionDate: "", lastSanctionLimit: "", closingDate: "", closingType: "",
});

const StepClosingHistory = ({ data, onChange }: Props) => {
  const add = () => onChange([...data, empty()]);
  const remove = (i: number) => onChange(data.filter((_, idx) => idx !== i));
  const update = (i: number, f: keyof ClosingHistoryRow, v: string) => {
    onChange(data.map((r, idx) => (idx === i ? { ...r, [f]: v } : r)));
  };

  return (
    <SectionCard title="5. Previous Loan Closing History" description="Details of previously closed loan facilities.">
      {data.map((row, i) => (
        <div key={i} className="rounded-md border border-border p-4 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs font-semibold text-muted-foreground">History #{i + 1}</span>
            <RemoveRowButton onClick={() => remove(i)} />
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <FormField label="FI Name" value={row.fiName} onChange={v => update(i, "fiName", v)} />
            <FormField label="Account Name" value={row.accountName} onChange={v => update(i, "accountName", v)} />
            <FormField label="Facility Type" value={row.facilityType} onChange={v => update(i, "facilityType", v)} />
            <FormField label="Initial Sanction Date" value={row.initialSanctionDate} onChange={v => update(i, "initialSanctionDate", v)} type="date" />
            <FormField label="Initial Limit (BDT M)" value={row.initialSanctionLimit} onChange={v => update(i, "initialSanctionLimit", v)} type="number" />
            <FormField label="Last Sanction Date" value={row.lastSanctionDate} onChange={v => update(i, "lastSanctionDate", v)} type="date" />
            <FormField label="Last Limit (BDT M)" value={row.lastSanctionLimit} onChange={v => update(i, "lastSanctionLimit", v)} type="number" />
            <FormField label="Closing Date" value={row.closingDate} onChange={v => update(i, "closingDate", v)} type="date" />
            <FormSelect label="Closing Type" value={row.closingType} onChange={v => update(i, "closingType", v)}
              options={[{value:"Maturity",label:"Maturity"},{value:"Foreclosure",label:"Foreclosure"},{value:"Write-off",label:"Write-off"}]} />
          </div>
        </div>
      ))}
      {data.length === 0 && <p className="text-sm text-muted-foreground italic">No previous closing history.</p>}
      <AddRowButton onClick={add} label="Add History" />
    </SectionCard>
  );
};

export default StepClosingHistory;
