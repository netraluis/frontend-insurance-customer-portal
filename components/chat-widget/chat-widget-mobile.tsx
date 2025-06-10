"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { v4 as uuidv4 } from "uuid"
import { Send, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import ChatStarters from "./chat-starters"
import MessageBubble from "./message-bubble"
import { useTranslations } from 'next-intl'
import { Textarea } from "../ui/textarea"

export type Message = {
  id: string
  content: string
  sender: "user" | "agent"
  timestamp: Date
  status: "sending" | "delivered" | "error"
  files?: File[]
}

export default function ChatWidgetMobile({ setIsOpen }: { isFullScreen?: boolean, setIsOpen: (isOpen: boolean) => void }) {
  const t = useTranslations('ChatWidget')
  const [sessionId] = useState(() => uuidv4())
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false)

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
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" })
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

    const newMessage: Message = {
      id: uuidv4(),
      content: content.trim(),
      sender: "user",
      timestamp: new Date(),
      status: "sending",
      files: files.length > 0 ? [...files] : undefined,
    }

    setMessages((prev) => [...prev, newMessage])
    setInputValue("")
    setFiles([])

    try {
      setIsLoading(true)
      const formData = new FormData()
      formData.append("message", content)
      formData.append("sessionId", sessionId)
      if (files.length > 0) {
        files.forEach((file) => {
          formData.append("files", file)
        })
      }
      const response = await fetch(process.env.NEXT_PUBLIC_N8N_SEND_MESSAGE!, {
        method: "POST",
        body: formData
      })
      if (!response.ok) {
        throw new Error("Failed to send message")
      }
      const data = await response.json()
      setMessages((prev) => prev.map((msg) => (msg.id === newMessage.id ? { ...msg, status: "delivered" } : msg)))
      setTimeout(
        () => {
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
        800,
      )
    } catch (error) {
      setMessages((prev) => prev.map((msg) => (msg.id === newMessage.id ? { ...msg, status: "error" } : msg)))
      setIsLoading(false)
      console.error(error)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleStarterClick = (starter: string) => {
    handleSendMessage(starter)
  }

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


  return (
    <div
      className="fixed z-50 flex flex-col w-full font-sans"
      style={{
        fontFamily: 'Inter, sans-serif',
        height: '100dvh',
        top: 0,
        left: 0,
      }}
      role="dialog"
      aria-modal="true"
    >
      {/* Header */}
      {!isKeyboardOpen && (
        <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-200 bg-white">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 bg-zinc-950">
              <img src="/globalriscSymbol.png" alt="Globalrisc AI Agent" />
            </Avatar>
            <span className="font-semibold text-base">Globalrisc AI Agent</span>
          </div>
          <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setIsOpen(false)} aria-label={t('closeChat')}>
            <X className="h-5 w-5" />
          </Button>
        </div>
      )}

      {/* Mensajes */}
      <div
        className="flex-1 flex flex-col overflow-y-auto px-3 py-2 bg-white"
        style={{ WebkitOverflowScrolling: 'touch' }}
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
              <img src="/globalriscSymbol.png"alt="Globalrisc AI Agent" />
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

      {messages.length <= 1 && (
        <div className="px-2 py-0">
          <p className="text-xs text-zinc-500 mb-0">{t('suggestions')}</p>
          <ChatStarters onStarterClick={handleStarterClick} />
        </div>
      )}

      {/* Input area */}
      <div className="flex flex-col px-3 py-3 border-t border-zinc-200 bg-white">
        <div className="flex items-end gap-2 bg-white rounded-lg border border-zinc-200 px-2 py-2">
          <Textarea
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t('inputPlaceholder')}
            className="placeholder:text-zinc-500 flex-1 resize-none outline-none text-sm max-h-24 min-h-[26px] bg-white"
            rows={1}
            onFocus={() => setIsKeyboardOpen(true)}
            onBlur={() => setIsKeyboardOpen(false)}
          />
          <Button
            size="icon"
            className="h-8 w-8 shrink-0 rounded-ml bg-zinc-950 hover:bg-zinc-800"
            onClick={() => handleSendMessage()}
            disabled={isLoading || (!inputValue.trim() && files.length === 0)}
            aria-label={t('openChat')}
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
        <p className="text-xs text-zinc-400 text-center mt-3">
          {t('agentDisclaimer')}
        </p>
      </div>
    </div>
  )
} 