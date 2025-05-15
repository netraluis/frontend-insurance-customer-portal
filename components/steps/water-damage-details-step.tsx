"use client"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { IncidentFormData } from "../incident-report-form"

interface WaterDamageDetailsStepProps {
  formData: IncidentFormData
  updateFormData: (fieldName: keyof IncidentFormData, value: any) => void
  updateMultipleFields: (fields: Partial<IncidentFormData>) => void
}

export default function WaterDamageDetailsStep({
  formData,
  updateFormData,
  updateMultipleFields,
}: WaterDamageDetailsStepProps) {
  const affectedAreaOptions = [
    { id: "floor", label: "Floor/Carpet" },
    { id: "walls", label: "Walls" },
    { id: "ceiling", label: "Ceiling" },
    { id: "furniture", label: "Furniture" },
    { id: "appliances", label: "Appliances" },
    { id: "electronics", label: "Electronics" },
    { id: "personal", label: "Personal belongings" },
  ]

  const handleAffectedAreaChange = (checked: boolean, value: string) => {
    if (checked) {
      updateFormData("affectedAreas", [...formData.affectedAreas, value])
    } else {
      updateFormData(
        "affectedAreas",
        formData.affectedAreas.filter((area) => area !== value),
      )
    }
  }

  return (
    <div className="space-y-6">
      <p className="text-gray-500">Please provide specific details about the water damage incident</p>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="waterSource">
            Source of Water Damage <span className="text-red-500">*</span>
          </Label>
          <Select value={formData.waterSource} onValueChange={(value) => updateFormData("waterSource", value)}>
            <SelectTrigger id="waterSource">
              <SelectValue placeholder="Select water source" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pipe">Burst/Leaking Pipe</SelectItem>
              <SelectItem value="appliance">Appliance Malfunction</SelectItem>
              <SelectItem value="roof">Roof Leak</SelectItem>
              <SelectItem value="flood">Flooding</SelectItem>
              <SelectItem value="storm">Storm/Rain</SelectItem>
              <SelectItem value="neighbor">Neighbor's Property</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <Label>
            Areas Affected <span className="text-red-500">*</span>
          </Label>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {affectedAreaOptions.map((area) => (
              <div key={area.id} className="flex items-center space-x-2">
                <Checkbox
                  id={area.id}
                  checked={formData.affectedAreas.includes(area.id)}
                  onCheckedChange={(checked: boolean) => handleAffectedAreaChange(checked, area.id)}
                />
                <Label htmlFor={area.id} className="cursor-pointer">
                  {area.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
            <Label htmlFor="isStormRelated" className="cursor-pointer">
              Is the damage related to a storm?
            </Label>
            <Switch
              id="isStormRelated"
              checked={formData.isStormRelated}
              onCheckedChange={(checked) => updateFormData("isStormRelated", checked)}
            />
          </div>

          <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
            <Label htmlFor="neighborProperty" className="cursor-pointer">
              Did the water come from a neighboring property?
            </Label>
            <Switch
              id="neighborProperty"
              checked={formData.neighborProperty}
              onCheckedChange={(checked) => updateFormData("neighborProperty", checked)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="waterDamageExtent">
            Extent of Water Damage <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="waterDamageExtent"
            placeholder="Please describe the extent of the water damage (e.g., depth of water, area covered, duration of exposure)"
            value={formData.waterDamageExtent}
            onChange={(e) => updateFormData("waterDamageExtent", e.target.value)}
            rows={3}
            required
          />
        </div>

        <div className="space-y-4 pt-4 border-t">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="bodilyInjuries">Bodily Injuries</Label>
              <p className="text-sm text-gray-500">Were there any injuries related to this incident?</p>
            </div>
            <Switch
              id="bodilyInjuries"
              checked={formData.bodilyInjuries}
              onCheckedChange={(checked) => {
                updateMultipleFields({
                  bodilyInjuries: checked,
                  injuryDetails: checked ? formData.injuryDetails : "",
                })
              }}
            />
          </div>

          {formData.bodilyInjuries && (
            <div className="space-y-2">
              <Label htmlFor="injuryDetails">
                Injury Details <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="injuryDetails"
                placeholder="Please describe the injuries"
                value={formData.injuryDetails}
                onChange={(e) => updateFormData("injuryDetails", e.target.value)}
                rows={2}
                required
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
