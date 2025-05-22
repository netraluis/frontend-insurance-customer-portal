"use client"

import { useState, useEffect } from "react"

type ScreenSize = "xs" | "sm" | "md" | "lg" | "xl"

export function useScreenSize(): ScreenSize {
  const [screenSize, setScreenSize] = useState<ScreenSize>("lg")

  useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth
      if (width < 480) {
        setScreenSize("xs")
      } else if (width < 640) {
        setScreenSize("sm")
      } else if (width < 768) {
        setScreenSize("md")
      } else if (width < 1024) {
        setScreenSize("lg")
      } else {
        setScreenSize("xl")
      }
    }

    // Set initial value
    updateScreenSize()

    // Add event listener
    window.addEventListener("resize", updateScreenSize)

    // Clean up
    return () => {
      window.removeEventListener("resize", updateScreenSize)
    }
  }, [])

  return screenSize
}
