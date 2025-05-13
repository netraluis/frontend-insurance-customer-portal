"use client"

import type React from "react"

import { useState } from "react"
import { useClaimForm, type Document } from "@/app/components/claim-form-context"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
      case "Imatge":
        return <FileImage className="h-5 w-5 text-zinc-500" />
      case "Vídeo":
        return <FileVideo className="h-5 w-5 text-zinc-500" />
      case "Informe oficial":
        return <FileText className="h-5 w-5 text-zinc-500" />
      default:
        return <FileIcon className="h-5 w-5 text-zinc-500" />
    }
  }

  return (
    <Card className="border-none shadow-none">
      <CardContent className="p-0 space-y-6">
        <div className="space-y-2">
          <h3 className="text-lg font-medium text-zinc-900">Documentació</h3>
          <p className="text-sm text-zinc-500">Carrega imatges, vídeos i informes oficials relacionats amb el siniestri.</p>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="text-md font-medium">Documents carregats</h4>
            <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
              <Button onClick={() => setUploadDialogOpen(true)} className="flex items-center gap-1">
                <Upload className="h-4 w-4" />
                Carregar document
              </Button>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Carregar document</DialogTitle>
                  <DialogDescription>
                    Carrega imatges, vídeos o informes oficials relacionats amb la vostra reclamació.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="documentType">Tipus de document</Label>
                    <Select value={documentType} onValueChange={setDocumentType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona el tipus de document" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Imatge">Imatge</SelectItem>
                        <SelectItem value="Vídeo">Vídeo</SelectItem>
                        <SelectItem value="Informe oficial">Informe oficial</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="documentName">Nom del document</Label>
                    <Input
                      id="documentName"
                      value={documentName}
                      onChange={(e) => setDocumentName(e.target.value)}
                      placeholder="Introdueix un nom per aquest document"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fileUpload">Fitxer</Label>
                    <div className="flex items-center justify-center w-full">
                      <label
                        htmlFor="fileUpload"
                        className="flex flex-col items-center justify-center w-full h-32 border-2 border-zinc-300 border-dashed rounded-lg cursor-pointer bg-zinc-50 hover:bg-zinc-100"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          {selectedFile ? (
                            <div className="text-center">
                              <FileIcon className="mx-auto h-8 w-8 text-zinc-500 mb-2" />
                              <p className="text-sm text-zinc-500">{selectedFile.name}</p>
                              <p className="text-xs text-zinc-400">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                            </div>
                          ) : (
                            <>
                              <Upload className="w-8 h-8 mb-2 text-zinc-500" />
                              <p className="mb-1 text-sm text-zinc-500">
                                <span className="font-semibold">Clica per carregar</span> o arrossega i deixa anar
                              </p>
                              <p className="text-xs text-zinc-500">PNG, JPG, PDF, MP4 (MAX. 10MB)</p>
                            </>
                          )}
                        </div>
                        <input
                          id="fileUpload"
                          type="file"
                          className="hidden"
                          onChange={handleFileChange}
                          accept="image/*,video/*,application/pdf"
                        />
                      </label>
                    </div>
                  </div>

                  {isUploading && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span>Carregant...</span>
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
                <DialogFooter>
                  <Button variant="outline" onClick={() => setUploadDialogOpen(false)}>
                    Cancelar
                  </Button>
                  <Button
                    onClick={simulateUpload}
                    disabled={!selectedFile || !documentType || !documentName || isUploading}
                  >
                    Carregar
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {formData.documents.length > 0 ? (
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tipus</TableHead>
                    <TableHead>Nom</TableHead>
                    <TableHead className="w-[100px]">Accions</TableHead>
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
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteDocument(doc.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Eliminar</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-8 border border-dashed rounded-md border-zinc-300 bg-zinc-50">
                <p className="text-zinc-500">No hi ha documents carregats encara.</p>
              <p className="text-sm text-zinc-400 mt-1">Clica &ldquo;Carregar document&ldquo; per afegir fotos, vídeos o informes.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
