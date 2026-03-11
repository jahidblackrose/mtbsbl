import type { OwnerRow } from "@/types/credit-application";
import { FormField, FormSelect, AddRowButton, RemoveRowButton, SectionCard } from "./shared";

interface Props { data: OwnerRow[]; onChange: (d: OwnerRow[]) => void; }

const empty = (): OwnerRow => ({
  name: "", designation: "", age: "", residentialAddress: "", permanentAddress: "",
  sharePercent: "", nidNo: "", mobileNumber: "", pnw: "", maritalStatus: "",
  relationWithKeyPerson: "", educationLevel: "", directorInBankNbfiPep: "",
});

const StepOwners = ({ data, onChange }: Props) => {
  const add = () => onChange([...data, empty()]);
  const remove = (i: number) => onChange(data.filter((_, idx) => idx !== i));
  const update = (i: number, f: keyof OwnerRow, v: string) => {
    onChange(data.map((r, idx) => (idx === i ? { ...r, [f]: v } : r)));
  };

  return (
    <SectionCard title="7. Owner's Information" description="Details of all owners / shareholders.">
      {data.map((row, i) => (
        <div key={i} className="rounded-md border border-border p-4 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs font-semibold text-muted-foreground">Owner #{i + 1}</span>
            <RemoveRowButton onClick={() => remove(i)} />
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <FormField label="Name" value={row.name} onChange={v => update(i, "name", v)} />
            <FormField label="Designation" value={row.designation} onChange={v => update(i, "designation", v)} />
            <FormField label="Age" value={row.age} onChange={v => update(i, "age", v)} type="number" />
            <FormField label="NID No." value={row.nidNo} onChange={v => update(i, "nidNo", v)} />
            <FormField label="Mobile" value={row.mobileNumber} onChange={v => update(i, "mobileNumber", v)} />
            <FormField label="% Shares" value={row.sharePercent} onChange={v => update(i, "sharePercent", v)} type="number" />
            <FormField label="PNW (M)" value={row.pnw} onChange={v => update(i, "pnw", v)} type="number" />
            <FormSelect label="Marital Status" value={row.maritalStatus} onChange={v => update(i, "maritalStatus", v)}
              options={[{value:"Married",label:"Married"},{value:"Unmarried",label:"Unmarried"}]} />
            <FormField label="Relation with Key Person" value={row.relationWithKeyPerson} onChange={v => update(i, "relationWithKeyPerson", v)} />
            <FormField label="Education Level" value={row.educationLevel} onChange={v => update(i, "educationLevel", v)} />
            <FormSelect label="Director in Bank/NBFI/PEP" value={row.directorInBankNbfiPep} onChange={v => update(i, "directorInBankNbfiPep", v)}
              options={[{value:"Yes",label:"Yes"},{value:"No",label:"No"}]} />
          </div>
          <FormField label="Residential Address" value={row.residentialAddress} onChange={v => update(i, "residentialAddress", v)} />
          <FormField label="Permanent Address" value={row.permanentAddress} onChange={v => update(i, "permanentAddress", v)} />
        </div>
      ))}
      {data.length === 0 && <p className="text-sm text-muted-foreground italic">No owners added.</p>}
      <AddRowButton onClick={add} label="Add Owner" />
    </SectionCard>
  );
};

export default StepOwners;
