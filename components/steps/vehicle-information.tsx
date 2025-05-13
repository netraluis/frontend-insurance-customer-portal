"use client"

import type React from "react"

import { useClaimForm } from "@/components/claim-form-context"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function VehicleInformation() {
  const { formData, updateFormData } = useClaimForm()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    updateFormData({ [name]: value })
  }

  const handleCoverageChange = (value: "comprehensive" | "third-party") => {
    updateFormData({ coverageType: value })
  }

  return (
    <Card className="border-none shadow-none">
      <CardContent className="p-0 space-y-6">
        <div className="space-y-2">
          <h3 className="text-lg font-medium text-zinc-900">Detalls del vehicle</h3>
          <p className="text-sm text-zinc-500">Please provide information about your vehicle.</p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="vehicleMake">Marca del vehicle</Label>
            <Input
              id="vehicleMake"
              name="vehicleMake"
              value={formData.vehicleMake}
              onChange={handleChange}
              placeholder="e.g., Toyota, Honda, BMW"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="vehicleModel">Model del vehicle</Label>
            <Input
              id="vehicleModel"
              name="vehicleModel"
              value={formData.vehicleModel}
              onChange={handleChange}
              placeholder="e.g., Corolla, Civic, X5"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="licensePlate">Matrícula</Label>
            <Input
              id="licensePlate"
              name="licensePlate"
              value={formData.licensePlate}
              onChange={handleChange}
              placeholder="Enter license plate number"
              required
            />
          </div>
        </div>

        <div className="space-y-4">
          <Label>Tipus de cobertura</Label>
          <RadioGroup
            value={formData.coverageType}
            onValueChange={handleCoverageChange as (value: string) => void}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2"
          >
            <div className="flex items-center space-x-2 rounded-md border border-zinc-200 p-4 hover:border-zinc-300">
              <RadioGroupItem value="comprehensive" id="comprehensive" />
              <Label htmlFor="comprehensive" className="flex-1 cursor-pointer">
                A tot risc
              </Label>
            </div>
            <div className="flex items-center space-x-2 rounded-md border border-zinc-200 p-4 hover:border-zinc-300">
              <RadioGroupItem value="third-party" id="third-party" />
              <Label htmlFor="third-party" className="flex-1 cursor-pointer">
                Tercers
              </Label>
            </div>
          </RadioGroup>
        </div>
      </CardContent>
    </Card>
  )
}
