import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { CheckCircle2, Clock, AlertCircle, XCircle, type LucideIcon } from "lucide-react"

interface StatusCardProps {
  title: string
  subtitle?: string
  status: "completed" | "in-progress" | "pending" | "denied" | "warning" | "success" | "error" | "info"
  progress?: number
  icon?: React.ComponentType<{ className?: string }> | LucideIcon
  details?: Array<{
    label: string
    value: string | React.ReactNode
    icon?: React.ComponentType<{ className?: string }>
  }>
  description?: string
  actions?: React.ReactNode
  className?: string
  contentClassName?: string
}

/**
 * StatusCard - A card layout for displaying status information with visual indicators
 */
export function StatusCard({
  title,
  subtitle,
  status,
  progress,
  icon: CustomIcon,
  details,
  description,
  actions,
  className,
  contentClassName,
}: StatusCardProps) {
  // Get status icon and color
  const getStatusInfo = () => {
    switch (status) {
      case "completed":
      case "success":
        return {
          icon: CheckCircle2,
          color: "text-green-600",
          bgColor: "bg-green-100",
          textColor: "text-green-700",
        }
      case "in-progress":
      case "info":
        return {
          icon: Clock,
          color: "text-blue-600",
          bgColor: "bg-blue-100",
          textColor: "text-blue-700",
        }
      case "pending":
      case "warning":
        return {
          icon: AlertCircle,
          color: "text-amber-600",
          bgColor: "bg-amber-100",
          textColor: "text-amber-700",
        }
      case "denied":
      case "error":
        return {
          icon: XCircle,
          color: "text-red-600",
          bgColor: "bg-red-100",
          textColor: "text-red-700",
        }
      default:
        return {
          icon: Clock,
          color: "text-zinc-600",
          bgColor: "bg-zinc-100",
          textColor: "text-zinc-700",
        }
    }
  }

  const { icon: StatusIcon, color, bgColor, textColor } = getStatusInfo()
  const Icon = CustomIcon || StatusIcon

  return (
    <Card className={cn("overflow-hidden transition-all", className)}>
      <CardContent className={cn("p-6", contentClassName)}>
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className={cn("flex h-10 w-10 items-center justify-center rounded-full", bgColor)}>
              <Icon className={cn("h-5 w-5", color)} />
            </div>
            <div>
              <h3 className="font-medium">{title}</h3>
              {subtitle && <p className="text-sm text-zinc-500">{subtitle}</p>}
            </div>
          </div>
          <div className={cn("text-sm font-medium capitalize", textColor)}>{status.replace("-", " ")}</div>
        </div>

        {progress !== undefined && (
          <div className="mt-3">
            <div className="mb-1 flex items-center justify-between text-xs">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-1.5" />
          </div>
        )}

        {details && details.length > 0 && (
          <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
            {details.map((detail, index) => (
              <div key={index} className="flex items-center gap-1 text-zinc-500">
                {detail.icon && <detail.icon className="h-3.5 w-3.5 text-zinc-400" />}
                <span>
                  {detail.label && `${detail.label}: `}
                  {detail.value}
                </span>
              </div>
            ))}
          </div>
        )}

        {description && <p className="mt-3 text-sm text-zinc-600 line-clamp-2">{description}</p>}

        {actions && <div className="mt-3 flex justify-end">{actions}</div>}
      </CardContent>
    </Card>
  )
}
