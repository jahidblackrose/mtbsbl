import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import KpiCard from "@/components/common/KpiCard";
import StatusBadge from "@/components/common/StatusBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ROLE_LABELS } from "@/types/auth";
import type { DashboardData } from "@/types/dashboard";
import { fetchDashboardData } from "@/api/dashboard.api";
import {
  FileText,
  Clock,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState<DashboardData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDashboardData().then((res) => {
      if (res.status === 200 && res.data) {
        setData(res.data);
      } else {
        setError(res.message);
      }
    });
  }, []);

  if (error) {
    return <div className="p-6 text-destructive">{error}</div>;
  }

  if (!data) {
    return <div className="p-6 text-muted-foreground">Loading dashboard…</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Welcome, {user?.name}</h1>
        <p className="text-muted-foreground">
          {user?.role ? ROLE_LABELS[user.role] : ""} — {user?.branch || "Head Office"}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard title="Total Applications" value={data.kpis.totalApplications} subtitle="This month" icon={FileText} variant="primary" />
        <KpiCard title="Pending Review" value={data.kpis.pendingReview} subtitle="Awaiting action" icon={Clock} variant="warning" />
        <KpiCard title="Approved" value={data.kpis.approved} subtitle="This month" icon={CheckCircle2} variant="success" />
        <KpiCard title="Avg. TAT" value={`${data.kpis.avgTatDays} days`} subtitle="Last 30 days" icon={TrendingUp} variant="info" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
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
                  {data.recentApplications.map((app) => (
                    <tr key={app.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-2.5 font-mono text-xs">{app.id}</td>
                      <td className="px-4 py-2.5">{app.customer}</td>
                      <td className="px-4 py-2.5">{app.type}</td>
                      <td className="px-4 py-2.5 text-right">{app.amount}</td>
                      <td className="px-4 py-2.5"><StatusBadge status={app.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card className="animate-fade-in">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">Pending Tasks</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {data.pendingTasks.map((task, i) => (
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
