"use client"

import type * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ArrowRight, MoreHorizontal, FileText, MessageSquare, Calendar, DollarSign } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface Claim {
  id: string
  title: string
  date: string
  status: string
  progress: number
  policyId: string
  policyType: string
  amount: string
  description: string
  submittedBy: string
  assignedTo: string
  lastUpdated: string
}

interface ClaimsListProps {
  claims: Claim[]
  view: "grid" | "list"
  getPolicyTypeIcon: (type: string) => React.ComponentType<{ className?: string }>
  getStatusIcon: (status: string) => React.ComponentType<{ className?: string }>
  getStatusColor: (status: string) => string
}

export function ClaimsList({ claims, view, getPolicyTypeIcon, getStatusIcon, getStatusColor }: ClaimsListProps) {
  if (claims.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="rounded-full bg-zinc-100 p-3 mb-4">
          <FileText className="h-6 w-6 text-zinc-500" />
        </div>
        <h3 className="text-lg font-medium">No hi ha reclamacions</h3>
        <p className="text-sm text-zinc-500 max-w-sm mt-1">
          No hi ha reclamants que coincideixin amb la teva cerca o filtres. Pots provar a canviar els criteris o presentar un nou reclam.
        </p>
        <Button className="mt-4">Nou reclam</Button>
      </div>
    )
  }

  return (
    <div className={cn(view === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" : "space-y-4")}>
      {claims.map((claim) => (
        <ClaimCard
          key={claim.id}
          claim={claim}
          view={view}
          getPolicyTypeIcon={getPolicyTypeIcon}
          getStatusIcon={getStatusIcon}
          getStatusColor={getStatusColor}
        />
      ))}
    </div>
  )
}

interface ClaimCardProps {
  claim: Claim
  view: "grid" | "list"
  getPolicyTypeIcon: (type: string) => React.ComponentType<{ className?: string }>
  getStatusIcon: (status: string) => React.ComponentType<{ className?: string }>
  getStatusColor: (status: string) => string
}

function ClaimCard({ claim, view, getPolicyTypeIcon, getStatusIcon, getStatusColor }: ClaimCardProps) {
  const PolicyTypeIcon = getPolicyTypeIcon(claim.policyType)
  const StatusIcon = getStatusIcon(claim.status)
  const statusColor = getStatusColor(claim.status)

  if (view === "list") {
    return (
      <Card className="overflow-hidden transition-all">
        <CardContent className="p-0">
          <div className="flex flex-col sm:flex-row sm:items-center p-6 gap-4">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100">
                <PolicyTypeIcon className="h-5 w-5 text-zinc-700" />
              </div>
              <div>
                <h3 className="font-medium">{claim.title}</h3>
                <p className="text-sm text-zinc-500">Reclamació #{claim.id}</p>
              </div>
            </div>

            <Badge
              variant="outline"
              className={cn("capitalize self-start sm:self-auto flex items-center gap-1", statusColor)}
            >
              <StatusIcon className="h-3 w-3" />
              <span className="capitalize">{claim.status.replace("-", " ")}</span>
            </Badge>

            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-zinc-500 mt-2 sm:mt-0 sm:ml-auto">
              <div>
                <span className="block text-xs uppercase text-zinc-400">Presentada</span>
                <span>{claim.date}</span>
              </div>
              <div>
                <span className="block text-xs uppercase text-zinc-400">Import</span>
                <span>{claim.amount}</span>
              </div>
              <div>
                <span className="block text-xs uppercase text-zinc-400">Pòlissa</span>
                <span>{claim.policyId}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              <Button variant="ghost" size="sm" asChild>
                <Link href={`/claims/detail/${claim.id}`}>
                  Veure Detalls
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Més opcions</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <FileText className="mr-2 h-4 w-4" />
                    Veure Documents
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Contactar Adjustador
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Calendar className="mr-2 h-4 w-4" />
                    Veure Línia de Temps
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden transition-all h-full">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100">
              <PolicyTypeIcon className="h-5 w-5 text-zinc-700" />
            </div>
            <div>
              <h3 className="font-medium">{claim.title}</h3>
              <p className="text-sm text-zinc-500">Claim #{claim.id}</p>
            </div>
          </div>
          <Badge variant="outline" className={cn("flex items-center gap-1", statusColor)}>
            <StatusIcon className="h-3 w-3" />
            <span className="capitalize">{claim.status.replace("-", " ")}</span>
          </Badge>
        </div>

        <div className="mt-3">
          <div className="mb-1 flex items-center justify-between text-xs">
            <span>Progres</span>
            <span>{claim.progress}%</span>
          </div>
          <Progress value={claim.progress} className="h-1.5" />
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center gap-1 text-zinc-500">
            <Calendar className="h-3.5 w-3.5 text-zinc-400" />
            <span>{claim.date}</span>
          </div>
          <div className="flex items-center gap-1 text-zinc-500">
            <DollarSign className="h-3.5 w-3.5 text-zinc-400" />
            <span>{claim.amount}</span>
          </div>
        </div>

        <p className="mt-3 text-sm text-zinc-600 line-clamp-2">{claim.description}</p>

        <div className="mt-3 flex justify-between items-center">
          <span className="text-xs text-zinc-500 capitalize">{claim.policyType} Pòlissa</span>
          <Button variant="ghost" size="sm" asChild>
            <Link href={`/claims/detail/${claim.id}`}>
              Veure Detalls
              <ArrowRight className="ml-1 h-3 w-3" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
