import { useState } from "react";
import type { RecommendationData, RecommendationBullet } from "@/types/credit-application";
import { FormTextarea, SectionCard } from "./shared";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

interface Props { data: RecommendationData; onChange: (d: RecommendationData) => void; }

const StepRecommendation = ({ data, onChange }: Props) => {
  const [newBullet, setNewBullet] = useState("");

  const toggleBullet = (i: number) => {
    const bullets = data.bullets.map((b, idx) => (idx === i ? { ...b, enabled: !b.enabled } : b));
    onChange({ ...data, bullets });
  };

  const addCustom = () => {
    if (!newBullet.trim()) return;
    const bullet: RecommendationBullet = { text: newBullet.trim(), enabled: true, isCustom: true };
    onChange({ ...data, bullets: [...data.bullets, bullet] });
    setNewBullet("");
  };

  const removeBullet = (i: number) => {
    onChange({ ...data, bullets: data.bullets.filter((_, idx) => idx !== i) });
  };

  return (
    <SectionCard title="17. Basis of Recommendation" description="SME Banking Recommendation — toggle pre-populated suggestions and add custom points.">
      <FormTextarea
        label="Recommendation Text"
        value={data.freeText}
        onChange={v => onChange({ ...data, freeText: v })}
        rows={5}
        placeholder="Write the basis of recommendation..."
      />
      <div className="space-y-2 mt-4">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Key Points</p>
        {data.bullets.map((b, i) => (
          <div key={i} className="flex items-center gap-2 rounded-md border border-border p-2">
            <Checkbox checked={b.enabled} onCheckedChange={() => toggleBullet(i)} />
            <span className={`text-sm flex-1 ${b.enabled ? "text-foreground" : "text-muted-foreground line-through"}`}>{b.text}</span>
            {b.isCustom && (
              <Button type="button" variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => removeBullet(i)}>
                <Trash2 className="h-3 w-3" />
              </Button>
            )}
          </div>
        ))}
        <div className="flex gap-2 mt-2">
          <Input value={newBullet} onChange={e => setNewBullet(e.target.value)} placeholder="Add custom point..."
            onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addCustom())} />
          <Button type="button" variant="outline" size="sm" onClick={addCustom}>
            <Plus className="h-3.5 w-3.5 mr-1" /> Add
          </Button>
        </div>
      </div>
    </SectionCard>
  );
};

export default StepRecommendation;
