"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SendHorizontal, Bot, User, Paperclip, Mic } from "lucide-react"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  content: string
  role: "assistant" | "user"
  timestamp: Date
}

export function FullChatAssistant() {
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

    if (input.includes("policy") && input.includes("cover")) {
      return "Your auto insurance policy provides comprehensive coverage including liability protection of $300,000 for bodily injury and property damage, collision coverage of $100,000 with a $500 deductible, and comprehensive coverage of $100,000. It also includes $10,000 for medical payments and $300,000 for uninsured motorist protection. Would you like me to explain any specific coverage in more detail?"
    } else if (input.includes("file") && input.includes("claim")) {
      return "To file a new claim, you can follow these steps:\n\n1. Go to the Claims section in your dashboard\n2. Click on 'File a New Claim'\n3. Select the policy for which you're filing the claim\n4. Fill out the claim details including date, description, and upload any relevant photos or documents\n5. Submit the claim\n\nAlternatively, I can help you start the process right now. Would you like me to guide you through filing a claim?"
    } else if (input.includes("payment") && input.includes("due")) {
      return "Your next payment of $128.45 is due on May 1, 2025. You currently have automatic payments set up with your Visa card ending in 4242. Would you like to make a payment now or change your payment method?"
    } else if (input.includes("add") && (input.includes("vehicle") || input.includes("car"))) {
      return "Adding a new vehicle to your policy is easy. You'll need the following information:\n\n- Vehicle make, model, and year\n- VIN (Vehicle Identification Number)\n- Current mileage\n- Primary driver information\n\nWould you like me to connect you with an agent to add a vehicle to your policy, or would you prefer to do it yourself through the policy management section?"
    } else if (input.includes("discount") || input.includes("save money")) {
      return "There are several ways you might be able to save on your insurance premiums:\n\n1. Bundle multiple policies (e.g., auto and home)\n2. Safe driver discount if you've been accident-free\n3. Low mileage discount if you don't drive often\n4. Vehicle safety features discount\n5. Paperless billing and automatic payment discounts\n\nWould you like me to check if you're eligible for any additional discounts on your current policies?"
    } else {
      return "I'm here to help with any insurance questions you might have. You can ask about your policies, claims, payments, or documents. If you need assistance with something specific, please let me know and I'll do my best to help or connect you with the right person."
    }
  }

  return (
    <div className="flex h-full flex-col">
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
                  "rounded-lg px-4 py-3 max-w-[80%]",
                  message.role === "assistant" ? "bg-zinc-100 text-zinc-900" : "bg-zinc-900 text-white",
                )}
              >
                <p className="text-sm whitespace-pre-line">{message.content}</p>
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
          <Button type="button" variant="ghost" size="icon" className="shrink-0">
            <Paperclip className="h-4 w-4" />
            <span className="sr-only">Attach file</span>
          </Button>
          <Button type="button" variant="ghost" size="icon" className="shrink-0">
            <Mic className="h-4 w-4" />
            <span className="sr-only">Voice input</span>
          </Button>
          <Input
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" size="icon" disabled={!input.trim()} className="shrink-0">
            <SendHorizontal className="h-4 w-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </form>
      </div>
    </div>
  )
}
