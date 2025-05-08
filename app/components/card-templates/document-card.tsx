import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { FileText, FileSpreadsheet, CreditCard, FileImage, FileArchive, File, type LucideIcon } from "lucide-react"

interface DocumentCardProps {
  title: string
  fileType: string
  fileSize?: string
  date?: string
  category?: string
  description?: string
  tags?: string[]
  actions?: React.ReactNode
  className?: string
  contentClassName?: string
}

/**
 * DocumentCard - A card layout for displaying document/file information
 */
export function DocumentCard({
  title,
  fileType,
  fileSize,
  date,
  category,
  description,
  tags,
  actions,
  className,
  contentClassName,
}: DocumentCardProps) {
  // Get document icon based on file type
  const getDocumentIcon = (): LucideIcon => {
    const type = fileType.toLowerCase()
    if (type === "pdf") return FileText
    if (type === "xlsx" || type === "csv" || type === "xls") return FileSpreadsheet
    if (type === "jpg" || type === "png" || type === "gif") return FileImage
    if (type === "zip" || type === "rar") return FileArchive
    if (type === "invoice" || type === "receipt") return CreditCard
    return File
  }

  // Get document type color
  const getDocumentTypeColor = (): string => {
    const type = fileType.toLowerCase()
    if (type === "pdf") return "bg-red-100"
    if (type === "xlsx" || type === "csv" || type === "xls") return "bg-green-100"
    if (type === "jpg" || type === "png" || type === "gif") return "bg-purple-100"
    if (type === "zip" || type === "rar") return "bg-amber-100"
    if (type === "invoice" || type === "receipt") return "bg-blue-100"
    return "bg-zinc-100"
  }

  // Get document icon color
  const getDocumentIconColor = (): string => {
    const type = fileType.toLowerCase()
    if (type === "pdf") return "text-red-700"
    if (type === "xlsx" || type === "csv" || type === "xls") return "text-green-700"
    if (type === "jpg" || type === "png" || type === "gif") return "text-purple-700"
    if (type === "zip" || type === "rar") return "text-amber-700"
    if (type === "invoice" || type === "receipt") return "text-blue-700"
    return "text-zinc-700"
  }

  const DocumentIcon = getDocumentIcon()
  const documentTypeColor = getDocumentTypeColor()
  const documentIconColor = getDocumentIconColor()

  return (
    <Card className={cn("overflow-hidden transition-all", className)}>
      <CardContent className={cn("p-6", contentClassName)}>
        <div className="flex items-start gap-3">
          <div className={cn("flex h-10 w-10 items-center justify-center rounded-md", documentTypeColor)}>
            <DocumentIcon className={cn("h-5 w-5", documentIconColor)} />
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <h3 className="font-medium">{title}</h3>
              <Badge variant="outline" className={cn("ml-2", documentTypeColor, documentIconColor)}>
                {fileType}
              </Badge>
            </div>
            <p className="text-sm text-zinc-500 mt-1">{[fileSize, date].filter(Boolean).join(" • ")}</p>
            {description && <p className="text-xs text-zinc-500 mt-2 line-clamp-2">{description}</p>}

            {tags && tags.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1">
                {tags.slice(0, 3).map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs bg-zinc-50">
                    {tag}
                  </Badge>
                ))}
                {tags.length > 3 && (
                  <Badge variant="outline" className="text-xs bg-zinc-50">
                    +{tags.length - 3}
                  </Badge>
                )}
              </div>
            )}

            {actions && (
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-zinc-500 capitalize">{category || "Document"}</span>
                <div className="flex items-center gap-1">{actions}</div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
