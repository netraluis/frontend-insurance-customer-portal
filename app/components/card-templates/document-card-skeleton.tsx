import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

interface DocumentCardSkeletonProps {
  hasBadge?: boolean
  hasDescription?: boolean
  hasTags?: boolean
  hasActions?: boolean
  className?: string
}

export function DocumentCardSkeleton({
  hasBadge = true,
  hasDescription = true,
  hasTags = true,
  hasActions = true,
  className,
}: DocumentCardSkeletonProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-6">
        <div className="flex items-start gap-3">
          <Skeleton className="h-10 w-10 rounded-md" />
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <Skeleton className="h-5 w-32" />
              {hasBadge && <Skeleton className="h-5 w-12 rounded-full" />}
            </div>
            <Skeleton className="mt-1 h-4 w-40" />

            {hasDescription && <Skeleton className="mt-2 h-8 w-full" />}

            {hasTags && (
              <div className="mt-2 flex flex-wrap gap-1">
                <Skeleton className="h-5 w-12 rounded-full" />
                <Skeleton className="h-5 w-12 rounded-full" />
                <Skeleton className="h-5 w-12 rounded-full" />
              </div>
            )}

            {hasActions && (
              <div className="mt-4 flex items-center justify-between">
                <Skeleton className="h-4 w-20" />
                <div className="flex items-center gap-1">
                  <Skeleton className="h-8 w-8 rounded-md" />
                  <Skeleton className="h-8 w-8 rounded-md" />
                  <Skeleton className="h-8 w-8 rounded-md" />
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
