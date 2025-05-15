"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { IncidentFormData } from "../incident-report-form"

interface IncidentDetailsStepProps {
  formData: IncidentFormData
  updateFormData: (fieldName: keyof IncidentFormData, value: any) => void
}

export default function IncidentDetailsStep({ formData, updateFormData }: IncidentDetailsStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2">Incident Details</h2>
        <p className="text-gray-500">Please provide information about when and where the incident occurred</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="incidentType">
            Type of Incident <span className="text-red-500">*</span>
          </Label>
          <Select value={formData.incidentType} onValueChange={(value) => updateFormData("incidentType", value)}>
            <SelectTrigger id="incidentType">
              <SelectValue placeholder="Select incident type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="theft">Theft</SelectItem>
              <SelectItem value="damage">Property Damage</SelectItem>
              <SelectItem value="fire">Fire</SelectItem>
              <SelectItem value="water">Water Damage</SelectItem>
              <SelectItem value="vehicle">Vehicle Accident</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
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

        <div className="space-y-2">
          <Label htmlFor="incidentLocation">
            Location of Incident <span className="text-red-500">*</span>
          </Label>
          <Input
            id="incidentLocation"
            placeholder="123 Main St, Apartment 4B, New York, NY 10001"
            value={formData.incidentLocation}
            onChange={(e) => updateFormData("incidentLocation", e.target.value)}
            required
          />
        </div>
      </div>
    </div>
  )
}
