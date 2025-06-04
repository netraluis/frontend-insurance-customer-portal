"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    setIsLoading(true)
    const token = localStorage.getItem("access_token")
    if (!token) {
      router.push("/login")
    }
    setIsLoading(false)
  }, [router])
  if (isLoading) {
    return <div>Loading...</div>
  }
  return <>{children}</>
} 