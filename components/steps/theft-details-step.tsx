"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import type { IncidentFormData } from "../incident-report-form"

interface TheftDetailsStepProps {
  formData: IncidentFormData
  updateFormData: (fieldName: keyof IncidentFormData, value: any) => void
  updateMultipleFields: (fields: Partial<IncidentFormData>) => void
}

export default function TheftDetailsStep({ formData, updateFormData, updateMultipleFields }: TheftDetailsStepProps) {
  const theftMethods = [
    { id: "breaking", label: "Breaking (forced entry)" },
    { id: "climbing", label: "Climbing/Scaling" },
    { id: "keys", label: "Key falsification" },
    { id: "other", label: "Other method" },
  ]

  const handleTheftMethodChange = (checked: boolean, value: string) => {
    if (checked) {
      updateFormData("theftMethod", [...formData.theftMethod, value])
    } else {
      updateFormData(
        "theftMethod",
        formData.theftMethod.filter((method) => method !== value),
      )
    }
  }

  return (
    <div className="space-y-6">
      <p className="text-gray-500">Please provide specific details about the theft incident</p>

      <div className="space-y-6">
        <div className="space-y-3">
          <Label>
            How was the theft committed? <span className="text-red-500">*</span>
          </Label>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {theftMethods.map((method) => (
              <div key={method.id} className="flex items-center space-x-2">
                <Checkbox
                  id={method.id}
                  checked={formData.theftMethod.includes(method.id)}
                  onCheckedChange={(checked: boolean) => handleTheftMethodChange(checked, method.id)}
                />
                <Label htmlFor={method.id} className="cursor-pointer">
                  {method.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
            <Label htmlFor="wasPropertyOccupied" className="cursor-pointer">
              Was the property occupied during the theft?
            </Label>
            <Switch
              id="wasPropertyOccupied"
              checked={formData.wasPropertyOccupied}
              onCheckedChange={(checked) => updateFormData("wasPropertyOccupied", checked)}
            />
          </div>

          <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
            <Label htmlFor="isCommercialProperty" className="cursor-pointer">
              Is this a commercial property?
            </Label>
            <Switch
              id="isCommercialProperty"
              checked={formData.isCommercialProperty}
              onCheckedChange={(checked) => updateFormData("isCommercialProperty", checked)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="stolenItems">
            List of stolen items <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="stolenItems"
            placeholder="Please list all stolen items with descriptions"
            value={formData.stolenItems}
            onChange={(e) => updateFormData("stolenItems", e.target.value)}
            rows={3}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="estimatedValue">
            Estimated value of stolen items ($) <span className="text-red-500">*</span>
          </Label>
          <Input
            id="estimatedValue"
            placeholder="1000"
            value={formData.estimatedValue}
            onChange={(e) => updateFormData("estimatedValue", e.target.value)}
            required
          />
        </div>

        <div className="space-y-4 pt-4 border-t">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="policeReportFiled">Police Report Filed</Label>
              <p className="text-sm text-gray-500">Have you filed a police report for this incident?</p>
            </div>
            <Switch
              id="policeReportFiled"
              checked={formData.policeReportFiled}
              onCheckedChange={(checked) => {
                updateMultipleFields({
                  policeReportFiled: checked,
                  policeReportNumber: checked ? formData.policeReportNumber : "",
                })
              }}
            />
          </div>

          {formData.policeReportFiled && (
            <div className="space-y-2">
              <Label htmlFor="policeReportNumber">
                Police Report Number <span className="text-red-500">*</span>
              </Label>
              <Input
                id="policeReportNumber"
                placeholder="e.g., RP-12345-2023"
                value={formData.policeReportNumber}
                onChange={(e) => updateFormData("policeReportNumber", e.target.value)}
                required
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
