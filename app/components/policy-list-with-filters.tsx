"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ArrowRight, ArrowUpDown, Filter, type LucideIcon, Search } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface Policy {
  id: string
  title: string
  type: string
  icon: LucideIcon
  premium: string
  renewalDate: string
  startDate: string
  status: "active" | "pending" | "expired"
  coverageAmount: string
}

interface PolicyListWithFiltersProps {
  policies: Policy[]
  defaultView?: "grid" | "list"
}

type SortOption = "name-asc" | "name-desc" | "renewal-asc" | "renewal-desc" | "premium-asc" | "premium-desc"

export function PolicyListWithFilters({ policies, defaultView = "grid" }: PolicyListWithFiltersProps) {
  const [view, setView] = React.useState<"grid" | "list">(defaultView)
  const [searchTerm, setSearchTerm] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState("all")
  const [typeFilter, setTypeFilter] = React.useState("all")
  const [sortBy, setSortBy] = React.useState<SortOption>("name-asc")

  // Filter policies based on search term, status, and type
  const filteredPolicies = React.useMemo(() => {
    return policies.filter((policy) => {
      const matchesSearch =
        policy.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        policy.id.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus = statusFilter === "all" || policy.status === statusFilter

      const matchesType = typeFilter === "all" || policy.type === typeFilter

      return matchesSearch && matchesStatus && matchesType
    })
  }, [policies, searchTerm, statusFilter, typeFilter])

  // Sort policies based on sort option
  const sortedPolicies = React.useMemo(() => {
    return [...filteredPolicies].sort((a, b) => {
      switch (sortBy) {
        case "name-asc":
          return a.title.localeCompare(b.title)
        case "name-desc":
          return b.title.localeCompare(a.title)
        case "renewal-asc":
          return new Date(a.renewalDate).getTime() - new Date(b.renewalDate).getTime()
        case "renewal-desc":
          return new Date(b.renewalDate).getTime() - new Date(a.renewalDate).getTime()
        case "premium-asc":
          return (
            Number.parseFloat(a.premium.replace(/[^0-9.-]+/g, "")) -
            Number.parseFloat(b.premium.replace(/[^0-9.-]+/g, ""))
          )
        case "premium-desc":
          return (
            Number.parseFloat(b.premium.replace(/[^0-9.-]+/g, "")) -
            Number.parseFloat(a.premium.replace(/[^0-9.-]+/g, ""))
          )
        default:
          return 0
      }
    })
  }, [filteredPolicies, sortBy])

  const getSortLabel = (option: SortOption): string => {
    switch (option) {
      case "name-asc":
        return "Policy Name (A-Z)"
      case "name-desc":
        return "Policy Name (Z-A)"
      case "renewal-asc":
        return "Renewal Date (Oldest)"
      case "renewal-desc":
        return "Renewal Date (Newest)"
      case "premium-asc":
        return "Premium (Low-High)"
      case "premium-desc":
        return "Premium (High-Low)"
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="md:col-span-1">
          <CardContent className="p-4 space-y-4">
            <div className="space-y-2">
              <label htmlFor="search" className="text-sm font-medium">
                Search
              </label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  type="search"
                  placeholder="Search policies..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="status-filter" className="text-sm font-medium">
                Status
              </label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger id="status-filter">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label htmlFor="type-filter" className="text-sm font-medium">
                Policy Type
              </label>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger id="type-filter">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="auto">Auto</SelectItem>
                  <SelectItem value="home">Home</SelectItem>
                  <SelectItem value="travel">Travel</SelectItem>
                  <SelectItem value="health">Health</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              variant="outline"
              className="w-full mt-2"
              onClick={() => {
                setSearchTerm("")
                setStatusFilter("all")
                setTypeFilter("all")
              }}
            >
              <Filter className="mr-2 h-4 w-4" />
              Reset Filters
            </Button>
          </CardContent>
        </Card>

        <div className="md:col-span-3 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-medium">Policy List</h3>
              <Badge variant="outline" className="ml-2">
                {sortedPolicies.length} Policies
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <ArrowUpDown className="mr-2 h-3.5 w-3.5" />
                    {getSortLabel(sortBy)}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setSortBy("name-asc")}>Policy Name (A-Z)</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("name-desc")}>Policy Name (Z-A)</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("renewal-desc")}>Renewal Date (Newest)</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("renewal-asc")}>Renewal Date (Oldest)</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("premium-desc")}>Premium (High-Low)</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("premium-asc")}>Premium (Low-High)</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <div className="flex border rounded-md">
                <Button
                  variant={view === "grid" ? "default" : "ghost"}
                  size="sm"
                  className="rounded-r-none"
                  onClick={() => setView("grid")}
                >
                  Grid
                </Button>
                <Button
                  variant={view === "list" ? "default" : "ghost"}
                  size="sm"
                  className="rounded-l-none"
                  onClick={() => setView("list")}
                >
                  List
                </Button>
              </div>
            </div>
          </div>

          {sortedPolicies.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-zinc-100 p-3 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-zinc-500"
                >
                  <path d="M16 16h.01" />
                  <path d="M8 16h.01" />
                  <path d="M18 9c0-1-1-2-3-2h-1a3 3 0 0 0-3-3c-1.31 0-2.42.83-2.83 2H8a3 3 0 0 0-3 3" />
                  <path d="M9 20H6a3 3 0 0 1-3-3V11a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v1" />
                  <path d="M14 14a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h6Z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium">No policies found</h3>
              <p className="text-sm text-zinc-500 max-w-sm mt-1">
                No policies match your current filters. Try adjusting your search criteria or add a new policy.
              </p>
              <Button className="mt-4">Add New Policy</Button>
            </div>
          ) : (
            <div className={cn(view === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" : "space-y-4")}>
              {sortedPolicies.map((policy) => (
                <PolicyCard key={policy.id} policy={policy} view={view} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

interface PolicyCardProps {
  policy: Policy
  view: "grid" | "list"
}

function PolicyCard({ policy, view }: PolicyCardProps) {
  const Icon = policy.icon

  const statusColors = {
    active: "bg-green-100 text-green-700 hover:bg-green-100",
    pending: "bg-amber-100 text-amber-700 hover:bg-amber-100",
    expired: "bg-red-100 text-red-700 hover:bg-red-100",
  }

  if (view === "list") {
    return (
      <Card className="overflow-hidden transition-all">
        <CardContent className="p-0">
          <div className="flex flex-col sm:flex-row sm:items-center p-6 gap-4">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100">
                <Icon className="h-5 w-5 text-zinc-700" />
              </div>
              <div>
                <h3 className="font-medium">{policy.title}</h3>
                <p className="text-sm text-zinc-500">Policy #{policy.id}</p>
              </div>
            </div>

            <Badge variant="outline" className={cn("capitalize self-start sm:self-auto", statusColors[policy.status])}>
              {policy.status}
            </Badge>

            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-zinc-500 mt-2 sm:mt-0 sm:ml-auto">
              <div>
                <span className="block text-xs uppercase text-zinc-400">Premium</span>
                <span>{policy.premium}</span>
              </div>
              <div>
                <span className="block text-xs uppercase text-zinc-400">Renewal</span>
                <span>{policy.renewalDate}</span>
              </div>
              <div>
                <span className="block text-xs uppercase text-zinc-400">Coverage</span>
                <span>{policy.coverageAmount}</span>
              </div>
            </div>

            <Button variant="ghost" size="sm" className="self-end sm:self-auto" asChild>
              <Link href={`/policies/detail/${policy.id}`}>
                View Details
                <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden transition-all h-full">
      <CardContent className="p-0">
        <div className="flex items-center p-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100">
            <Icon className="h-5 w-5 text-zinc-700" />
          </div>
          <div className="ml-4 flex-1">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">{policy.title}</h3>
                <p className="text-sm text-zinc-500">Policy #{policy.id}</p>
              </div>
              <Badge variant="outline" className={cn("capitalize", statusColors[policy.status])}>
                {policy.status}
              </Badge>
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-zinc-500">
              <span>Premium: {policy.premium}</span>
              <span>Renewal: {policy.renewalDate}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between border-t bg-zinc-50 px-6 py-3">
          <span className="text-xs font-medium uppercase text-zinc-500">{policy.type} Insurance</span>
          <Button variant="ghost" size="sm" asChild>
            <Link href={`/policies/detail/${policy.id}`}>
              View Details
              <ArrowRight className="ml-1 h-3 w-3" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
