import { Badge } from "@/components/ui/badge";
import type { LoanStatus } from "@/types/loan";
import { LOAN_STATUS_LABELS, LOAN_STATUS_VARIANT } from "@/types/loan";
import { cn } from "@/lib/utils";

const variantClasses: Record<string, string> = {
  success: "bg-success text-success-foreground",
  destructive: "bg-destructive text-destructive-foreground",
  warning: "bg-warning text-warning-foreground",
  info: "bg-info text-info-foreground",
  secondary: "bg-secondary text-secondary-foreground",
};

interface StatusBadgeProps {
  status: LoanStatus;
  className?: string;
}

const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const variant = LOAN_STATUS_VARIANT[status];
  return (
    <Badge className={cn("text-xs font-medium", variantClasses[variant] || variantClasses.secondary, className)}>
      {LOAN_STATUS_LABELS[status]}
    </Badge>
  );
};

export default StatusBadge;
