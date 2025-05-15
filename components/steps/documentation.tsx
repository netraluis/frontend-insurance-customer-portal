"use client"

import type React from "react"

import { useState } from "react"
import { useClaimForm, type Document } from "../claim-form-context"
import { Card, CardContent } from "@/components/ui/card"
import { FileObject, UnifiedUpload } from "@/components/ui/unified-upload"
import { FileIcon, FileText, FileImage, FileVideo, Trash } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

export default function Documentation() {
  const { formData, updateFormData } = useClaimForm()

  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [documentName, setDocumentName] = useState("")
  const [documentType, setDocumentType] = useState("")
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setSelectedFile(file)
      if (!documentName) {
        setDocumentName(file.name)
      }
    }
  }

  const handleDirectFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setSelectedFile(file)

      let detectedType = "report"
      if (file.type.startsWith("image/")) {
        detectedType = "photo"
      } else if (file.type.startsWith("video/")) {
        detectedType = "video"
      }

      const fileName = file.name.split(".").slice(0, -1).join(".") || file.name

      setIsUploading(true)
      setUploadProgress(0)
      setDocumentType(detectedType)
      setDocumentName(fileName)

      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            setIsUploading(false)

            const newDocument: Document = {
              id: Date.now().toString(),
              name: fileName,
              type: detectedType,
              url: URL.createObjectURL(file),
              size: file.size,
            }

            updateFormData({
              documents: [...formData.documents, newDocument],
            })

            setDocumentName("")
            setDocumentType("")
            setSelectedFile(null)
            e.target.value = ""

            return 0
          }
          return prev + 10
        })
      }, 200)
    }
  }

  const simulateUpload = () => {
    if (!selectedFile || !documentType || !documentName) return

    setIsUploading(true)
    setUploadProgress(0)

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsUploading(false)

          const newDocument: Document = {
            id: Date.now().toString(),
            name: documentName,
            type: documentType,
            url: URL.createObjectURL(selectedFile),
            size: selectedFile.size,
          }

          updateFormData({
            documents: [...formData.documents, newDocument],
          })

          setDocumentName("")
          setDocumentType("")
          setSelectedFile(null)
          setUploadDialogOpen(false)

          return 0
        }
        return prev + 10
      })
    }, 200)
  }

  const handleDocumentsChange = (files: FileObject | FileObject[] | null) => {
    const normalized = Array.isArray(files) ? files : files ? [files] : []

    const documents: Document[] = normalized.map((file) => ({
      id: Date.now().toString(),
      name: file.name,
      type: file.type,
      url: file.url,
      size: file.size,
    }))

    updateFormData({ documents })
  }

  const handleDeleteDocument = (id: string) => {
    const updatedDocuments = formData.documents.filter((doc) => doc.id !== id)
    updateFormData({ documents: updatedDocuments })
  }

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
          <h3 className="text-lg font-medium text-zinc-900">Documentation</h3>
          <p className="text-sm text-zinc-500">Upload photos, videos, and official reports related to the accident.</p>
        </div>

        <div className="space-y-4">
          <UnifiedUpload
            label="Uploaded Documents"
            description="Upload any relevant documents such as police reports, insurance documents, or other evidence."
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
            placeholder="Upload documents"
            buttonText="Select files"
            mobileButtonText="Add documents"
            successMessage="Document uploaded successfully!"
            mobileSuccessMessage="Document added!"
            allowDirectories={true}
          />

          {formData.documents.length > 0 && (
            <div className="border rounded-md overflow-hidden mt-4 hidden">
              <div className="hidden sm:block">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Type</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead className="w-[100px]">Actions</TableHead>
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
                              <Trash className="w-4 h-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

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
                        <Trash className="w-4 h-4" />
                        <span className="sr-only">Delete</span>
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
