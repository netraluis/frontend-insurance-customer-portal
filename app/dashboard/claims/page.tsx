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
    title: "Reclamació d'accident de cotxe",
    date: "10 d'abril de 2025",
    status: "in-progress",
    progress: 65,
    policyId: "POL-AUTO-001",
    policyType: "auto",
    amount: "$3,450.00",
    description: "Col·lisió de front bumper i capota",
    submittedBy: "John Doe",
    assignedTo: "Sarah Johnson",
    lastUpdated: "15 d'abril de 2025",
  },
  {
    id: "CLM-002",
    title: "Reclamació de danys d'aigua",
    date: "5 de març de 2025",
    status: "completed",
    progress: 100,
    policyId: "POL-HOME-001",
    policyType: "home",
    amount: "$2,800.00",
    description: "Danys d'aigua des d'un tub trencat al soterrani",
    submittedBy: "John Doe",
    assignedTo: "Michael Brown",
    lastUpdated: "20 de març de 2025",
  },
  {
    id: "CLM-003",
    title: "Reclamació de despeses mèdiques",
    date: "18 de febrer de 2025",
    status: "completed",
    progress: 100,
    policyId: "POL-HEALTH-001",
    policyType: "health",
    amount: "$1,250.00",
    description: "Visita a l'hospital d'emergència i cura de seguiment",
    submittedBy: "John Doe",
    assignedTo: "Emily Wilson",
    lastUpdated: "1 de març de 2025",
  },
  {
    id: "CLM-004",
    title: "Reclamació de propietat robada",
    date: "25 de gener de 2025",
    status: "denied",
    progress: 100,
    policyId: "POL-HOME-001",
    policyType: "home",
    amount: "$1,800.00",
    description: "Portàtil i electrònics robats durant el trencament",
    submittedBy: "John Doe",
    assignedTo: "Michael Brown",
    lastUpdated: "10 de febrer de 2025",
  },
  {
    id: "CLM-005",
    title: "Reclamació de substitució de vidre",
    date: "2 de abril de 2025",
    status: "in-progress",
    progress: 30,
    policyId: "POL-AUTO-001",
    policyType: "auto",
    amount: "$850.00",
    description: "Vidre trencat de carretera",
    submittedBy: "John Doe",
    assignedTo: "Sarah Johnson",
    lastUpdated: "5 d'abril de 2025",
  },
  {
    id: "CLM-006",
    title: "Reclamació de danys a la teulada",
    date: "15 de març de 2025",
    status: "in-progress",
    progress: 45,
    policyId: "POL-HOME-001",
    policyType: "home",
    amount: "$4,200.00",
    description: "Danys de tempestat a la teulada i gàbies",
    submittedBy: "John Doe",
    assignedTo: "Michael Brown",
    lastUpdated: "25 de març de 2025",
  },
  {
    id: "CLM-007",
    title: "Reclamació de medicació prescrita",
    date: "10 de març de 2025",
    status: "completed",
    progress: 100,
    policyId: "POL-HEALTH-001",
    policyType: "health",
    amount: "$350.00",
    description: "Reimbursement of monthly prescription medication",
    submittedBy: "John Doe",
    assignedTo: "Emily Wilson",
    lastUpdated: "15 de març de 2025",
  },
  {
    id: "CLM-008",
    title: "Reclamació de cancel·lació de viatge",
    date: "5 de febrer de 2025",
    status: "completed",
    progress: 100,
    policyId: "POL-TRAVEL-001",
    policyType: "travel",
    amount: "$1,500.00",
    description: "Cancel·lació de viatge degut a malaltia",
    submittedBy: "John Doe",
    assignedTo: "David Clark",
    lastUpdated: "20 de febrer de 2025",
  },
  {
    id: "CLM-009",
    title: "Procediment dental",
    date: "8 d'abril de 2025",
    status: "pending",
    progress: 10,
    policyId: "POL-HEALTH-001",
    policyType: "health",
    amount: "$950.00",
    description: "Procediment de canal i corona",
    submittedBy: "John Doe",
    assignedTo: "Unassigned",
    lastUpdated: "8 d'abril de 2025",
  },
  {
    id: "CLM-010",
    title: "Bagatge perdut",
    date: "15 de gener de 2025",
    status: "denied",
    progress: 100,
    policyId: "POL-TRAVEL-001",
    policyType: "travel",
    amount: "$800.00",
    description: "Bagatge perdut durant el vol internacional",
    submittedBy: "John Doe",
    assignedTo: "David Clark",
    lastUpdated: "30 de gener de 2025",
  },
]

export default function ClaimsPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchTerm, setSearchTerm] = useState("")
  const [policyTypeFilter, setPolicyTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  // const [dateFilter, setDateFilter] = useState("all")

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
          <h1 className="text-xl font-semibold">Reclamacions</h1>
        </div>
        <div className="ml-auto"></div>
      </header>

      <main className="flex-1 p-6 pt-4 page-transition">
        <div className="grid gap-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold">Resum de reclamacions</h2>
              <p className="text-muted-foreground">Gestiona i segueix totes les teves reclamacions d'assegurança</p>
            </div>
            <Button className="w-full md:w-auto">
              <Plus className="mr-2 h-4 w-4" />
              Crear nova reclamació
            </Button>
          </div>

          {/* Claims Statistics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-muted-foreground">Total de reclamacions</span>
                  <span className="text-2xl font-semibold">{totalClaims}</span>
                  <span className="text-sm text-muted-foreground">${totalClaimAmount.toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-blue-50">
              <CardContent className="p-6">
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-blue-700">En curs</span>
                  <span className="text-2xl font-semibold text-blue-700">{inProgressClaims}</span>
                  <div className="flex items-center gap-1 text-sm text-blue-700">
                    <Clock className="h-3.5 w-3.5" />
                    <span>En curs</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-amber-50">
              <CardContent className="p-6">
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-amber-700">En espera</span>
                  <span className="text-2xl font-semibold text-amber-700">{pendingClaims}</span>
                  <div className="flex items-center gap-1 text-sm text-amber-700">
                    <AlertCircle className="h-3.5 w-3.5" />
                    <span>En espera</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-green-50">
              <CardContent className="p-6">
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-green-700">Completades</span>
                  <span className="text-2xl font-semibold text-green-700">{completedClaims}</span>
                  <div className="flex items-center gap-1 text-sm text-green-700">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>Processades correctament</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-red-50">
              <CardContent className="p-6">
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-red-700">Denegades</span>
                  <span className="text-2xl font-semibold text-red-700">{deniedClaims}</span>
                  <div className="flex items-center gap-1 text-sm text-red-700">
                    <XCircle className="h-3.5 w-3.5" />
                    <span>No aprovades</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <CardTitle>Llista de reclamacions</CardTitle>
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="relative w-full sm:w-auto">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Cerca reclamacions..."
                        className="pl-8 w-full sm:w-[200px]"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <Select value={policyTypeFilter} onValueChange={setPolicyTypeFilter}>
                      <SelectTrigger className="w-full sm:w-[150px]">
                        <SelectValue placeholder="Tipus de política" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Totes les polítiques</SelectItem>
                        <SelectItem value="auto">Cotxe</SelectItem>
                        <SelectItem value="home">Casa</SelectItem>
                        <SelectItem value="health">Salut</SelectItem>
                        <SelectItem value="travel">Viatge</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-full sm:w-[150px]">
                        <SelectValue placeholder="Estat" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tots els estats</SelectItem>
                        <SelectItem value="in-progress">En curs</SelectItem>
                        <SelectItem value="pending">En espera</SelectItem>
                        <SelectItem value="completed">Completades</SelectItem>
                        <SelectItem value="denied">Denegades</SelectItem>
                      </SelectContent>
                    </Select>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                          <ArrowUpDown className="mr-2 h-3.5 w-3.5" />
                          Ordenar per
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Data (Més recent)</DropdownMenuItem>
                        <DropdownMenuItem>Data (Més antic)</DropdownMenuItem>
                        <DropdownMenuItem>Import (Alt-Baix)</DropdownMenuItem>
                        <DropdownMenuItem>Import (Baix-Alt)</DropdownMenuItem>
                        <DropdownMenuItem>Estat</DropdownMenuItem>
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
                      Totes les reclamacions
                      <Badge variant="outline" className="ml-2 bg-zinc-100">
                        {filteredClaims.length}
                      </Badge>
                    </TabsTrigger>
                    <TabsTrigger value="in-progress">
                      En curs
                      <Badge variant="outline" className="ml-2 bg-blue-100 text-blue-700">
                        {filteredClaims.filter((claim) => claim.status === "in-progress").length}
                      </Badge>
                    </TabsTrigger>
                    <TabsTrigger value="pending">
                      En espera
                      <Badge variant="outline" className="ml-2 bg-amber-100 text-amber-700">
                        {filteredClaims.filter((claim) => claim.status === "pending").length}
                      </Badge>
                    </TabsTrigger>
                    <TabsTrigger value="completed">
                      Completades
                      <Badge variant="outline" className="ml-2 bg-green-100 text-green-700">
                        {filteredClaims.filter((claim) => claim.status === "completed").length}
                      </Badge>
                    </TabsTrigger>
                    <TabsTrigger value="denied">
                      Denegades
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
