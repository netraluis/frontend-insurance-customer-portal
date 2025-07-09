"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { v4 as uuidv4 } from "uuid"
import { Paperclip, Send, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import ChatStarters from "./chat-starters"
import { useMediaQuery } from "@/hooks/use-media-query"
import { useScreenSize } from "@/hooks/use-screen-size"
import MessageBubble from "./message-bubble"
import { useTranslations } from 'next-intl'
import ChatWidgetMobile from "./chat-widget-mobile"


export type Message = {
  id: string
  content: string
  sender: "user" | "agent"
  timestamp: Date
  status: "sending" | "delivered" | "error"
  files?: File[]
}

export default function ChatWidget({ isFullScreen = false, setIsOpen }: { isFullScreen?: boolean, setIsOpen: (isOpen: boolean) => void }) {
  const t = useTranslations('ChatWidget')
  const [sessionId] = useState(() => uuidv4())
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false)
  const [viewportHeight, setViewportHeight] = useState(0)
  const [browserUIHeight, setBrowserUIHeight] = useState(0)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const inputContainerRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const widgetRef = useRef<HTMLDivElement>(null)

  // Detect mobile devices and screen sizes
  const isMobile = useMediaQuery("(max-width: 480px)")
  const isSmallMobile = useMediaQuery("(max-width: 480px)")
  const screenSize = useScreenSize()
  const isLandscape = useMediaQuery("(orientation: landscape)")

  // Update viewport height and detect browser UI on resize
  useEffect(() => {
    if (!isMobile) return

    const updateViewportDimensions = () => {
      // Get actual viewport height (without browser UI)
      const vh = window.visualViewport ? window.visualViewport.height : window.innerHeight
      setViewportHeight(vh)

      // Estimate browser UI height
      let uiHeight = 0

      if (window.visualViewport) {
        // More accurate method using visualViewport
        uiHeight = window.innerHeight - window.visualViewport.height
      } else {
        // Fallback method
        uiHeight = window.outerHeight - window.innerHeight
      }

      // Ensure we have at least a minimum safe value
      uiHeight = Math.max(uiHeight, 15)

      setBrowserUIHeight(uiHeight)
    }

    // Set initial values
    updateViewportDimensions()

    // Add event listeners
    window.addEventListener("resize", updateViewportDimensions)

    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", updateViewportDimensions)
      window.visualViewport.addEventListener("scroll", updateViewportDimensions)
    }

    // Handle orientation changes
    window.addEventListener("orientationchange", () => {
      // Short delay to let the browser UI adjust
      setTimeout(updateViewportDimensions, 100)
    })

    // Clean up
    return () => {
      window.removeEventListener("resize", updateViewportDimensions)

      if (window.visualViewport) {
        window.visualViewport.removeEventListener("resize", updateViewportDimensions)
        window.visualViewport.removeEventListener("scroll", updateViewportDimensions)
      }

      window.removeEventListener("orientationchange", updateViewportDimensions)
    }
  }, [isMobile])

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
  }, [messages, isMobile])

  // Auto-resize textarea
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto"
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`
    }
  }, [inputValue])

  // Handle keyboard visibility on mobile
  useEffect(() => {
    if (!isMobile) return

    // Function to detect keyboard visibility
    const detectKeyboard = () => {
      // Use visual viewport API if available (more reliable)
      if (window.visualViewport) {
        const keyboardThreshold = window.innerHeight * 0.15 // 15% threshold
        const heightDiff = window.innerHeight - window.visualViewport.height
        setIsKeyboardVisible(heightDiff > keyboardThreshold)
      } else {
        // Fallback method
        const isKeyboard = window.innerHeight < window.outerHeight * 0.75
        setIsKeyboardVisible(isKeyboard)
      }
    }

    // Set up event listeners
    window.addEventListener("resize", detectKeyboard)

    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", detectKeyboard)
      window.visualViewport.addEventListener("scroll", detectKeyboard)
    }

    // Initial detection
    detectKeyboard()

    // Clean up
    return () => {
      window.removeEventListener("resize", detectKeyboard)
      if (window.visualViewport) {
        window.visualViewport.removeEventListener("resize", detectKeyboard)
        window.visualViewport.removeEventListener("scroll", detectKeyboard)
      }
    }
  }, [isMobile])

  // Ensure input is visible when focused on mobile
  useEffect(() => {
    if (!isMobile || !inputRef.current) return

    const handleFocus = () => {
      // Short delay to let the keyboard appear
      setTimeout(() => {
        if (inputContainerRef.current) {
          // Scroll the input into view
          inputContainerRef.current.scrollIntoView({ behavior: "smooth", block: "end" })

          // Additional adjustment for iOS
          if (/iPhone|iPad|iPod/.test(navigator.userAgent)) {
            window.scrollTo(0, 0)
          }
        }
      }, 300)
    }

    inputRef.current.addEventListener("focus", handleFocus)

    return () => {
      inputRef.current?.removeEventListener("focus", handleFocus)
    }
  }, [isMobile])

  // Adjust layout when keyboard appears
  useEffect(() => {
    if (!isMobile || !isKeyboardVisible || !inputContainerRef.current) return

    // Ensure input is visible when keyboard is shown
    inputContainerRef.current.scrollIntoView({ behavior: "smooth", block: "end" })
  }, [isKeyboardVisible, isMobile])

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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  // Handle file selection from native file picker
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    if (isMobile) {
      if (isKeyboardVisible) {
        return "h-auto min-h-[50vh]"
      }

      if (isLandscape) {
        return "h-[85vh]"
      }

      // Different heights based on screen size
      if (screenSize === "xs") {
        return "h-[85vh]"
      } else if (screenSize === "sm") {
        return "h-[80vh]"
      } else {
        return "h-[75vh]"
      }
    }

    // Default desktop height
    return "h-[650px]"
  }

  if (isMobile) {
    return <ChatWidgetMobile isFullScreen={isFullScreen} setIsOpen={setIsOpen} />
  }

  return (
    <div
      ref={widgetRef}
      className={`flex flex-col ${getOptimalHeight()} w-full ${
        !isFullScreen && "rounded-xl border border-zinc-200"
      } bg-white ${!isFullScreen && "shadow-lg"} overflow-hidden`}
      style={{
        // Dynamic height adjustments for mobile
        maxHeight: isMobile && !isFullScreen ? `calc(${viewportHeight}px - ${browserUIHeight}px - 20px)` : undefined,
        // Adjust height when keyboard is visible on mobile
        height: isMobile && isKeyboardVisible && !isFullScreen ? "auto" : undefined,
        minHeight: isMobile && isKeyboardVisible ? "50vh" : undefined,
      }}
    >
      {/* Header */}
      <div className={`flex items-center justify-between p-4 border-b border-zinc-200 }`}>
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 bg-zinc-950">
            <img src="/globalrisc_logo_avatar.png"alt="Globalrisc AI Agent" />
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
        className={`flex-1 p-5 overflow-y-auto bg-white ${
          isMobile && isKeyboardVisible ? (isSmallMobile ? "max-h-[35vh]" : "max-h-[40vh]") : ""
        }`}
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
              <img src="/globalrisc_logo_avatar.png"alt="Globalrisc AI Agent" />
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
      {messages.length <= 2 && !isKeyboardVisible && (
        <div className="px-2 py-0">
          <p className="text-xs text-zinc-500 mb-0">{t('suggestions')}</p>
          <ChatStarters onStarterClick={handleStarterClick} />
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
        className={`p-3 ${isFullScreen ? "border-t border-zinc-200" : ""} ${
          isMobile ? "sticky bottom-0 bg-white z-10" : ""
        }`}
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
            className={`${isFullScreen || isMobile ? "h-10 w-10" : "h-8 w-8"} shrink-0`}
            onClick={openFilePicker}
            aria-label={t('fileUploadLabel')}
          >
            <Paperclip className={`${isFullScreen || isMobile ? "h-6 w-6" : "h-5 w-5"} text-zinc-500`} />
          </Button>
          <Button
            size="icon"
            className={`${isFullScreen || isMobile ? "h-8 w-8" : "h-8 w-8"} shrink-0 rounded-ml bg-zinc-950 hover:bg-zinc-800`}
            onClick={() => handleSendMessage()}
            disabled={isLoading || (!inputValue.trim() && files.length === 0)}
            aria-label={t('openChat')}
          >
            <Send className={`${isFullScreen || isMobile ? "h-5 w-5" : "h-4 w-4"}`} />
          </Button>
        </div>
        {!isKeyboardVisible && (
          <p className="text-xs text-zinc-400 text-center mt-3">
            {t('agentDisclaimer')}
          </p>
        )}
      </div>
    </div>
  )
}
