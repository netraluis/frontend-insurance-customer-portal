import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

interface BasicCardSkeletonProps {
  hasTitle?: boolean
  hasDescription?: boolean
  hasHeaderAction?: boolean
  hasFooter?: boolean
  contentHeight?: string
  className?: string
}

export function BasicCardSkeleton({
  hasTitle = true,
  hasDescription = true,
  hasHeaderAction = false,
  hasFooter = false,
  contentHeight = "h-24",
  className,
}: BasicCardSkeletonProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      {(hasTitle || hasDescription || hasHeaderAction) && (
        <CardHeader className="flex flex-row items-start justify-between">
          <div className="space-y-2">
            {hasTitle && <Skeleton className="h-6 w-32" />}
            {hasDescription && <Skeleton className="h-4 w-64" />}
          </div>
          {hasHeaderAction && <Skeleton className="h-9 w-20" />}
        </CardHeader>
      )}
      <CardContent>
        <Skeleton className={cn("w-full", contentHeight)} />
      </CardContent>
      {hasFooter && (
        <CardFooter>
          <div className="flex justify-end gap-2 w-full">
            <Skeleton className="h-9 w-20" />
            <Skeleton className="h-9 w-20" />
          </div>
        </CardFooter>
      )}
    </Card>
  )
}
