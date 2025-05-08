"use client"

import type * as React from "react"
import {
  AudioWaveform,
  BotMessageSquare,
  Car,
  ClipboardList,
  Command,
  FileText,
  FolderOpen,
  GalleryVerticalEnd,
  HeartPulse,
  House,
  PanelLeft,
  Plane,
} from "lucide-react"

import { NavMain } from "./nav-main"
import { NavProjects } from "./nav-projects"
import { NavUser } from "./nav-user"
import { TeamSwitcher } from "./team-switcher"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "Anton Òdena",
    email: "anton@anton.ad",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Aton Òdena",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "The Agents Lab SL",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Acme Inc",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Inici",
      url: "#",
      icon: PanelLeft,
      isActive: true,
    },
    {
      title: "Pòlisses",
      url: "#",
      icon: FileText,
      
    },
    {
      title: "Sinístres",
      url: "#",
      icon: ClipboardList,
    },
    {
      title: "Assistent",
      url: "#",
      icon: BotMessageSquare,
    },
    {
      title: "Documents",
      url: "#",
      icon: FolderOpen,
    },

  ],
  
  projects: [
    {
      name: "Auto",
      url: "#",
      icon: Car,
    },
    {
      name: "Llar",
      url: "#",
      icon: House,
    },
    {
      name: "Viatge",
      url: "#",
      icon: Plane,
    },
    {
      name: "Salut",
      url: "#",
      icon: HeartPulse,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
