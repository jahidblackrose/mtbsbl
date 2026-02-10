import { useState } from "react";
import { Outlet } from "react-router-dom";
import AppNavbar from "./AppNavbar";
import AppSidebar from "./AppSidebar";
import { cn } from "@/lib/utils";

const AppLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-background">
      <AppNavbar onToggleSidebar={() => setSidebarOpen((p) => !p)} />
      <AppSidebar open={sidebarOpen} />
      <main
        className={cn(
          "min-h-[calc(100vh-3.5rem)] transition-all duration-200 p-6",
          sidebarOpen ? "ml-56" : "ml-0"
        )}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
