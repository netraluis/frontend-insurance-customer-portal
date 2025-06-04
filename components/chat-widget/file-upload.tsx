"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"
import { useTranslations } from 'next-intl'

interface FileUploadProps {
  onFileChange: (files: File[]) => void
}

export default function FileUpload({ onFileChange }: FileUploadProps) {
  const t = useTranslations('ChatWidget')
  const [dragActive, setDragActive] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFileChange(Array.from(e.dataTransfer.files))
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()

    if (e.target.files && e.target.files.length > 0) {
      onFileChange(Array.from(e.target.files))
    }
  }

  const handleButtonClick = () => {
    inputRef.current?.click()
  }

  return (
    <div
      className={`flex flex-col items-center justify-center p-4 border-2 border-dashed rounded-lg transition-colors ${
        dragActive ? "border-zinc-400 bg-zinc-50" : "border-zinc-200"
      }`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <input
        ref={inputRef}
        type="file"
        multiple
        onChange={handleChange}
        className="hidden"
        id="file-upload"
        aria-label={t('fileUploadLabel')}
      />

      <Upload className="h-8 w-8 text-zinc-400 mb-2" />
      <p className="text-sm text-zinc-600 text-center mb-2">{t('fileUploadDrop')}</p>
      <Button variant="outline" size="sm" onClick={handleButtonClick} className="text-xs">
        {t('fileUploadButton')}
      </Button>
    </div>
  )
}
