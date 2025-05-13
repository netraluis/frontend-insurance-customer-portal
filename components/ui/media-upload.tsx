"use client"

import * as React from "react"
import { useDropzone, type DropzoneOptions } from "react-dropzone"
import { cn } from "@/lib/utils"
import { FileIcon, Upload, FileImage, FileVideo, Loader2, Plus, Trash2, ExternalLink, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import type { DamageMedia } from "../claim-form-context"

export interface MediaUploadProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onDrop"> {
  files?: DamageMedia[]
  onChange?: (files: DamageMedia[]) => void
  onDrop?: (acceptedFiles: File[]) => void
  disabled?: boolean
  dropzoneOptions?: Omit<DropzoneOptions, "disabled" | "onDrop">
  maxSize?: number // in MB
  accept?: Record<string, string[]>
  maxFiles?: number
  mediaType: "photo" | "video"
}

export function MediaUpload({
  files = [],
  onChange,
  onDrop,
  disabled = false,
  dropzoneOptions,
  maxSize = 50, // Default max size is 50MB
  accept = {
    "image/*": [".jpeg", ".jpg", ".png"],
  },
  maxFiles = 10,
  mediaType,
  className,
  ...props
}: MediaUploadProps) {
  const [uploadedFiles, setUploadedFiles] = React.useState<DamageMedia[]>(files)
  const [isUploading, setIsUploading] = React.useState<boolean>(false)
  const [uploadProgress, setUploadProgress] = React.useState<number>(0)
  const [error, setError] = React.useState<string | null>(null)

  // Update files when props change
  React.useEffect(() => {
    setUploadedFiles(files)
  }, [files])

  // Handle file drop
  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    disabled,
    maxSize: maxSize * 1024 * 1024, // Convert MB to bytes
    maxFiles,
    accept,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        handleFiles(acceptedFiles)
        if (onDrop) {
          onDrop(acceptedFiles)
        }
      }
    },
    ...dropzoneOptions,
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
    setIsUploading(true)
    setUploadProgress(0)
    setError(null)

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval)
          return 90
        }
        return prev + 10
      })
    }, 200)

    try {
      // Process each file
      const newFiles: DamageMedia[] = []

      for (const file of selectedFiles) {
        const id = Date.now().toString() + Math.random().toString(36).substring(2, 9)
        const url = URL.createObjectURL(file)

        let thumbnail = undefined
        if (mediaType === "video") {
          thumbnail = await generateVideoThumbnail(file)
        }

        newFiles.push({
          id,
          name: file.name,
          type: file.type,
          url,
          size: file.size,
          thumbnail,
        })
      }

      // Complete the upload
      setUploadProgress(100)
      setTimeout(() => {
        setIsUploading(false)

        // Update state with new files
        const updatedFiles = [...uploadedFiles, ...newFiles]
        setUploadedFiles(updatedFiles)

        // Notify parent component
        if (onChange) {
          onChange(updatedFiles)
        }
      }, 500)
    } catch (err) {
      console.error("Error processing files:", err)
      setError("An error occurred while processing the files.")
      setIsUploading(false)
      clearInterval(progressInterval)
    }
  }

  // Handle file removal
  const handleRemove = (id: string) => {
    const updatedFiles = uploadedFiles.filter((file) => file.id !== id)
    setUploadedFiles(updatedFiles)

    // Notify parent component
    if (onChange) {
      onChange(updatedFiles)
    }
  }

  // Get file icon based on file type
  const getFileIcon = (type: string) => {
    if (type.includes("image")) {
      return <FileImage className="h-5 w-5 text-blue-500" />
    } else if (type.includes("video")) {
      return <FileVideo className="h-5 w-5 text-red-500" />
    } else {
      return <FileIcon className="h-5 w-5 text-zinc-500" />
    }
  }

  // Format file size
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " bytes"
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB"
    return (bytes / (1024 * 1024)).toFixed(1) + " MB"
  }

  // Show error if file is rejected
  React.useEffect(() => {
    if (fileRejections.length > 0) {
      const rejection = fileRejections[0]
      if (rejection.errors[0].code === "file-too-large") {
        setError(`File is too large. Max size is ${maxSize}MB.`)
      } else if (rejection.errors[0].code === "file-invalid-type") {
        setError(`Invalid file type. Please upload ${mediaType === "photo" ? "an image" : "a video"}.`)
      } else if (rejection.errors[0].code === "too-many-files") {
        setError(`Too many files. Maximum ${maxFiles} files allowed.`)
      } else {
        setError(rejection.errors[0].message)
      }
    }
  }, [fileRejections, maxSize, maxFiles, mediaType])

  return (
    <div className={cn("space-y-4", className)} {...props}>
      {/* Dropzone */}
      <div
        {...getRootProps()}
        className={cn(
          "relative flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer transition-colors",
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
        ) : (
          <div className="flex flex-col items-center justify-center p-4">
            <Upload className="h-8 w-8 text-zinc-400 mb-2" />
            <p className="mb-1 text-sm text-zinc-500">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-zinc-500">
              {mediaType === "photo" ? "PNG, JPG (max. 10MB per file)" : "MP4, MOV (max. 50MB per file)"}
            </p>
            <p className="text-xs text-zinc-500 mt-1">Maximum {maxFiles} files</p>
          </div>
        )}
      </div>

      {/* Error message */}
      {error && <p className="text-sm text-red-500">{error}</p>}

      {/* File previews */}
      {uploadedFiles.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-zinc-700">
            Uploaded {mediaType === "photo" ? "Photos" : "Videos"} ({uploadedFiles.length})
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {uploadedFiles.map((file) => (
              <div key={file.id} className="relative group border rounded-md overflow-hidden bg-zinc-50">
                {/* Preview */}
                <div className="aspect-square relative">
                  {mediaType === "photo" ? (
                    <img src={file.url || "/placeholder.svg"} alt={file.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full relative">
                      {file.thumbnail ? (
                        <img
                          src={file.thumbnail || "/placeholder.svg"}
                          alt={file.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-zinc-200">
                          <FileVideo className="h-10 w-10 text-zinc-400" />
                        </div>
                      )}
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Play className="h-10 w-10 text-white" />
                      </div>
                    </div>
                  )}

                  {/* Actions overlay */}
                  <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      type="button"
                      variant="secondary"
                      size="icon"
                      className="h-7 w-7 bg-white bg-opacity-80 hover:bg-opacity-100"
                      onClick={(e) => {
                        e.stopPropagation()
                        window.open(file.url, "_blank")
                      }}
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      <span className="sr-only">View</span>
                    </Button>
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="h-7 w-7"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleRemove(file.id)
                      }}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      <span className="sr-only">Remove</span>
                    </Button>
                  </div>
                </div>

                {/* File info */}
                <div className="p-2 text-xs truncate">
                  <p className="font-medium truncate" title={file.name}>
                    {file.name}
                  </p>
                  <p className="text-zinc-500">{formatFileSize(file.size)}</p>
                </div>
              </div>
            ))}

            {/* Add more button */}
            {uploadedFiles.length < maxFiles && !isUploading && (
              <div
                {...getRootProps()}
                className="aspect-square border-2 border-dashed rounded-md flex flex-col items-center justify-center cursor-pointer hover:bg-zinc-50"
              >
                <input {...getInputProps()} />
                <Plus className="h-8 w-8 text-zinc-400 mb-1" />
                <span className="text-xs text-zinc-500">Add more</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
