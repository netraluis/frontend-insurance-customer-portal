"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { IncidentFormData } from "../incident-report-form"

interface GlassDetailsStepProps {
  formData: IncidentFormData
  updateFormData: (fieldName: keyof IncidentFormData, value: any) => void
  updateMultipleFields: (fields: Partial<IncidentFormData>) => void
}

export default function GlassDetailsStep({ formData, updateFormData, updateMultipleFields }: GlassDetailsStepProps) {
  const handleDimensionChange = (dimension: "width" | "height", value: string) => {
    updateFormData("glassDimensions", {
      ...formData.glassDimensions,
      [dimension]: value,
    })
  }

  return (
    <div className="space-y-6">
      <p className="text-gray-500">Please provide specific details about the broken glass</p>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="glassType">
            Type of Glass <span className="text-red-500">*</span>
          </Label>
          <Select value={formData.glassType} onValueChange={(value) => updateFormData("glassType", value)}>
            <SelectTrigger id="glassType">
              <SelectValue placeholder="Select glass type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="window">Window</SelectItem>
              <SelectItem value="door">Door Glass</SelectItem>
              <SelectItem value="mirror">Mirror</SelectItem>
              <SelectItem value="table">Table Top</SelectItem>
              <SelectItem value="cabinet">Cabinet/Display Case</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>
            Glass Dimensions (cm) <span className="text-red-500">*</span>
          </Label>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="glassWidth">Width</Label>
              <Input
                id="glassWidth"
                placeholder="Width in cm"
                value={formData.glassDimensions.width}
                onChange={(e) => handleDimensionChange("width", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="glassHeight">Height</Label>
              <Input
                id="glassHeight"
                placeholder="Height in cm"
                value={formData.glassDimensions.height}
                onChange={(e) => handleDimensionChange("height", e.target.value)}
                required
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="glassLocation">
            Location of the Glass <span className="text-red-500">*</span>
          </Label>
          <Input
            id="glassLocation"
            placeholder="e.g., Front window, Bathroom mirror"
            value={formData.glassLocation}
            onChange={(e) => updateFormData("glassLocation", e.target.value)}
            required
          />
        </div>

        <div className="space-y-4 pt-4 border-t">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="emergencyServicesCalled">Emergency Services Called</Label>
              <p className="text-sm text-gray-500">Were emergency services called due to the broken glass?</p>
            </div>
            <Switch
              id="emergencyServicesCalled"
              checked={formData.emergencyServicesCalled}
              onCheckedChange={(checked) => updateFormData("emergencyServicesCalled", checked)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="additionalNotes">Additional Notes</Label>
          <Textarea
            id="additionalNotes"
            placeholder="Please provide any additional details about the broken glass incident"
            value={formData.additionalNotes}
            onChange={(e) => updateFormData("additionalNotes", e.target.value)}
            rows={3}
          />
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-medium mb-2">Glass Sketch</h3>
          <p className="text-sm text-gray-500 mb-2">
            If possible, please upload a sketch or photo of the broken glass in the Documentation step.
          </p>
          <div className="border border-dashed border-gray-300 p-2 rounded-md">
            <div className="grid grid-cols-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="border-r border-gray-300 h-6 last:border-r-0"></div>
              ))}
            </div>
            {[...Array(5)].map((_, i) => (
              <div key={i} className="grid grid-cols-6 border-b border-gray-300 h-6 last:border-b-0">
                {[...Array(6)].map((_, j) => (
                  <div key={j} className="border-r border-gray-300 h-6 last:border-r-0"></div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
