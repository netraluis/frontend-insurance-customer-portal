import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

interface MetricCardSkeletonProps {
  hasIcon?: boolean
  hasTrend?: boolean
  className?: string
}

export function MetricCardSkeleton({ hasIcon = true, hasTrend = true, className }: MetricCardSkeletonProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          {hasIcon && <Skeleton className="h-10 w-10 rounded-full" />}
          {hasTrend && <Skeleton className="h-5 w-16 rounded-full" />}
        </div>
        <div className="mt-3 space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-7 w-20" />
          <Skeleton className="h-3 w-32" />
        </div>
      </CardContent>
    </Card>
  )
}
