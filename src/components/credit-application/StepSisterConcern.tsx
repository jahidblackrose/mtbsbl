import type { SisterConcernData, SisterConcernRow } from "@/types/credit-application";
import { FormField, AddRowButton, RemoveRowButton, SectionCard } from "./shared";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface Props { data: SisterConcernData; onChange: (d: SisterConcernData) => void; }

const empty = (): SisterConcernRow => ({
  concernName: "", businessNature: "", legalForm: "", sharePercent: "",
  businessSince: "", totalInvestment: "", bankLiability: "", equity: "", turnover: "", profit: "",
});

const StepSisterConcern = ({ data, onChange }: Props) => {
  const add = () => onChange({ ...data, rows: [...data.rows, empty()] });
  const remove = (i: number) => onChange({ ...data, rows: data.rows.filter((_, idx) => idx !== i) });
  const update = (i: number, f: keyof SisterConcernRow, v: string) => {
    onChange({ ...data, rows: data.rows.map((r, idx) => (idx === i ? { ...r, [f]: v } : r)) });
  };

  return (
    <SectionCard title="11. Sister / Allied Concern" description="Mark N/A if not applicable.">
      <div className="flex items-center gap-2">
        <Checkbox checked={data.isNA} onCheckedChange={(c) => onChange({ ...data, isNA: !!c })} id="sister-na" />
        <Label htmlFor="sister-na" className="text-sm">Not Applicable (N/A)</Label>
      </div>
      {!data.isNA && (
        <>
          {data.rows.map((row, i) => (
            <div key={i} className="rounded-md border border-border p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-semibold text-muted-foreground">Concern #{i + 1}</span>
                <RemoveRowButton onClick={() => remove(i)} />
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                <FormField label="Name of Concern" value={row.concernName} onChange={v => update(i, "concernName", v)} />
                <FormField label="Business Nature" value={row.businessNature} onChange={v => update(i, "businessNature", v)} />
                <FormField label="Legal Form" value={row.legalForm} onChange={v => update(i, "legalForm", v)} />
                <FormField label="% of Share" value={row.sharePercent} onChange={v => update(i, "sharePercent", v)} type="number" />
                <FormField label="Business Since" value={row.businessSince} onChange={v => update(i, "businessSince", v)} type="date" />
                <FormField label="Total Investment (M)" value={row.totalInvestment} onChange={v => update(i, "totalInvestment", v)} type="number" />
                <FormField label="Bank Liability (M)" value={row.bankLiability} onChange={v => update(i, "bankLiability", v)} type="number" />
                <FormField label="Equity (M)" value={row.equity} onChange={v => update(i, "equity", v)} type="number" />
                <FormField label="Turnover (M)" value={row.turnover} onChange={v => update(i, "turnover", v)} type="number" />
                <FormField label="Profit (M)" value={row.profit} onChange={v => update(i, "profit", v)} type="number" />
              </div>
            </div>
          ))}
          <AddRowButton onClick={add} label="Add Concern" />
        </>
      )}
    </SectionCard>
  );
};

export default StepSisterConcern;
