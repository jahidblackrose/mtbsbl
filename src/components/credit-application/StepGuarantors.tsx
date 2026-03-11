import type { GuarantorRow } from "@/types/credit-application";
import { FormField, FormSelect, AddRowButton, RemoveRowButton, SectionCard } from "./shared";

interface Props { data: GuarantorRow[]; onChange: (d: GuarantorRow[]) => void; }

const empty = (): GuarantorRow => ({
  name: "", age: "", relationWithBorrower: "", profession: "", residenceStatus: "",
  businessName: "", cellNo: "", pnw: "", fundedLoanLimit: "",
});

const StepGuarantors = ({ data, onChange }: Props) => {
  const add = () => onChange([...data, empty()]);
  const remove = (i: number) => onChange(data.filter((_, idx) => idx !== i));
  const update = (i: number, f: keyof GuarantorRow, v: string) => {
    onChange(data.map((r, idx) => (idx === i ? { ...r, [f]: v } : r)));
  };

  return (
    <SectionCard title="14. Personal Guarantors" description="Details of personal guarantors for the facility.">
      {data.map((row, i) => (
        <div key={i} className="rounded-md border border-border p-4 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs font-semibold text-muted-foreground">Guarantor #{i + 1}</span>
            <RemoveRowButton onClick={() => remove(i)} />
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <FormField label="Name" value={row.name} onChange={v => update(i, "name", v)} />
            <FormField label="Age" value={row.age} onChange={v => update(i, "age", v)} type="number" />
            <FormField label="Relationship with Key Borrower" value={row.relationWithBorrower} onChange={v => update(i, "relationWithBorrower", v)} />
            <FormField label="Profession" value={row.profession} onChange={v => update(i, "profession", v)} />
            <FormSelect label="Residence Status" value={row.residenceStatus} onChange={v => update(i, "residenceStatus", v)}
              options={[{value:"Permanent",label:"Permanent"},{value:"Rented",label:"Rented"}]} />
            <FormField label="Business Name (if any)" value={row.businessName} onChange={v => update(i, "businessName", v)} />
            <FormField label="Cell No." value={row.cellNo} onChange={v => update(i, "cellNo", v)} />
            <FormField label="PNW (M)" value={row.pnw} onChange={v => update(i, "pnw", v)} type="number" />
            <FormField label="Funded Loan Limit (M)" value={row.fundedLoanLimit} onChange={v => update(i, "fundedLoanLimit", v)} type="number" />
          </div>
        </div>
      ))}
      {data.length === 0 && <p className="text-sm text-muted-foreground italic">No guarantors added.</p>}
      <AddRowButton onClick={add} label="Add Guarantor" />
    </SectionCard>
  );
};

export default StepGuarantors;
