"use client";
import Sidebar from "@/components/ui/Sidebar";

export default function SidebarClientWrapper({ collapsed, setCollapsed }: { collapsed: boolean; setCollapsed: React.Dispatch<React.SetStateAction<boolean>> }) {
  return <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />;
} 