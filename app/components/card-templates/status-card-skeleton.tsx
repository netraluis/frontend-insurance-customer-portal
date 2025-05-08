import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

interface StatusCardSkeletonProps {
  hasProgress?: boolean
  hasDetails?: boolean
  hasDescription?: boolean
  hasActions?: boolean
  className?: string
}

export function StatusCardSkeleton({
  hasProgress = true,
  hasDetails = true,
  hasDescription = true,
  hasActions = true,
  className,
}: StatusCardSkeletonProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-1">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
          <Skeleton className="h-5 w-20 rounded-full" />
        </div>

        {hasProgress && (
          <div className="mt-3">
            <div className="mb-1 flex items-center justify-between">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-3 w-8" />
            </div>
            <Skeleton className="h-1.5 w-full" />
          </div>
        )}

        {hasDetails && (
          <div className="mt-3 grid grid-cols-2 gap-2">
            <div className="flex items-center gap-1">
              <Skeleton className="h-3.5 w-3.5" />
              <Skeleton className="h-4 w-24" />
            </div>
            <div className="flex items-center gap-1">
              <Skeleton className="h-3.5 w-3.5" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
        )}

        {hasDescription && <Skeleton className="mt-3 h-8 w-full" />}

        {hasActions && (
          <div className="mt-3 flex justify-end">
            <Skeleton className="h-8 w-28" />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
