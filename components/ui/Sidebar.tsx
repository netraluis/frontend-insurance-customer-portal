"use client";
import { Home, User, FileText, LogOut, Menu } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useState } from "react";

const links = [
  { href: "/", label: "Inicio", icon: Home },
  { href: "/perfil", label: "Perfil", icon: User },
  { href: "/documentos", label: "Documentos", icon: FileText },
];

export function Sidebar({ className }: { className?: string }) {
  const [collapsed, setCollapsed] = useState(false);
  const [account, setAccount] = useState("Personal Account");
  const accounts = ["Personal Account", "Empresa S.A."];

  return (
    <aside
      className={cn(
        `h-screen transition-all duration-300 w-64 ${collapsed ? 'w-20' : 'w-64'} bg-sidebar text-sidebar-foreground border-r border-sidebar-border flex flex-col py-6 px-2 gap-4`,
        className
      )}
    >
      {/* Botón de colapsar */}
      <button
        className={cn(
          "mb-4 flex items-center w-full px-2 focus:outline-none transition-all duration-300",
          collapsed ? "justify-center" : "justify-end"
        )}
        aria-label={collapsed ? "Expandir sidebar" : "Colapsar sidebar"}
        onClick={() => setCollapsed((c) => !c)}
      >
        <Menu className="w-6 h-6 text-muted-foreground hover:text-primary transition-colors" />
      </button>
      {/* Switcher de cuenta */}
      <div className={cn("mb-6 flex items-center gap-3 px-2", collapsed && "justify-center px-0")}> 
        <div className="w-9 h-9 rounded-full bg-sidebar border border-sidebar-border flex items-center justify-center">
          <User className="w-5 h-5 text-sidebar-accent" />
        </div>
        {!collapsed && (
          <select
            className="font-normal text-[14px] bg-transparent text-sidebar-foreground focus:outline-none"
            value={account}
            onChange={e => setAccount(e.target.value)}
            aria-label="Cambiar cuenta"
          >
            {accounts.map(acc => (
              <option key={acc} value={acc}>{acc}</option>
            ))}
          </select>
        )}
      </div>
      {/* Título navegación */}
      {!collapsed && (
        <div className="mb-2 px-2">
          <span className="uppercase text-[12px] font-medium text-muted-foreground tracking-wide opacity-60">Navegación</span>
        </div>
      )}
      {/* Navegación */}
      <nav className="flex-1 flex flex-col gap-1">
        {links.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-[14px] font-medium text-sidebar-foreground hover:bg-muted hover:text-primary",
              collapsed && "justify-center px-0"
            )}
          >
            <Icon className="w-5 h-5" />
            {!collapsed && <span>{label}</span>}
          </Link>
        ))}
      </nav>
      {/* Botón cerrar sesión */}
      <button
        className={cn(
          "flex items-center gap-3 px-3 py-2 rounded-md mt-4 text-[14px] font-medium text-primary bg-muted hover:bg-muted/80 transition-colors",
          collapsed && "justify-center px-0"
        )}
      >
        <LogOut className="w-5 h-5" />
        {!collapsed && <span>Cerrar sesión</span>}
      </button>
    </aside>
  );
}

export default Sidebar; 