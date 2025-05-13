import type React from "react"
import { InsuranceCard } from "@/app/components/insurance-card"

interface DashboardMetricCardProps {
  title: string
  value: string
  icon: React.ComponentType<{ className?: string }>
  description: string
  trend?: "up" | "down" | "stable"
}

export function DashboardMetricCard({
  title,
  value,
  icon: Icon,
  description,
}: DashboardMetricCardProps) {


  return (
    <InsuranceCard className="h-full">
      <div className="flex items-center justify-between">
        <div className="insurance-card-icon">
          <Icon className="h-5 w-5 text-zinc-700" />
        </div>      
      </div>
      <div className="mt-3">
        <h3 className="text-sm font-medium text-zinc-500">{title}</h3>
        <p className="mt-1 text-2xl font-semibold">{value}</p>
        <p className="mt-1 text-xs text-zinc-500">{description}</p>
      </div>
    </InsuranceCard>
  )
}
