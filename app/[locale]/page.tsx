
"use client"

import { Car, Shield, FileText } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useTranslations } from "next-intl"

export default function InsuranceServices() {

  const t = useTranslations('HomePage')

  const router = useRouter()
  const services = [
    {
      id: "auto-claim",
      icon: Car,
      title: t('services.autoClaim.title'),
      description: t('services.autoClaim.description'),
      action: t('services.autoClaim.action'),
      href: "/sinistre-auto",
    },
    {
      id: "general-claim",
      icon: Shield,
      title: t('services.generalClaim.title'),
      description: t('services.generalClaim.description'),
      action: t('services.generalClaim.action'),
      href: "/sinistre-divers",
    },
    {
      id: "get-quote",
      icon: FileText,
      title: t('services.getQuote.title'),
      description: t('services.getQuote.description'),
      action: t('services.getQuote.action'),
      href: "/quote",
    },
  ]

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Header */}
      <header className="border-b border-zinc-200 bg-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-zinc-900">Globalrisc</h1>
              
            </div>
            
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 text-zinc-50 opacity-100 rounded-xl">
        <div className="max-w-6xl mx-auto">
          {/* Introduction */}
          <div className="text-center mb-16">
            <h2 className="text-zinc-900 mb-4 font-light text-4xl">Com et podem ajudar avui?</h2>
            <p className="text-xl text-zinc-600 max-w-2xl mx-auto leading-relaxed font-normal">
              Selecciona el formulari que necessites per iniciar ràpidament el teu tràmit d’assegurança.
            </p>
          </div>

          {/* Service Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const IconComponent = service.icon
              return (
                <Card
                  key={service.id}
                  className="group relative overflow-hidden border-zinc-200 hover:border-zinc-300 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  <CardHeader className="pb-4">
                    <div className="w-12 h-12 rounded-lg bg-zinc-100 flex items-center justify-center mb-4 group-hover:bg-zinc-900 transition-colors duration-300">
                      <IconComponent className="w-6 h-6 text-zinc-700 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <CardTitle className="text-xl font-semibold text-zinc-900 group-hover:text-zinc-900">
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="text-zinc-600 leading-relaxed mb-6 text-base">
                      {service.description}
                    </CardDescription>
                    <Button
                      className="w-full bg-zinc-900 hover:bg-zinc-800 text-white font-medium py-2.5 transition-colors duration-200"
                      onClick={() => {
                        // In a real app, this would navigate to the appropriate page
                        console.log(`Navigating to ${service.href}`)
                        router.push(service.href)
                      }}
                    >
                      {service.action}
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Additional Information */}
          <div className="mt-20 text-center">
            <div className="rounded-2xl p-8 max-w-4xl mx-auto bg-gray-50">
              <h3 className="text-2xl font-semibold text-zinc-900 mb-4">{t('additionalInformation.title')}</h3>
              <p className="text-zinc-600 mb-6 text-lg leading-relaxed">
                {t('additionalInformation.description')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="outline"
                  className="border-zinc-300 text-zinc-700 hover:bg-zinc-50 font-medium px-6 bg-white"
                >
                  {t('additionalInformation.phone')}      
                </Button>
                <Button
                  variant="outline"
                  className="border-zinc-300 hover:bg-zinc-50 font-medium px-6 bg-black text-white"
                >
                  {t('additionalInformation.chat')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-zinc-500">
            <p>© Globalrisc 2025</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <span className="hover:text-zinc-700 cursor-pointer transition-colors">{t('footer.legal')}</span>
              <span className="hover:text-zinc-700 cursor-pointer transition-colors">{t('footer.privacy')}</span>
              <span className="hover:text-zinc-700 cursor-pointer transition-colors">{t('footer.solvency')}</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

