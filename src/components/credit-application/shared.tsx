import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

interface FieldProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  type?: string;
  placeholder?: string;
  highlighted?: boolean;
  className?: string;
}

export const FormField = ({ label, value, onChange, required, type = "text", placeholder, highlighted, className }: FieldProps) => (
  <div className={`space-y-1.5 ${className || ""}`}>
    <Label className="text-xs font-medium text-foreground">
      {label}{required && <span className="text-destructive ml-0.5">*</span>}
    </Label>
    <Input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={highlighted ? "border-warning bg-warning/10 font-semibold" : ""}
    />
  </div>
);

interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  required?: boolean;
  placeholder?: string;
}

export const FormSelect = ({ label, value, onChange, options, required, placeholder }: SelectFieldProps) => (
  <div className="space-y-1.5">
    <Label className="text-xs font-medium text-foreground">
      {label}{required && <span className="text-destructive ml-0.5">*</span>}
    </Label>
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder || "Select..."} />
      </SelectTrigger>
      <SelectContent>
        {options.map((o) => (
          <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);

interface TextareaFieldProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  placeholder?: string;
  rows?: number;
}

export const FormTextarea = ({ label, value, onChange, required, placeholder, rows = 3 }: TextareaFieldProps) => (
  <div className="space-y-1.5">
    <Label className="text-xs font-medium text-foreground">
      {label}{required && <span className="text-destructive ml-0.5">*</span>}
    </Label>
    <Textarea value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} rows={rows} />
  </div>
);

export const AddRowButton = ({ onClick, label = "Add Row" }: { onClick: () => void; label?: string }) => (
  <Button type="button" variant="outline" size="sm" onClick={onClick} className="mt-2">
    <Plus className="h-3.5 w-3.5 mr-1" /> {label}
  </Button>
);

export const RemoveRowButton = ({ onClick }: { onClick: () => void }) => (
  <Button type="button" variant="ghost" size="icon" onClick={onClick} className="h-8 w-8 text-destructive hover:text-destructive">
    <Trash2 className="h-3.5 w-3.5" />
  </Button>
);

export const SectionCard = ({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) => (
  <div className="rounded-lg border border-border bg-card p-5 space-y-5">
    <div>
      <h3 className="text-base font-semibold text-foreground">{title}</h3>
      {description && <p className="text-sm text-muted-foreground mt-0.5">{description}</p>}
    </div>
    {children}
  </div>
);

export const formatBDT = (amount: string): string => {
  if (!amount) return "—";
  const num = parseFloat(amount);
  if (isNaN(num)) return amount;
  return `BDT ${num.toFixed(2)} M`;
};
