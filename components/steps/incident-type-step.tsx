"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ShieldX, GlassWater, Droplets, Scale, Flame } from "lucide-react"
import type { IncidentFormData } from "../incident-report-form"

interface IncidentTypeStepProps {
  formData: IncidentFormData
  updateFormData: (fieldName: keyof IncidentFormData, value: any) => void
}

export default function IncidentTypeStep({ formData, updateFormData }: IncidentTypeStepProps) {
  return (
    <div className="space-y-6">
      <p className="text-gray-500">Select the type of incident and provide basic details</p>

      <div className="space-y-6">
        <div className="space-y-4">
          <Label>
            Incident Type <span className="text-red-500">*</span>
          </Label>
          <RadioGroup
            value={formData.incidentType}
            onValueChange={(value) => updateFormData("incidentType", value)}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            <div
              className={`flex items-center space-x-2 rounded-lg border p-4 ${formData.incidentType === "theft" ? "border-primary bg-primary/5" : ""}`}
            >
              <RadioGroupItem value="theft" id="theft" />
              <Label htmlFor="theft" className="flex items-center cursor-pointer">
                <ShieldX className="h-5 w-5 mr-2 text-red-500" />
                <span>Theft</span>
              </Label>
            </div>

            <div
              className={`flex items-center space-x-2 rounded-lg border p-4 ${formData.incidentType === "glass" ? "border-primary bg-primary/5" : ""}`}
            >
              <RadioGroupItem value="glass" id="glass" />
              <Label htmlFor="glass" className="flex items-center cursor-pointer">
                <GlassWater className="h-5 w-5 mr-2 text-blue-500" />
                <span>Broken Glass</span>
              </Label>
            </div>

            <div
              className={`flex items-center space-x-2 rounded-lg border p-4 ${formData.incidentType === "water" ? "border-primary bg-primary/5" : ""}`}
            >
              <RadioGroupItem value="water" id="water" />
              <Label htmlFor="water" className="flex items-center cursor-pointer">
                <Droplets className="h-5 w-5 mr-2 text-cyan-500" />
                <span>Water Damage</span>
              </Label>
            </div>

            <div
              className={`flex items-center space-x-2 rounded-lg border p-4 ${formData.incidentType === "civil" ? "border-primary bg-primary/5" : ""}`}
            >
              <RadioGroupItem value="civil" id="civil" />
              <Label htmlFor="civil" className="flex items-center cursor-pointer">
                <Scale className="h-5 w-5 mr-2 text-purple-500" />
                <span>Civil Liability</span>
              </Label>
            </div>

            <div
              className={`flex items-center space-x-2 rounded-lg border p-4 ${formData.incidentType === "fire" ? "border-primary bg-primary/5" : ""}`}
            >
              <RadioGroupItem value="fire" id="fire" />
              <Label htmlFor="fire" className="flex items-center cursor-pointer">
                <Flame className="h-5 w-5 mr-2 text-orange-500" />
                <span>Fire</span>
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="incidentDate">
              Date of Incident <span className="text-red-500">*</span>
            </Label>
            <Input
              id="incidentDate"
              type="date"
              value={formData.incidentDate}
              onChange={(e) => updateFormData("incidentDate", e.target.value)}
              max={new Date().toISOString().split("T")[0]}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="incidentTime">
              Time of Incident <span className="text-red-500">*</span>
            </Label>
            <Input
              id="incidentTime"
              type="time"
              value={formData.incidentTime}
              onChange={(e) => updateFormData("incidentTime", e.target.value)}
              required
            />
          </div>
        </div>
      </div>
    </div>
  )
}
