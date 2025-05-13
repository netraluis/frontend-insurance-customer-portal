import { cn } from "@/lib/utils"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, Car, Shield, FileText, CreditCard, Download, ArrowLeft, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { ClaimCard } from "@/components/claim-card"
import { DocumentCard } from "@/components/document-card"
import Image from 'next/image';
import { use } from "react";
export default function PolicyDetail({ params }: { params: Promise<{ id: string }> }) {
  // In a real app, you would fetch the policy details based on the ID
  const { id } = use( params)
  const policy = {
    id: id,
    title: "Auto Insurance",
    type: "auto",
    status: "active",
    premium: "$128.45/month",
    renewalDate: "May 15, 2025",
    coverageAmount: "$500,000",
    deductible: "$500",
    startDate: "May 15, 2023",
    vehicle: {
      make: "Toyota",
      model: "Camry",
      year: "2022",
      vin: "1HGCM82633A123456",
      licensePlate: "ABC-1234",
    },
    coverages: [
      { name: "Liability", amount: "$300,000", description: "Bodily injury and property damage" },
      { name: "Collision", amount: "$100,000", description: "Damage to your vehicle from collision" },
      { name: "Comprehensive", amount: "$100,000", description: "Damage to your vehicle not from collision" },
      { name: "Medical Payments", amount: "$10,000", description: "Medical expenses for you and passengers" },
      { name: "Uninsured Motorist", amount: "$300,000", description: "Protection if hit by uninsured driver" },
    ],
    claims: [
      {
        id: "CLM-001",
        title: "Auto Accident Claim",
        date: "April 10, 2025",
        status: "in-progress",
        progress: 65,
        amount: "$3,450.00",
      },
    ],
    documents: [
      {
        id: "DOC-001",
        title: "Auto Insurance Policy",
        type: "policy",
        date: "April 15, 2025",
        fileSize: "1.2 MB",
        fileType: "PDF",
      },
      {
        id: "DOC-003",
        title: "Auto Claim Report",
        type: "claim",
        date: "April 10, 2025",
        fileSize: "0.8 MB",
        fileType: "PDF",
      },
      {
        id: "DOC-004",
        title: "Payment Receipt",
        type: "billing",
        date: "April 1, 2025",
        fileSize: "0.3 MB",
        fileType: "PDF",
      },
    ],
    payments: [
      { id: "PAY-001", date: "April 1, 2025", amount: "$128.45", status: "paid" },
      { id: "PAY-002", date: "March 1, 2025", amount: "$128.45", status: "paid" },
      { id: "PAY-003", date: "February 1, 2025", amount: "$128.45", status: "paid" },
    ],
  }

  return (
    <div className="flex flex-col min-h-screen animate-in">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
        <SidebarTrigger />
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Enrere</span>
          </Link>
        </Button>
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold">{policy.title}</h1>
          <Badge variant={policy.status === "active" ? "default" : "outline"} className="capitalize">
            {policy.status}
          </Badge>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <Button variant="outline" size="icon">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Notificacions</span>
          </Button>
          <Avatar>
            <AvatarImage src="/vibrant-street-market.png" alt="User" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </div>
      </header>

      <main className="flex-1 p-6 pt-4 page-transition">
        <div className="grid gap-6">
          <Tabs defaultValue="overview">
            <TabsList className="mb-4">
              <TabsTrigger value="overview">Resum</TabsTrigger>
              <TabsTrigger value="coverage">Cobertures</TabsTrigger>
              <TabsTrigger value="claims">Reclamacions</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="billing">Facturació</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Resum de la política</CardTitle>
                    <CardDescription>Resum de la cobertura de la teva política</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm text-zinc-600">
                        Aquesta política d'assegurança automòbil proporciona cobertura completa per al teu Toyota Camry de 2022. Inclou protecció de responsabilitat de 300.000 dòlars per a les víctimes de la malaltia i danys a la propietat, cobertura de col·lisió de 100.000 dòlars amb un deduïble de 500 dòlars i cobertura de danys a la propietat de 100.000 dòlars.
                      </p>
                      <p className="text-sm text-zinc-600">
                        Les cobertures addicionals inclouen 10.000 dòlars per a pagaments mèdics i 300.000 dòlars per a la protecció de驾驶者 de vehicles sense assegurança. La política està activa i està programada per a renovar el 15 de maig de 2025, amb un preu mensual de 128,45 dòlars.
                      </p>
                      <div className="flex items-center gap-2 text-sm text-zinc-600">
                        <Shield className="h-4 w-4 text-green-600" />
                        <span>La teva política compleix amb tots els requisits mínims d'estat i proporciona una protecció excel·lent.</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Detalls de la política</CardTitle>
                    <CardDescription>Informació clau sobre la teva política</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <dl className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <dt className="text-zinc-500">Número de política</dt>
                        <dd className="font-medium">{policy.id}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-zinc-500">Preu</dt>
                        <dd className="font-medium">{policy.premium}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-zinc-500">Data de renovació</dt>
                        <dd className="font-medium">{policy.renewalDate}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-zinc-500">Data d'inici</dt>
                        <dd className="font-medium">{policy.startDate}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-zinc-500">Import de cobertura</dt>
                        <dd className="font-medium">{policy.coverageAmount}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-zinc-500">Deduïble</dt>
                        <dd className="font-medium">{policy.deductible}</dd>
                      </div>
                    </dl>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Informació del vehicle</CardTitle>
                  <CardDescription>Detalls sobre el vehicle assegurat</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100">
                          <Car className="h-5 w-5 text-zinc-700" />
                        </div>
                        <div>
                          <h3 className="font-medium">
                            {policy.vehicle.year} {policy.vehicle.make} {policy.vehicle.model}
                          </h3>
                          <p className="text-sm text-zinc-500">Vehicle principal</p>
                        </div>
                      </div>

                      <dl className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <dt className="text-zinc-500">VIN</dt>
                          <dd className="font-medium">{policy.vehicle.vin}</dd>
                        </div>
                        <div>
                          <dt className="text-zinc-500">Matrícula</dt>
                          <dd className="font-medium">{policy.vehicle.licensePlate}</dd>
                        </div>
                      </dl>
                    </div>

                    <div className="flex items-center justify-center">
                      
                      <Image src="/sleek-camry-drive.png" alt="Toyota Camry 2022" height={150} className="max-h-[150px] object-contain"/>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="coverage" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Detalls de la cobertura</CardTitle>
                  <CardDescription>Desglossament de la cobertura de la teva política</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {policy.coverages.map((coverage, index) => (
                      <div key={index} className="border-b pb-4 last:border-0 last:pb-0">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">{coverage.name}</h3>
                          <span className="font-semibold">{coverage.amount}</span>
                        </div>
                        <p className="mt-1 text-sm text-zinc-500">{coverage.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="claims" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Historial de reclamacions</CardTitle>
                  <CardDescription>Historial de reclamacions presentades sota aquesta política</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {policy.claims.map((claim) => (
                      <ClaimCard
                        key={claim.id}
                        id={claim.id}
                        title={claim.title}
                        date={claim.date}
                        status={claim.status as "in-progress" | "completed" | "denied"}
                        progress={claim.progress}
                        policyId={policy.id}
                        amount={claim.amount}
                      />
                    ))}
                    {policy.claims.length === 0 && (
                      <div className="flex flex-col items-center justify-center py-8 text-center">
                        <CheckCircle2 className="h-12 w-12 text-green-500 mb-2" />
                        <h3 className="text-lg font-medium">No hi ha reclamacions presentades</h3>
                        <p className="text-sm text-zinc-500 max-w-md mt-1">
                          No has presentat cap reclamació sota aquesta política. Si necessites presentar una reclamació, fes clic en el botó de sota.
                        </p>
                        <Button className="mt-4">Presentar una nova reclamació</Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="documents" className="space-y-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Documents de la política</CardTitle>
                    <CardDescription>Accés i descàrrega dels documents de la teva política</CardDescription>
                  </div>
                  <Button>
                    <FileText className="mr-2 h-4 w-4" />
                    Carregar document
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {policy.documents.map((document) => (
                      <DocumentCard
                        key={document.id}
                        id={document.id}
                        title={document.title}
                        type={document.type as "policy" | "claim" | "billing"}
                        date={document.date}
                        policyId={policy.id}
                        fileSize={document.fileSize}
                        fileType={document.fileType}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="billing" className="space-y-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Historial de pagaments</CardTitle>
                    <CardDescription>Registre dels teus pagaments de primes</CardDescription>
                  </div>
                  <Button>
                    <CreditCard className="mr-2 h-4 w-4" />
                    Fer un pagament
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="py-3 text-left font-medium text-zinc-500">ID de pagament</th>
                          <th className="py-3 text-left font-medium text-zinc-500">Data</th>
                          <th className="py-3 text-left font-medium text-zinc-500">Import</th>
                          <th className="py-3 text-left font-medium text-zinc-500">Estat</th>
                          <th className="py-3 text-left font-medium text-zinc-500">Accions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {policy.payments.map((payment) => (
                          <tr key={payment.id} className="border-b">
                            <td className="py-3 text-sm">{payment.id}</td>
                            <td className="py-3 text-sm">{payment.date}</td>
                            <td className="py-3 text-sm font-medium">{payment.amount}</td>
                            <td className="py-3 text-sm">
                              <Badge
                                variant={payment.status === "paid" ? "default" : "outline"}
                                className={cn(
                                  "capitalize",
                                  payment.status === "paid" && "bg-green-100 text-green-700 hover:bg-green-100",
                                )}
                              >
                                {payment.status}
                              </Badge>
                            </td>
                            <td className="py-3 text-sm">
                              <Button variant="ghost" size="sm">
                                <Download className="mr-1 h-3 w-3" />
                                Receipt
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Programació de pagaments</CardTitle>
                  <CardDescription>Pagaments de primes futurs</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b pb-4">
                      <div>
                        <h3 className="font-medium">Pròxim pagament</h3>
                        <p className="text-sm text-zinc-500">1 de maig de 2025</p>
                      </div>
                      <span className="font-semibold">$128.45</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Mètode de pagament</h3>
                        <p className="text-sm text-zinc-500">Visa finalitzant en 4242</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Canviar
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
