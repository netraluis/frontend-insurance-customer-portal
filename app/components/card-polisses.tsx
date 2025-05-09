"use client"

import type React from "react"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { ArrowRight, Car} from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface CardPolissesProps {
  type: string
  icon?: React.ReactNode
  policyNumber: string
  coverage: string
  expiryDate: string
  status: "active" | "inactive" | "pending"
  onViewDetails?: () => void
}

export function CardPolisses({
  type,
  icon = <Car className="h-7 w-7" />,
  policyNumber,
  coverage,
  expiryDate,
  status,
  onViewDetails = () => {},
}: CardPolissesProps) {
  return (
    <Link href={`/dashboard/policies/detail/${policyNumber}`}>
    <Card className="w-99 h-80 overflow-hidden border border-zinc-200">
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-zinc-100">{icon}</div>
            <h3 className="text-2xl font-semibold text-zinc-900">{type}</h3>
          </div>
          <div
            className={`rounded-full bg-green-100 px-4 py-1 text-sm font-medium text-black ${status !== "active" && "bg-zinc-200 text-zinc-700"}`}
          >
            {status}
          </div>
        </div>

        <div className="mt-4 text-sm text-zinc-500">{policyNumber}</div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm font-medium text-zinc-500">Coverage</div>
            <div className="mt-1 text-xl font-semibold text-zinc-900">{coverage}</div>
          </div>
          <div>
            <div className="text-sm font-medium text-zinc-500">Expires</div>
            <div className="mt-1 text-xl font-semibold text-zinc-900">{expiryDate}</div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t border-zinc-100 p-0">
        <button
          type="button"
          className="w-full rounded-none py-4 text-center font-medium text-zinc-900 hover:bg-zinc-50 transition-colors"
          
        >
          View Details
        </button>
      </CardFooter>
    </Card>
    </Link> 
  )
}
