import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ArrowRight, CheckCircle2, Clock, AlertCircle } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { InsuranceCard } from "@/app/components/insurance-card"

interface ClaimCardProps {
  id: string
  title: string
  date: string
  status: "in-progress" | "completed" | "denied"
  progress: number
  policyId: string
  amount: string
}

export function ClaimCard({ id, title, date, status, progress, policyId, amount }: ClaimCardProps) {
  console.log({policyId})
  const statusInfo = {
    completed: {
      icon: <CheckCircle2 className="h-3 w-3" />,
      classes: "bg-green-100 text-green-700 hover:bg-green-100",
    },
    "in-progress": {
      icon: <Clock className="h-3 w-3" />,
      classes: "bg-blue-100 text-blue-700 hover:bg-blue-100",
    },
    denied: {
      icon: <AlertCircle className="h-3 w-3" />,
      classes: "bg-red-100 text-red-700 hover:bg-red-100",
    },
  }

  const statusVariant = status === "completed" ? "default" : status === "in-progress" ? "outline" : "destructive"
  const { icon, classes } = statusInfo[status]

  return (
    <InsuranceCard className="h-full">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm text-zinc-500">Claim #{id}</p>
        </div>
        <Badge variant={statusVariant} className={cn("flex items-center gap-1", classes)}>
          {icon}
          <span className="capitalize">{status.replace("-", " ")}</span>
        </Badge>
      </div>

      <div className="insurance-card-section">
        <div className="mb-1 flex items-center justify-between text-xs">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>
        <Progress value={progress} className="h-1.5" />
      </div>

      <div className="insurance-card-details">
        <span>Filed: {date}</span>
        <span>Amount: {amount}</span>
      </div>

      <div className="mt-4 flex justify-end">
        <Button variant="ghost" size="sm" asChild>
          <Link href={`/claims/detail/${id}`}>
            View Details
            <ArrowRight className="ml-1 h-3 w-3" />
          </Link>
        </Button>
      </div>
    </InsuranceCard>
  )
}
