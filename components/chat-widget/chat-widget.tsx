"use client"

import type ReactType from "react"
import React from "react"
import { useState, useRef, useEffect } from "react"
import { v4 as uuidv4 } from "uuid"
import { Paperclip, Send, X } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Avatar } from "../../components/ui/avatar"
import { Skeleton } from "../../components/ui/skeleton"
import { useMediaQuery } from "../../hooks/use-media-query"
import ChatStarters from "./chat-starters"
import MessageBubble from "./message-bubble"
import ChatWidgetMobile from "./chat-widget-mobile"
import { getT } from "./locales"


export type Message = {
  id: string
  content: string
  sender: "user" | "agent"
  timestamp: Date
  status: "sending" | "delivered" | "error"
  files?: File[]
}

export default function ChatWidget({ isFullScreen = false, setIsOpen, lang }: { isFullScreen?: boolean, setIsOpen: (isOpen: boolean) => void, lang: string }) {
  const t = getT(lang);
  const [sessionId] = useState(() => uuidv4())
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const inputContainerRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const widgetRef = useRef<HTMLDivElement>(null)

  // Detect mobile devices and screen sizes
  const isMobile = useMediaQuery("(max-width: 480px)")


  // Add initial agent message when component mounts
  useEffect(() => {
    setMessages([
      {
        id: uuidv4(),
        content: t('agentWelcome'),
        sender: "agent",
        timestamp: new Date(),
        status: "delivered",
      },
    ])
  }, [])

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: isMobile ? "auto" : "smooth" })
  }, [messages])

  // Auto-resize textarea
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto"
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`
    }
  }, [inputValue])



  const handleSendMessage = async (content: string = inputValue) => {
    if (!content.trim() && files.length === 0) return

    // Create new message
    const newMessage: Message = {
      id: uuidv4(),
      content: content.trim(),
      sender: "user",
      timestamp: new Date(),
      status: "sending",
      files: files.length > 0 ? [...files] : undefined,
    }

    // Add message to state
    setMessages((prev) => [...prev, newMessage])

    // Clear input and files
    setInputValue("")
    setFiles([])

    try {
      setIsLoading(true)

      // Prepare form data for files if any
      const formData = new FormData()
      formData.append("message", content)
      formData.append("sessionId", sessionId)

      if (files.length > 0) {
        files.forEach((file) => {
          formData.append("files", file)
        })
      }

      // API call
      const response = await fetch(process.env.NEXT_PUBLIC_N8N_SEND_MESSAGE!, {
        method: "POST",
        // body: JSON.stringify({message: "me he chocado con el coche ", sessionId: "f47ac10b-58cc-4372-a567-0e02b2c3d480"}),
        body: formData
      })

      if (!response.ok) {
        throw new Error("Failed to send message")
      }

      const data = await response.json()

      // Update message status (still tracking status in data model, just not displaying it)
      setMessages((prev) => prev.map((msg) => (msg.id === newMessage.id ? { ...msg, status: "delivered" } : msg)))

      // Add agent response
      setTimeout(
        () => {
          // Si la respuesta es un array de objetos con 'output'
          if (Array.isArray(data) && data.length > 0 && data[0].output) {
            data.forEach((item: { output: string }, index: number) => {
              setTimeout(() => {
                setMessages((prev) => [
                  ...prev,
                  {
                    id: uuidv4(),
                    content: item.output,
                    sender: "agent",
                    timestamp: new Date(),
                    status: "delivered",
                  },
                ])
              }, index * 500)
            })
          } else if (data.multiResponse && Array.isArray(data.replies)) {
            // Manejo anterior de múltiples respuestas
            data.replies.forEach((reply: string, index: number) => {
              setTimeout(() => {
                setMessages((prev) => [
                  ...prev,
                  {
                    id: uuidv4(),
                    content: reply,
                    sender: "agent",
                    timestamp: new Date(),
                    status: "delivered",
                  },
                ])
              }, index * 500)
            })
          } else {
            // Respuesta simple
            setMessages((prev) => [
              ...prev,
              {
                id: uuidv4(),
                content: (data.reply || data.output || "I'm processing your request. I'll get back to you shortly."),
                sender: "agent",
                timestamp: new Date(),
                status: "delivered",
              },
            ])
          }
          setIsLoading(false)
        },
        isMobile ? 800 : 1000,
      ) // Faster response time on mobile
    } catch (error) {
      console.error("Error sending message:", error)

      // Update message status to error (still tracking in data model)
      setMessages((prev) => prev.map((msg) => (msg.id === newMessage.id ? { ...msg, status: "error" } : msg)))
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: ReactType.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  // Handle file selection from native file picker
  const handleFileChange = (e: ReactType.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files)
      setFiles((prev) => [...prev, ...selectedFiles])

      // Reset the input value to allow selecting the same file again
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }

      // Focus back on the text input after file selection
      if (inputRef.current) {
        inputRef.current.focus()
      }
    }
  }

  // Trigger native file picker
  const openFilePicker = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index))
  }

  const handleStarterClick = (starter: string) => {
    handleSendMessage(starter)
  }

  // Process messages to identify groups
  const processedMessages = messages.map((message, index) => {
    const previousMessage = index > 0 ? messages[index - 1] : null
    const nextMessage = index < messages.length - 1 ? messages[index + 1] : null

    const isFirstInGroup = !previousMessage || previousMessage.sender !== message.sender
    const isLastInGroup = !nextMessage || nextMessage.sender !== message.sender

    return {
      ...message,
      isFirstInGroup,
      isLastInGroup,
    }
  })

  // Calculate optimal height for mobile devices
  const getOptimalHeight = () => {
    if (isFullScreen) {
      return "h-[calc(100vh-56px)]"
    }

    // Default desktop height
    return "h-[650px]"
  }

  if (isMobile) {
    return <ChatWidgetMobile isFullScreen={isFullScreen} setIsOpen={setIsOpen} lang={lang} />
  }

  return (
    <div
      ref={widgetRef}
      className={`flex flex-col ${getOptimalHeight()} w-full 
         rounded-xl border border-zinc-200
     bg-white shadow-lg overflow-hidden `}
    >
      {/* Header */}
      <div className={`flex items-center justify-between p-4 border-b border-zinc-200`}>
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 bg-zinc-950">
            <img src={`${process.env.NEXT_PUBLIC_MAIN_URL}globalrisc_logo_avatar.png`} alt="Globalrisc AI Agent" />
          </Avatar>
          <span className="font-semibold text-ml">Globalrisc AI Agent</span>
        </div>
        <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setIsOpen(false)} aria-label={t('closeChat')}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Messages */}
      <div
        ref={messagesContainerRef}
        className={`flex-1 p-5 overflow-y-auto bg-white`}
      >
        {processedMessages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
            isFirstInGroup={message.isFirstInGroup}
            isLastInGroup={message.isLastInGroup}
          />
        ))}

        {isLoading && (
          <div className="flex items-start gap-3 mb-4">
            <Avatar className="h-8 w-8 bg-zinc-950 mt-1">
              <img src={`${process.env.NEXT_PUBLIC_MAIN_URL}globalrisc_logo_avatar.png`} alt="Globalrisc AI Agent" />
            </Avatar>
            <div className="flex flex-col gap-2 max-w-[80%]">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-4 w-32" />

            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Chat starters */}
      {messages.length <= 2  && (
        <div className="px-2 py-0">
          <p className="text-xs text-zinc-500 mb-0">{t('suggestions')}</p>
          <ChatStarters onStarterClick={handleStarterClick} lang={lang} />
        </div>
      )}

      {/* Hidden file input for native file picker */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        onChange={handleFileChange}
        className="hidden"
        accept="image/*,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        aria-label={t('fileUploadLabel')}
      />

      {/* Files preview */}
      {files.length > 0 && (
        <div className="px-4 py-2 border-t border-zinc-200">
          <div className="flex flex-wrap gap-2">
            {files.map((file, index) => (
              <div key={index} className="flex items-center gap-1 bg-zinc-100 px-2 py-1 rounded text-xs">
                <span className="truncate max-w-[100px]">{file.name}</span>
                <button
                  onClick={() => removeFile(index)}
                  className="text-zinc-500 hover:text-zinc-700"
                  aria-label="Remove file"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Input area */}
      <div
        ref={inputContainerRef}
        className={`p-3 ${isFullScreen ? "border-t border-zinc-200" : ""}`}
      >
        <div className="flex items-end gap-2 bg-white rounded-lg border border-zinc-200 px-2 py-2">
          <textarea
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t('inputPlaceholder')}
            className="placeholder:text-zinc-500 flex-1 resize-none outline-none text-sm max-h-24 min-h-[26px]"
            rows={1}
          />
          <Button
            variant="ghost"
            size="icon"
            className={`${isFullScreen ? "h-10 w-10" : "h-8 w-8"} shrink-0`}
            onClick={openFilePicker}
            aria-label={t('fileUploadLabel')}
          >
            <Paperclip className={`${isFullScreen ? "h-6 w-6" : "h-5 w-5"} text-zinc-500`} />
          </Button>
          <Button
            size="icon"
            className={`${isFullScreen ? "h-8 w-8" : "h-8 w-8"} shrink-0 rounded-ml bg-zinc-950 hover:bg-zinc-800`}
            onClick={() => handleSendMessage()}
            disabled={isLoading || (!inputValue.trim() && files.length === 0)}
            aria-label={t('openChat')}
          >
            <Send className={`${isFullScreen ? "h-5 w-5" : "h-4 w-4"}`} />
          </Button>
        </div>
        <p className="text-xs text-zinc-400 text-center mt-3">
          {t('agentDisclaimer')}
        </p>
      </div>
    </div>
  )
}
