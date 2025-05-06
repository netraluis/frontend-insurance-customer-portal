"use client";
import { Home, User, FileText, LogOut, Menu, ChevronDown, Plus } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useState, useRef } from "react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import React from "react";

const links = [
  { href: "/", label: "Inicio", icon: Home },
  { href: "/perfil", label: "Perfil", icon: User },
  { href: "/documentos", label: "Documentos", icon: FileText },
];

const accounts = [
  { name: "Acme Inc" },
  { name: "Empresa S.A." },
];

function getRandomColor(name: string) {
  // Genera un color pastel basado en el nombre
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const h = hash % 360;
  return `hsl(${h}, 70%, 80%)`;
}

function Avatar({ size = 28 }: { name: string; size?: number }) {
  return (
    <span
      className="flex items-center justify-center mr-2 border border-[#E4E4E7]"
      style={{
        width: size,
        height: size,
        borderRadius: 6,
        background: "linear-gradient(90deg, #3b82f6 0%, #ec4899 100%)",
        minWidth: 35,
        minHeight: 35,
      }}
    />
  );
}

export function Sidebar({ className }: { className?: string }) {
  const [collapsed, setCollapsed] = useState(false);
  const [account, setAccount] = useState(accounts[0].name);
  const [search, setSearch] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <aside
      className={cn(
        `h-screen transition-all duration-300 w-64 ${collapsed ? 'w-20' : 'w-64'} bg-[#FAFAFA] text-[#020817] border-r border-[#E4E4E7] flex flex-col items-stretch shadow-sm`,
        className
      )}
      style={{ minWidth: collapsed ? 80 : 256 }}
    >
      {/* Header: Account Switcher + Collapse */}
      <div className={cn(
        "flex items-center px-4 py-4 border-b border-[#E4E4E7] gap-2 w-full",
        collapsed ? "justify-center" : "justify-between"
      )}>
        {collapsed ? (
          <button
            className="flex items-center justify-center rounded-md p-1.5 hover:bg-muted transition-colors focus:outline-none"
            aria-label="Expandir sidebar"
            onClick={() => setCollapsed(false)}
          >
            <Menu className="w-5 h-5 text-muted-foreground" />
          </button>
        ) : (
          <>
            <div className="flex items-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 px-2 py-1 rounded-md bg-muted hover:bg-muted/80 transition-colors text-sm font-medium text-sidebar-foreground focus:outline-none">
                    <Avatar name={account} />
                    {account}
                    <ChevronDown className="w-4 h-4 ml-1 text-muted-foreground" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" sideOffset={15} className="w-56 p-2 rounded-lg border border-[#E4E4E7] bg-white shadow-lg ml-40">
                  <div className="flex flex-col gap-1 max-h-48 overflow-y-auto">
                    {accounts.map((acc) => (
                      <DropdownMenuItem
                        key={acc.name}
                        onClick={() => { setAccount(acc.name); setSearch(""); }}
                        className={cn(
                          "flex items-center gap-2 cursor-pointer px-2 py-2 rounded-md text-sm transition-colors",
                          account === acc.name ? "bg-muted text-primary" : "hover:bg-muted/70",
                          "select-none"
                        )}
                      >
                        {/* Sin inicial, solo el nombre */}
                        <span className="truncate">{acc.name}</span>
                      </DropdownMenuItem>
                    ))}
                    {/* Afegir un compte */}
                    <DropdownMenuItem
                      className="flex items-center gap-2 cursor-pointer px-2 py-2 rounded-md text-sm transition-colors text-primary hover:bg-muted/70 select-none mt-1"
                      onClick={() => {/* lógica para añadir cuenta */}}
                    >
                      <span className="flex items-center justify-center bg-muted text-primary rounded-[6px] w-7 h-7 border border-[#E4E4E7]">
                        <Plus className="w-4 h-4" />
                      </span>
                      <span className="truncate">Afegir un compte</span>
                    </DropdownMenuItem>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <button
              className="flex items-center justify-center rounded-md p-1.5 hover:bg-muted transition-colors focus:outline-none ml-auto"
              aria-label="Colapsar sidebar"
              onClick={() => setCollapsed(true)}
            >
              <Menu className="w-5 h-5 text-muted-foreground" />
            </button>
          </>
        )}
      </div>
      {/* Navegación */}
      <nav className={cn(
        "flex flex-col gap-1 items-stretch flex-1 px-2 py-4",
        collapsed ? "items-center" : ""
      )}>
        {links.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-[15px] font-medium text-sidebar-foreground hover:bg-muted hover:text-primary",
              collapsed ? "justify-center" : "justify-start"
            )}
          >
            <Icon className="w-5 h-5" />
            {!collapsed && <span>{label}</span>}
          </Link>
        ))}
      </nav>
      {/* Footer: Cerrar sesión */}
      <div className={cn("px-4 py-4 border-t border-[#E4E4E7]")}> 
        <button
          className={cn(
            "flex items-center gap-3 px-3 py-2 rounded-md text-[15px] font-medium text-primary bg-muted hover:bg-muted/80 transition-colors w-full",
            collapsed ? "justify-center" : "justify-start"
          )}
        >
          <LogOut className="w-5 h-5" />
          {!collapsed && <span>Cerrar sesión</span>}
        </button>
      </div>
    </aside>
  );
}

export default Sidebar; 