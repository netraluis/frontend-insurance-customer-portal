"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  BasicCard,
  BasicCardSkeleton,
  MetricCard,
  MetricCardSkeleton,
  DocumentCard,
  DocumentCardSkeleton,
  StatusCard,
  StatusCardSkeleton,
} from "@/app/components/card-templates"
import { PolicyListWithLoading } from "@/app/components/examples/policy-list-with-loading"
import { FileText, Download, Eye, MoreHorizontal, Calendar, DollarSign } from "lucide-react"

export default function LoadingStatesExamplePage() {
  const [isLoading, setIsLoading] = useState(true)

  const toggleLoading = () => {
    setIsLoading(!isLoading)
  }

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Exemple de carregar estats</h1>
        <Button onClick={toggleLoading}>{isLoading ? "Mostrar contingut" : "Mostrar estats de carrega"}</Button>
      </div>

      <div className="grid gap-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Mètriques del dashboard</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {isLoading ? (
              <>
                <MetricCardSkeleton />
                <MetricCardSkeleton />
                <MetricCardSkeleton />
                <MetricCardSkeleton />
              </>
            ) : (
              <>
                <MetricCard
                  title="Polítiques actives"
                  value="4"
                  icon={FileText}
                  description="Totes les polítiques estan actives"
                  trend="stable"
                />
                <MetricCard
                  title="Reclamacions obertes"
                  value="1"
                  icon={FileText}
                  description="1 reclamació en curs"
                  trend="up"
                  trendValue="1"
                />
                <MetricCard
                  title="Documents"
                  value="12"
                  icon={FileText}
                  description="2 requereix atenció"
                  trend="up"
                  trendValue="2"
                />
                <MetricCard
                  title="Pròxim pagament"
                  value="$248.33"
                  icon={Calendar}
                  description="Venc en 14 dies"
                  trend="down"
                  trendValue="14 dies"
                />
              </>
            )}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Llista de polítiques</h2>
          <PolicyListWithLoading />
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Reclamacions recents</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {isLoading ? (
              <>
                <StatusCardSkeleton />
                <StatusCardSkeleton />
              </>
            ) : (
              <>
                <StatusCard
                  title="Reclamació d'accident de cotxe"
                  subtitle="Reclamació #CLM-001"
                  status="in-progress"
                  progress={65}
                  details={[
                    { label: "Inicialment presentada", value: "10 d'abril de 2025", icon: Calendar },
                    { label: "Import", value: "3.450,00 €", icon: DollarSign },
                  ]}
                  description="Col·lisió de front bumper i capota"
                  actions={
                    <Button variant="ghost" size="sm" className="gap-1">
                      Veure detalls
                    </Button>
                  }
                />
                <StatusCard
                  title="Reclamació de danys d'aigua"
                  subtitle="Reclamació #CLM-002"
                  status="completed"
                  progress={100}
                  details={[
                    { label: "Inicialment presentada", value: "5 de març de 2025", icon: Calendar },
                    { label: "Import", value: "2.800,00 €", icon: DollarSign },
                  ]}
                  description="Danys d'aigua per ruptura de tub en el soterrani"
                  actions={
                    <Button variant="ghost" size="sm" className="gap-1">
                      Veure detalls
                    </Button>
                  }
                />
              </>
            )}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Recent Documents</h2>
          {isLoading ? (
            <BasicCardSkeleton hasTitle hasDescription hasHeaderAction contentHeight="h-64" />
          ) : (
            <BasicCard
              title="Recent Documents"
              description="Your most recent insurance documents"
              headerAction={
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              }
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {isLoading ? (
                  <>
                    <DocumentCardSkeleton />
                    <DocumentCardSkeleton />
                    <DocumentCardSkeleton />
                  </>
                ) : (
                  <>
                    <DocumentCard
                      title="Política d'assegurança de cotxe"
                      fileType="PDF"
                      fileSize="1.2 MB"
                      date="15 d'abril de 2025"
                      category="Document de política"
                      tags={["auto", "policy"]}
                      actions={
                        <>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">Previsualitzar</span>
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Download className="h-4 w-4" />
                            <span className="sr-only">Descarregar</span>
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Més opcions</span>
                          </Button>
                        </>
                      }
                    />
                    <DocumentCard
                      title="Informe de reclamació d'assegurança de cotxe"
                      fileType="PDF"
                      fileSize="0.8 MB"
                      date="10 d'abril de 2025"
                      category="Document de reclamació"
                      tags={["auto", "claim"]}
                      actions={
                        <>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">Previsualitzar</span>
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Download className="h-4 w-4" />
                            <span className="sr-only">Descarregar</span>
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Més opcions</span>
                          </Button>
                        </>
                      }
                    />
                    <DocumentCard
                      title="Comprovat de pagament"
                      fileType="PDF"
                      fileSize="0.3 MB"
                      date="1 de abril de 2025"
                      category="Document de facturació"
                      tags={["pagament", "comprovat"]}
                      actions={
                        <>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">Previsualitzar</span>
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Download className="h-4 w-4" />
                            <span className="sr-only">Descarregar</span>
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Més opcions</span>
                          </Button>
                        </>
                      }
                    />
                  </>
                )}
              </div>
            </BasicCard>
          )}
        </section>
      </div>
    </div>
  )
}
