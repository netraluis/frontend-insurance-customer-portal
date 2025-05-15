"use client"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Scale, Users, UserCheck } from "lucide-react"

interface CivilLiabilityPolicyStepProps {
  value: string | null
  onChange: (value: string) => void
}

export default function CivilLiabilityPolicyStep({ value, onChange }: CivilLiabilityPolicyStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2">Civil Liability Coverage</h2>
        <p className="text-gray-500">Choose your protection against third-party claims</p>
      </div>

      <RadioGroup value={value || ""} onValueChange={onChange} className="space-y-4">
        <div className="flex items-start space-x-3 border rounded-lg p-4 hover:bg-gray-50 transition-colors">
          <RadioGroupItem value="basic" id="liability-basic" className="mt-1" />
          <div className="flex-1">
            <div className="flex items-center">
              <Label htmlFor="liability-basic" className="text-base font-medium flex items-center gap-2">
                <Scale className="h-5 w-5 text-gray-500" />
                Basic Liability
              </Label>
              <div className="ml-auto font-medium">$10/month</div>
            </div>
            <p className="text-gray-500 mt-1 text-sm">
              Covers liability claims up to $100,000 for property damage or injuries
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-3 border rounded-lg p-4 hover:bg-gray-50 transition-colors">
          <RadioGroupItem value="standard" id="liability-standard" className="mt-1" />
          <div className="flex-1">
            <div className="flex items-center">
              <Label htmlFor="liability-standard" className="text-base font-medium flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-500" />
                Standard Liability
              </Label>
              <div className="ml-auto font-medium">$20/month</div>
            </div>
            <p className="text-gray-500 mt-1 text-sm">
              Covers liability claims up to $500,000 including legal defense costs
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-3 border rounded-lg p-4 hover:bg-gray-50 transition-colors">
          <RadioGroupItem value="premium" id="liability-premium" className="mt-1" />
          <div className="flex-1">
            <div className="flex items-center">
              <Label htmlFor="liability-premium" className="text-base font-medium flex items-center gap-2">
                <UserCheck className="h-5 w-5 text-green-500" />
                Premium Liability
              </Label>
              <div className="ml-auto font-medium">$35/month</div>
            </div>
            <p className="text-gray-500 mt-1 text-sm">
              Covers liability claims up to $1,000,000 with comprehensive legal support
            </p>
          </div>
        </div>
      </RadioGroup>
    </div>
  )
}
