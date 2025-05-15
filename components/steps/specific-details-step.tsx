"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { IncidentFormData } from "../incident-report-form"

interface SpecificDetailsStepProps {
  formData: IncidentFormData
  updateFormData: (fieldName: keyof IncidentFormData, value: any) => void
}

export default function SpecificDetailsStep({ formData, updateFormData }: SpecificDetailsStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2">Specific Details</h2>
        <p className="text-gray-500">Please provide specific information about what was affected</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="itemsAffected">
            Items Affected <span className="text-red-500">*</span>
          </Label>
          <Input
            id="itemsAffected"
            placeholder="e.g., Laptop, Jewelry, Furniture"
            value={formData.itemsAffected}
            onChange={(e) => updateFormData("itemsAffected", e.target.value)}
            required
          />
          <p className="text-xs text-gray-500">List the main items that were stolen or damaged</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="estimatedValue">
            Estimated Value ($) <span className="text-red-500">*</span>
          </Label>
          <Input
            id="estimatedValue"
            placeholder="1000"
            value={formData.estimatedValue}
            onChange={(e) => updateFormData("estimatedValue", e.target.value)}
            required
          />
          <p className="text-xs text-gray-500">Approximate total value of affected items in USD</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="incidentDescription">
            Detailed Description <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="incidentDescription"
            placeholder="Please describe in detail what happened, including any relevant circumstances..."
            value={formData.incidentDescription}
            onChange={(e) => updateFormData("incidentDescription", e.target.value)}
            rows={5}
            required
          />
          <p className="text-xs text-gray-500">
            Include as much detail as possible about how the incident occurred and what was affected
          </p>
        </div>
      </div>
    </div>
  )
}
