"use client"
import LoginForm from "@/components/auth/login-form"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useTranslations } from 'next-intl';

export default function LoginPage() {
  const router = useRouter()
  const t = useTranslations('LoginPage');
  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("access_token")) {
      router.push("/dashboard")
    }
  }, [router])
  return (
    <div className="container relative flex min-h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-[#84C9E5]" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <img
            src="/LOGO_GLOBALRISC_web.svg"
            alt="Globalrisc Logo"
            className="mr-2 h-6 w-auto"
          />
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              {t('testimonial')}
            </p>
            <footer className="text-sm">{t('testimonialAuthor')}</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">{t('welcome')}</h1>
            <p className="text-sm text-muted-foreground">{t('subtitle')}</p>
          </div>
          <LoginForm />
          <p className="px-8 text-center text-xs text-muted-foreground">
            {t('terms')}
            {/* <a href="/terms" className="underline underline-offset-4 hover:text-primary">
              {t('termsOfService')}
            </a>{" "}
            {t('and')} {" "}
            <a href="/privacy" className="underline underline-offset-4 hover:text-primary">
              {t('privacyPolicy')}
            </a> */}
            .
          </p>
        </div>
      </div>
    </div>
  )
}
