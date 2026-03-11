import type { ExceptionRow } from "@/types/credit-application";
import { FormField, AddRowButton, RemoveRowButton, SectionCard } from "./shared";

interface Props { data: ExceptionRow[]; onChange: (d: ExceptionRow[]) => void; }

const empty = (): ExceptionRow => ({ parameter: "", actualException: "" });

const StepExceptions = ({ data, onChange }: Props) => {
  const add = () => onChange([...data, empty()]);
  const remove = (i: number) => onChange(data.filter((_, idx) => idx !== i));
  const update = (i: number, f: keyof ExceptionRow, v: string) => {
    onChange(data.map((r, idx) => (idx === i ? { ...r, [f]: v } : r)));
  };

  return (
    <SectionCard title="16. Exceptions" description="Document any deviations from standard PPG parameters.">
      {data.map((row, i) => (
        <div key={i} className="rounded-md border border-border p-3 space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs font-semibold text-muted-foreground">#{i + 1}</span>
            <RemoveRowButton onClick={() => remove(i)} />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <FormField label="Parameter as per Existing PPG" value={row.parameter} onChange={v => update(i, "parameter", v)} />
            <FormField label="Actual Exceptions Occurred" value={row.actualException} onChange={v => update(i, "actualException", v)} />
          </div>
        </div>
      ))}
      {data.length === 0 && <p className="text-sm text-muted-foreground italic">No exceptions noted.</p>}
      <AddRowButton onClick={add} label="Add Exception" />
    </SectionCard>
  );
};

export default StepExceptions;
