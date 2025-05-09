"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ListItemCard, ListItemCardSkeleton } from "@/components/card-templates"
import { Car, HomeIcon, ArrowRight } from "lucide-react"
import Link from "next/link"

// Mock policy data
const policies = [
  {
    id: "POL-AUTO-001",
    title: "Auto Insurance",
    subtitle: "Policy #POL-AUTO-001",
    icon: Car,
    badge: { text: "Active", variant: "outline", className: "bg-green-100 text-green-700" },
    details: [
      { label: "Premium", value: "$128.45/month" },
      { label: "Renewal", value: "May 15, 2025" },
    ],
  },
  {
    id: "POL-HOME-001",
    title: "Home Insurance",
    subtitle: "Policy #POL-HOME-001",
    icon: HomeIcon,
    badge: { text: "Active", variant: "outline", className: "bg-green-100 text-green-700" },
    details: [
      { label: "Premium", value: "$89.99/month" },
      { label: "Renewal", value: "August 22, 2025" },
    ],
  },
]

export function PolicyListWithLoading() {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState<typeof policies>([])

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setData(policies)
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Your Policies</h2>

      {isLoading ? (
        // Show skeleton loading states while loading
        <>
          <ListItemCardSkeleton />
          <ListItemCardSkeleton />
        </>
      ) : (
        // Show actual content when loaded
        data.map((policy) => (
          <ListItemCard
            key={policy.id}
            title={policy.title}
            subtitle={policy.subtitle}
            icon={policy.icon}
            badge={policy.badge}
            details={policy.details}
            actions={
              <Button variant="ghost" size="sm" className="gap-1" asChild>
                <Link href={`/dashboard/policies/detail/${policy.id}`}>
                  View Details
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </Button>
            }
          />
        ))
      )}
    </div>
  )
}
