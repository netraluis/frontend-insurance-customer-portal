"use client"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Shield, ShieldAlert, ShieldCheck } from "lucide-react"

interface TheftPolicyStepProps {
  value: string | null
  onChange: (value: string) => void
}

export default function TheftPolicyStep({ value, onChange }: TheftPolicyStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2">Theft Protection</h2>
        <p className="text-gray-500">Select the level of theft protection coverage you need</p>
      </div>

      <RadioGroup value={value || ""} onValueChange={onChange} className="space-y-4">
        <div className="flex items-start space-x-3 border rounded-lg p-4 hover:bg-gray-50 transition-colors">
          <RadioGroupItem value="basic" id="theft-basic" className="mt-1" />
          <div className="flex-1">
            <div className="flex items-center">
              <Label htmlFor="theft-basic" className="text-base font-medium flex items-center gap-2">
                <Shield className="h-5 w-5 text-gray-500" />
                Basic Protection
              </Label>
              <div className="ml-auto font-medium">$5/month</div>
            </div>
            <p className="text-gray-500 mt-1 text-sm">
              Covers theft of items up to $1,000 in value with a $250 deductible
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-3 border rounded-lg p-4 hover:bg-gray-50 transition-colors">
          <RadioGroupItem value="standard" id="theft-standard" className="mt-1" />
          <div className="flex-1">
            <div className="flex items-center">
              <Label htmlFor="theft-standard" className="text-base font-medium flex items-center gap-2">
                <ShieldAlert className="h-5 w-5 text-blue-500" />
                Standard Protection
              </Label>
              <div className="ml-auto font-medium">$12/month</div>
            </div>
            <p className="text-gray-500 mt-1 text-sm">
              Covers theft of items up to $5,000 in value with a $150 deductible
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-3 border rounded-lg p-4 hover:bg-gray-50 transition-colors">
          <RadioGroupItem value="premium" id="theft-premium" className="mt-1" />
          <div className="flex-1">
            <div className="flex items-center">
              <Label htmlFor="theft-premium" className="text-base font-medium flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-green-500" />
                Premium Protection
              </Label>
              <div className="ml-auto font-medium">$25/month</div>
            </div>
            <p className="text-gray-500 mt-1 text-sm">
              Covers theft of items up to $10,000 in value with a $0 deductible
            </p>
          </div>
        </div>
      </RadioGroup>
    </div>
  )
}
