/**
 * Dashboard Data Models
 * ======================
 */

import type { LoanStatus } from "./loan";

export interface KpiData {
  totalApplications: number;
  pendingReview: number;
  approved: number;
  avgTatDays: string;
}

export interface RecentApplication {
  id: string;
  customer: string;
  type: string;
  /** Formatted amount string */
  amount: string;
  status: LoanStatus;
  date: string;
}

export interface PendingTask {
  title: string;
  priority: "high" | "medium" | "low";
  time: string;
}

export interface DashboardData {
  kpis: KpiData;
  recentApplications: RecentApplication[];
  pendingTasks: PendingTask[];
}
