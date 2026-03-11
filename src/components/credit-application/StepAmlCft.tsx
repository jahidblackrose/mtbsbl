import type { AmlCftItem } from "@/types/credit-application";
import { FormSelect, SectionCard } from "./shared";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Props { data: AmlCftItem[]; onChange: (d: AmlCftItem[]) => void; }

const StepAmlCft = ({ data, onChange }: Props) => {
  const update = (i: number, f: keyof AmlCftItem, v: string) => {
    onChange(data.map((item, idx) => (idx === i ? { ...item, [f]: v } : item)));
  };

  return (
    <SectionCard title="12. AML/CFT Declaration Checklist" description="All 9 items must be reviewed and marked.">
      <div className="space-y-3">
        {data.map((item, i) => (
          <div key={i} className="rounded-md border border-border p-3 space-y-2">
            <p className="text-sm font-medium text-foreground">
              <span className="text-muted-foreground mr-1">{i + 1}.</span> {item.label}
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <FormSelect label="Status" value={item.status} onChange={v => update(i, "status", v)}
                options={[{value:"Yes",label:"Yes"},{value:"No",label:"No"},{value:"N/A",label:"N/A"}]} />
              <div className="space-y-1.5">
                <Label className="text-xs font-medium text-foreground">Remarks</Label>
                <Input value={item.remarks} onChange={e => update(i, "remarks", e.target.value)} placeholder="Remarks..." />
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
};

export default StepAmlCft;
