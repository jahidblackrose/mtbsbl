import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StatusBadge from "@/components/common/StatusBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { LoanStatus, LoanType } from "@/types/loan";
import { Plus, Search } from "lucide-react";

interface MockApp {
  id: string;
  customer: string;
  type: LoanType;
  amount: string;
  status: LoanStatus;
  branch: string;
  rm: string;
  date: string;
}

const MOCK_APPS: MockApp[] = [
  { id: "APP-2024-001", customer: "Rahman Traders", type: "SBL", amount: "৳25,00,000", status: "under_review", branch: "Gulshan", rm: "Karim Ahmed", date: "2024-12-10" },
  { id: "APP-2024-002", customer: "Alam Garments", type: "SBL_PLUS", amount: "৳50,00,000", status: "cib_pending", branch: "Motijheel", rm: "Karim Ahmed", date: "2024-12-09" },
  { id: "APP-2024-003", customer: "Hasan Enterprise", type: "TOP_UP", amount: "৳10,00,000", status: "approved", branch: "Gulshan", rm: "Rafiq Hasan", date: "2024-12-08" },
  { id: "APP-2024-004", customer: "Karim Motors", type: "SBL", amount: "৳35,00,000", status: "query_raised", branch: "Dhanmondi", rm: "Karim Ahmed", date: "2024-12-07" },
  { id: "APP-2024-005", customer: "Fatima Foods", type: "SBL_PLUS", amount: "৳40,00,000", status: "sanction_generated", branch: "Gulshan", rm: "Rafiq Hasan", date: "2024-12-06" },
  { id: "APP-2024-006", customer: "Noor Textiles", type: "SBL", amount: "৳15,00,000", status: "disbursed", branch: "Chittagong", rm: "Karim Ahmed", date: "2024-12-05" },
  { id: "APP-2024-007", customer: "Star Electronics", type: "TOP_UP", amount: "৳8,00,000", status: "draft", branch: "Gulshan", rm: "Karim Ahmed", date: "2024-12-04" },
];

const LOAN_TYPE_LABELS: Record<LoanType, string> = { SBL: "SBL", SBL_PLUS: "SBL Plus", TOP_UP: "Top-up" };

const ApplicationsPage = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filtered = MOCK_APPS.filter((app) => {
    const matchSearch = !search || app.customer.toLowerCase().includes(search.toLowerCase()) || app.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || app.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Loan Applications</h1>
          <p className="text-muted-foreground">Manage and track all loan applications.</p>
        </div>
        <Button onClick={() => navigate("/applications/new")}>
          <Plus className="mr-2 h-4 w-4" /> New Application
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by ID or customer…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-44">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="submitted">Submitted</SelectItem>
                <SelectItem value="cib_pending">CIB Pending</SelectItem>
                <SelectItem value="under_review">Under Review</SelectItem>
                <SelectItem value="query_raised">Query Raised</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="declined">Declined</SelectItem>
                <SelectItem value="disbursed">Disbursed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">App ID</th>
                  <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">Customer</th>
                  <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">Type</th>
                  <th className="px-4 py-2.5 text-right font-medium text-muted-foreground">Amount</th>
                  <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">Branch</th>
                  <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">RM</th>
                  <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">Status</th>
                  <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">Date</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((app) => (
                  <tr key={app.id} className="border-b last:border-0 hover:bg-muted/30 cursor-pointer transition-colors" onClick={() => navigate(`/applications/${app.id}`)}>
                    <td className="px-4 py-2.5 font-mono text-xs">{app.id}</td>
                    <td className="px-4 py-2.5 font-medium">{app.customer}</td>
                    <td className="px-4 py-2.5">{LOAN_TYPE_LABELS[app.type]}</td>
                    <td className="px-4 py-2.5 text-right">{app.amount}</td>
                    <td className="px-4 py-2.5">{app.branch}</td>
                    <td className="px-4 py-2.5">{app.rm}</td>
                    <td className="px-4 py-2.5"><StatusBadge status={app.status} /></td>
                    <td className="px-4 py-2.5 text-muted-foreground">{app.date}</td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-4 py-8 text-center text-muted-foreground">No applications found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApplicationsPage;
