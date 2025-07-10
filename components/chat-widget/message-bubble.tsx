import React from "react"
import { Avatar } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { FileText, ImageIcon, FileArchive } from "lucide-react"
import type { Message } from "./chat-widget"
import Markdown from "react-markdown"

interface MessageBubbleProps {
  message: Message
  isFirstInGroup: boolean
  isLastInGroup: boolean
}

export default function MessageBubble({ message, isFirstInGroup, isLastInGroup }: MessageBubbleProps) {
  const isUser = message.sender === "user"

  // Get file icon based on file type
  const getFileIcon = (file: File) => {
    const fileType = file.type.split("/")[0]

    switch (fileType) {
      case "image":
        return <ImageIcon className="h-3 w-3 text-zinc-500" />
      case "application":
        return <FileText className="h-3 w-3 text-zinc-500" />
      default:
        return <FileArchive className="h-3 w-3 text-zinc-500" />
    }
  }

  // Format file size
  const formatFileSize = (size: number) => {
    if (size < 1024) {
      return `${size} B`
    } else if (size < 1024 * 1024) {
      return `${Math.round(size / 1024)} KB`
    } else {
      return `${(size / (1024 * 1024)).toFixed(1)} MB`
    }
  }

  // Determine bubble styling based on position in group
  const getBubbleStyles = () => {
    const baseStyles = isUser ? "bg-zinc-950 text-white" : "bg-zinc-100 text-zinc-900"

    // Adjust border radius based on position in group
    if (isFirstInGroup && isLastInGroup) {
      // Single message
      return `rounded-2xl ${baseStyles}`
    } else if (isFirstInGroup) {
      // First message in group
      return isUser ? `rounded-2xl rounded-br-lg ${baseStyles}` : `rounded-2xl rounded-bl-lg ${baseStyles}`
    } else if (isLastInGroup) {
      // Last message in group
      return isUser ? `rounded-2xl rounded-tr-lg ${baseStyles}` : `rounded-2xl rounded-tl-lg ${baseStyles}`
    } else {
      // Middle message in group
      return isUser
        ? `rounded-2xl rounded-tr-lg rounded-br-lg ${baseStyles}`
        : `rounded-2xl rounded-tl-lg rounded-bl-lg ${baseStyles}`
    }
  }

  // Utilidad para reemplazar urls especiales por enlaces clicables
  const renderMessageContent = (content: string) => {
    return <span><Markdown
      components={{
        a: ({ node, ...props }) => (
          <a {...props} className="text-blue-600 underline hover:text-blue-800" />
        ),
      }}>{content}</Markdown></span>
  }

  return (
    <div className="group">
      <div className={cn("flex items-start gap-3", isUser && "flex-row-reverse", isLastInGroup ? "mb-4" : "mb-1")}>
        {!isUser && isFirstInGroup && (
          <Avatar className="h-8 w-8 bg-zinc-950 mt-1 shrink-0">
            <img src="/globalrisc_logo_avatar.png" alt="Globalrisc AI Agent" />
          </Avatar>
        )}

        {!isUser && !isFirstInGroup && (
          <div className="w-8 shrink-0"></div> // Spacer to align grouped messages
        )}

        <div
          className={cn(
            getBubbleStyles(),
            "px-5 py-3 max-w-[90%] sm:max-w-[85%]",
            !isFirstInGroup && isUser && "mr-[3px]", // Slight adjustment for user messages
            !isFirstInGroup && !isUser && "ml-[3px]", // Slight adjustment for agent messages
          )}
        >
          <p className="text-[15px] leading-relaxed whitespace-pre-wrap break-words">
            {renderMessageContent(message.content)}
          </p>

          {message.files && message.files.length > 0 && (
            <div className="mt-2 space-y-1">
              {message.files.map((file, index) => (
                <div
                  key={index}
                  className={`text-xs flex items-center gap-1 ${isUser ? "text-zinc-300" : "text-zinc-600"}`}
                >
                  {getFileIcon(file)}
                  <span className="truncate">{file.name}</span>
                  <span className={isUser ? "text-zinc-400" : "text-zinc-500"}>({formatFileSize(file.size)})</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Status icon and spacer removed */}
      </div>

      {/* Timestamp removed */}
    </div>
  )
}
