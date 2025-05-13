import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

interface ListItemCardSkeletonProps {
  hasIcon?: boolean
  hasBadge?: boolean
  hasDetails?: boolean
  hasActions?: boolean
  hasFooter?: boolean
  className?: string
}

export function ListItemCardSkeleton({
  hasIcon = true,
  hasBadge = true,
  hasDetails = true,
  hasActions = true,
  hasFooter = true,
  className,
}: ListItemCardSkeletonProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-0">
        <div className="flex items-center p-6">
          {hasIcon && <Skeleton className="h-10 w-10 rounded-full" />}
          <div className={cn("flex-1", hasIcon ? "ml-4" : "")}>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-4 w-24" />
              </div>
              {hasBadge && <Skeleton className="h-5 w-16 rounded-full" />}
            </div>
            {hasDetails && (
              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-24" />
              </div>
            )}
            {hasActions && (
              <div className="mt-3 flex justify-end">
                <Skeleton className="h-8 w-24" />
              </div>
            )}
          </div>
        </div>
        {hasFooter && (
          <div className="flex items-center justify-between border-t bg-zinc-50 px-6 py-3">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-8 w-28" />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
