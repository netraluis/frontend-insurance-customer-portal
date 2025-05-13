"use client"

import type React from "react"
import { cn } from "@/lib/utils"
import { InsuranceCard } from "@/components/insurance-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

interface StandardizedCardProps {
  title: string
  subtitle?: string
  icon?: React.ReactNode
  badge?: {
    text: string
    variant?: "default" | "secondary" | "destructive" | "outline"
    className?: string
  }
  details?: Array<{
    label: string
    value: string | React.ReactNode
  }>
  action?: {
    label: string
    href?: string
    onClick?: () => void
    icon?: React.ReactNode
  }
  footer?: React.ReactNode
  children?: React.ReactNode
  className?: string
}

export function StandardizedCard({
  title,
  subtitle,
  icon,
  badge,
  details,
  action,
  footer,
  children,
  className,
}: StandardizedCardProps) {
  return (
    <InsuranceCard className={cn("h-full", className)} noPadding={!!footer}>
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            {icon && icon}
            <div>
              <h3 className="font-medium">{title}</h3>
              {subtitle && <p className="text-sm text-zinc-500">{subtitle}</p>}
            </div>
          </div>
          {badge && (
            <Badge variant={badge.variant || "default"} className={badge.className}>
              {badge.text}
            </Badge>
          )}
        </div>

        {details && details.length > 0 && (
          <div className="insurance-card-details">
            {details.map((detail, index) => (
              <span key={index}>
                {detail.label}: {detail.value}
              </span>
            ))}
          </div>
        )}

        {children && <div className="mt-4">{children}</div>}

        {action && !footer && (
          <div className="mt-4 flex justify-end">
            <Button variant="ghost" size="sm" onClick={action.onClick} asChild={!!action.href}>
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
          </div>
        )}
      </div>

      {footer && <div className="insurance-card-footer">{footer}</div>}
    </InsuranceCard>
  )
}
