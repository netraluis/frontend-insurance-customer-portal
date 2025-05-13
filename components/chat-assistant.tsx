"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SendHorizontal, Bot, User } from "lucide-react"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  content: string
  role: "assistant" | "user"
  timestamp: Date
}

export function ChatAssistant() {
  const [input, setInput] = React.useState("")
  const [messages, setMessages] = React.useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your virtual insurance assistant. How can I help you today?",
      role: "assistant",
      timestamp: new Date(),
    },
  ])

  const messagesEndRef = React.useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  React.useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = () => {
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")

    // Simulate assistant response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: getAssistantResponse(input),
        role: "assistant",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    }, 1000)
  }

  const getAssistantResponse = (userInput: string): string => {
    const input = userInput.toLowerCase()

    if (input.includes("policy") && input.includes("renew")) {
      return "Your auto insurance policy is set to renew on May 15, 2025. Would you like me to help you with the renewal process?"
    } else if (input.includes("claim") && input.includes("status")) {
      return "Your recent auto claim (CLM-001) is currently in progress. The claim adjuster has reviewed your case and is waiting for the repair shop estimate. Would you like more details?"
    } else if (input.includes("payment")) {
      return "Your next payment of $248.33 is due on May 1, 2025. Would you like to set up automatic payments or make a payment now?"
    } else if (input.includes("document") || input.includes("policy document")) {
      return "I can help you find your policy documents. Which policy are you looking for? Auto, Home, Travel, or Health?"
    } else {
      return "I'm here to help with any insurance questions you might have. You can ask about your policies, claims, payments, or documents. How can I assist you today?"
    }
  }

  return (
    <div className="flex h-[400px] flex-col">
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={cn("flex items-start gap-3", message.role === "user" && "justify-end")}>
              {message.role === "assistant" && (
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/abstract-ai-network.png" alt="AI Assistant" />
                  <AvatarFallback>
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              )}
              <div
                className={cn(
                  "rounded-lg px-3 py-2 max-w-[80%]",
                  message.role === "assistant" ? "bg-zinc-100 text-zinc-900" : "bg-zinc-900 text-white",
                )}
              >
                <p className="text-sm">{message.content}</p>
                <p className="mt-1 text-xs opacity-70">
                  {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
              {message.role === "user" && (
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/vibrant-street-market.png" alt="User" />
                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="border-t p-4">
        <form
          className="flex items-center gap-2"
          onSubmit={(e) => {
            e.preventDefault()
            handleSend()
          }}
        >
          <Input
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" size="icon" disabled={!input.trim()}>
            <SendHorizontal className="h-4 w-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </form>
      </div>
    </div>
  )
}
