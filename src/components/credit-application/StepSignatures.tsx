import type { SignaturesData } from "@/types/credit-application";
import { ATTACHMENT_CHECKLIST } from "@/types/credit-application";
import { FormField, SectionCard } from "./shared";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface Props { data: SignaturesData; onChange: (d: SignaturesData) => void; }

const StepSignatures = ({ data, onChange }: Props) => {
  const u = (f: keyof Omit<SignaturesData, "attachments">, v: string) => onChange({ ...data, [f]: v });
  const toggleAttachment = (key: string) => {
    onChange({ ...data, attachments: { ...data.attachments, [key]: !data.attachments[key] } });
  };

  return (
    <SectionCard title="18. Recommendation / Signatures" description="Signing authorities and attachment checklist.">
      <div className="grid gap-6 sm:grid-cols-3">
        <div className="space-y-3 rounded-md border border-border p-4">
          <p className="text-xs font-semibold text-primary uppercase tracking-wider">Maker</p>
          <FormField label="Name" value={data.makerName} onChange={v => u("makerName", v)} required />
          <FormField label="Designation" value={data.makerDesignation} onChange={v => u("makerDesignation", v)} required />
        </div>
        <div className="space-y-3 rounded-md border border-border p-4">
          <p className="text-xs font-semibold text-primary uppercase tracking-wider">Cluster Head</p>
          <FormField label="Name" value={data.clusterHeadName} onChange={v => u("clusterHeadName", v)} />
          <FormField label="Designation" value={data.clusterHeadDesignation} onChange={v => u("clusterHeadDesignation", v)} />
        </div>
        <div className="space-y-3 rounded-md border border-border p-4">
          <p className="text-xs font-semibold text-primary uppercase tracking-wider">Checker</p>
          <FormField label="Name" value={data.checkerName} onChange={v => u("checkerName", v)} />
          <FormField label="Designation" value={data.checkerDesignation} onChange={v => u("checkerDesignation", v)} />
        </div>
      </div>
      <div className="mt-4">
        <p className="text-sm font-semibold text-foreground mb-3">Attachments Checklist</p>
        <div className="space-y-2">
          {ATTACHMENT_CHECKLIST.map((item) => (
            <div key={item} className="flex items-center gap-2">
              <Checkbox checked={!!data.attachments[item]} onCheckedChange={() => toggleAttachment(item)} id={`att-${item}`} />
              <Label htmlFor={`att-${item}`} className="text-sm">{item}</Label>
            </div>
          ))}
        </div>
      </div>
    </SectionCard>
  );
};

export default StepSignatures;
