import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { ArrowDown, ArrowRight, ArrowUp, type LucideIcon } from "lucide-react"

interface MetricCardProps {
  title: string
  value: string | number
  icon?: React.ComponentType<{ className?: string }> | LucideIcon
  description?: string
  trend?: "up" | "down" | "stable" | "none"
  trendValue?: string
  className?: string
  iconClassName?: string
  valueClassName?: string
  colorScheme?: "default" | "success" | "warning" | "error" | "info"
}

/**
 * MetricCard - A card for displaying key metrics and statistics
 */
export function MetricCard({
  title,
  value,
  icon: Icon,
  description,
  trend = "none",
  trendValue,
  className,
  iconClassName,
  valueClassName,
  colorScheme = "default",
}: MetricCardProps) {
  const colorSchemes = {
    default: "",
    success: "bg-green-50",
    warning: "bg-amber-50",
    error: "bg-red-50",
    info: "bg-blue-50",
  }

  const trendColors = {
    up: "bg-green-50 text-green-700",
    down: "bg-red-50 text-red-700",
    stable: "bg-zinc-50 text-zinc-700",
    none: "",
  }

  const trendIcons = {
    up: ArrowUp,
    down: ArrowDown,
    stable: ArrowRight,
    none: null,
  }

  const TrendIcon = trend !== "none" ? trendIcons[trend] : null

  return (
    <Card className={cn("overflow-hidden transition-all", colorSchemes[colorScheme], className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          {Icon && (
            <div className={cn("flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100", iconClassName)}>
              <Icon className="h-5 w-5 text-zinc-700" />
            </div>
          )}
          {trend !== "none" && (
            <div className={cn("flex items-center rounded-full px-2 py-1 text-xs font-medium", trendColors[trend])}>
              {TrendIcon && <TrendIcon className="mr-1 h-3 w-3" />}
              {trendValue || trend}
            </div>
          )}
        </div>
        <div className="mt-3">
          <h3 className="text-sm font-medium text-zinc-500">{title}</h3>
          <p className={cn("mt-1 text-2xl font-semibold", valueClassName)}>{value}</p>
          {description && <p className="mt-1 text-xs text-zinc-500">{description}</p>}
        </div>
      </CardContent>
    </Card>
  )
}
