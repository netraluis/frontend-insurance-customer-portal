"use client"
import LoginForm from "@/components/auth/login-form"
import { useEffect } from "react"
import { useRouter } from "next/navigation"


export default function LoginPage() {
  const router = useRouter()
  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("access_token")) {
      router.push("/dashboard")
    }
  }, [router])
  return (
    <div className="container relative flex min-h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-6 w-6"
          >
            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
          </svg>
          Acme Inc
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              Acme Inc has transformed how we manage our business operations, providing unparalleled security and
              efficiency.
            </p>
            <footer className="text-sm">Sofia Davis, CEO of Davis Enterprises</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Benvingut de nou</h1>
            <p className="text-sm text-muted-foreground">Entra amb el teu email per accedir al teu compte</p>
          </div>
          <LoginForm />
          <p className="px-8 text-center text-xs text-muted-foreground">
            Continuant, acceptes els nostres{" "}
            {/* <a href="/terms" className="underline underline-offset-4 hover:text-primary">
              Termes de servei
            </a>{" "}
            i{" "}
            <a href="/privacy" className="underline underline-offset-4 hover:text-primary">
              Política de privacitat
            </a> */}
            .
          </p>
        </div>
      </div>
    </div>
  )
}
