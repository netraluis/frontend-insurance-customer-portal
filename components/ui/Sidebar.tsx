"use client";
import { Home, User, FileText, LogOut, Menu, ChevronDown, Plus, Library, FileArchive, CalendarCheck, Folder, Car, Home as HomeIcon, Plane, Heart, Bell, Info, LogOut as LogOutIcon, BookOpen, Settings, Star, History, Layers, Briefcase, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useState } from "react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import React from "react";

const menuLinks = [
  { href: "/", label: "Inici", icon: Library },
  { href: "/polisses", label: "Pòlisses", icon: FileText },
  { href: "/sinistres", label: "Sinistres", icon: FileArchive },
  { href: "/assitent", label: "Assitent", icon: CalendarCheck },
  { href: "/documents", label: "Documents", icon: Folder },
];

const polissesLinks = [
  { href: "/auto", label: "Auto", icon: Car },
  { href: "/llar", label: "Llar", icon: HomeIcon },
  { href: "/viatge", label: "Viatge", icon: Plane },
  { href: "/salut", label: "Salut", icon: Heart },
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

// Header company avatar
function CompanyAvatar() {
  return (
    <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-black">
      <Library className="w-6 h-6 text-white" />
    </span>
  );
}

// Footer user avatar
function UserAvatar() {
  return (
    <span className="flex items-center justify-center w-9 h-9 rounded-full bg-muted font-semibold text-xs text-muted-foreground border border-[#E4E4E7]">
      CN
    </span>
  );
}

const platformLinks = [
  {
    label: "Playground",
    icon: FileText,
    href: "/playground",
    children: [
      { label: "History", icon: History, href: "/playground/history" },
      { label: "Starred", icon: Star, href: "/playground/starred" },
      { label: "Settings", icon: Settings, href: "/playground/settings" },
    ],
  },
  { label: "Models", icon: Layers, href: "/models" },
  { label: "Documentation", icon: BookOpen, href: "/docs" },
  { label: "Settings", icon: Settings, href: "/settings" },
];

const projectLinks = [
  { label: "Design Engineering", icon: Briefcase, href: "/projects/design" },
  { label: "Sales & Marketing", icon: Briefcase, href: "/projects/sales" },
  { label: "Travel", icon: Plane, href: "/projects/travel" },
];

export function Sidebar({ className, collapsed, setCollapsed }: { className?: string; collapsed: boolean; setCollapsed: React.Dispatch<React.SetStateAction<boolean>> }) {
  // Para submenús
  const [openPlayground, setOpenPlayground] = useState(true);
  if (collapsed) {
    return (
      <aside className={cn("h-screen w-16 bg-[#FAFAFA] text-[#020817] border-r border-[#E4E4E7] flex flex-col", className)}>
        {/* Logo negro arriba */}
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-black mt-6 mx-auto">
          <Library className="w-6 h-6 text-white" />
        </div>
        {/* Iconos de navegación justo debajo del logo */}
        <div className="flex flex-col gap-2 items-center flex-1 justify-start w-full mt-10">
          <button className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-zinc-100 transition-colors">
            <FileText className="w-5 h-5 text-zinc-700" />
          </button>
          <button className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-zinc-100 transition-colors">
            <FileArchive className="w-5 h-5 text-zinc-700" />
          </button>
          <button className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-zinc-100 transition-colors">
            <CalendarCheck className="w-5 h-5 text-zinc-700" />
          </button>
          <button className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-zinc-100 transition-colors">
            <Folder className="w-5 h-5 text-zinc-700" />
          </button>
        </div>
        {/* Usuario inferior solo icono */}
        <div className="mb-4 flex flex-col items-center gap-2 w-full">
          <button className="flex items-center justify-center w-9 h-9 rounded-lg bg-zinc-100 text-zinc-700 font-semibold text-xs focus:outline-none hover:bg-zinc-200 transition-colors">
            CN
          </button>
        </div>
      </aside>
    );
  }
  return (
    <aside className={cn("h-screen w-64 bg-[#FAFAFA] text-[#020817] border-r border-[#E4E4E7] flex flex-col items-stretch shadow-sm", className)}>
      <div className="flex items-center gap-3 px-4 pt-6 pb-4 bg-[#F4F4F5] rounded-xl shadow-sm min-w-[180px] w-full">
        <CompanyAvatar />
        <div className="flex flex-col flex-1 min-w-0">
          <span className="font-semibold text-[15px] leading-tight truncate">Acme Inc</span>
          <span className="text-xs text-muted-foreground leading-tight truncate">Enterprise</span>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="ml-auto p-1.5 rounded-md hover:bg-muted transition-colors focus:outline-none">
              <ChevronDown className="w-5 h-5 text-muted-foreground" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" sideOffset={0} className="w-56 p-2 rounded-lg border border-[#E4E4E7] bg-white shadow-lg mt-2">
            <DropdownMenuItem className="px-3 py-2 text-sm">Anton Òdena</DropdownMenuItem>
            <DropdownMenuItem className="px-3 py-2 text-sm">The Agents Labs</DropdownMenuItem>
            <DropdownMenuItem className="px-3 py-2 text-sm">Acme Inc</DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2 cursor-pointer px-2 py-2 rounded-md text-sm transition-colors text-primary hover:bg-muted/70 select-none mt-1">
              <span className="flex items-center justify-center bg-muted text-primary rounded-[6px] w-7 h-7 border border-[#E4E4E7]">
                <Plus className="w-4 h-4" />
              </span>
              <span className="truncate">Afegir un compte</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {/* Scrollable nav */}
      <div className="flex-1 overflow-y-auto px-2 pb-2">
        {/* Platform section */}
        <div className="mb-4">
          <div className="uppercase text-xs font-semibold text-muted-foreground tracking-wide opacity-70 px-2 mb-2">Platform</div>
          <div className="flex flex-col gap-1">
            {/* Playground with subitems */}
            <div>
              <button onClick={() => setOpenPlayground((v) => !v)} className="flex items-center w-full gap-3 px-3 py-2 rounded-md transition-colors text-[15px] font-medium text-sidebar-foreground hover:bg-muted hover:text-primary group">
                <FileText className="w-5 h-5" />
                <span className="flex-1 text-left">Playground</span>
                <ChevronDown className={cn("w-4 h-4 ml-auto transition-transform", openPlayground ? "rotate-180" : "rotate-0")}/>
              </button>
              {openPlayground && (
                <div className="pl-8 flex flex-col gap-1 border-l border-[#E4E4E7] ml-2">
                  <Link href="/playground/history" className="flex items-center gap-2 px-2 py-1 text-[14px] text-muted-foreground hover:text-primary transition-colors">
                    <History className="w-4 h-4" />
                    History
                  </Link>
                  <Link href="/playground/starred" className="flex items-center gap-2 px-2 py-1 text-[14px] text-muted-foreground hover:text-primary transition-colors">
                    <Star className="w-4 h-4" />
                    Starred
                  </Link>
                  <Link href="/playground/settings" className="flex items-center gap-2 px-2 py-1 text-[14px] text-muted-foreground hover:text-primary transition-colors">
                    <Settings className="w-4 h-4" />
                    Settings
                  </Link>
                </div>
              )}
            </div>
            {/* Otros links */}
            <Link href="/models" className="flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-[15px] font-medium text-sidebar-foreground hover:bg-muted hover:text-primary">
              <Layers className="w-5 h-5" />
              <span>Models</span>
              <ChevronDown className="w-4 h-4 ml-auto rotate-270" style={{transform: 'rotate(-90deg)'}} />
            </Link>
            <Link href="/docs" className="flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-[15px] font-medium text-sidebar-foreground hover:bg-muted hover:text-primary">
              <BookOpen className="w-5 h-5" />
              <span>Documentation</span>
            </Link>
            <Link href="/settings" className="flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-[15px] font-medium text-sidebar-foreground hover:bg-muted hover:text-primary">
              <Settings className="w-5 h-5" />
              <span>Settings</span>
              <ChevronDown className="w-4 h-4 ml-auto rotate-270" style={{transform: 'rotate(-90deg)'}} />
            </Link>
          </div>
        </div>
        {/* Projects section */}
        <div className="mb-4">
          <div className="uppercase text-xs font-semibold text-muted-foreground tracking-wide opacity-70 px-2 mb-2">Projects</div>
          <div className="flex flex-col gap-1">
            <Link href="/projects/design" className="flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-[15px] font-medium text-sidebar-foreground hover:bg-muted hover:text-primary">
              <Briefcase className="w-5 h-5" />
              <span>Design Engineering</span>
            </Link>
            <Link href="/projects/sales" className="flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-[15px] font-medium text-sidebar-foreground hover:bg-muted hover:text-primary">
              <Briefcase className="w-5 h-5" />
              <span>Sales & Marketing</span>
            </Link>
            <Link href="/projects/travel" className="flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-[15px] font-medium text-sidebar-foreground hover:bg-muted hover:text-primary">
              <Plane className="w-5 h-5" />
              <span>Travel</span>
            </Link>
            <button className="flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-[15px] font-medium text-muted-foreground hover:bg-muted">
              <MoreHorizontal className="w-5 h-5" />
              <span>More</span>
            </button>
          </div>
        </div>
      </div>
      {/* Footer user profile */}
      <div className="px-4 py-4 border-t border-[#E4E4E7]">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center w-full gap-3 px-2 py-2 rounded-lg hover:bg-muted/80 transition-colors focus:outline-none">
              <UserAvatar />
              <div className="flex flex-col flex-1 items-start text-left">
                <span className="font-semibold text-[15px] leading-tight">shadcn</span>
                <span className="text-xs text-muted-foreground leading-tight">m@example.com</span>
              </div>
              <ChevronDown className="w-5 h-5 text-muted-foreground ml-auto" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" sideOffset={10} className="w-60 p-2 rounded-lg border border-[#E4E4E7] bg-white shadow-lg ml-10">
            <DropdownMenuItem className="flex items-center gap-2 px-3 py-2 rounded-md text-[15px] font-medium text-sidebar-foreground hover:bg-muted hover:text-primary">
              <User className="w-5 h-5" />
              El meu compte
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2 px-3 py-2 rounded-md text-[15px] font-medium text-sidebar-foreground hover:bg-muted hover:text-primary">
              <Bell className="w-5 h-5" />
              Notificacions
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2 px-3 py-2 rounded-md text-[15px] font-medium text-sidebar-foreground hover:bg-muted hover:text-primary">
              <Info className="w-5 h-5" />
              Informació
            </DropdownMenuItem>
            <div className="my-2 border-t border-[#E4E4E7]" />
            <DropdownMenuItem className="flex items-center gap-2 px-3 py-2 rounded-md text-[15px] font-medium text-destructive hover:bg-muted/80 hover:text-destructive">
              <LogOutIcon className="w-5 h-5" />
              Tanca la sessió
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </aside>
  );
}

export default Sidebar; 