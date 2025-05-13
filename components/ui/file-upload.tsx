"use client"

import * as React from "react"
import { useDropzone, type DropzoneOptions } from "react-dropzone"
import { cn } from "@/lib/utils"
import { FileIcon, X, Upload, FileText, FileImage, FileIcon as FilePdf, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

/*export interface FileUploadProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onDrop"> {
  value?: File | null
  onChange?: (file: File | null) => void
  onDrop?: (acceptedFiles: File[]) => void
  disabled?: boolean
  dropzoneOptions?: Omit<DropzoneOptions, "disabled" | "onDrop">
  maxSize?: number // in MB
  accept?: Record<string, string[]>
  showPreview?: boolean
  previewUrl?: string
  previewName?: string
  previewType?: string
  previewSize?: number
}
*/

export function FileUpload({
  value,
  onChange,
  onDrop,
  disabled = false,
  dropzoneOptions,
  maxSize = 5, // Default max size is 5MB
  accept = {
    "image/*": [".jpeg", ".jpg", ".png"],
    "application/pdf": [".pdf"],
  },
  showPreview = true,
  previewUrl,
  previewName,
  previewType,
  previewSize,
  className,
  ...props
}: any) {
  const [file, setFile] = React.useState<File | null>(value || null)
  const [preview, setPreview] = React.useState<string | null>(previewUrl || null)
  const [uploadProgress, setUploadProgress] = React.useState<number>(0)
  const [isUploading, setIsUploading] = React.useState<boolean>(false)
  const [error, setError] = React.useState<string | null>(null)

  // Handle file drop
  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    disabled,
    maxSize: maxSize * 1024 * 1024, // Convert MB to bytes
    maxFiles: 1,
    accept,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        handleFile(acceptedFiles[0])
        if (onDrop) {
          onDrop(acceptedFiles)
        }
      }
    },
    ...dropzoneOptions,
  })

  // Handle file selection
  const handleFile = (selectedFile: File) => {
    setFile(selectedFile)
    setError(null)

    // Simulate upload progress
    setIsUploading(true)
    setUploadProgress(0)

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsUploading(false)
          // Create preview URL
          const url = URL.createObjectURL(selectedFile)
          setPreview(url)
          if (onChange) {
            onChange(selectedFile)
          }
          return 100
        }
        return prev + 10
      })
    }, 100)
  }

  // Handle file removal
  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation()
    setFile(null)
    setPreview(null)
    setUploadProgress(0)
    if (onChange) {
      onChange(null)
    }
  }

  // Get file icon based on file type
  const getFileIcon = (type: string | undefined) => {
    if (!type) return <FileIcon className="h-10 w-10 text-zinc-400" />

    if (type.includes("pdf")) {
      return <FilePdf className="h-10 w-10 text-red-500" />
    } else if (type.includes("image")) {
      return <FileImage className="h-10 w-10 text-blue-500" />
    } else {
      return <FileText className="h-10 w-10 text-zinc-500" />
    }
  }

  // Format file size
  const formatFileSize = (bytes: number | undefined) => {
    if (!bytes) return "Unknown size"
    if (bytes < 1024) return bytes + " bytes"
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB"
    return (bytes / (1024 * 1024)).toFixed(1) + " MB"
  }

  // Check if we have an existing file preview
  const hasExistingPreview = previewUrl && previewName && !file

  // Show error if file is rejected
  React.useEffect(() => {
    if (fileRejections.length > 0) {
      const rejection = fileRejections[0]
      if (rejection.errors[0].code === "file-too-large") {
        setError(`File is too large. Max size is ${maxSize}MB.`)
      } else if (rejection.errors[0].code === "file-invalid-type") {
        setError("Invalid file type. Please upload an image or PDF.")
      } else {
        setError(rejection.errors[0].message)
      }
    }
  }, [fileRejections, maxSize])

  return (
    <div className={cn("space-y-2", className)} {...props}>
      <div
        {...getRootProps()}
        className={cn(
          "relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer transition-colors",
          isDragActive ? "border-zinc-400 bg-zinc-100" : "border-zinc-300 bg-zinc-50 hover:bg-zinc-100",
          disabled && "opacity-60 cursor-not-allowed hover:bg-zinc-50",
          error && "border-red-300",
        )}
      >
        <input {...getInputProps()} />

        {isUploading ? (
          <div className="flex flex-col items-center justify-center space-y-4 p-4 w-full max-w-xs">
            <Loader2 className="h-8 w-8 text-zinc-400 animate-spin" />
            <div className="w-full space-y-1">
              <Progress value={uploadProgress} className="h-2 w-full" />
              <p className="text-xs text-zinc-500 text-center">{uploadProgress}% uploaded</p>
            </div>
          </div>
        ) : file || hasExistingPreview ? (
          <div className="flex flex-col items-center justify-center p-4 w-full">
            {showPreview && preview && file?.type.includes("image") ? (
              <div className="relative w-full max-w-xs h-32 mb-2">
                <img
                  src={preview || "/placeholder.svg"}
                  alt={file.name}
                  className="w-full h-full object-contain rounded border border-zinc-200"
                />
              </div>
            ) : (
              getFileIcon(file?.type || previewType)
            )}
            <div className="mt-2 text-center">
              <p className="text-sm font-medium text-zinc-700 truncate max-w-xs">
                {file?.name || previewName || "File"}
              </p>
              <p className="text-xs text-zinc-500">{formatFileSize(file?.size || previewSize)}</p>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleRemove}
              className="mt-2 text-xs"
              disabled={disabled}
            >
              <X className="h-3 w-3 mr-1" />
              Remove
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-4">
            <Upload className="h-10 w-10 text-zinc-400 mb-2" />
            <p className="mb-1 text-sm text-zinc-500">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-zinc-500">PNG, JPG, or PDF (max. {maxSize}MB)</p>
          </div>
        )}
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  )
}
