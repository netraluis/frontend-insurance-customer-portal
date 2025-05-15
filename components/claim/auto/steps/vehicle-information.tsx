"use client"

import type React from "react"
import { Car, Bike, Truck, CarIcon as Suv, Bus, Sailboat, Tractor, HelpCircle } from "lucide-react"

import { useClaimForm } from "../claim-form-context"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function VehicleInformation() {
  const { formData, updateFormData } = useClaimForm()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    updateFormData({ [name]: value })
  }

  const handleVehicleTypeChange = (value: string) => {
    updateFormData({ vehicleType: value })
  }

  // Vehicle type options with icons
  const vehicleTypes = [
    { value: "car", label: "Car", icon: <Car className="mr-2 h-4 w-4" /> },
    { value: "motorbike", label: "Motorbike", icon: <Bike className="mr-2 h-4 w-4" /> },
    { value: "truck", label: "Truck", icon: <Truck className="mr-2 h-4 w-4" /> },
    { value: "suv", label: "SUV", icon: <Suv className="mr-2 h-4 w-4" /> },
    { value: "bus", label: "Bus", icon: <Bus className="mr-2 h-4 w-4" /> },
    { value: "boat", label: "Boat", icon: <Sailboat className="mr-2 h-4 w-4" /> },
    { value: "agricultural", label: "Agricultural Vehicle", icon: <Tractor className="mr-2 h-4 w-4" /> },
    { value: "other", label: "Other", icon: <HelpCircle className="mr-2 h-4 w-4" /> },
  ]

  return (
    <Card className="border-none shadow-none">
      <CardContent className="p-0 space-y-6">
        <div className="space-y-2">
          <h3 className="text-lg font-medium text-zinc-900">Vehicle Details</h3>
          <p className="text-sm text-zinc-500">Please provide information about your vehicle.</p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="vehicleType">Vehicle Type</Label>
            <Select value={formData.vehicleType} onValueChange={handleVehicleTypeChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select vehicle type" />
              </SelectTrigger>
              <SelectContent>
                {vehicleTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    <div className="flex items-center">
                      {type.icon}
                      <span>{type.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="vehicleMake">Vehicle Make</Label>
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
            <Label htmlFor="vehicleModel">Vehicle Model</Label>
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
            <Label htmlFor="licensePlate">License Plate</Label>
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
      </CardContent>
    </Card>
  )
}
