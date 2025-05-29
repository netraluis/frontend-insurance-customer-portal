"use client"

import { useClaimForm } from "../claim-form-context"
import { Card, CardContent } from "@/components/ui/card"
import { FileObject, UnifiedUpload } from "@/components/ui/unified-upload"
import { FileIcon, FileText, FileImage, FileVideo } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { useTranslations } from 'next-intl'

export default function Documentation() {
  const { formData, updateFormData } = useClaimForm()
  const tDocumentation = useTranslations('ClaimAuto.Documentation')

  const handleDocumentsChange = (files: FileObject | FileObject[] | null) => {
    updateFormData({ documents: Array.isArray(files) ? files : files ? [files] : [] })
  }

  // Handle document deletion
  const handleDeleteDocument = (id: string) => {
    const updatedDocuments = formData.documents.filter((doc) => doc.id !== id)
    updateFormData({ documents: updatedDocuments })
  }

  // Get file icon based on file type
  const getDocumentIcon = (type: string) => {
    if (type.includes("image")) {
      return <FileImage className="h-5 w-5 text-blue-500" />
    } else if (type.includes("video")) {
      return <FileVideo className="h-5 w-5 text-red-500" />
    } else if (type.includes("pdf")) {
      return <FileText className="h-5 w-5 text-amber-500" />
    } else {
      return <FileIcon className="h-5 w-5 text-zinc-500" />
    }
  }

  return (
    <Card className="border-none shadow-none">
      <CardContent className="p-0 space-y-6">
        <div className="space-y-2">
          <h3 className="text-lg font-medium text-zinc-900">{tDocumentation('title')}</h3>
          <p className="text-sm text-zinc-500">{tDocumentation('description')}</p>
        </div>

        <div className="space-y-4">
          {/* Using Enhanced UnifiedUpload for documents with directory support */}
          <UnifiedUpload
            label={tDocumentation('uploadLabel')}
            description={tDocumentation('uploadDescription')}
            value={formData.documents}
            onChange={handleDocumentsChange}
            multiple={true}
            maxSize={10}
            maxFiles={20}
            accept={{
              "image/*": [".jpeg", ".jpg", ".png"],
              "application/pdf": [".pdf"],
              "video/*": [".mp4", ".mov", ".avi"],
              "application/msword": [".doc"],
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
              "application/vnd.ms-excel": [".xls"],
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
              "text/plain": [".txt"],
            }}
            placeholder={tDocumentation('placeholder')}
            buttonText={tDocumentation('buttonText')}
            mobileButtonText={tDocumentation('mobileButtonText')}
            successMessage={tDocumentation('successMessage')}
            mobileSuccessMessage={tDocumentation('mobileSuccessMessage')}
            allowDirectories={true}
          />

          {/* Alternative display for documents if needed */}
          {formData.documents.length > 0 && (
            <div className="border rounded-md overflow-hidden mt-4 hidden">
              {/* Desktop table view */}
              <div className="hidden sm:block">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{tDocumentation('tableType')}</TableHead>
                      <TableHead>{tDocumentation('tableName')}</TableHead>
                      <TableHead className="w-[100px]">{tDocumentation('tableActions')}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {formData.documents.map((doc) => (
                      <TableRow key={doc.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getDocumentIcon(doc.type)}
                            <span className="capitalize">{doc.type.split("/")[0]}</span>
                          </div>
                        </TableCell>
                        <TableCell>{doc.name}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="icon" onClick={() => handleDeleteDocument(doc.id)}>
                              <span className="sr-only">{tDocumentation('deleteAction')}</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Mobile list view */}
              <div className="sm:hidden">
                <ul className="divide-y divide-zinc-200">
                  {formData.documents.map((doc) => (
                    <li key={doc.id} className="p-3 flex items-center justify-between">
                      <div className="flex items-center gap-2 min-w-0">
                        {getDocumentIcon(doc.type)}
                        <div className="min-w-0">
                          <p className="text-sm font-medium truncate">{doc.name}</p>
                          <p className="text-xs text-zinc-500 capitalize">{doc.type.split("/")[0]}</p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 rounded-full"
                        onClick={() => handleDeleteDocument(doc.id)}
                      >
                        <span className="sr-only">{tDocumentation('deleteAction')}</span>
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
