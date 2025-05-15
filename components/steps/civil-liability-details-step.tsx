"use client"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Trash } from "lucide-react"
import type { IncidentFormData } from "../incident-report-form"

interface CivilLiabilityDetailsStepProps {
  formData: IncidentFormData
  updateFormData: (fieldName: keyof IncidentFormData, value: any) => void
  updateMultipleFields: (fields: Partial<IncidentFormData>) => void
}

export default function CivilLiabilityDetailsStep({
  formData,
  updateFormData,
  updateMultipleFields,
}: CivilLiabilityDetailsStepProps) {
  const addInvolvedParty = () => {
    updateFormData("involvedParties", [...formData.involvedParties, { name: "", contact: "", relationship: "" }])
  }

  const updateInvolvedParty = (index: number, field: "name" | "contact" | "relationship", value: string) => {
    const updatedParties = [...formData.involvedParties]
    updatedParties[index][field] = value
    updateFormData("involvedParties", updatedParties)
  }

  const removeInvolvedParty = (index: number) => {
    if (formData.involvedParties.length > 1) {
      const updatedParties = [...formData.involvedParties]
      updatedParties.splice(index, 1)
      updateFormData("involvedParties", updatedParties)
    }
  }

  return (
    <div className="space-y-6">
      <p className="text-gray-500">Please provide specific details about the civil liability incident</p>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="liabilityType">
            Type of Liability <span className="text-red-500">*</span>
          </Label>
          <Select value={formData.liabilityType} onValueChange={(value) => updateFormData("liabilityType", value)}>
            <SelectTrigger id="liabilityType">
              <SelectValue placeholder="Select liability type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="property">Property Damage</SelectItem>
              <SelectItem value="personal">Personal Injury</SelectItem>
              <SelectItem value="professional">Professional Negligence</SelectItem>
              <SelectItem value="product">Product Liability</SelectItem>
              <SelectItem value="pet">Pet-Related Incident</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>
              Involved Parties <span className="text-red-500">*</span>
            </Label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addInvolvedParty}
              className="flex items-center gap-1"
            >
              <Plus className="h-4 w-4" /> Add Party
            </Button>
          </div>

          {formData.involvedParties.map((party, index) => (
            <div key={index} className="p-4 border rounded-md space-y-3">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">Party {index + 1}</h4>
                {formData.involvedParties.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeInvolvedParty(index)}
                    className="h-8 w-8 p-0 text-red-500"
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor={`party-name-${index}`}>
                    Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id={`party-name-${index}`}
                    value={party.name}
                    onChange={(e) => updateInvolvedParty(index, "name", e.target.value)}
                    placeholder="Full Name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`party-contact-${index}`}>
                    Contact Information <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id={`party-contact-${index}`}
                    value={party.contact}
                    onChange={(e) => updateInvolvedParty(index, "contact", e.target.value)}
                    placeholder="Phone or Email"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor={`party-relationship-${index}`}>Relationship to You</Label>
                <Select
                  value={party.relationship}
                  onValueChange={(value) => updateInvolvedParty(index, "relationship", value)}
                >
                  <SelectTrigger id={`party-relationship-${index}`}>
                    <SelectValue placeholder="Select relationship" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="neighbor">Neighbor</SelectItem>
                    <SelectItem value="tenant">Tenant</SelectItem>
                    <SelectItem value="landlord">Landlord</SelectItem>
                    <SelectItem value="business">Business Partner</SelectItem>
                    <SelectItem value="customer">Customer/Client</SelectItem>
                    <SelectItem value="stranger">No Prior Relationship</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <Label htmlFor="damageDescription">
            Description of Damage/Incident <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="damageDescription"
            placeholder="Please describe in detail what happened and the nature of the damage or injury"
            value={formData.damageDescription}
            onChange={(e) => updateFormData("damageDescription", e.target.value)}
            rows={4}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="claimAmount">
            Estimated Claim Amount ($) <span className="text-red-500">*</span>
          </Label>
          <Input
            id="claimAmount"
            placeholder="1000"
            value={formData.claimAmount}
            onChange={(e) => updateFormData("claimAmount", e.target.value)}
            required
          />
          <p className="text-xs text-gray-500">
            If the claim amount is unknown at this time, please provide your best estimate
          </p>
        </div>
      </div>
    </div>
  )
}
