import { AppSidebar } from "../../components/sidebar/app-sidebar";
import ProtectedRoute from "../../components/auth/protected-route";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          {children}
        </SidebarInset>
      </SidebarProvider>
    </ProtectedRoute>

  )
} 