"use client";
import { Menu } from "lucide-react";
import { useState } from "react";
import type { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(true);
  return (
      <main className="flex-1">
        {children}
      </main>
  );
} 