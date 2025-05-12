import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Car, HomeIcon, Plane, Heart } from "lucide-react"
import { PolicyListWithFilters } from "@/app/components/policy-list-with-filters"

// Sample policy data
const policies = [
  {
    id: "POL-AUTO-001",
    title: "Auto Insurance",
    type: "auto",
    icon: Car,
    premium: "$128.45/month",
    renewalDate: "May 15, 2025",
    startDate: "May 15, 2023",
    status: "active",
    coverageAmount: "$500,000",
  },
  {
    id: "POL-HOME-001",
    title: "Home Insurance",
    type: "home",
    icon: HomeIcon,
    premium: "$89.99/month",
    renewalDate: "August 22, 2025",
    startDate: "August 22, 2023",
    status: "active",
    coverageAmount: "$350,000",
  },
  {
    id: "POL-TRAVEL-001",
    title: "Travel Insurance",
    type: "travel",
    icon: Plane,
    premium: "$45.00/trip",
    renewalDate: "December 10, 2025",
    startDate: "December 10, 2023",
    status: "active",
    coverageAmount: "$100,000",
  },
  {
    id: "POL-HEALTH-001",
    title: "Health Insurance",
    type: "health",
    icon: Heart,
    premium: "$210.50/month",
    renewalDate: "February 28, 2026",
    startDate: "February 28, 2024",
    status: "active",
    coverageAmount: "$1,000,000",
  },
  {
    id: "POL-AUTO-002",
    title: "Secondary Auto Insurance",
    type: "auto",
    icon: Car,
    premium: "$95.75/month",
    renewalDate: "June 30, 2025",
    startDate: "June 30, 2023",
    status: "pending",
    coverageAmount: "$300,000",
  },
  {
    id: "POL-TRAVEL-002",
    title: "Business Travel Insurance",
    type: "travel",
    icon: Plane,
    premium: "$65.00/trip",
    renewalDate: "October 15, 2024",
    startDate: "October 15, 2023",
    status: "expired",
    coverageAmount: "$150,000",
  },
]

export default function PoliciesPage() {
  return (
    <div className="flex flex-col min-h-screen animate-in">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
        <SidebarTrigger />
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold">Policies</h1>
        </div>
        <div className="ml-auto"></div>
      </header>

      <main className="flex-1 p-6 pt-4 page-transition">
        <div className="grid gap-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold">Your Insurance Policies</h2>
              <p className="text-muted-foreground">Manage and view all your insurance policies</p>
            </div>
            <Button className="w-full md:w-auto">
              <Plus className="mr-2 h-4 w-4" />
              Add New Policy
            </Button>
          </div>

          <PolicyListWithFilters policies={policies} defaultView="list" />
        </div>
      </main>
    </div>
  )
}
