"use client"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Camera, ImageIcon, FileUp, FolderOpen } from "lucide-react"
import { useEffect, useState } from "react"

interface MobileUploadDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onOptionSelect: (option: "camera" | "gallery" | "files" | "directory") => void
  title?: string
  acceptImages?: boolean
  acceptFiles?: boolean
  acceptFolders?: boolean
  captureMethod?: "user" | "environment"
}

export function MobileUploadDialog({
  open,
  onOpenChange,
  onOptionSelect,
  title = "Upload File",
  acceptImages = true,
  acceptFiles = true,
  acceptFolders = false,
  // captureMethod = "environment",
}: MobileUploadDialogProps) {
  const [supportsFileSystem, setSupportsFileSystem] = useState(false)

  // Check for File System Access API support
  useEffect(() => {
    // Check if the browser supports the File System Access API
    setSupportsFileSystem("showDirectoryPicker" in window || "showOpenFilePicker" in window)
  }, [])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] p-0 gap-0 overflow-hidden">
        <DialogTitle className="px-4 py-3 text-center border-b border-zinc-200 text-zinc-900">{title}</DialogTitle>
        <div className="flex flex-col">
          {acceptImages && (
            <>
              <Button
                variant="ghost"
                className="justify-start rounded-none h-14 px-4 border-b border-zinc-100 hover:bg-zinc-50"
                onClick={() => onOptionSelect("camera")}
              >
                <Camera className="h-5 w-5 mr-3 text-zinc-600" />
                <span>Take Photo</span>
              </Button>
              <Button
                variant="ghost"
                className="justify-start rounded-none h-14 px-4 border-b border-zinc-100 hover:bg-zinc-50"
                onClick={() => onOptionSelect("gallery")}
              >
                <ImageIcon className="h-5 w-5 mr-3 text-zinc-600" />
                <span>Choose from Gallery</span>
              </Button>
            </>
          )}
          {acceptFiles && (
            <Button
              variant="ghost"
              className="justify-start rounded-none h-14 px-4 border-b border-zinc-100 hover:bg-zinc-50"
              onClick={() => onOptionSelect("files")}
            >
              <FileUp className="h-5 w-5 mr-3 text-zinc-600" />
              <span>Select Files</span>
            </Button>
          )}
          {acceptFolders && supportsFileSystem && (
            <Button
              variant="ghost"
              className="justify-start rounded-none h-14 px-4 hover:bg-zinc-50"
              onClick={() => onOptionSelect("directory")}
            >
              <FolderOpen className="h-5 w-5 mr-3 text-zinc-600" />
              <span>Select Folder</span>
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
