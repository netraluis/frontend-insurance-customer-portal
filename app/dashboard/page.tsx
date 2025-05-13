"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, Calendar, Car, ClipboardList, Folder, Heart, HomeIcon, Link, Plane } from "lucide-react"
import { DocumentCard } from "../../components/card-templates/document-card"
import { Button } from "@/components/ui/button"
import { ClaimCard } from "../../components/claim-card"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { PolicyCard } from "../../components/policy-card"
import { DashboardMetricCard } from "../../components/dashboard-metric-card"
import { CardPolisses } from "../../components/card-polisses"
import { SidebarTrigger } from "@/components/ui/sidebar"

export default function Page() {
  return (
    
    <div className="flex flex-col min-h-screen animate-in">
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
      <SidebarTrigger />
      <div className="flex items-center gap-2">
        <h1 className="text-xl font-semibold">Inici</h1>
      </div>
      <div className="ml-auto"></div>
    </header>
    <main className="flex-1 p-6 pt-4 page-transition">
      <div className="grid gap-6">
        {/* Metrics Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Hola Anton</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Aquí puedes ver tus polizas, reclamos y documentos.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <DashboardMetricCard
              title="Pòlisses actives"
              value="4"
              icon={Calendar}
              description="+1 que l'any passat"
            />
            <DashboardMetricCard
              title="Sinistres oberts"
              value="1"
              icon={ClipboardList}
              description="-2 que l'anys passat"
            />
            <DashboardMetricCard
              title="Pròxim pagament"
              value="$876,43"
              icon={Folder}
              description="En 15 dies"
            />
            <DashboardMetricCard
              title="Pròxima renovació"
              value="18 jul"
              icon={Calendar}
              description="#AUTO-2023-45678"
            />
          </div>
        </section>

        {/* Policies Section */}
        <section>
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>Pòlisses</CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/policies">
                    View All
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <CardDescription>Overview of your active insurance policies</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all">
                <TabsList className="mb-4">
                  <TabsTrigger value="all">Recents</TabsTrigger>
                  <TabsTrigger value="auto">Caducitat</TabsTrigger>
                </TabsList>
                <TabsContent value="all" className="space-y-4">
                  <div className="flex flex-wrap gap-4 items-top bg-white justify-left">

                    <CardPolisses
                      type="home"
                      policyNumber="1234567890"
                      coverage="100,000"
                      expiryDate="2025-05-15"
                      status="active"
                    />
                    <CardPolisses
                      type="home"
                      policyNumber="1234567890"
                      coverage="100,000"
                      expiryDate="2025-05-15"
                      status="active"
                    />
                    <CardPolisses
                      type="home"
                      policyNumber="1234567890"
                      coverage="100,000"
                      expiryDate="2025-05-15"
                      status="active"
                    />
                    <CardPolisses
                      type="home"
                      policyNumber="1234567890"
                      coverage="100,000"
                      expiryDate="2025-05-15"
                      status="active"
                    />


                  </div>
                </TabsContent>
                <TabsContent value="auto" className="space-y-4">
                  <PolicyCard
                    id="POL-AUTO-001"
                    title="Auto Insurance"
                    type="auto"
                    icon={Car}
                    premium="$128.45/month"
                    renewalDate="May 15, 2025"
                    status="active"
                  />
                </TabsContent>
                <TabsContent value="home" className="space-y-4">
                  <PolicyCard
                    id="POL-HOME-001"
                    title="Home Insurance"
                    type="home"
                    icon={HomeIcon}
                    premium="$89.99/month"
                    renewalDate="August 22, 2025"
                    status="active"
                  />
                </TabsContent>
                <TabsContent value="travel" className="space-y-4">
                  <PolicyCard
                    id="POL-TRAVEL-001"
                    title="Travel Insurance"
                    type="travel"
                    icon={Plane}
                    premium="$45.00/trip"
                    renewalDate="December 10, 2025"
                    status="active"
                  />
                </TabsContent>
                <TabsContent value="health" className="space-y-4">
                  <PolicyCard
                    id="POL-HEALTH-001"
                    title="Health Insurance"
                    type="health"
                    icon={Heart}
                    premium="$210.50/month"
                    renewalDate="February 28, 2026"
                    status="active"
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </section>

        {/* Claims Section - Now a full-width block */}
        <section>
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>Recent Claims</CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/claims">
                    View All
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <CardDescription>Status of your recent insurance claims</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <ClaimCard
                  id="CLM-001"
                  title="Auto Accident Claim"
                  date="April 10, 2025"
                  status="in-progress"
                  progress={65}
                  policyId="POL-AUTO-001"
                  amount="$3,450.00"
                />
                <ClaimCard
                  id="CLM-002"
                  title="Water Damage Claim"
                  date="March 5, 2025"
                  status="completed"
                  progress={100}
                  policyId="POL-HOME-001"
                  amount="$2,800.00"
                />
                <ClaimCard
                  id="CLM-003"
                  title="Medical Expense Claim"
                  date="February 18, 2025"
                  status="completed"
                  progress={100}
                  policyId="POL-HEALTH-001"
                  amount="$1,250.00"
                />
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Documents Section */}
        <section>
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>Recent Documents</CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/documents">
                    View All
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <CardDescription>Your most recent insurance documents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <DocumentCard
                  title="Auto Insurance Policy"
                  date="April 15, 2025"
                  fileSize="1.2 MB"
                  fileType="PDF"
                />
                <DocumentCard
                  title="Home Insurance Policy"
                  date="April 10, 2025"
                  fileSize="1.5 MB"
                  fileType="PDF"
                />
                <DocumentCard
                  title="Auto Claim Report"
                  date="April 10, 2025"
                  fileSize="0.8 MB"
                  fileType="PDF"
                />
                <DocumentCard
                  title="Payment Receipt"
                  date="April 1, 2025"
                  fileSize="0.3 MB"
                  fileType="PDF"
                />
              </div>
            </CardContent>
          </Card>
        </section>

        
      </div>
    </main>
    </div>
  )
}
