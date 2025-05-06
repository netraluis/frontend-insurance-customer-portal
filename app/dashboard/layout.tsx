"use client";
import SidebarClientWrapper from "@/components/ui/SidebarClientWrapper";
import { Menu } from "lucide-react";
import { useState } from "react";
import type { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(true);
  return (
    <div className="flex min-h-screen relative">
      <button
        onClick={() => setCollapsed((v) => !v)}
        className={`fixed top-6 z-50 flex items-center justify-center w-10 h-10 rounded-xl border-2 border-[#B4B4BB] bg-white hover:bg-zinc-100 transition-colors shadow ${collapsed ? 'left-16' : 'left-[280px]'}`}
        aria-label={collapsed ? 'Expandir menú' : 'Colapsar menú'}
      >
        <Menu className="w-7 h-7 text-zinc-700" />
      </button>
      <div className="hidden md:block">
        <SidebarClientWrapper collapsed={collapsed} setCollapsed={setCollapsed} />
      </div>
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
} 