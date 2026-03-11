import type { BankTransactionRow } from "@/types/credit-application";
import { FormField, AddRowButton, RemoveRowButton, SectionCard } from "./shared";

interface Props { data: BankTransactionRow[]; onChange: (d: BankTransactionRow[]) => void; }

const empty = (): BankTransactionRow => ({
  bankName: "", accountName: "", accountType: "", sanctionedLimit: "",
  fromDate: "", toDate: "", totalCreditTransaction: "", maxBalance: "", minBalance: "",
});

const StepBankTransaction = ({ data, onChange }: Props) => {
  const add = () => onChange([...data, empty()]);
  const remove = (i: number) => onChange(data.filter((_, idx) => idx !== i));
  const update = (i: number, f: keyof BankTransactionRow, v: string) => {
    onChange(data.map((r, idx) => (idx === i ? { ...r, [f]: v } : r)));
  };

  return (
    <SectionCard title="4. Record of Bank Transaction" description="Transaction records across all banking relationships.">
      {data.map((row, i) => (
        <div key={i} className="rounded-md border border-border p-4 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs font-semibold text-muted-foreground">Record #{i + 1}</span>
            <RemoveRowButton onClick={() => remove(i)} />
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <FormField label="Bank Name" value={row.bankName} onChange={v => update(i, "bankName", v)} />
            <FormField label="Account Name" value={row.accountName} onChange={v => update(i, "accountName", v)} />
            <FormField label="Account Type" value={row.accountType} onChange={v => update(i, "accountType", v)} />
            <FormField label="Sanctioned Limit (M)" value={row.sanctionedLimit} onChange={v => update(i, "sanctionedLimit", v)} />
            <FormField label="From" value={row.fromDate} onChange={v => update(i, "fromDate", v)} type="date" />
            <FormField label="To" value={row.toDate} onChange={v => update(i, "toDate", v)} type="date" />
            <FormField label="Total Credit Transaction/Limit (M)" value={row.totalCreditTransaction} onChange={v => update(i, "totalCreditTransaction", v)} type="number" />
            <FormField label="Max Balance (M)" value={row.maxBalance} onChange={v => update(i, "maxBalance", v)} type="number" />
            <FormField label="Min Balance (M)" value={row.minBalance} onChange={v => update(i, "minBalance", v)} type="number" />
          </div>
        </div>
      ))}
      {data.length === 0 && <p className="text-sm text-muted-foreground italic">No bank transaction records added.</p>}
      <AddRowButton onClick={add} label="Add Record" />
    </SectionCard>
  );
};

export default StepBankTransaction;
