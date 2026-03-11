import type { ProposedFacilityRow } from "@/types/credit-application";
import { FormField, FormSelect, AddRowButton, RemoveRowButton, SectionCard } from "./shared";

interface Props { data: ProposedFacilityRow[]; onChange: (d: ProposedFacilityRow[]) => void; }

const empty = (): ProposedFacilityRow => ({
  facilityNature: "", limit: "", pricing: "", tenor: "", gracePeriod: "", purpose: "", marginSecurity: "",
});

const StepProposedFacility = ({ data, onChange }: Props) => {
  const add = () => onChange([...data, empty()]);
  const remove = (i: number) => onChange(data.filter((_, idx) => idx !== i));
  const update = (i: number, f: keyof ProposedFacilityRow, v: string) => {
    const rows = data.map((r, idx) => (idx === i ? { ...r, [f]: v } : r));
    onChange(rows);
  };

  return (
    <SectionCard title="2. Proposed Facility with MTB" description="Repeatable rows for each proposed facility.">
      {data.map((row, i) => (
        <div key={i} className="rounded-md border border-border p-4 space-y-3 relative">
          <div className="flex justify-between items-center">
            <span className="text-xs font-semibold text-muted-foreground">Facility #{i + 1}</span>
            <RemoveRowButton onClick={() => remove(i)} />
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <FormSelect label="Nature of Facility" value={row.facilityNature} onChange={v => update(i, "facilityNature", v)}
              options={[{value:"SBL",label:"SBL"},{value:"SBL PLUS",label:"SBL PLUS"},{value:"TOP_UP",label:"Top-up"},{value:"OD",label:"OD"},{value:"CC",label:"CC"}]} />
            <FormField label="Limit (BDT M)" value={row.limit} onChange={v => update(i, "limit", v)} type="number" />
            <FormField label="Pricing (%)" value={row.pricing} onChange={v => update(i, "pricing", v)} type="number" />
            <FormField label="Tenor (Months)" value={row.tenor} onChange={v => update(i, "tenor", v)} type="number" />
            <FormField label="Grace Period (months)" value={row.gracePeriod} onChange={v => update(i, "gracePeriod", v)} type="number" />
            <FormField label="Purpose" value={row.purpose} onChange={v => update(i, "purpose", v)} className="sm:col-span-2" />
            <FormField label="Margin / Security" value={row.marginSecurity} onChange={v => update(i, "marginSecurity", v)} className="lg:col-span-2" />
          </div>
        </div>
      ))}
      {data.length === 0 && <p className="text-sm text-muted-foreground italic">No facilities added yet.</p>}
      <AddRowButton onClick={add} label="Add Facility" />
    </SectionCard>
  );
};

export default StepProposedFacility;
