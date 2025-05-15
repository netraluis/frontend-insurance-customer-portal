"use client"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Car, HomeIcon, Plane, Heart, Plus, ArrowUpDown } from "lucide-react"
import { PolicyList, PolicyStatus } from "@/components/policy-list"

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
    status: PolicyStatus.active,
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
    status: PolicyStatus.active,
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
    status: PolicyStatus.active,
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
    status: PolicyStatus.active,
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
    status: PolicyStatus.pending,
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
    status: PolicyStatus.expired,
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

          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <CardTitle>Policy List</CardTitle>
                      <Badge variant="outline" className="ml-2">
                        {policies.length} Policies
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm">
                            <ArrowUpDown className="mr-2 h-3.5 w-3.5" />
                            Sort By
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Policy Name (A-Z)</DropdownMenuItem>
                          <DropdownMenuItem>Policy Name (Z-A)</DropdownMenuItem>
                          <DropdownMenuItem>Renewal Date (Newest)</DropdownMenuItem>
                          <DropdownMenuItem>Renewal Date (Oldest)</DropdownMenuItem>
                          <DropdownMenuItem>Premium (High-Low)</DropdownMenuItem>
                          <DropdownMenuItem>Premium (Low-High)</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <Tabs defaultValue="grid" className="hidden sm:block">
                        <TabsList className="grid w-[120px] grid-cols-2">
                          <TabsTrigger value="grid">Grid</TabsTrigger>
                          <TabsTrigger value="list">List</TabsTrigger>
                        </TabsList>
                      </Tabs>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="all">
                    <TabsList className="mb-4">
                      <TabsTrigger value="all">All</TabsTrigger>
                      <TabsTrigger value="active">Active</TabsTrigger>
                      <TabsTrigger value="pending">Pending</TabsTrigger>
                      <TabsTrigger value="expired">Expired</TabsTrigger>
                    </TabsList>
                    <TabsContent value="all">
                      <PolicyList policies={policies} view="grid" />
                    </TabsContent>
                    <TabsContent value="active">
                      <PolicyList policies={policies.filter((policy) => policy.status === "active")} view="grid" />
                    </TabsContent>
                    <TabsContent value="pending">
                      <PolicyList policies={policies.filter((policy) => policy.status === "pending")} view="grid" />
                    </TabsContent>
                    <TabsContent value="expired">
                      <PolicyList policies={policies.filter((policy) => policy.status === "expired")} view="grid" />
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
