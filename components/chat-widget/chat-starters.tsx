"use client"
import React from "react"
import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { getT } from "./locales"

interface ChatStartersProps {
  onStarterClick: (starter: string) => void
  lang: string
}

export default function ChatStarters({ onStarterClick, lang }: ChatStartersProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)
  const t = getT(lang);

  const arrStarters: string[] = t('starters')


  const handleScroll = () => {
    if (!scrollContainerRef.current) return

    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
    setShowLeftArrow(scrollLeft > 0)
    setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 10)
  }

  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return

    const scrollAmount = 200
    const currentScroll = scrollContainerRef.current.scrollLeft

    scrollContainerRef.current.scrollTo({
      left: direction === "left" ? currentScroll - scrollAmount : currentScroll + scrollAmount,
      behavior: "smooth",
    })
  }

  return (
    <div className="relative">
      {showLeftArrow && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-7 w-7 sm:h-6 sm:w-6 rounded-full bg-white shadow-sm border border-zinc-200"
          onClick={() => scroll("left")}
          aria-label="Scroll left"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      )}

      <div
        ref={scrollContainerRef}
        className="flex gap-3 overflow-x-auto scrollbar-hide py-2 px-1"
        onScroll={handleScroll}
      >
        {arrStarters.map((starter, index) => (
          <Button
            key={index}
            variant="outline"
            className="whitespace-nowrap text-sm py-2 px-4 h-auto rounded-md border-zinc-200 touch-manipulation"
            onClick={() => onStarterClick(starter)}
          >
            {starter}
          </Button>
        ))}
      </div>

      {showRightArrow && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-7 w-7 sm:h-6 sm:w-6 rounded-full bg-white shadow-sm border border-zinc-200"
          onClick={() => scroll("right")}
          aria-label="Scroll right"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      )}
    </div>
  )
}
