import type React from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { InsuranceCard } from "@/components/insurance-card"

interface PolicyCardProps {
  id: string
  title: string
  type: "auto" | "home" | "travel" | "health"
  icon: React.ComponentType<{ className?: string }>
  premium: string
  renewalDate: string
  status: "active" | "pending" | "expired"
}

export function PolicyCard({ id, title, type, icon: Icon, premium, renewalDate, status }: PolicyCardProps) {
  const statusVariant = status === "active" ? "default" : status === "pending" ? "outline" : "destructive"

  return (
    <InsuranceCard noPadding className="h-full">
      <div className="flex items-center p-6">
        <div className="insurance-card-icon">
          <Icon className="h-5 w-5 text-zinc-700" />
        </div>
        <div className="ml-4 flex-1">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">{title}</h3>
              <p className="text-sm text-zinc-500">Policy #{id}</p>
            </div>
            <Badge variant={statusVariant} className="capitalize">
              {status}
            </Badge>
          </div>
          <div className="insurance-card-details">
            <span>Premium: {premium}</span>
            <span>Renewal: {renewalDate}</span>
          </div>
        </div>
      </div>
      <div className="insurance-card-footer">
        <span className="text-xs font-medium uppercase text-zinc-500">{type} Insurance</span>
        <Button variant="ghost" size="sm" asChild>
          <Link href={`/dashboard/policies/detail/${id}`}>
            View Details
            <ArrowRight className="ml-1 h-3 w-3" />
          </Link>
        </Button>
      </div>
    </InsuranceCard>
  )
}
