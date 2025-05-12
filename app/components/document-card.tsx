import { Button } from "@/components/ui/button"
import { FileText, Download, FileSpreadsheet, CreditCard } from "lucide-react"
import { cn } from "@/lib/utils"
import { InsuranceCard } from "@/app/components/insurance-card"

interface DocumentCardProps {
  id: string
  title: string
  type: "policy" | "claim" | "billing"
  date: string
  policyId: string
  fileSize: string
  fileType: string
}

export function DocumentCard({ id, title, type, date, policyId, fileSize, fileType }: DocumentCardProps) {
  console.log({id, title, type, date, policyId, fileSize, fileType})
  const typeInfo = {
    policy: {
      icon: <FileText className="h-5 w-5 text-blue-700" />,
      bgColor: "bg-blue-100",
      label: "Policy Document",
    },
    claim: {
      icon: <FileSpreadsheet className="h-5 w-5 text-amber-700" />,
      bgColor: "bg-amber-100",
      label: "Claim Document",
    },
    billing: {
      icon: <CreditCard className="h-5 w-5 text-green-700" />,
      bgColor: "bg-green-100",
      label: "Billing Document",
    },
  }

  const { icon, bgColor, label } = typeInfo[type]

  return (
    <InsuranceCard className="h-full">
      <div className="flex items-start gap-3">
        <div className={cn("insurance-card-icon-square", bgColor)}>{icon}</div>
        <div className="flex-1">
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm text-zinc-500">
            {fileType} • {fileSize} • {date}
          </p>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-xs text-zinc-500">{label}</span>
            <Button variant="ghost" size="sm" className="h-8 gap-1">
              <Download className="h-3.5 w-3.5" />
              <span>Download</span>
            </Button>
          </div>
        </div>
      </div>
    </InsuranceCard>
  )
}
