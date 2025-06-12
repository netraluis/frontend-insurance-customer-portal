"use client"

import * as React from "react"
import { useDropzone } from "react-dropzone"
import { cn } from "@/lib/utils"
import {
  FileIcon,
  X,
  Upload,
  FileText,
  FileImage,
  FileVideo,
  Loader2,
  Camera,
  Plus,
  CheckCircle2,
  AlertCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useIsMobile } from "@/hooks/use-mobile"
import { Label } from "@/components/ui/label"
import { MobileUploadDialog } from "@/components/ui/mobile-upload-dialog"
import { toast } from "@/components/ui/use-toast"
import Image from "next/image"

export type MediaFile = {
  id: string
  name: string
  type: string
  url: string
  size: number
  thumbnail?: string
  relativePath?: string // For directory uploads
}

export type FileObject = MediaFile

export interface UnifiedUploadProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "onDrop"> {
  value?: MediaFile | MediaFile[] | null 
  onChange?: (files: MediaFile | MediaFile[] | null) => void
  onDrop?: (acceptedFiles: File[]) => void
  multiple?: boolean
  disabled?: boolean
  maxSize?: number // in MB
  maxFiles?: number
  accept?: Record<string, string[]>
  label?: string
  description?: string
  placeholder?: string
  icon?: React.ReactNode
  buttonText?: string
  mobileButtonText?: string
  errorMessage?: string
  showPreview?: boolean
  previewSize?: "small" | "medium" | "large"
  emptyState?: React.ReactNode
  uploadingState?: React.ReactNode
  successMessage?: string
  mobileSuccessMessage?: string
  captureMethod?: "user" | "environment" | boolean
  variant?: "default" | "compact" | "inline"
  allowDirectories?: boolean
  required?: boolean
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B"
  const k = 1024
  const sizes = ["B", "KB", "MB", "GB", "TB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
}

export function UnifiedUpload({
  value,
  onChange,
  onDrop,
  multiple = false,
  disabled = false,
  maxSize = 10, // Default max size is 10MB
  maxFiles = 10,
  accept = {
    "image/*": [".jpeg", ".jpg", ".png"],
    "application/pdf": [".pdf"],
  },
  label,
  description,
  placeholder,
  icon,
  buttonText,
  mobileButtonText,
  errorMessage,
  showPreview = true,
  // previewSize = "medium",
  emptyState,
  uploadingState,
  successMessage,
  mobileSuccessMessage,
  captureMethod = "environment",
  variant = "default",
  allowDirectories = false,
  className,
  required = false,
  ...props
}: UnifiedUploadProps) {
  const [files, setFiles] = React.useState<MediaFile[]>(!value ? [] : Array.isArray(value) ? value : [value])
  const [uploadProgress, setUploadProgress] = React.useState<number>(0)
  const [isUploading, setIsUploading] = React.useState<boolean>(false)
  const [error, setError] = React.useState<string | null>(errorMessage || null)
  const [showSuccess, setShowSuccess] = React.useState<boolean>(false)
  const [uploadingFileName, setUploadingFileName] = React.useState<string>("")
  const [mobileUploadDialogOpen, setMobileUploadDialogOpen] = React.useState<boolean>(false)
  const [supportsFileSystemAccess, setSupportsFileSystemAccess] = React.useState<boolean>(false)
  const uploadIntervalRef = React.useRef<NodeJS.Timeout | null>(null)
  const fileInputRef = React.useRef<HTMLInputElement>(null)
  const cameraInputRef = React.useRef<HTMLInputElement>(null)
  const galleryInputRef = React.useRef<HTMLInputElement>(null)
  const fileSystemInputRef = React.useRef<HTMLInputElement>(null)
  const directoryInputRef = React.useRef<HTMLInputElement>(null)
  const isMobile = useIsMobile()

  // Check for File System Access API support
  React.useEffect(() => {
    setSupportsFileSystemAccess("showOpenFilePicker" in window && "showDirectoryPicker" in window)
  }, [])

  // Update files when value prop changes
  React.useEffect(() => {
    if (multiple) {
      setFiles(Array.isArray(value) ? value : value ? [value] : [])
    } else {
      setFiles(value ? (Array.isArray(value) ? [value[0]] : [value]) : [])
    }
  }, [value, multiple])

  // Clean up interval on unmount
  React.useEffect(() => {
    return () => {
      if (uploadIntervalRef.current) {
        clearInterval(uploadIntervalRef.current)
      }
    }
  }, [])

  // Handle file drop
  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    disabled: disabled || isUploading,
    maxSize: maxSize * 1024 * 1024, // Convert MB to bytes
    maxFiles: multiple ? maxFiles : 1,
    multiple,
    accept,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        handleFiles(acceptedFiles)
        if (onDrop) {
          onDrop(acceptedFiles)
        }
      }
    },
    // Don't use the native file picker on mobile, we'll handle that ourselves
    noClick: isMobile,
  })

  // Generate a thumbnail for video files
  const generateVideoThumbnail = async (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const video = document.createElement("video")
      video.preload = "metadata"
      video.playsInline = true
      video.muted = true

      // Create object URL for the file
      const url = URL.createObjectURL(file)
      video.src = url

      // When video metadata is loaded, seek to the middle
      video.onloadedmetadata = () => {
        video.currentTime = video.duration / 2
      }

      // When the video frame is available, capture it
      video.onseeked = () => {
        const canvas = document.createElement("canvas")
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        const ctx = canvas.getContext("2d")
        ctx?.drawImage(video, 0, 0, canvas.width, canvas.height)
        const thumbnailUrl = canvas.toDataURL("image/jpeg")

        // Clean up
        URL.revokeObjectURL(url)

        resolve(thumbnailUrl)
      }

      // Handle errors
      video.onerror = () => {
        URL.revokeObjectURL(url)
        resolve("")
      }
    })
  }

  // Handle files
  const handleFiles = async (selectedFiles: File[]) => {
    if (selectedFiles.length === 0) return

    // Check if we're exceeding the max files limit
    if (multiple && files.length + selectedFiles.length > maxFiles) {
      setError(`You can only upload up to ${maxFiles} files.`)
      return
    }

    setIsUploading(true)
    setUploadProgress(0)
    setError(null)
    setUploadingFileName(selectedFiles.length === 1 ? selectedFiles[0].name : `${selectedFiles.length} files`)

    // Simulate upload progress
    if (uploadIntervalRef.current) {
      clearInterval(uploadIntervalRef.current)
    }

    uploadIntervalRef.current = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) {
          return 90
        }
        return prev + Math.random() * 10
      })
    }, 200)

    try {
      // Process each file
      const newFiles: MediaFile[] = []

      for (const file of selectedFiles) {
        const id = Date.now().toString() + Math.random().toString(36).substring(2, 9)
        const url = URL.createObjectURL(file)

        let thumbnail = undefined
        if (file.type.startsWith("video/")) {
          thumbnail = await generateVideoThumbnail(file)
        }

        newFiles.push({
          id,
          name: file.name,
          type: file.type || getMimeTypeFromExtension(file.name),
          url,
          size: file.size,
          thumbnail,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          relativePath: (file as any).webkitRelativePath || (file as any).relativePath || undefined,
        })
      }

      // Complete the upload
      setUploadProgress(100)
      setTimeout(() => {
        setIsUploading(false)

        // Update state with new files
        let updatedFiles: MediaFile[]
        if (multiple) {
          updatedFiles = [...files, ...newFiles]
        } else {
          // For single file upload, replace the existing file
          updatedFiles = newFiles
        }

        setFiles(updatedFiles)

        // Notify parent component
        if (onChange) {
          onChange(multiple ? updatedFiles : updatedFiles[0] || null)
        }

        // Show success message
        setShowSuccess(true)
        setTimeout(() => setShowSuccess(false), 3000)

        // Clear the file inputs
        if (fileInputRef.current) fileInputRef.current.value = ""
        if (cameraInputRef.current) cameraInputRef.current.value = ""
        if (galleryInputRef.current) galleryInputRef.current.value = ""
        if (fileSystemInputRef.current) fileSystemInputRef.current.value = ""
        if (directoryInputRef.current) directoryInputRef.current.value = ""
      }, 500)
    } catch (err) {
      console.error("Error processing files:", err)
      setError("An error occurred while processing the files.")
      setIsUploading(false)
      if (uploadIntervalRef.current) {
        clearInterval(uploadIntervalRef.current)
      }
    }
  }

  // Get MIME type from file extension
  const getMimeTypeFromExtension = (filename: string): string => {
    const ext = filename.split(".").pop()?.toLowerCase() || ""
    const mimeTypes: Record<string, string> = {
      jpg: "image/jpeg",
      jpeg: "image/jpeg",
      png: "image/png",
      gif: "image/gif",
      pdf: "application/pdf",
      doc: "application/msword",
      docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      xls: "application/vnd.ms-excel",
      xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      ppt: "application/vnd.ms-powerpoint",
      pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      txt: "text/plain",
      mp4: "video/mp4",
      mov: "video/quicktime",
      avi: "video/x-msvideo",
    }

    return mimeTypes[ext] || "application/octet-stream"
  }

  // Handle file removal
  const handleRemove = (id: string, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation()
    }

    const updatedFiles = files.filter((file) => file.id !== id)
    setFiles(updatedFiles)

    // Notify parent component
    if (onChange) {
      onChange(multiple ? updatedFiles : updatedFiles[0] || null)
    }
  }

  // Handle remove all files
  const handleRemoveAll = () => {
    setFiles([])
    if (onChange) {
      onChange(multiple ? [] : null)
    }
  }

  // Handle button click
  const handleButtonClick = (e: React.MouseEvent) => {
    e.preventDefault()

    if (isMobile) {
      // Open the mobile upload dialog on mobile
      setMobileUploadDialogOpen(true)
    } else {
      // Use the default file input on desktop
      fileInputRef.current?.click()
    }
  }

  // Handle mobile upload option selection
  const handleMobileUploadOption = async (option: "camera" | "gallery" | "files" | "directory") => {
    setMobileUploadDialogOpen(false)

    try {
      // Use File System Access API if available and selected
      if (option === "files" && supportsFileSystemAccess) {
        try {
          const pickerOpts = {
            types: Object.entries(accept).map(([mimeType, extensions]) => ({
              description: mimeType.split("/")[0].charAt(0).toUpperCase() + mimeType.split("/")[0].slice(1),
              accept: { [mimeType]: extensions },
            })),
            multiple,
          }
          // @ts-expect-error - TypeScript doesn't know about this API yet
          const fileHandles = await window.showOpenFilePicker(pickerOpts)
          const files = await Promise.all(fileHandles.map((handle: FileSystemFileHandle) => handle.getFile()))
          handleFiles(files)
          return
        } catch (err) {
          // If the user cancels or there's an error, fall back to the regular file input
          console.log("File System Access API failed, falling back to regular input", err)
          fileSystemInputRef.current?.click()
        }
      } else if (option === "directory" && supportsFileSystemAccess) {
        try {
          // @ts-expect-error TypeScript doesn't know about this API yet
          const dirHandle = await window.showDirectoryPicker()
          const files: File[] = []

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          async function getFilesRecursively(dirHandle: any, path = "") {
            for await (const entry of dirHandle.values()) {
              if (entry.kind === "file") {
                const file = await entry.getFile()
                // Add the relative path to the file
                Object.defineProperty(file, "relativePath", {
                  value: path ? `${path}/${entry.name}` : entry.name,
                })
                files.push(file)
              } else if (entry.kind === "directory") {
                // Recursively get files from subdirectories
                await getFilesRecursively(entry, path ? `${path}/${entry.name}` : entry.name)
              }
            }
          }

          await getFilesRecursively(dirHandle)
          handleFiles(files)
          return
        } catch (err) {
          // If the user cancels or there's an error, fall back to the regular directory input
          console.log("Directory picker failed, falling back to regular input", err)
          directoryInputRef.current?.click()
        }
      }

      // Trigger the appropriate input based on the selected option
      if (option === "camera") {
        cameraInputRef.current?.click()
      } else if (option === "gallery") {
        galleryInputRef.current?.click()
      } else if (option === "files") {
        fileSystemInputRef.current?.click()
      } else if (option === "directory") {
        directoryInputRef.current?.click()
      }
    } catch (error) {
      console.error("Error handling file selection:", error)
      toast({
        title: "Error",
        description: "There was a problem selecting files. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Show error if file is rejected
  React.useEffect(() => {
    if (fileRejections.length > 0) {
      const rejection = fileRejections[0]
      if (rejection.errors[0].code === "file-too-large") {
        setError(`File is too large. Max size is ${maxSize}MB.`)
      } else if (rejection.errors[0].code === "file-invalid-type") {
        setError("Invalid file type. Please upload a supported file format.")
      } else if (rejection.errors[0].code === "too-many-files") {
        setError(`Too many files. Maximum ${maxFiles} files allowed.`)
      } else {
        setError(rejection.errors[0].message)
      }
    }
  }, [fileRejections, maxSize])

  // Determine the height class based on variant
  const getHeightClass = () => {
    switch (variant) {
      case "compact":
        return "h-24 sm:h-32"
      case "inline":
        return "h-20"
      default:
        return "h-32 sm:h-40"
    }
  }

  // Determine the grid columns based on variant and screen size
  const getGridColumns = () => {
    if (variant === "compact") {
      return "grid-cols-1 sm:grid-cols-2"
    }
    return isMobile ? "grid-cols-2" : "grid-cols-3 md:grid-cols-4"
  }

  // Determine the preview size class
  // const getPreviewSizeClass = () => {
  //   switch (previewSize) {
  //     case "small":
  //       return "h-16 w-16"
  //     case "large":
  //       return "h-24 w-24"
  //     default:
  //       return "h-20 w-20"
  //   }
  // }

  // Determine if we should accept images
  const shouldAcceptImages = () => {
    return !!accept["image/*"]
  }

  // Determine if we should accept other files
  const shouldAcceptFiles = () => {
    return Object.keys(accept).some((key) => key !== "image/*")
  }

  // Render the empty state
  const renderEmptyState = () => {
    if (emptyState) {
      return emptyState
    }

    return (
      <div className="flex flex-col items-center justify-center h-full py-4 px-2 text-center">
        {icon || (
          <Upload className={`${variant === "compact" ? "w-6 h-6" : "w-7 h-7 sm:w-8 sm:h-8"} mb-2 text-zinc-500`} />
        )}
        <p className="mb-1 sm:mb-2 text-sm text-zinc-600">
          {isMobile ? (
            <span className="font-semibold">{placeholder || "Tap to upload"}</span>
          ) : (
            <>
              <span className="font-semibold">{placeholder || "Click to upload"}</span> or drag and drop
            </>
          )}
        </p>
        <p className="text-xs text-zinc-500 mb-3">
          {getAcceptDescription()}
          {maxSize && ` (MAX. ${maxSize}MB${multiple ? " per file" : ""})`}
        </p>

        <Button
          onClick={handleButtonClick}
          className={`mt-1 ${variant === "compact" ? "h-8 text-xs px-3" : "h-9"}`}
          disabled={disabled || isUploading}
        >
          {isMobile ? (
            <>
              {variant === "compact" ? <Plus className="h-3 w-3 mr-1" /> : <Camera className="h-4 w-4 mr-2" />}
              {mobileButtonText || "Select"}
            </>
          ) : (
            <>
              <Upload className="h-4 w-4 mr-2" />
              {buttonText || "Select file"}
            </>
          )}
        </Button>
      </div>
    )
  }

  // Render the uploading state
  const renderUploadingState = () => {
    if (uploadingState) {
      return uploadingState
    }

    return (
      <div className="flex flex-col items-center justify-center h-full py-4 px-2">
        <Loader2 className={`${variant === "compact" ? "h-6 w-6" : "h-8 w-8"} text-zinc-400 animate-spin mb-2`} />
        <div className="w-full max-w-xs space-y-1 px-4">
          <Progress value={uploadProgress} className="h-2 w-full" />
          <div className="flex justify-between items-center text-xs">
            <span className="text-zinc-500">
              {isMobile ? `Uploading${uploadingFileName ? "..." : ""}` : `Uploading ${uploadingFileName}...`}
            </span>
            <span className="font-medium">{Math.min(Math.round(uploadProgress), 100)}%</span>
          </div>
        </div>
      </div>
    )
  }

  // Get a description of accepted file types
  const getAcceptDescription = () => {
    const types: string[] = []

    if (accept["image/*"]) {
      types.push("Images")
    }

    if (accept["application/pdf"]) {
      types.push("PDF")
    }

    if (accept["video/*"]) {
      types.push("Videos")
    }

    return types.join(", ")
  }

  return (
    <div className={cn("space-y-3", className)} {...props}>
      {label && (
        <div className="flex justify-between items-center">
          <Label className="text-zinc-900">{label} {required && <span className="text-destructive">*</span>}</Label>
          {multiple && files.length > 0 && variant !== "compact" && (
            <Button
              variant="outline"
              size="sm"
              className="h-8 text-xs"
              onClick={handleButtonClick}
              disabled={disabled || isUploading}
            >
              <Plus className="h-3 w-3 mr-1" />
              Add more
            </Button>
          )}
        </div>
      )}

      {description && <p className="text-sm text-zinc-500">{description}</p>}

      <div className="relative">
        {/* Dropzone */}
        <div
          {...getRootProps()}
          className={cn(
            "relative flex flex-col items-center justify-center w-full border-2 border-dashed rounded-lg cursor-pointer transition-colors",
            getHeightClass(),
            isDragActive ? "border-zinc-400 bg-zinc-100" : "border-zinc-300 bg-zinc-50 hover:bg-zinc-100",
            (disabled || isUploading) && "opacity-60 cursor-not-allowed hover:bg-zinc-50",
            error && "border-red-300",
            files.length > 0 && !multiple && "hidden",
            variant === "inline" && "border border-solid bg-white",
          )}
        >
          {/* Hidden file inputs for different upload methods */}
          <input {...getInputProps()} ref={fileInputRef} />

          {/* Camera input for taking photos */}
          <input
            type="file"
            ref={cameraInputRef}
            className="hidden"
            accept={accept["image/*"]?.join(",")}
            capture={typeof captureMethod === "string" ? captureMethod : "environment"}
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                handleFiles(Array.from(e.target.files))
              }
            }}
          />

          {/* Gallery input for selecting from device gallery */}
          <input
            type="file"
            ref={galleryInputRef}
            className="hidden"
            accept={accept["image/*"]?.join(",")}
            multiple={multiple}
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                handleFiles(Array.from(e.target.files))
              }
            }}
          />

          {/* File system input for browsing files */}
          <input
            type="file"
            ref={fileSystemInputRef}
            className="hidden"
            accept={Object.entries(accept)
              .flatMap(([, exts]) => exts)
              .join(",")}
            multiple={multiple}
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                handleFiles(Array.from(e.target.files))
              }
            }}
          />

          {/* Directory input for selecting folders */}
          <input
            type="file"
            ref={directoryInputRef}
            className="hidden"
            // @ts-expect-error - TypeScript doesn't know about this attribute
            webkitdirectory=""
            directory=""
            multiple={true}
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                handleFiles(Array.from(e.target.files))
              }
            }}
          />

          {isUploading ? renderUploadingState() : renderEmptyState()}
        </div>

        {/* Mobile upload options dialog */}
        <MobileUploadDialog
          open={mobileUploadDialogOpen}
          onOpenChange={setMobileUploadDialogOpen}
          onOptionSelect={handleMobileUploadOption}
          title={label || "Upload File"}
          acceptImages={shouldAcceptImages()}
          acceptFiles={shouldAcceptFiles()}
          acceptFolders={allowDirectories}
          captureMethod={typeof captureMethod === "string" ? captureMethod : "environment"}
        />

        {/* Error message */}
        {error && (
          <div className="mt-2 flex items-start gap-2 text-sm text-red-500">
            <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Success message */}
        {showSuccess && (
          <div className="mt-2 bg-green-50 border border-green-200 rounded-md p-2 sm:p-3 flex items-center animate-in fade-in slide-in-from-top-5">
            <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 mr-2 sm:mr-3 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-green-800">
                {isMobile ? mobileSuccessMessage || "Upload complete!" : successMessage || "Upload successful!"}
              </p>
              {!isMobile && !variant.includes("compact") && (
                <p className="text-xs text-green-700">Your file has been added.</p>
              )}
            </div>
          </div>
        )}

        {/* File previews for single file upload */}
        {files.length > 0 && !multiple && (
          <div className="mt-2 border rounded-md overflow-hidden bg-white">
            <div className="flex items-center justify-between p-3 sm:p-4">
              <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                {files[0].type.startsWith("image/") ? (
                  <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-md overflow-hidden border border-zinc-200 flex-shrink-0">
                    <Image
                      src={files[0].url || "/placeholder.svg"}
                      alt={files[0].name}
                      width={400}
                      height={400}
                      className="w-full h-full object-contain"
                    />
                  </div>
                ) : (
                  <div className="flex-shrink-0">
                    {files[0].type.startsWith("image/") ? (
                      <FileImage className="h-8 w-8 sm:h-10 sm:w-10 text-blue-500" />
                    ) : files[0].type.startsWith("video/") ? (
                      <FileVideo className="h-8 w-8 sm:h-10 sm:w-10 text-red-500" />
                    ) : files[0].type.includes("pdf") ? (
                      <FileText className="h-8 w-8 sm:h-10 sm:w-10 text-amber-500" />
                    ) : (
                      <FileIcon className="h-8 w-8 sm:h-10 sm:w-10 text-zinc-500" />
                    )}
                  </div>
                )}
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{files[0].name}</p>
                  <p className="text-xs text-zinc-500">{formatFileSize(files[0].size)}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className={isMobile ? "h-8 w-8 p-0" : ""}
                  onClick={() => handleRemoveAll()}
                >
                  <X className="h-4 w-4" />
                  {/* {isMobile ? (
                  ) : (
                    <>
                      <X className="h-4 w-4 mr-1" />
                      Remove
                    </>
                  )} */}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="hidden sm:flex"
                  onClick={handleButtonClick}
                  disabled={disabled || isUploading}
                >
                  <Upload className="h-4 w-4" />
                  {/* Change */}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* File previews for multiple file upload */}
        {files.length > 0 && multiple && (
          <div className="mt-3">
            <div className="flex justify-between items-center mb-2">
              <h5 className="text-sm font-medium text-zinc-700">Uploaded Files ({files.length})</h5>
              {files.length > 1 && (
                <Button variant="outline" size="sm" className="h-8 text-xs" onClick={handleRemoveAll}>
                  Remove All
                </Button>
              )}
            </div>
            <div className={`grid ${getGridColumns()} gap-2 sm:gap-3`}>
              {files.map((file) => (
                <div key={file.id} className="relative group border rounded-md overflow-hidden bg-white">
                  {/* File Preview */}
                  <div className="aspect-square relative">
                    {file.type.startsWith("image/") && showPreview ? (
                      <Image
                        src={file.url || "/placeholder.svg"}
                        alt={file.name}
                        width={400}
                        height={400}
                        className="w-full h-full object-cover"
                      />
                    ) : file.type.startsWith("video/") && file.thumbnail && showPreview ? (
                      <Image
                        src={file.thumbnail || "/placeholder.svg"}
                        alt={file.name}
                        width={400}
                        height={400}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-zinc-50">
                        {file.type.startsWith("image/") ? (
                          <FileImage className="h-10 w-10 text-blue-500" />
                        ) : file.type.startsWith("video/") ? (
                          <FileVideo className="h-10 w-10 text-red-500" />
                        ) : file.type.includes("pdf") ? (
                          <FileText className="h-10 w-10 text-amber-500" />
                        ) : (
                          <FileIcon className="h-10 w-10 text-zinc-500" />
                        )}
                      </div>
                    )}

                    {/* Remove Button - Always visible on mobile */}
                    <button
                      type="button"
                      onClick={(e) => handleRemove(file.id, e)}
                      className={`absolute top-1 right-1 bg-white bg-opacity-80 rounded-full p-1 shadow-sm ${
                        isMobile ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                      } transition-opacity`}
                      aria-label="Remove file"
                    >
                      <X className="h-4 w-4 text-zinc-700" />
                    </button>
                  </div>

                  {/* File Info - Simplified on mobile */}
                  <div className="p-2 text-xs truncate">
                    <p className="font-medium truncate" title={file.name}>
                      {file.name}
                    </p>
                    <p className="text-zinc-500">
                      {formatFileSize(file.size)}
                      {file.relativePath && (
                        <span className="ml-1 text-zinc-400 truncate block" title={file.relativePath}>
                          {file.relativePath}
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              ))}

              {/* Add more button */}
              {multiple && !isUploading && files.length < maxFiles && (
                <div
                  onClick={handleButtonClick}
                  className="aspect-square border-2 border-dashed rounded-md flex flex-col items-center justify-center cursor-pointer hover:bg-zinc-50"
                >
                  <Plus className="h-8 w-8 text-zinc-400 mb-1" />
                  <span className="text-xs text-zinc-500">Add more</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
