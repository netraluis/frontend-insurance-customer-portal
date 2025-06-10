"use client"

import { useState, useEffect, useRef } from "react"
import ChatWidget from "@/components/chat-widget/chat-widget"
import { Button } from "@/components/ui/button"
import { MessageSquare, X } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"
import { useScreenSize } from "@/hooks/use-screen-size"
import { useTranslations } from 'next-intl'

export default function Home(
) {
  const [isOpen, setIsOpen] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false)
  const [safeAreaBottom, setSafeAreaBottom] = useState(0)
  const widgetContainerRef = useRef<HTMLDivElement>(null)

  const t = useTranslations('ChatWidget')

  // Detect device sizes
  const isMobile = useMediaQuery("(max-width: 768px)")
  const screenSize = useScreenSize()
  const isVerySmall = screenSize === "xs"

  // Adjust animation durations based on device
  const animationDuration = isMobile ? 300 : 400
  const closingDelay = isMobile ? 250 : 350

  // Handle opening and closing animations
  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true)
      setIsVisible(true)
      // Allow time for the animation to complete
      const timer = setTimeout(() => {
        setIsAnimating(false)
      }, animationDuration + 50)
      return () => clearTimeout(timer)
    } else {
      if (isVisible) {
        setIsAnimating(true)
        // Allow time for the closing animation before hiding
        const timer = setTimeout(() => {
          setIsVisible(false)
          setIsAnimating(false)
        }, closingDelay)
        return () => clearTimeout(timer)
      }
    }
  }, [isOpen, isVisible, animationDuration, closingDelay])

  // Handle body scroll locking for full-screen mode
  useEffect(() => {
    if (isVerySmall && isOpen && !isAnimating) {
      // Lock scrolling on the body when chat is open on very small devices
      document.body.style.overflow = "hidden"
    } else {
      // Restore scrolling
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [isVerySmall, isOpen, isAnimating])

  // Detect keyboard on mobile
  useEffect(() => {
    if (!isMobile) return

    const detectKeyboard = () => {
      if (window.visualViewport) {
        const keyboardThreshold = window.innerHeight * 0.15
        const heightDiff = window.innerHeight - window.visualViewport.height
        setIsKeyboardOpen(heightDiff > keyboardThreshold)
      } else {
        setIsKeyboardOpen(window.innerHeight < window.outerHeight * 0.75)
      }
    }

    window.addEventListener("resize", detectKeyboard)

    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", detectKeyboard)
    }

    return () => {
      window.removeEventListener("resize", detectKeyboard)
      if (window.visualViewport) {
        window.visualViewport.removeEventListener("resize", detectKeyboard)
      }
    }
  }, [isMobile])

  // Detect safe area insets and browser UI
  useEffect(() => {
    if (!isMobile) return

    const updateSafeArea = () => {
      // Get safe area bottom inset if available
      const safeAreaInset = Number.parseInt(
        getComputedStyle(document.documentElement).getPropertyValue("--sat") || "0",
        10,
      )

      // Estimate browser UI height
      let browserUIHeight = 0

      // For iOS Safari, we can detect the difference between window.innerHeight and window.outerHeight
      if (/iPhone|iPad|iPod/.test(navigator.userAgent) && /Safari/.test(navigator.userAgent)) {
        browserUIHeight = Math.max(15, safeAreaInset)
      } else {
        // For other browsers, use a minimum safe value
        browserUIHeight = 15
      }

      setSafeAreaBottom(browserUIHeight)
    }

    // Set initial values
    updateSafeArea()

    // Update on resize and orientation change
    window.addEventListener("resize", updateSafeArea)
    window.addEventListener("orientationchange", updateSafeArea)

    // Update on scroll to detect dynamic browser UI
    window.addEventListener("scroll", updateSafeArea)

    return () => {
      window.removeEventListener("resize", updateSafeArea)
      window.removeEventListener("orientationchange", updateSafeArea)
      window.removeEventListener("scroll", updateSafeArea)
    }
  }, [isMobile])

  // Adjust widget position when browser UI changes
  useEffect(() => {
    if (!isMobile || !isVisible || !widgetContainerRef.current) return

    const adjustWidgetPosition = () => {
      if (widgetContainerRef.current) {
        // Apply safe area padding
        widgetContainerRef.current.style.paddingBottom = `${safeAreaBottom}px`
      }
    }

    adjustWidgetPosition()
  }, [isMobile, isVisible, safeAreaBottom])

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div >
      {isVisible && (
        <div
          ref={widgetContainerRef}
          className={`fixed transition-all ${isVerySmall
            ? "inset-0 z-50 bg-white"
            : isMobile
              ? "bottom-0 right-0 left-0 z-50"
              : "bottom-8 right-8 z-50"
            } flex flex-col items-end safe-area-bottom`}
          style={{
            transitionProperty: "opacity, transform",
            transitionDuration: `${animationDuration}ms`,
            transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
            opacity: isAnimating && isOpen ? 0 : 1,
            transform: isVerySmall
              ? isAnimating && isOpen
                ? "translateY(100%)"
                : "translateY(0)"
              : isAnimating && isOpen
                ? `${isMobile ? "translateY(30%)" : "translateY(20px) scale(0.98)"}`
                : "translateY(0) scale(1)",
            // Adjust height when keyboard is open
            height: isMobile && isKeyboardOpen ? "auto" : undefined,
            // Apply safe area bottom padding
            paddingBottom: isMobile ? `${safeAreaBottom}px` : undefined,
          }}
        >

          <div
            className={`${isVerySmall ? "w-full h-full" : isMobile ? "w-full" : ""} ${!isVerySmall && "mb-4"}`}
            style={{ width: !isMobile && !isVerySmall ? "460px" : undefined }}
          >
            <ChatWidget isFullScreen={isVerySmall} setIsOpen={setIsOpen} />
          </div>

          {!isVerySmall && !isKeyboardOpen && (
            <Button
              size="icon"
              className={`rounded-full h-10 w-10 bg-zinc-950 text-white hover:bg-zinc-800 shadow-lg ${isMobile ? "mb-4 mr-4" : ""}`}
              onClick={handleToggle}
              aria-label={t('closeChat')}
              style={{ transition: "none" }}
            >
              <X className="h-5 w-5" />
            </Button>
          )}
        </div>
      )}

      {(!isVisible || isAnimating) && (
        <div
          className={`fixed bottom-8 right-4 z-50`}
          style={{
            opacity: isAnimating && !isOpen ? 0 : 1,
            transition: "opacity 200ms ease",
            pointerEvents: isAnimating ? "none" : "auto",
          }}
        >
          <Button
            className={`rounded-full px-4 py-2 bg-zinc-950 text-white hover:bg-zinc-800 shadow-lg ${isMobile ? "h-12" : ""}`}
            onClick={handleToggle}
            aria-label={t('openChat')}
          >
            <MessageSquare className={`${isMobile ? "h-5 w-5" : "h-5 w-5"} `} />
            {/* Open Chat Widget */}
          </Button>
        </div>
      )}
    </div>
  )
}
