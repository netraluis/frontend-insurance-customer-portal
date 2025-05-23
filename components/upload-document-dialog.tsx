"use client"

import * as React from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, X, FileText, FileImage, FileSpreadsheet, FileArchive } from "lucide-react"
import { cn } from "@/lib/utils"

interface UploadDocumentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function UploadDocumentDialog({ open, onOpenChange }: UploadDocumentDialogProps) {
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null)
  const [isUploading, setIsUploading] = React.useState(false)
  const [tags, setTags] = React.useState<string[]>([])
  const [tagInput, setTagInput] = React.useState("")
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0])
    }
  }

  const handleRemoveFile = () => {
    setSelectedFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && tagInput.trim() !== "") {
      e.preventDefault()
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()])
      }
      setTagInput("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleUpload = async () => {
    if (!selectedFile) return

    setIsUploading(true)

    // Simulate upload delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // In a real app, you would upload the file to your server here
    console.log("Uploading file:", selectedFile)
    console.log("With tags:", tags)

    setIsUploading(false)
    onOpenChange(false)

    // Reset form
    setSelectedFile(null)
    setTags([])
    setTagInput("")
  }

  const getFileIcon = () => {
    if (!selectedFile) return null

    const fileType = selectedFile.name.split(".").pop()?.toLowerCase()

    switch (fileType) {
      case "pdf":
        return <FileText className="h-8 w-8 text-red-500" />
      case "doc":
      case "docx":
        return <FileText className="h-8 w-8 text-blue-500" />
      case "jpg":
      case "jpeg":
      case "png":
        return <FileImage className="h-8 w-8 text-purple-500" />
      case "xls":
      case "xlsx":
        return <FileSpreadsheet className="h-8 w-8 text-green-500" />
      case "zip":
      case "rar":
        return <FileArchive className="h-8 w-8 text-amber-500" />
      default:
        return <FileText className="h-8 w-8 text-zinc-500" />
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Carregar document</DialogTitle>
          <DialogDescription>
            Carrega un document al teu portal d&aposassegurances. Formats suportats: PDF, DOCX, JPG, PNG, ZIP.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {!selectedFile ? (
            <div
              className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:bg-zinc-50 transition-colors"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.zip"
              />
              <Upload className="h-10 w-10 mx-auto text-zinc-400 mb-4" />
              <h3 className="text-lg font-medium mb-1">Arrossega i deixa anar el teu document aquí</h3>
              <p className="text-sm text-zinc-500 mb-4">o fes clic per navegar per arxius</p>
              <p className="text-xs text-zinc-400">Formats suportats: PDF, DOCX, JPG, PNG, ZIP (Màx 10MB)</p>
            </div>
          ) : (
            <div className="border rounded-lg p-4">
              <div className="flex items-center gap-4">
                {getFileIcon()}
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{selectedFile.name}</p>
                  <p className="text-sm text-zinc-500">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
                <Button variant="ghost" size="sm" onClick={handleRemoveFile}>
                  <X className="h-4 w-4" />
                  <span className="sr-only">Elimina el document</span>
                </Button>
              </div>
            </div>
          )}

          <div className="grid gap-2">
            <Label htmlFor="title">Títol del document</Label>
            <Input id="title" placeholder="Entra el títol del document" />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Descripció del document</Label>
            <Textarea id="description" placeholder="Entra la descripció del document" />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="category">Categoría</Label>
            <Select>
              <SelectTrigger id="category">
                <SelectValue placeholder="Selecciona la categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="policy">Document de política</SelectItem>
                <SelectItem value="claim">Document de reclamació</SelectItem>
                <SelectItem value="billing">Document de facturació</SelectItem>
                <SelectItem value="id">Document d&aposidentificació</SelectItem>
                <SelectItem value="other">Altres</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="policy">Política relacionada</Label>
            <Select>
              <SelectTrigger id="policy">
                <SelectValue placeholder="Selecciona la política" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="POL-AUTO-001">Assigurance de cotxe (POL-AUTO-001)</SelectItem>
                <SelectItem value="POL-HOME-001">Assigurance de casa (POL-HOME-001)</SelectItem>
                <SelectItem value="POL-TRAVEL-001">Assigurance de viatge (POL-TRAVEL-001)</SelectItem>
                <SelectItem value="POL-HEALTH-001">Assigurance de salut (POL-HEALTH-001)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="tags">Etiquetes</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {tags.map((tag) => (
                <div
                  key={tag}
                  className="bg-zinc-100 text-zinc-800 text-xs px-2 py-1 rounded-md flex items-center gap-1"
                >
                  {tag}
                  <button onClick={() => handleRemoveTag(tag)} className="text-zinc-500 hover:text-zinc-700">
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
            <Input
              id="tags"
              placeholder="Afegeix etiquetes (press Enter per afegir)"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleAddTag}
            />
            <p className="text-xs text-zinc-500">Press Enter per afegir múltiples etiquetes</p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel·lar
          </Button>
          <Button
            onClick={handleUpload}
            disabled={!selectedFile || isUploading}
            className={cn(isUploading && "opacity-80")}
          >
            {isUploading ? "Carregant..." : "Carregar document"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
