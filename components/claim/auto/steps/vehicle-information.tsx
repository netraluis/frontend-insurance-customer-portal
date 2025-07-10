"use client"

import type React from "react"
import { Car, Bike, Truck, Bus, Sailboat, Tractor, HelpCircle } from "lucide-react"
import { useTranslations } from 'next-intl'

import { useClaimForm } from "../claim-form-context"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function VehicleInformation() {
  const { formData, updateFormData } = useClaimForm()
  const tVehicle = useTranslations('ClaimAuto.VehicleInformationForm')
  const tType = useTranslations('ClaimAuto.vehicleType')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    updateFormData({ [name]: value })
  }

  const handleVehicleTypeChange = (value: string) => {
    updateFormData({ vehicleType: value })
  }

  // Vehicle type options with icons
  const vehicleTypes = [
    { value: "car", label: tType("car"), icon: <Car className="mr-2 h-4 w-4" /> },
    { value: "motorbike", label: tType("motorbike"), icon: <Bike className="mr-2 h-4 w-4" /> },
    { value: "truck", label: tType("truck"), icon: <Truck className="mr-2 h-4 w-4" /> },
    { value: "bus", label: tType("bus"), icon: <Bus className="mr-2 h-4 w-4" /> },
    { value: "boat", label: tType("boat"), icon: <Sailboat className="mr-2 h-4 w-4" /> },
    { value: "agricultural", label: tType("agricultural"), icon: <Tractor className="mr-2 h-4 w-4" /> },
    { value: "other", label: tType("other"), icon: <HelpCircle className="mr-2 h-4 w-4" /> },
  ]

  return (
    <Card className="border-none shadow-none">
      <CardContent className="p-0 space-y-6">
        <div className="space-y-2">
          <h3 className="text-lg font-medium text-zinc-900">{tVehicle('title')}</h3>
          <p className="text-sm text-zinc-500">{tVehicle('description')}</p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="vehicleType">{tVehicle('vehicleType')}<span className="text-destructive">*</span></Label>
            <Select value={formData.vehicleType} onValueChange={handleVehicleTypeChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={tVehicle('vehicleTypePlaceholder')} />
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
            <Label htmlFor="vehicleMake">{tVehicle('vehicleMake')}<span className="text-destructive">*</span></Label>
            <Input
              id="vehicleMake"
              name="vehicleMake"
              value={formData.vehicleMake}
              onChange={handleChange}
              placeholder={tVehicle('vehicleMakePlaceholder')}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="vehicleModel">{tVehicle('vehicleModel')}<span className="text-destructive">*</span></Label>
            <Input
              id="vehicleModel"
              name="vehicleModel"
              value={formData.vehicleModel}
              onChange={handleChange}
              placeholder={tVehicle('vehicleModelPlaceholder')}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="licensePlate">{tVehicle('licensePlate')}<span className="text-destructive">*</span></Label>
            <Input
              id="licensePlate"
              name="licensePlate"
              value={formData.licensePlate}
              onChange={handleChange}
              placeholder={tVehicle('licensePlatePlaceholder')}
              required
            />
          </div>
          {/* TODO: Add vehicle year */}
{/* 
          <div className="space-y-2">
            <Label htmlFor="accidentDescription">{tAccident('descriptionLabel')}<span className="text-destructive">*</span></Label>
            <Textarea
              id="accidentDescription"
              name="accidentDescription"
              value={formData.accidentDescription}
              onChange={handleChange}
              placeholder={tAccident('descriptionPlaceholder')}
              rows={isMobile ? 4 : 5}
              required
            />
          </div> */}
        </div>
      </CardContent>
    </Card>
  )
}
