import type React from "react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface ProfileCardProps {
  name: string
  subtitle?: string
  avatarSrc?: string
  avatarFallback?: string
  badge?: {
    text: string
    variant?: "default" | "secondary" | "destructive" | "outline"
    className?: string
  }
  details?: Array<{
    label: string
    value: string | React.ReactNode
    icon?: React.ComponentType<{ className?: string }>
  }>
  actions?: React.ReactNode
  children?: React.ReactNode
  className?: string
  headerClassName?: string
  contentClassName?: string
  footerClassName?: string
  avatarSize?: "sm" | "md" | "lg"
  layout?: "horizontal" | "vertical"
}

/**
 * ProfileCard - A card layout for displaying user or entity profiles
 */
export function ProfileCard({
  name,
  subtitle,
  avatarSrc,
  avatarFallback,
  badge,
  details,
  actions,
  children,
  className,
  headerClassName,
  contentClassName,
  footerClassName,
  avatarSize = "md",
  layout = "vertical",
}: ProfileCardProps) {
  const avatarSizes = {
    sm: "h-10 w-10",
    md: "h-16 w-16",
    lg: "h-24 w-24",
  }

  return (
    <Card className={cn("overflow-hidden transition-all", className)}>
      <CardHeader className={cn(headerClassName)}>
        <div className={cn("flex items-center gap-4", layout === "horizontal" ? "flex-row" : "flex-col")}>
          <Avatar className={cn(avatarSizes[avatarSize])}>
            <AvatarImage src={avatarSrc || "/placeholder.svg"} alt={name} />
            <AvatarFallback>{avatarFallback || name[0]}</AvatarFallback>
          </Avatar>
          <div className={cn("flex flex-col", layout === "horizontal" ? "" : "items-center text-center")}>
            <div className="flex items-center gap-2">
              <h3 className="font-medium text-lg">{name}</h3>
              {badge && (
                <Badge variant={badge.variant || "default"} className={badge.className}>
                  {badge.text}
                </Badge>
              )}
            </div>
            {subtitle && <p className="text-sm text-zinc-500">{subtitle}</p>}
          </div>
        </div>
      </CardHeader>
      {(details || children) && (
        <CardContent className={cn(contentClassName)}>
          {details && (
            <div className={cn("grid gap-3", layout === "horizontal" ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1")}>
              {details.map((detail, index) => (
                <div key={index} className="flex items-center gap-2">
                  {detail.icon && <detail.icon className="h-4 w-4 text-zinc-500" />}
                  <div className="flex flex-col">
                    <span className="text-xs text-zinc-500">{detail.label}</span>
                    <span className="text-sm font-medium">{detail.value}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
          {children}
        </CardContent>
      )}
      {actions && (
        <CardFooter className={cn(footerClassName)}>
          <div className="flex gap-2 w-full">{actions}</div>
        </CardFooter>
      )}
    </Card>
  )
}
