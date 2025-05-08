import type React from "react"
import { ArrowDown, ArrowRight, ArrowUp } from "lucide-react"
import { cn } from "@/lib/utils"
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
  trend = "stable",
}: DashboardMetricCardProps) {
  const trendInfo = {
    up: {
      icon: <ArrowUp className="mr-1 h-3 w-3" />,
      classes: "bg-green-50 text-green-700",
    },
    down: {
      icon: <ArrowDown className="mr-1 h-3 w-3" />,
      classes: "bg-red-50 text-red-700",
    },
    stable: {
      icon: <ArrowRight className="mr-1 h-3 w-3" />,
      classes: "bg-zinc-50 text-zinc-700",
    },
  }

  const { icon, classes } = trendInfo[trend]

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
