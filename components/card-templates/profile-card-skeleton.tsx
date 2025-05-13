import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

interface ProfileCardSkeletonProps {
  hasBadge?: boolean
  hasDetails?: boolean
  hasActions?: boolean
  avatarSize?: "sm" | "md" | "lg"
  layout?: "horizontal" | "vertical"
  className?: string
}

export function ProfileCardSkeleton({
  hasBadge = true,
  hasDetails = true,
  hasActions = true,
  avatarSize = "md",
  layout = "vertical",
  className,
}: ProfileCardSkeletonProps) {
  const avatarSizes = {
    sm: "h-10 w-10",
    md: "h-16 w-16",
    lg: "h-24 w-24",
  }

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader>
        <div className={cn("flex items-center gap-4", layout === "horizontal" ? "flex-row" : "flex-col")}>
          <Skeleton className={cn("rounded-full", avatarSizes[avatarSize])} />
          <div className={cn("flex flex-col", layout === "horizontal" ? "" : "items-center text-center")}>
            <div className="flex items-center gap-2">
              <Skeleton className="h-6 w-32" />
              {hasBadge && <Skeleton className="h-5 w-16 rounded-full" />}
            </div>
            <Skeleton className="mt-1 h-4 w-24" />
          </div>
        </div>
      </CardHeader>
      {hasDetails && (
        <CardContent>
          <div className={cn("grid gap-3", layout === "horizontal" ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1")}>
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4" />
              <div className="flex flex-col gap-1">
                <Skeleton className="h-3 w-12" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4" />
              <div className="flex flex-col gap-1">
                <Skeleton className="h-3 w-12" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4" />
              <div className="flex flex-col gap-1">
                <Skeleton className="h-3 w-12" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
          </div>
        </CardContent>
      )}
      {hasActions && (
        <CardFooter>
          <div className="flex gap-2 w-full">
            <Skeleton className="h-9 flex-1" />
            <Skeleton className="h-9 flex-1" />
          </div>
        </CardFooter>
      )}
    </Card>
  )
}
