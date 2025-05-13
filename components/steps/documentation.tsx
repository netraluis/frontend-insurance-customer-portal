"use client"

import type React from "react"

import { useState } from "react"
import { useClaimForm, type Document } from "../claim-form-context"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FileIcon, Trash2, Upload, FileText, FileImage, FileVideo } from "lucide-react"

export default function Documentation() {
  const { formData, updateFormData } = useClaimForm()
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [documentType, setDocumentType] = useState<string>("")
  const [documentName, setDocumentName] = useState<string>("")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

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

      // Auto-detect document type based on file extension
      let detectedType = "report" // default
      if (file.type.startsWith("image/")) {
        detectedType = "photo"
      } else if (file.type.startsWith("video/")) {
        detectedType = "video"
      }

      // Use filename as document name, but remove extension
      const fileName = file.name.split(".").slice(0, -1).join(".") || file.name

      // Start upload process
      setIsUploading(true)
      setUploadProgress(0)
      setDocumentType(detectedType)
      setDocumentName(fileName)

      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            setIsUploading(false)

            // Add document to form data
            const newDocument: Document = {
              id: Date.now().toString(),
              name: fileName,
              type: detectedType,
              url: URL.createObjectURL(file),
            }

            updateFormData({
              documents: [...formData.documents, newDocument],
            })

            // Reset form
            setDocumentName("")
            setDocumentType("")
            setSelectedFile(null)

            // Reset the file input
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

          // Add document to form data
          const newDocument: Document = {
            id: Date.now().toString(),
            name: documentName,
            type: documentType,
            url: URL.createObjectURL(selectedFile),
          }

          updateFormData({
            documents: [...formData.documents, newDocument],
          })

          // Reset form
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

  const handleDeleteDocument = (id: string) => {
    const updatedDocuments = formData.documents.filter((doc) => doc.id !== id)
    updateFormData({ documents: updatedDocuments })
  }

  const getDocumentIcon = (type: string) => {
    switch (type) {
      case "photo":
        return <FileImage className="h-5 w-5 text-zinc-500" />
      case "video":
        return <FileVideo className="h-5 w-5 text-zinc-500" />
      case "report":
        return <FileText className="h-5 w-5 text-zinc-500" />
      default:
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
          <div className="flex justify-between items-center">
            <h4 className="text-md font-medium">Uploaded Documents</h4>
            <Button
              onClick={() => document.getElementById("direct-file-upload")?.click()}
              className="flex items-center gap-1"
            >
              <Upload className="h-4 w-4" />
              Upload Document
            </Button>
          </div>

          <div className="mt-4">
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="direct-file-upload"
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-zinc-300 border-dashed rounded-lg cursor-pointer bg-zinc-50 hover:bg-zinc-100 transition-colors"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-2 text-zinc-500" />
                  <p className="mb-1 text-sm text-zinc-500">Click to upload or drag and drop</p>
                  <p className="text-xs text-zinc-500 mb-4">PNG, JPG, PDF, MP4 (MAX. 10MB)</p>
                  <Button
                    type="button"
                    variant="default"
                    size="sm"
                    className="flex items-center gap-1"
                    onClick={(e) => {
                      e.preventDefault()
                      document.getElementById("direct-file-upload")?.click()
                    }}
                  >
                    <Upload className="h-4 w-4" />
                    Select file
                  </Button>
                </div>
                <input
                  id="direct-file-upload"
                  type="file"
                  className="hidden"
                  onChange={handleDirectFileUpload}
                  accept="image/*,video/*,application/pdf"
                />
              </label>
            </div>

            {isUploading && (
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Uploading...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="w-full bg-zinc-200 rounded-full h-2">
                  <div
                    className="bg-zinc-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {formData.documents.length > 0 ? (
            <div className="border rounded-md">
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
                          <span className="capitalize">{doc.type}</span>
                        </div>
                      </TableCell>
                      <TableCell>{doc.name}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="icon" onClick={() => handleDeleteDocument(doc.id)}>
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : null}
        </div>
      </CardContent>
    </Card>
  )
}
