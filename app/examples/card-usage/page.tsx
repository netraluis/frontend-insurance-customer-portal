import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { BasicCard, MetricCard, ListItemCard, DocumentCard, StatusCard } from "@/app/components/card-templates"
import {
  Car,
  HomeIcon,
  FileText,
  ClipboardList,
  Calendar,
  ArrowRight,
  Download,
  Eye,
  MoreHorizontal,
} from "lucide-react"
import Link from "next/link"

export default function CardUsageExample() {
  return (
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
          <section>
            <h2 className="text-2xl font-semibold mb-4">Welcome back, John</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <MetricCard
                title="Active Policies"
                value="4"
                icon={FileText}
                description="All policies are active"
                trend="stable"
              />
              <MetricCard
                title="Open Claims"
                value="1"
                icon={ClipboardList}
                description="1 claim in progress"
                trend="up"
                trendValue="1"
              />
              <MetricCard
                title="Documents"
                value="12"
                icon={FileText}
                description="2 require attention"
                trend="up"
                trendValue="2"
              />
              <MetricCard
                title="Next Payment"
                value="$248.33"
                icon={Calendar}
                description="Due in 14 days"
                trend="down"
                trendValue="14 days"
              />
            </div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <section className="lg:col-span-2">
              <BasicCard
                title="Your Policies"
                description="Overview of your active insurance policies"
                headerAction={
                  <Button variant="ghost" size="sm" asChild>
                    <a href="/policies">
                      View All
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                }
                className="h-full"
              >
                <div className="space-y-4">
                  <ListItemCard
                    title="Auto Insurance"
                    subtitle="Policy #POL-AUTO-001"
                    icon={Car}
                    badge={{ text: "Active", variant: "outline", className: "bg-green-100 text-green-700" }}
                    details={[
                      { label: "Premium", value: "$128.45/month" },
                      { label: "Renewal", value: "May 15, 2025" },
                    ]}
                    actions={
                      <Button variant="ghost" size="sm" className="gap-1" asChild>
                        <Link href="/dashboard/policies/detail/POL-AUTO-001">
                          View Details
                          <ArrowRight className="ml-1 h-3 w-3" />
                        </Link>
                      </Button>
                    }
                  />

                  <ListItemCard
                    title="Home Insurance"
                    subtitle="Policy #POL-HOME-001"
                    icon={HomeIcon}
                    badge={{ text: "Active", variant: "outline", className: "bg-green-100 text-green-700" }}
                    details={[
                      { label: "Premium", value: "$89.99/month" },
                      { label: "Renewal", value: "August 22, 2025" },
                    ]}
                    actions={
                      <Button variant="ghost" size="sm" className="gap-1" asChild>
                        <Link href="/dashboard/policies/detail/POL-HOME-001">
                          View Details
                          <ArrowRight className="ml-1 h-3 w-3" />
                        </Link>
                      </Button>
                    }
                  />
                </div>
              </BasicCard>
            </section>

            <section>
              <BasicCard
                title="Recent Claims"
                description="Status of your recent insurance claims"
                headerAction={
                  <Button variant="ghost" size="sm" asChild>
                    <a href="/claims">
                      View All
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                }
                className="h-full"
              >
                <div className="space-y-4">
                  <StatusCard
                    title="Auto Accident Claim"
                    subtitle="Claim #CLM-001"
                    status="in-progress"
                    progress={65}
                    details={[
                      { label: "Filed", value: "April 10, 2025" },
                      { label: "Amount", value: "$3,450.00" },
                    ]}
                    actions={
                      <Button variant="ghost" size="sm" className="gap-1" asChild>
                        <a href="/claims/detail/CLM-001">
                          View Details
                          <ArrowRight className="ml-1 h-3 w-3" />
                        </a>
                      </Button>
                    }
                  />

                  <StatusCard
                    title="Water Damage Claim"
                    subtitle="Claim #CLM-002"
                    status="completed"
                    progress={100}
                    details={[
                      { label: "Filed", value: "March 5, 2025" },
                      { label: "Amount", value: "$2,800.00" },
                    ]}
                    actions={
                      <Button variant="ghost" size="sm" className="gap-1" asChild>
                        <a href="/claims/detail/CLM-002">
                          View Details
                          <ArrowRight className="ml-1 h-3 w-3" />
                        </a>
                      </Button>
                    }
                  />
                </div>
              </BasicCard>
            </section>
          </div>

          <section>
            <BasicCard
              title="Recent Documents"
              description="Your most recent insurance documents"
              headerAction={
                <Button variant="ghost" size="sm" asChild>
                  <a href="/documents">
                    View All
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              }
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <DocumentCard
                  title="Auto Insurance Policy"
                  fileType="PDF"
                  fileSize="1.2 MB"
                  date="April 15, 2025"
                  category="Policy Document"
                  tags={["auto", "policy"]}
                  actions={
                    <>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">Preview</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Download className="h-4 w-4" />
                        <span className="sr-only">Download</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">More options</span>
                      </Button>
                    </>
                  }
                />

                <DocumentCard
                  title="Auto Claim Report"
                  fileType="PDF"
                  fileSize="0.8 MB"
                  date="April 10, 2025"
                  category="Claim Document"
                  tags={["auto", "claim"]}
                  actions={
                    <>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">Preview</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Download className="h-4 w-4" />
                        <span className="sr-only">Download</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">More options</span>
                      </Button>
                    </>
                  }
                />

                <DocumentCard
                  title="Payment Receipt"
                  fileType="PDF"
                  fileSize="0.3 MB"
                  date="April 1, 2025"
                  category="Billing Document"
                  tags={["payment", "receipt"]}
                  actions={
                    <>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">Preview</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Download className="h-4 w-4" />
                        <span className="sr-only">Download</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">More options</span>
                      </Button>
                    </>
                  }
                />
              </div>
            </BasicCard>
          </section>
        </div>
      </main>
    </div>
  )
}
