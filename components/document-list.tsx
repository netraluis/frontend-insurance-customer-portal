"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  FileText,
  FileSpreadsheet,
  CreditCard,
  Download,
  MoreHorizontal,
  FileImage,
  FileArchive,
  Eye,
  Trash2,
  Share2,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { DocumentPreviewDialog } from "./document-preview-dialog"

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

interface DocumentListProps {
  documents: Document[]
  view: "grid" | "list"
  searchTerm: string
}

export function DocumentList({ documents, view, searchTerm }: DocumentListProps) {
  const [previewDocument, setPreviewDocument] = React.useState<Document | null>(null)

  // Filter documents based on search term
  const filteredDocuments = React.useMemo(() => {
    if (!searchTerm) return documents

    return documents.filter(
      (doc) =>
        doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
    )
  }, [documents, searchTerm])

  if (filteredDocuments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="rounded-full bg-zinc-100 p-3 mb-4">
          <FileText className="h-6 w-6 text-zinc-500" />
        </div>
        <h3 className="text-lg font-medium">No documents found</h3>
        <p className="text-sm text-zinc-500 max-w-sm mt-1">
          No documents match your current search or filters. Try adjusting your criteria or upload a new document.
        </p>
        <Button className="mt-4">Upload Document</Button>
      </div>
    )
  }

  return (
    <>
      <div className={cn(view === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" : "space-y-4")}>
        {filteredDocuments.map((document) => (
          <DocumentCard
            key={document.id}
            document={document}
            view={view}
            onPreview={() => setPreviewDocument(document)}
          />
        ))}
      </div>

      <DocumentPreviewDialog
        document={previewDocument}
        open={!!previewDocument}
        onOpenChange={(open) => !open && setPreviewDocument(null)}
      />
    </>
  )
}

interface DocumentCardProps {
  document: Document
  view: "grid" | "list"
  onPreview: () => void
}

function DocumentCard({ document, view, onPreview }: DocumentCardProps) {
  const getDocumentIcon = () => {
    switch (document.type) {
      case "policy":
        return <FileText className="h-5 w-5 text-blue-700" />
      case "claim":
        return <FileSpreadsheet className="h-5 w-5 text-amber-700" />
      case "billing":
        return <CreditCard className="h-5 w-5 text-green-700" />
      case "id":
        return <FileImage className="h-5 w-5 text-purple-700" />
      default:
        return <FileArchive className="h-5 w-5 text-zinc-700" />
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

  if (view === "list") {
    return (
      <Card className="overflow-hidden transition-all">
        <CardContent className="p-0">
          <div className="flex flex-col sm:flex-row sm:items-center p-6 gap-4">
            <div className="flex items-center gap-4">
              <div className={cn("flex h-10 w-10 items-center justify-center rounded-md", getDocumentTypeColor())}>
                {getDocumentIcon()}
              </div>
              <div>
                <h3 className="font-medium">{document.title}</h3>
                <p className="text-sm text-zinc-500">
                  {document.fileType} • {document.fileSize} • {document.date}
                </p>
              </div>
            </div>

            <Badge variant="outline" className={cn("capitalize self-start sm:self-auto", getFileTypeColor())}>
              {document.fileType}
            </Badge>

            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-zinc-500 mt-2 sm:mt-0 sm:ml-auto">
              <div>
                <span className="block text-xs uppercase text-zinc-400">Category</span>
                <span className="capitalize">{document.type}</span>
              </div>
              <div>
                <span className="block text-xs uppercase text-zinc-400">Policy</span>
                <span>{document.policyId}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              <Button variant="ghost" size="sm" onClick={onPreview}>
                <Eye className="h-4 w-4" />
                <span className="sr-only">Preview</span>
              </Button>
              <Button variant="ghost" size="sm">
                <Download className="h-4 w-4" />
                <span className="sr-only">Download</span>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">More options</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={onPreview}>
                    <Eye className="mr-2 h-4 w-4" />
                    Preview
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden transition-all h-full">
      <CardContent className="p-6">
        <div className="flex items-start gap-3">
          <div className={cn("flex h-10 w-10 items-center justify-center rounded-md", getDocumentTypeColor())}>
            {getDocumentIcon()}
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <h3 className="font-medium">{document.title}</h3>
              <Badge variant="outline" className={cn("ml-2", getFileTypeColor())}>
                {document.fileType}
              </Badge>
            </div>
            <p className="text-sm text-zinc-500 mt-1">
              {document.fileSize} • {document.date}
            </p>
            <p className="text-xs text-zinc-500 mt-2 line-clamp-2">{document.description}</p>

            <div className="mt-2 flex flex-wrap gap-1">
              {document.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs bg-zinc-50">
                  {tag}
                </Badge>
              ))}
              {document.tags.length > 3 && (
                <Badge variant="outline" className="text-xs bg-zinc-50">
                  +{document.tags.length - 3}
                </Badge>
              )}
            </div>

            <div className="mt-4 flex items-center justify-between">
              <span className="text-xs text-zinc-500 capitalize">{document.type} Document</span>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={onPreview}>
                  <Eye className="h-4 w-4" />
                  <span className="sr-only">Preview</span>
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Download className="h-4 w-4" />
                  <span className="sr-only">Download</span>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">More options</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={onPreview}>
                      <Eye className="mr-2 h-4 w-4" />
                      Preview
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Share2 className="mr-2 h-4 w-4" />
                      Share
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
