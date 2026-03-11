import type { PremiseRow } from "@/types/credit-application";
import { FormField, FormSelect, AddRowButton, RemoveRowButton, SectionCard } from "./shared";

interface Props { data: PremiseRow[]; onChange: (d: PremiseRow[]) => void; }

const empty = (): PremiseRow => ({
  premiseType: "", address: "", areaSft: "", ownershipStatus: "", supportingDocuments: "", deedValidity: "",
});

const StepPremise = ({ data, onChange }: Props) => {
  const add = () => onChange([...data, empty()]);
  const remove = (i: number) => onChange(data.filter((_, idx) => idx !== i));
  const update = (i: number, f: keyof PremiseRow, v: string) => {
    onChange(data.map((r, idx) => (idx === i ? { ...r, [f]: v } : r)));
  };

  return (
    <SectionCard title="8. Premise Ownership" description="Business premises details.">
      {data.map((row, i) => (
        <div key={i} className="rounded-md border border-border p-4 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs font-semibold text-muted-foreground">Premise #{i + 1}</span>
            <RemoveRowButton onClick={() => remove(i)} />
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <FormSelect label="Premise Type" value={row.premiseType} onChange={v => update(i, "premiseType", v)}
              options={[{value:"Office",label:"Office"},{value:"Showroom",label:"Showroom"},{value:"Godown",label:"Godown"},{value:"Factory",label:"Factory"}]} />
            <FormField label="Area (SFT)" value={row.areaSft} onChange={v => update(i, "areaSft", v)} type="number" />
            <FormSelect label="Ownership Status" value={row.ownershipStatus} onChange={v => update(i, "ownershipStatus", v)}
              options={[{value:"Rented",label:"Rented"},{value:"Owned",label:"Owned"}]} />
            <FormSelect label="Supporting Documents" value={row.supportingDocuments} onChange={v => update(i, "supportingDocuments", v)}
              options={[{value:"Rental Deed",label:"Rental Deed"},{value:"Utility Bill",label:"Utility Bill"},{value:"Ownership Deed",label:"Ownership Deed"}]} />
            <FormField label="Deed Validity" value={row.deedValidity} onChange={v => update(i, "deedValidity", v)} type="date" />
          </div>
          <FormField label="Address" value={row.address} onChange={v => update(i, "address", v)} />
        </div>
      ))}
      {data.length === 0 && <p className="text-sm text-muted-foreground italic">No premises added.</p>}
      <AddRowButton onClick={add} label="Add Premise" />
    </SectionCard>
  );
};

export default StepPremise;
