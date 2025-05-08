"use client"

import { AppSidebar } from "@/app/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList
} from "@/components/ui/breadcrumb"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { ArrowRight, Calendar, Car, ClipboardList, Folder, Heart, HomeIcon, Link, Plane } from "lucide-react"
import { ChatAssistant } from "../components/chat-assistant"
import { DocumentCard } from "../components/card-templates/document-card"
import { Button } from "@/components/ui/button"
import { ClaimCard } from "../components/claim-card"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { PolicyCard } from "../components/policy-card"
import { DashboardMetricCard } from "../components/dashboard-metric-card"

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>

        <div className="flex flex-col min-h-screen animate-in">
          <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
            <SidebarTrigger />
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-semibold">Dashboard</h1>
            </div>
            <div className="ml-auto"></div>
          </header>

          <main className="flex-1 p-6 pt-4 page-transition">
            <div className="grid gap-6">
              {/* Metrics Section */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">Welcome back, John</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <DashboardMetricCard
                    title="Active Policies"
                    value="4"
                    icon={Calendar}
                    description="All policies are active"
                    trend="stable"
                  />
                  <DashboardMetricCard
                    title="Open Claims"
                    value="1"
                    icon={ClipboardList}
                    description="1 claim in progress"
                    trend="up"
                  />
                  <DashboardMetricCard
                    title="Documents"
                    value="12"
                    icon={Folder}
                    description="2 require attention"
                    trend="up"
                  />
                  <DashboardMetricCard
                    title="Next Payment"
                    value="$248.33"
                    icon={Calendar}
                    description="Due in 14 days"
                    trend="down"
                  />
                </div>
              </section>

              {/* Policies Section */}
              <section>
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle>Your Policies</CardTitle>
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
                        <TabsTrigger value="all">All</TabsTrigger>
                        <TabsTrigger value="auto">Auto</TabsTrigger>
                        <TabsTrigger value="home">Home</TabsTrigger>
                        <TabsTrigger value="travel">Travel</TabsTrigger>
                        <TabsTrigger value="health">Health</TabsTrigger>
                      </TabsList>
                      <TabsContent value="all" className="space-y-4">
                        <PolicyCard
                          id="POL-AUTO-001"
                          title="Auto Insurance"
                          type="auto"
                          icon={Car}
                          premium="$128.45/month"
                          renewalDate="May 15, 2025"
                          status="active"
                        />
                        <PolicyCard
                          id="POL-HOME-001"
                          title="Home Insurance"
                          type="home"
                          icon={HomeIcon}
                          premium="$89.99/month"
                          renewalDate="August 22, 2025"
                          status="active"
                        />
                        <PolicyCard
                          id="POL-TRAVEL-001"
                          title="Travel Insurance"
                          type="travel"
                          icon={Plane}
                          premium="$45.00/trip"
                          renewalDate="December 10, 2025"
                          status="active"
                        />
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

              {/* Virtual Assistant Section */}
              <section>
                <Card>
                  <CardHeader>
                    <CardTitle>Virtual Assistant</CardTitle>
                    <CardDescription>Get 24/7 support for your insurance needs</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChatAssistant />
                  </CardContent>
                </Card>
              </section>
            </div>
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
