"use client"

import type * as React from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

interface InsuranceCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  description?: string
  icon?: React.ReactNode
  footer?: React.ReactNode
  action?: {
    label: string
    href?: string
    onClick?: () => void
    variant?: "default" | "secondary" | "outline" | "ghost" | "link"
    icon?: React.ReactNode
  }
  noPadding?: boolean
  className?: string
  contentClassName?: string
  headerClassName?: string
  footerClassName?: string
}

export function InsuranceCard({
  title,
  description,
  icon,
  footer,
  action,
  children,
  noPadding = false,
  className,
  contentClassName,
  headerClassName,
  footerClassName,
  ...props
}: InsuranceCardProps) {
  return (
    <Card className={cn("insurance-card", className)} {...props}>
      {(title || description || icon) && (
        <CardHeader className={cn("insurance-card-header", headerClassName)}>
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              {icon && icon}
              <div>
                {title && <CardTitle className="insurance-card-title">{title}</CardTitle>}
                {description && <CardDescription className="insurance-card-description">{description}</CardDescription>}
              </div>
            </div>
            {action && (
              <Button
                variant={action.variant || "ghost"}
                size="sm"
                className="h-8"
                onClick={action.onClick}
                asChild={!!action.href}
              >
                {action.href ? (
                  <Link href={action.href}>
                    {action.label}
                    {action.icon || <ArrowRight className="ml-1 h-3 w-3" />}
                  </Link>
                ) : (
                  <>
                    {action.label}
                    {action.icon || <ArrowRight className="ml-1 h-3 w-3" />}
                  </>
                )}
              </Button>
            )}
          </div>
        </CardHeader>
      )}
      <CardContent
        className={cn(noPadding ? "insurance-card-content-no-padding" : "insurance-card-content", contentClassName)}
      >
        {children}
      </CardContent>
      {footer && <CardFooter className={cn("insurance-card-footer", footerClassName)}>{footer}</CardFooter>}
    </Card>
  )
}
