"use client"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { IncidentFormData } from "../incident-report-form"

interface FireDetailsStepProps {
  formData: IncidentFormData
  updateFormData: (fieldName: keyof IncidentFormData, value: any) => void
  updateMultipleFields: (fields: Partial<IncidentFormData>) => void
}

export default function FireDetailsStep({ formData, updateFormData, updateMultipleFields }: FireDetailsStepProps) {
  return (
    <div className="space-y-6">
      <p className="text-gray-500">Please provide specific details about the fire incident</p>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="fireCause">
            Nature of the sinister event <span className="text-red-500">*</span>
          </Label>
          <Select value={formData.fireCause} onValueChange={(value) => updateFormData("fireCause", value)}>
            <SelectTrigger id="fireCause">
              <SelectValue placeholder="Select the most accurate option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fire">Fire</SelectItem>
              <SelectItem value="explosion">Explosion</SelectItem>
              <SelectItem value="household_accident">Household Accident</SelectItem>
              <SelectItem value="electrical_accident">Electrical Accident</SelectItem>
              <SelectItem value="car_crash">Car Crash</SelectItem>
              <SelectItem value="water_damage_for_storm">Water Damage for Storm</SelectItem>
              <SelectItem value="severe_weather">Severe Weather</SelectItem>
              <SelectItem value="liability_fire">Liability for Fire Damage</SelectItem>
              <SelectItem value="recharge_extinguisher">Recharge Extinguisher</SelectItem>
              <SelectItem value="natural_disaster">Natural Disaster</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
            <Label htmlFor="firefightersIntervened" className="cursor-pointer">
              Did firefighters intervene?
            </Label>
            <Switch
              id="firefightersIntervened"
              checked={formData.firefightersIntervened}
              onCheckedChange={(checked) => updateFormData("firefightersIntervened", checked)}
            />
          </div>

          <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
            <Label htmlFor="fireExtinguisherUsed" className="cursor-pointer">
              Did the police intervene?
            </Label>
            <Switch
              id="fireExtinguisherUsed"
              checked={formData.fireExtinguisherUsed}
              onCheckedChange={(checked) => updateFormData("fireExtinguisherUsed", checked)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="affectedItems">
            Please describe what happened <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="affectedItems"
            placeholder="Please describe what exactly happened, what was damaged and where it started"
            value={formData.affectedItems}
            onChange={(e) => updateFormData("affectedItems", e.target.value)}
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
                rows={3}
                required
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
