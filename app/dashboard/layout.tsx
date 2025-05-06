import SidebarClientWrapper from "@/components/ui/SidebarClientWrapper";
import type { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <div className="hidden md:block">
        <SidebarClientWrapper />
      </div>
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
} 