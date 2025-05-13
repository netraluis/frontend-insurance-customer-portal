import type React from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface ActionCardProps {
  title?: string
  description?: string
  icon?: React.ComponentType<{ className?: string }>
  primaryAction?: React.ReactNode
  secondaryActions?: React.ReactNode
  children?: React.ReactNode
  className?: string
  contentClassName?: string
  headerClassName?: string
  footerClassName?: string
  fullWidthActions?: boolean
}

/**
 * ActionCard - A card layout with prominent action buttons
 */
export function ActionCard({
  title,
  description,
  icon: Icon,
  primaryAction,
  secondaryActions,
  children,
  className,
  contentClassName,
  headerClassName,
  footerClassName,
  fullWidthActions = false,
}: ActionCardProps) {
  return (
    <Card className={cn("overflow-hidden transition-all", className)}>
      <CardHeader className={cn(headerClassName)}>
        <div className="flex items-center gap-3">
          {Icon && (
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100">
              <Icon className="h-5 w-5 text-zinc-700" />
            </div>
          )}
          <div>
            {title && <CardTitle>{title}</CardTitle>}
            {description && <CardDescription>{description}</CardDescription>}
          </div>
        </div>
      </CardHeader>
      <CardContent className={cn(contentClassName)}>{children}</CardContent>
      {(primaryAction || secondaryActions) && (
        <CardFooter className={cn("flex gap-3", fullWidthActions ? "flex-col" : "flex-row-reverse", footerClassName)}>
          {primaryAction && <div className={cn(fullWidthActions && "w-full")}>{primaryAction}</div>}
          {secondaryActions && <div className={cn("flex gap-2", fullWidthActions && "w-full")}>{secondaryActions}</div>}
        </CardFooter>
      )}
    </Card>
  )
}
