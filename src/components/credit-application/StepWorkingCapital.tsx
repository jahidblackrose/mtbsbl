import { useEffect } from "react";
import type { WorkingCapitalData } from "@/types/credit-application";
import { FormField, SectionCard } from "./shared";

interface Props { data: WorkingCapitalData; onChange: (d: WorkingCapitalData) => void; }

const p = (v: string) => parseFloat(v) || 0;

const StepWorkingCapital = ({ data, onChange }: Props) => {
  const u = (f: keyof WorkingCapitalData, v: string) => onChange({ ...data, [f]: v });

  // Auto-calculate derived fields
  useEffect(() => {
    const total = p(data.avgInventoryHolding) + p(data.avgReceivableHolding) + p(data.avgAdvancePayment) - p(data.avgPayableAmount);
    const scope = total - p(data.existingWcLoan);
    const updated: Partial<WorkingCapitalData> = {};
    const totalStr = total.toFixed(2);
    const scopeStr = scope.toFixed(2);
    if (data.totalWcRequirement !== totalStr) updated.totalWcRequirement = totalStr;
    if (data.scopeAdditionalWc !== scopeStr) updated.scopeAdditionalWc = scopeStr;
    if (Object.keys(updated).length > 0) {
      onChange({ ...data, ...updated });
    }
  }, [data.avgInventoryHolding, data.avgReceivableHolding, data.avgAdvancePayment, data.avgPayableAmount, data.existingWcLoan]);

  return (
    <SectionCard title="10. Bank Finance Requirement for Working Capital" description="Working capital analysis with auto-calculated fields.">
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Avg Inventory Holding – Current Yr (M)" value={data.avgInventoryHolding} onChange={v => u("avgInventoryHolding", v)} type="number" />
        <FormField label="Avg Receivable Holding – Current Yr (M)" value={data.avgReceivableHolding} onChange={v => u("avgReceivableHolding", v)} type="number" />
        <FormField label="Avg Advance Payment to Suppliers (M)" value={data.avgAdvancePayment} onChange={v => u("avgAdvancePayment", v)} type="number" highlighted />
        <FormField label="Avg Payable Amount – Current Yr (M)" value={data.avgPayableAmount} onChange={v => u("avgPayableAmount", v)} type="number" />
      </div>
      <div className="mt-4 rounded-md bg-muted/50 p-4 space-y-3">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Calculated Fields</p>
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField label="Total W/C Requirement (M)" value={data.totalWcRequirement} onChange={() => {}} highlighted />
          <FormField label="Existing W/C Loan in all FIs (M)" value={data.existingWcLoan} onChange={v => u("existingWcLoan", v)} type="number" />
          <FormField label="Scope for Additional W/C Loan (M)" value={data.scopeAdditionalWc} onChange={() => {}} highlighted />
          <FormField label="Proposed TL as W/C (M)" value={data.proposedTlAsWc} onChange={v => u("proposedTlAsWc", v)} type="number" />
          <FormField label="Projected Year Growth (%)" value={data.projectedGrowthPercent} onChange={v => u("projectedGrowthPercent", v)} type="number" />
          <FormField label="Debt:Equity Ratio" value={data.debtEquityRatio} onChange={v => u("debtEquityRatio", v)} highlighted />
        </div>
      </div>
    </SectionCard>
  );
};

export default StepWorkingCapital;
