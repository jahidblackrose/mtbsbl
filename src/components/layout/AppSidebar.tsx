import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import type { UserRole } from "@/types/auth";
import {
  LayoutDashboard,
  Users,
  FileText,
  ClipboardCheck,
  ShieldCheck,
  Scale,
  BarChart3,
  Settings,
  Search,
  MessageSquare,
  Building2,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  path: string;
  icon: React.ElementType;
  roles: UserRole[];
}

const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard, roles: ["branch_rm", "cib", "underwriting", "cad", "mgl", "sme_division", "admin"] },
  { label: "Customers", path: "/customers", icon: Users, roles: ["branch_rm", "admin", "sme_division"] },
  { label: "Loan Applications", path: "/applications", icon: FileText, roles: ["branch_rm", "underwriting", "cad", "sme_division", "admin"] },
  { label: "CIB Requests", path: "/cib", icon: Search, roles: ["cib", "branch_rm", "sme_division", "admin"] },
  { label: "Underwriting", path: "/underwriting", icon: ClipboardCheck, roles: ["underwriting", "sme_division", "admin"] },
  { label: "CAD", path: "/cad", icon: ShieldCheck, roles: ["cad", "sme_division", "admin"] },
  { label: "Legal (MGL)", path: "/mgl", icon: Scale, roles: ["mgl", "sme_division", "admin"] },
  { label: "Queries", path: "/queries", icon: MessageSquare, roles: ["branch_rm", "cib", "underwriting", "cad", "mgl", "sme_division", "admin"] },
  { label: "Reports", path: "/reports", icon: BarChart3, roles: ["sme_division", "admin", "underwriting", "cad"] },
  { label: "Admin", path: "/admin", icon: Settings, roles: ["admin"] },
];

interface AppSidebarProps {
  open: boolean;
}

const AppSidebar = ({ open }: AppSidebarProps) => {
  const { user } = useAuth();
  const location = useLocation();

  const filteredItems = NAV_ITEMS.filter((item) => user && item.roles.includes(user.role));

  return (
    <aside
      className={cn(
        "fixed left-0 top-14 z-20 flex h-[calc(100vh-3.5rem)] flex-col border-r bg-sidebar transition-all duration-200",
        open ? "w-56" : "w-0 overflow-hidden border-r-0"
      )}
    >
      <nav className="flex-1 space-y-1 p-3">
        {filteredItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-sidebar-accent text-sidebar-primary"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              <span className="truncate">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="border-t border-sidebar-border p-3">
        <div className="flex items-center gap-2 text-xs text-sidebar-muted">
          <Building2 className="h-3.5 w-3.5" />
          <span className="truncate">{user?.branch || "Head Office"}</span>
        </div>
      </div>
    </aside>
  );
};

export default AppSidebar;
