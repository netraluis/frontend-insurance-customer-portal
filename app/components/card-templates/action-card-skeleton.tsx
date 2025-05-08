import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

interface ActionCardSkeletonProps {
  hasIcon?: boolean
  hasContent?: boolean
  hasPrimaryAction?: boolean
  hasSecondaryActions?: boolean
  fullWidthActions?: boolean
  contentHeight?: string
  className?: string
}

export function ActionCardSkeleton({
  hasIcon = true,
  hasContent = true,
  hasPrimaryAction = true,
  hasSecondaryActions = true,
  fullWidthActions = false,
  contentHeight = "h-20",
  className,
}: ActionCardSkeletonProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader>
        <div className="flex items-center gap-3">
          {hasIcon && <Skeleton className="h-10 w-10 rounded-full" />}
          <div className="space-y-1">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-4 w-64" />
          </div>
        </div>
      </CardHeader>
      {hasContent && (
        <CardContent>
          <Skeleton className={cn("w-full", contentHeight)} />
        </CardContent>
      )}
      {(hasPrimaryAction || hasSecondaryActions) && (
        <CardFooter className={cn("flex gap-3", fullWidthActions ? "flex-col" : "flex-row-reverse")}>
          {hasPrimaryAction && (
            <div className={cn(fullWidthActions && "w-full")}>
              <Skeleton className={cn("h-9", fullWidthActions ? "w-full" : "w-32")} />
            </div>
          )}
          {hasSecondaryActions && (
            <div className={cn("flex gap-2", fullWidthActions && "w-full")}>
              <Skeleton className={cn("h-9", fullWidthActions ? "flex-1" : "w-24")} />
              {fullWidthActions && <Skeleton className="h-9 flex-1" />}
            </div>
          )}
        </CardFooter>
      )}
    </Card>
  )
}
