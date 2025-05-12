"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, type LucideIcon } from "lucide-react"
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

interface PolicyListProps {
  policies: Policy[]
  view: "grid" | "list"
}

export function PolicyList({ policies, view }: PolicyListProps) {
  const [currentView, setCurrentView] = React.useState<"grid" | "list">(view)

  // Listen for view changes from parent component
  React.useEffect(() => {
    setCurrentView(view)
  }, [view])

  if (policies.length === 0) {
    return (
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
    )
  }

  return (
    <div className={cn(currentView === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" : "space-y-4")}>
      {policies.map((policy) => (
        <PolicyCard key={policy.id} policy={policy} view={currentView} />
      ))}
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
              <Link href={`/dashboard/policies/detail/${policy.id}`}>
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
            <Link href={`/dashboard/policies/detail/${policy.id}`}>
              View Details
              <ArrowRight className="ml-1 h-3 w-3" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
