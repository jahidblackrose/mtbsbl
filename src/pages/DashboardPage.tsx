import { useAuth } from "@/contexts/AuthContext";
import KpiCard from "@/components/common/KpiCard";
import StatusBadge from "@/components/common/StatusBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ROLE_LABELS } from "@/types/auth";
import type { LoanStatus } from "@/types/loan";
import {
  FileText,
  Clock,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  Users,
  Search,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

// Mock data
const RECENT_APPLICATIONS: {
  id: string;
  customer: string;
  type: string;
  amount: string;
  status: LoanStatus;
  date: string;
}[] = [
  { id: "APP-2024-001", customer: "Rahman Traders", type: "SBL", amount: "৳25,00,000", status: "under_review", date: "2024-12-10" },
  { id: "APP-2024-002", customer: "Alam Garments", type: "SBL Plus", amount: "৳50,00,000", status: "cib_pending", date: "2024-12-09" },
  { id: "APP-2024-003", customer: "Hasan Enterprise", type: "Top-up", amount: "৳10,00,000", status: "approved", date: "2024-12-08" },
  { id: "APP-2024-004", customer: "Karim Motors", type: "SBL", amount: "৳35,00,000", status: "query_raised", date: "2024-12-07" },
  { id: "APP-2024-005", customer: "Fatima Foods", type: "SBL Plus", amount: "৳40,00,000", status: "sanction_generated", date: "2024-12-06" },
];

const PENDING_TASKS = [
  { title: "CIB report upload pending for APP-2024-002", priority: "high", time: "2h ago" },
  { title: "Query response needed for APP-2024-004", priority: "medium", time: "5h ago" },
  { title: "Document review: Charge docs for APP-2024-005", priority: "low", time: "1d ago" },
  { title: "Sanction letter approval for APP-2024-003", priority: "medium", time: "1d ago" },
];

const DashboardPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Welcome, {user?.name}
        </h1>
        <p className="text-muted-foreground">
          {user?.role ? ROLE_LABELS[user.role] : ""} — {user?.branch || "Head Office"}
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard title="Total Applications" value={128} subtitle="This month" icon={FileText} variant="primary" />
        <KpiCard title="Pending Review" value={23} subtitle="Awaiting action" icon={Clock} variant="warning" />
        <KpiCard title="Approved" value={45} subtitle="This month" icon={CheckCircle2} variant="success" />
        <KpiCard title="Avg. TAT" value="4.2 days" subtitle="Last 30 days" icon={TrendingUp} variant="info" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Applications */}
        <Card className="lg:col-span-2 animate-fade-in">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-base font-semibold">Recent Applications</CardTitle>
            <Button variant="ghost" size="sm" className="text-xs" onClick={() => navigate("/applications")}>
              View All <ArrowRight className="ml-1 h-3 w-3" />
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">ID</th>
                    <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">Customer</th>
                    <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">Type</th>
                    <th className="px-4 py-2.5 text-right font-medium text-muted-foreground">Amount</th>
                    <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {RECENT_APPLICATIONS.map((app) => (
                    <tr key={app.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-2.5 font-mono text-xs">{app.id}</td>
                      <td className="px-4 py-2.5">{app.customer}</td>
                      <td className="px-4 py-2.5">{app.type}</td>
                      <td className="px-4 py-2.5 text-right">{app.amount}</td>
                      <td className="px-4 py-2.5">
                        <StatusBadge status={app.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Pending Tasks */}
        <Card className="animate-fade-in">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">Pending Tasks</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {PENDING_TASKS.map((task, i) => (
              <div key={i} className="flex items-start gap-3 rounded-md border p-3">
                <AlertTriangle
                  className={`mt-0.5 h-4 w-4 shrink-0 ${
                    task.priority === "high"
                      ? "text-destructive"
                      : task.priority === "medium"
                      ? "text-warning"
                      : "text-muted-foreground"
                  }`}
                />
                <div className="min-w-0 flex-1">
                  <p className="text-sm leading-snug">{task.title}</p>
                  <p className="text-xs text-muted-foreground">{task.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
