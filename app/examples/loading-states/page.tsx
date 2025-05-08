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
} from "@/components/card-templates"
import { PolicyListWithLoading } from "@/components/examples/policy-list-with-loading"
import { FileText, Download, Eye, MoreHorizontal, Calendar, DollarSign } from "lucide-react"

export default function LoadingStatesExamplePage() {
  const [isLoading, setIsLoading] = useState(true)

  const toggleLoading = () => {
    setIsLoading(!isLoading)
  }

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Loading States Example</h1>
        <Button onClick={toggleLoading}>{isLoading ? "Show Content" : "Show Loading States"}</Button>
      </div>

      <div className="grid gap-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Dashboard Metrics</h2>
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
                  title="Active Policies"
                  value="4"
                  icon={FileText}
                  description="All policies are active"
                  trend="stable"
                />
                <MetricCard
                  title="Open Claims"
                  value="1"
                  icon={FileText}
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
              </>
            )}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Policy List</h2>
          <PolicyListWithLoading />
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Recent Claims</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {isLoading ? (
              <>
                <StatusCardSkeleton />
                <StatusCardSkeleton />
              </>
            ) : (
              <>
                <StatusCard
                  title="Auto Accident Claim"
                  subtitle="Claim #CLM-001"
                  status="in-progress"
                  progress={65}
                  details={[
                    { label: "Filed", value: "April 10, 2025", icon: Calendar },
                    { label: "Amount", value: "$3,450.00", icon: DollarSign },
                  ]}
                  description="Collision damage to front bumper and hood"
                  actions={
                    <Button variant="ghost" size="sm" className="gap-1">
                      View Details
                    </Button>
                  }
                />
                <StatusCard
                  title="Water Damage Claim"
                  subtitle="Claim #CLM-002"
                  status="completed"
                  progress={100}
                  details={[
                    { label: "Filed", value: "March 5, 2025", icon: Calendar },
                    { label: "Amount", value: "$2,800.00", icon: DollarSign },
                  ]}
                  description="Water damage from burst pipe in basement"
                  actions={
                    <Button variant="ghost" size="sm" className="gap-1">
                      View Details
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
