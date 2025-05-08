"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Search,
  Plus,
  ArrowUpDown,
  Car,
  HomeIcon,
  Heart,
  Plane,
  CheckCircle2,
  Clock,
  AlertCircle,
  XCircle,
  Grid,
  List,
} from "lucide-react"
import { ClaimsList } from "@/app/components/claims-list"
import { useState } from "react"

// Sample claims data
const claims = [
  {
    id: "CLM-001",
    title: "Auto Accident Claim",
    date: "April 10, 2025",
    status: "in-progress",
    progress: 65,
    policyId: "POL-AUTO-001",
    policyType: "auto",
    amount: "$3,450.00",
    description: "Collision damage to front bumper and hood",
    submittedBy: "John Doe",
    assignedTo: "Sarah Johnson",
    lastUpdated: "April 15, 2025",
  },
  {
    id: "CLM-002",
    title: "Water Damage Claim",
    date: "March 5, 2025",
    status: "completed",
    progress: 100,
    policyId: "POL-HOME-001",
    policyType: "home",
    amount: "$2,800.00",
    description: "Water damage from burst pipe in basement",
    submittedBy: "John Doe",
    assignedTo: "Michael Brown",
    lastUpdated: "March 20, 2025",
  },
  {
    id: "CLM-003",
    title: "Medical Expense Claim",
    date: "February 18, 2025",
    status: "completed",
    progress: 100,
    policyId: "POL-HEALTH-001",
    policyType: "health",
    amount: "$1,250.00",
    description: "Emergency room visit and follow-up care",
    submittedBy: "John Doe",
    assignedTo: "Emily Wilson",
    lastUpdated: "March 1, 2025",
  },
  {
    id: "CLM-004",
    title: "Stolen Property Claim",
    date: "January 25, 2025",
    status: "denied",
    progress: 100,
    policyId: "POL-HOME-001",
    policyType: "home",
    amount: "$1,800.00",
    description: "Laptop and electronics stolen during break-in",
    submittedBy: "John Doe",
    assignedTo: "Michael Brown",
    lastUpdated: "February 10, 2025",
  },
  {
    id: "CLM-005",
    title: "Windshield Replacement",
    date: "April 2, 2025",
    status: "in-progress",
    progress: 30,
    policyId: "POL-AUTO-001",
    policyType: "auto",
    amount: "$850.00",
    description: "Cracked windshield from road debris",
    submittedBy: "John Doe",
    assignedTo: "Sarah Johnson",
    lastUpdated: "April 5, 2025",
  },
  {
    id: "CLM-006",
    title: "Roof Damage Claim",
    date: "March 15, 2025",
    status: "in-progress",
    progress: 45,
    policyId: "POL-HOME-001",
    policyType: "home",
    amount: "$4,200.00",
    description: "Storm damage to roof and gutters",
    submittedBy: "John Doe",
    assignedTo: "Michael Brown",
    lastUpdated: "March 25, 2025",
  },
  {
    id: "CLM-007",
    title: "Prescription Medication",
    date: "March 10, 2025",
    status: "completed",
    progress: 100,
    policyId: "POL-HEALTH-001",
    policyType: "health",
    amount: "$350.00",
    description: "Monthly prescription medication reimbursement",
    submittedBy: "John Doe",
    assignedTo: "Emily Wilson",
    lastUpdated: "March 15, 2025",
  },
  {
    id: "CLM-008",
    title: "Travel Cancellation",
    date: "February 5, 2025",
    status: "completed",
    progress: 100,
    policyId: "POL-TRAVEL-001",
    policyType: "travel",
    amount: "$1,500.00",
    description: "Trip cancellation due to illness",
    submittedBy: "John Doe",
    assignedTo: "David Clark",
    lastUpdated: "February 20, 2025",
  },
  {
    id: "CLM-009",
    title: "Dental Procedure",
    date: "April 8, 2025",
    status: "pending",
    progress: 10,
    policyId: "POL-HEALTH-001",
    policyType: "health",
    amount: "$950.00",
    description: "Root canal and crown procedure",
    submittedBy: "John Doe",
    assignedTo: "Unassigned",
    lastUpdated: "April 8, 2025",
  },
  {
    id: "CLM-010",
    title: "Lost Luggage",
    date: "January 15, 2025",
    status: "denied",
    progress: 100,
    policyId: "POL-TRAVEL-001",
    policyType: "travel",
    amount: "$800.00",
    description: "Luggage lost during international flight",
    submittedBy: "John Doe",
    assignedTo: "David Clark",
    lastUpdated: "January 30, 2025",
  },
]

export default function ClaimsPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchTerm, setSearchTerm] = useState("")
  const [policyTypeFilter, setPolicyTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("all")

  // Calculate claim statistics
  const totalClaims = claims.length
  const inProgressClaims = claims.filter((claim) => claim.status === "in-progress").length
  const completedClaims = claims.filter((claim) => claim.status === "completed").length
  const pendingClaims = claims.filter((claim) => claim.status === "pending").length
  const deniedClaims = claims.filter((claim) => claim.status === "denied").length

  const totalClaimAmount = claims.reduce((sum, claim) => {
    const amount = Number.parseFloat(claim.amount.replace(/[^0-9.-]+/g, ""))
    return sum + amount
  }, 0)

  // Filter claims based on search term, policy type, and status
  const filteredClaims = claims.filter((claim) => {
    const matchesSearch =
      claim.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesPolicyType = policyTypeFilter === "all" || claim.policyType === policyTypeFilter
    const matchesStatus = statusFilter === "all" || claim.status === statusFilter

    // Date filtering logic could be expanded
    const matchesDate = true

    return matchesSearch && matchesPolicyType && matchesStatus && matchesDate
  })

  // Get policy type icon
  const getPolicyTypeIcon = (type: string) => {
    switch (type) {
      case "auto":
        return Car
      case "home":
        return HomeIcon
      case "health":
        return Heart
      case "travel":
        return Plane
      default:
        return Car
    }
  }

  // Get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return CheckCircle2
      case "in-progress":
        return Clock
      case "pending":
        return AlertCircle
      case "denied":
        return XCircle
      default:
        return Clock
    }
  }

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700 hover:bg-green-100"
      case "in-progress":
        return "bg-blue-100 text-blue-700 hover:bg-blue-100"
      case "pending":
        return "bg-amber-100 text-amber-700 hover:bg-amber-100"
      case "denied":
        return "bg-red-100 text-red-700 hover:bg-red-100"
      default:
        return "bg-zinc-100 text-zinc-700 hover:bg-zinc-100"
    }
  }

  return (
    <div className="flex flex-col min-h-screen animate-in">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
        <SidebarTrigger />
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold">Claims</h1>
        </div>
        <div className="ml-auto"></div>
      </header>

      <main className="flex-1 p-6 pt-4 page-transition">
        <div className="grid gap-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold">Claims Overview</h2>
              <p className="text-muted-foreground">Manage and track all your insurance claims</p>
            </div>
            <Button className="w-full md:w-auto">
              <Plus className="mr-2 h-4 w-4" />
              File New Claim
            </Button>
          </div>

          {/* Claims Statistics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-muted-foreground">Total Claims</span>
                  <span className="text-2xl font-semibold">{totalClaims}</span>
                  <span className="text-sm text-muted-foreground">${totalClaimAmount.toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-blue-50">
              <CardContent className="p-6">
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-blue-700">In Progress</span>
                  <span className="text-2xl font-semibold text-blue-700">{inProgressClaims}</span>
                  <div className="flex items-center gap-1 text-sm text-blue-700">
                    <Clock className="h-3.5 w-3.5" />
                    <span>Being processed</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-amber-50">
              <CardContent className="p-6">
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-amber-700">Pending</span>
                  <span className="text-2xl font-semibold text-amber-700">{pendingClaims}</span>
                  <div className="flex items-center gap-1 text-sm text-amber-700">
                    <AlertCircle className="h-3.5 w-3.5" />
                    <span>Awaiting review</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-green-50">
              <CardContent className="p-6">
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-green-700">Completed</span>
                  <span className="text-2xl font-semibold text-green-700">{completedClaims}</span>
                  <div className="flex items-center gap-1 text-sm text-green-700">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>Successfully processed</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-red-50">
              <CardContent className="p-6">
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-red-700">Denied</span>
                  <span className="text-2xl font-semibold text-red-700">{deniedClaims}</span>
                  <div className="flex items-center gap-1 text-sm text-red-700">
                    <XCircle className="h-3.5 w-3.5" />
                    <span>Not approved</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <CardTitle>Claims List</CardTitle>
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="relative w-full sm:w-auto">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Search claims..."
                        className="pl-8 w-full sm:w-[200px]"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <Select value={policyTypeFilter} onValueChange={setPolicyTypeFilter}>
                      <SelectTrigger className="w-full sm:w-[150px]">
                        <SelectValue placeholder="Policy Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Policies</SelectItem>
                        <SelectItem value="auto">Auto</SelectItem>
                        <SelectItem value="home">Home</SelectItem>
                        <SelectItem value="health">Health</SelectItem>
                        <SelectItem value="travel">Travel</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-full sm:w-[150px]">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="denied">Denied</SelectItem>
                      </SelectContent>
                    </Select>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                          <ArrowUpDown className="mr-2 h-3.5 w-3.5" />
                          Sort By
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Date (Newest)</DropdownMenuItem>
                        <DropdownMenuItem>Date (Oldest)</DropdownMenuItem>
                        <DropdownMenuItem>Amount (High-Low)</DropdownMenuItem>
                        <DropdownMenuItem>Amount (Low-High)</DropdownMenuItem>
                        <DropdownMenuItem>Status</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <div className="flex border rounded-md">
                      <Button
                        variant={viewMode === "grid" ? "default" : "ghost"}
                        size="sm"
                        className="rounded-r-none"
                        onClick={() => setViewMode("grid")}
                      >
                        <Grid className="h-4 w-4" />
                      </Button>
                      <Button
                        variant={viewMode === "list" ? "default" : "ghost"}
                        size="sm"
                        className="rounded-l-none"
                        onClick={() => setViewMode("list")}
                      >
                        <List className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="all">
                  <TabsList className="mb-4">
                    <TabsTrigger value="all">
                      All Claims
                      <Badge variant="outline" className="ml-2 bg-zinc-100">
                        {filteredClaims.length}
                      </Badge>
                    </TabsTrigger>
                    <TabsTrigger value="in-progress">
                      In Progress
                      <Badge variant="outline" className="ml-2 bg-blue-100 text-blue-700">
                        {filteredClaims.filter((claim) => claim.status === "in-progress").length}
                      </Badge>
                    </TabsTrigger>
                    <TabsTrigger value="pending">
                      Pending
                      <Badge variant="outline" className="ml-2 bg-amber-100 text-amber-700">
                        {filteredClaims.filter((claim) => claim.status === "pending").length}
                      </Badge>
                    </TabsTrigger>
                    <TabsTrigger value="completed">
                      Completed
                      <Badge variant="outline" className="ml-2 bg-green-100 text-green-700">
                        {filteredClaims.filter((claim) => claim.status === "completed").length}
                      </Badge>
                    </TabsTrigger>
                    <TabsTrigger value="denied">
                      Denied
                      <Badge variant="outline" className="ml-2 bg-red-100 text-red-700">
                        {filteredClaims.filter((claim) => claim.status === "denied").length}
                      </Badge>
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="all">
                    <ClaimsList
                      claims={filteredClaims}
                      view={viewMode}
                      getPolicyTypeIcon={getPolicyTypeIcon}
                      getStatusIcon={getStatusIcon}
                      getStatusColor={getStatusColor}
                    />
                  </TabsContent>
                  <TabsContent value="in-progress">
                    <ClaimsList
                      claims={filteredClaims.filter((claim) => claim.status === "in-progress")}
                      view={viewMode}
                      getPolicyTypeIcon={getPolicyTypeIcon}
                      getStatusIcon={getStatusIcon}
                      getStatusColor={getStatusColor}
                    />
                  </TabsContent>
                  <TabsContent value="pending">
                    <ClaimsList
                      claims={filteredClaims.filter((claim) => claim.status === "pending")}
                      view={viewMode}
                      getPolicyTypeIcon={getPolicyTypeIcon}
                      getStatusIcon={getStatusIcon}
                      getStatusColor={getStatusColor}
                    />
                  </TabsContent>
                  <TabsContent value="completed">
                    <ClaimsList
                      claims={filteredClaims.filter((claim) => claim.status === "completed")}
                      view={viewMode}
                      getPolicyTypeIcon={getPolicyTypeIcon}
                      getStatusIcon={getStatusIcon}
                      getStatusColor={getStatusColor}
                    />
                  </TabsContent>
                  <TabsContent value="denied">
                    <ClaimsList
                      claims={filteredClaims.filter((claim) => claim.status === "denied")}
                      view={viewMode}
                      getPolicyTypeIcon={getPolicyTypeIcon}
                      getStatusIcon={getStatusIcon}
                      getStatusColor={getStatusColor}
                    />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
