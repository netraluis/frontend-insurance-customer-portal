import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

interface ListItemCardProps {
  title: string
  subtitle?: string
  icon?: React.ComponentType<{ className?: string }> | LucideIcon
  badge?: {
    text: string
    variant?: "default" | "secondary" | "destructive" | "outline"
    className?: string
  }
  details?: Array<{
    label: string
    value: string | React.ReactNode
  }>
  actions?: React.ReactNode
  footer?: {
    content: React.ReactNode
    className?: string
  }
  className?: string
  contentClassName?: string
}

/**
 * ListItemCard - A card layout for displaying items in a list format
 */
export function ListItemCard({
  title,
  subtitle,
  icon: Icon,
  badge,
  details,
  actions,
  footer,
  className,
  contentClassName,
}: ListItemCardProps) {
  return (
    <Card className={cn("overflow-hidden transition-all", className)}>
      <CardContent className={cn("p-0", contentClassName)}>
        <div className="flex items-center p-6">
          {Icon && (
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100">
              <Icon className="h-5 w-5 text-zinc-700" />
            </div>
          )}
          <div className={cn("flex-1", Icon ? "ml-4" : "")}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">{title}</h3>
                {subtitle && <p className="text-sm text-zinc-500">{subtitle}</p>}
              </div>
              {badge && (
                <Badge variant={badge.variant || "default"} className={badge.className}>
                  {badge.text}
                </Badge>
              )}
            </div>
            {details && (
              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-zinc-500">
                {details.map((detail, index) => (
                  <span key={index}>
                    {detail.label}: {detail.value}
                  </span>
                ))}
              </div>
            )}
            {actions && <div className="mt-3 flex justify-end">{actions}</div>}
          </div>
        </div>
        {footer && (
          <div className={cn("flex items-center justify-between border-t bg-zinc-50 px-6 py-3", footer.className)}>
            {footer.content}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
