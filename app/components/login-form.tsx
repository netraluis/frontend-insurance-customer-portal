"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import OtpVerificationForm from "./otp-verification-form"
import { sendMagicLink } from "@/lib/auth"

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
})

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [showOtpForm, setShowOtpForm] = useState(false)
  const [email, setEmail] = useState("")
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    try {
      // In a real implementation, this would call your API to send the magic link
      await sendMagicLink(values.email)

      setEmail(values.email)
      setShowOtpForm(true)
      toast.success("Verification code sent", {
        description: `We've sent a verification code to ${values.email}`,
      })
    } catch (error) {
      toast.error("Error", {
        description: "Something went wrong. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerificationSuccess = () => {
    router.push("/dashboard")
  }

  if (showOtpForm) {
    return (
      <OtpVerificationForm email={email} onSuccess={handleVerificationSuccess} onBack={() => setShowOtpForm(false)} />
    )
  }

  return (
    <div className="grid gap-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="name@example.com"
                    {...field}
                    type="email"
                    autoComplete="email"
                    disabled={isLoading}
                  />
                </FormControl>
                <FormDescription>We'll send you a verification code to this email.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
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
                Sending verification code...
              </>
            ) : (
              "Continue with Email"
            )}
          </Button>
        </form>
      </Form>
      {/* Social login section removed */}
    </div>
  )
}
