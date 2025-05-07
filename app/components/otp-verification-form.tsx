"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { verifyOtp, resendOtp } from "@/lib/auth"

interface OtpVerificationFormProps {
  email: string
  onSuccess: () => void
  onBack: () => void
}

export default function OtpVerificationForm({ email, onSuccess, onBack }: OtpVerificationFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  // Focus the first input on mount
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus()
    }
  }, [])

  const handleChange = (index: number, value: string) => {
    // Only allow numbers
    if (value && !/^\d+$/.test(value)) return

    const newOtp = [...otp]
    // Take only the last character if multiple are pasted
    newOtp[index] = value.slice(-1)
    setOtp(newOtp)

    // Auto-focus next input if value is entered
    if (value && index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === "Backspace" && !otp[index] && index > 0 && inputRefs.current[index - 1]) {
      inputRefs.current[index - 1].focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text/plain").trim()

    // Check if pasted content is a 6-digit number
    if (/^\d{6}$/.test(pastedData)) {
      const newOtp = pastedData.split("")
      setOtp(newOtp)

      // Focus the last input
      if (inputRefs.current[5]) {
        inputRefs.current[5].focus()
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const otpValue = otp.join("")

    // Validate OTP format
    if (otpValue.length !== 6 || !/^\d+$/.test(otpValue)) {
      toast.error("Invalid verification code", {
        description: "Please enter a valid 6-digit verification code.",
      })
      return
    }

    setIsLoading(true)

    try {
      // In a real implementation, this would call your API to verify the OTP
      const result = await verifyOtp(email, otpValue)

      if (result.success) {
        toast.success("Verification successful", {
          description: "You have been successfully logged in.",
        })
        onSuccess()
      } else {
        toast.error("Verification failed", {
          description: "The verification code is invalid or has expired.",
        })
      }
    } catch (error) {
      toast.error("Error", {
        description: "Something went wrong. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendCode = async () => {
    setIsResending(true)

    try {
      // In a real implementation, this would call your API to resend the OTP
      await resendOtp(email)

      toast.success("Code resent", {
        description: `We've sent a new verification code to ${email}`,
      })
    } catch (error) {
      toast.error("Error", {
        description: "Failed to resend verification code. Please try again.",
      })
    } finally {
      setIsResending(false)
    }
  }

  return (
    <div className="grid gap-6">
      <div className="flex flex-col space-y-2">
        <h2 className="text-xl font-semibold tracking-tight">Verify your email</h2>
        <p className="text-sm text-muted-foreground">Enter the 6-digit code sent to {email}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex justify-between space-x-2">
          {otp.map((digit, index) => (
            <Input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={index === 0 ? handlePaste : undefined}
              className="h-12 w-12 text-center text-lg"
              disabled={isLoading}
              aria-label={`Digit ${index + 1}`}
            />
          ))}
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <svg
                className="mr-2 h-4 w-4 animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Verifying...
            </>
          ) : (
            "Verify and Sign In"
          )}
        </Button>
      </form>

      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={onBack} disabled={isLoading || isResending}>
          Back to login
        </Button>

        <Button variant="link" size="sm" onClick={handleResendCode} disabled={isLoading || isResending}>
          {isResending ? "Sending..." : "Resend code"}
        </Button>
      </div>
    </div>
  )
}
