"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  FileText,
  FileSpreadsheet,
  CreditCard,
  Download,
  FileImage,
  FileArchive,
  Calendar,
  Tag,
  Info,
  Share2,
} from "lucide-react"
import { cn } from "@/lib/utils"
import Image from 'next/image';

interface Document {
  id: string
  title: string
  type: string
  date: string
  policyId: string
  fileSize: string
  fileType: string
  category: string
  description: string
  lastModified: string
  tags: string[]
}

interface DocumentPreviewDialogProps {
  document: Document | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function DocumentPreviewDialog({ document, open, onOpenChange }: DocumentPreviewDialogProps) {
  if (!document) return null

  const getDocumentIcon = () => {
    switch (document.type) {
      case "policy":
        return <FileText className="h-6 w-6 text-blue-700" />
      case "claim":
        return <FileSpreadsheet className="h-6 w-6 text-amber-700" />
      case "billing":
        return <CreditCard className="h-6 w-6 text-green-700" />
      case "id":
        return <FileImage className="h-6 w-6 text-purple-700" />
      default:
        return <FileArchive className="h-6 w-6 text-zinc-700" />
    }
  }

  const getDocumentTypeColor = () => {
    switch (document.type) {
      case "policy":
        return "bg-blue-100"
      case "claim":
        return "bg-amber-100"
      case "billing":
        return "bg-green-100"
      case "id":
        return "bg-purple-100"
      default:
        return "bg-zinc-100"
    }
  }

  const getFileTypeColor = () => {
    switch (document.fileType.toLowerCase()) {
      case "pdf":
        return "bg-red-100 text-red-700"
      case "docx":
        return "bg-blue-100 text-blue-700"
      case "jpg":
      case "png":
        return "bg-purple-100 text-purple-700"
      case "zip":
        return "bg-amber-100 text-amber-700"
      default:
        return "bg-zinc-100 text-zinc-700"
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-auto">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className={cn("flex h-10 w-10 items-center justify-center rounded-md", getDocumentTypeColor())}>
              {getDocumentIcon()}
            </div>
            <DialogTitle className="text-xl">{document.title}</DialogTitle>
          </div>
        </DialogHeader>

        <div className="flex flex-wrap gap-2 mt-2">
          <Badge variant="outline" className={cn(getFileTypeColor())}>
            {document.fileType}
          </Badge>
          <Badge variant="outline" className="capitalize">
            {document.type} Document
          </Badge>
        </div>

        <div className="mt-4">
          <p className="text-sm text-zinc-700">{document.description}</p>
        </div>

        <div className="mt-6 border rounded-lg overflow-hidden">
          {document.fileType.toLowerCase() === "pdf" ? (
            <div className="bg-zinc-100 h-[300px] flex items-center justify-center">
              <div className="text-center">
                <FileText className="h-16 w-16 text-zinc-400 mx-auto mb-4" />
                <p className="text-zinc-600 font-medium">PDF Preview</p>
                <p className="text-sm text-zinc-500 mt-1">Click download to view the full document</p>
              </div>
            </div>
          ) : document.fileType.toLowerCase() === "jpg" || document.fileType.toLowerCase() === "png" ? (
            <div className="bg-zinc-100 h-[300px] flex items-center justify-center">
              <Image src="/digital-document-overview.png" alt="Descripción" height={300} className="max-h-full object-contain"/>
            </div>
          ) : (
            <div className="bg-zinc-100 h-[300px] flex items-center justify-center">
              <div className="text-center">
                {document.fileType.toLowerCase() === "docx" ? (
                  <FileText className="h-16 w-16 text-zinc-400 mx-auto mb-4" />
                ) : document.fileType.toLowerCase() === "zip" ? (
                  <FileArchive className="h-16 w-16 text-zinc-400 mx-auto mb-4" />
                ) : (
                  <FileText className="h-16 w-16 text-zinc-400 mx-auto mb-4" />
                )}
                <p className="text-zinc-600 font-medium">{document.fileType} Document</p>
                <p className="text-sm text-zinc-500 mt-1">Preview not available</p>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-zinc-500" />
              <span className="text-sm font-medium">Date</span>
              <span className="text-sm text-zinc-600 ml-auto">{document.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Info className="h-4 w-4 text-zinc-500" />
              <span className="text-sm font-medium">File Size</span>
              <span className="text-sm text-zinc-600 ml-auto">{document.fileSize}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-zinc-500" />
              <span className="text-sm font-medium">Last Modified</span>
              <span className="text-sm text-zinc-600 ml-auto">{document.lastModified}</span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-zinc-500" />
              <span className="text-sm font-medium">Policy ID</span>
              <span className="text-sm text-zinc-600 ml-auto">{document.policyId}</span>
            </div>
            <div className="flex items-center gap-2">
              <Tag className="h-4 w-4 text-zinc-500" />
              <span className="text-sm font-medium">Tags</span>
              <div className="ml-auto flex flex-wrap gap-1 justify-end">
                {document.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="mt-6 gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button variant="outline">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
