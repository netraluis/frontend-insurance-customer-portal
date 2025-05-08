import type React from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface BasicCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  description?: string
  footer?: React.ReactNode
  headerAction?: React.ReactNode
  noPadding?: boolean
  className?: string
  contentClassName?: string
  headerClassName?: string
  footerClassName?: string
}

/**
 * BasicCard - A standard card layout with optional title, description, and footer
 */
export function BasicCard({
  title,
  description,
  footer,
  headerAction,
  children,
  noPadding = false,
  className,
  contentClassName,
  headerClassName,
  footerClassName,
  ...props
}: BasicCardProps) {
  return (
    <Card className={cn("overflow-hidden transition-all", className)} {...props}>
      {(title || description || headerAction) && (
        <CardHeader className={cn("flex flex-row items-start justify-between", headerClassName)}>
          <div>
            {title && <CardTitle>{title}</CardTitle>}
            {description && <CardDescription>{description}</CardDescription>}
          </div>
          {headerAction && <div>{headerAction}</div>}
        </CardHeader>
      )}
      <CardContent className={cn(noPadding ? "p-0" : "", contentClassName)}>{children}</CardContent>
      {footer && <CardFooter className={cn(footerClassName)}>{footer}</CardFooter>}
    </Card>
  )
}
