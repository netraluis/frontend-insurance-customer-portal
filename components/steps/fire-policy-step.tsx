"use client"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Flame, FlameKindling, Sparkles } from "lucide-react"

interface FirePolicyStepProps {
  value: string | null
  onChange: (value: string) => void
}

export default function FirePolicyStep({ value, onChange }: FirePolicyStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2">Fire Protection</h2>
        <p className="text-gray-500">Select your coverage level for fire and smoke damage</p>
      </div>

      <RadioGroup value={value || ""} onValueChange={onChange} className="space-y-4">
        <div className="flex items-start space-x-3 border rounded-lg p-4 hover:bg-gray-50 transition-colors">
          <RadioGroupItem value="basic" id="fire-basic" className="mt-1" />
          <div className="flex-1">
            <div className="flex items-center">
              <Label htmlFor="fire-basic" className="text-base font-medium flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-gray-500" />
                Basic Fire Coverage
              </Label>
              <div className="ml-auto font-medium">$8/month</div>
            </div>
            <p className="text-gray-500 mt-1 text-sm">
              Covers fire and smoke damage up to $10,000 with a $500 deductible
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-3 border rounded-lg p-4 hover:bg-gray-50 transition-colors">
          <RadioGroupItem value="standard" id="fire-standard" className="mt-1" />
          <div className="flex-1">
            <div className="flex items-center">
              <Label htmlFor="fire-standard" className="text-base font-medium flex items-center gap-2">
                <FlameKindling className="h-5 w-5 text-orange-500" />
                Standard Fire Coverage
              </Label>
              <div className="ml-auto font-medium">$18/month</div>
            </div>
            <p className="text-gray-500 mt-1 text-sm">
              Covers fire, smoke, and electrical fire damage up to $50,000 with a $250 deductible
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-3 border rounded-lg p-4 hover:bg-gray-50 transition-colors">
          <RadioGroupItem value="premium" id="fire-premium" className="mt-1" />
          <div className="flex-1">
            <div className="flex items-center">
              <Label htmlFor="fire-premium" className="text-base font-medium flex items-center gap-2">
                <Flame className="h-5 w-5 text-red-500" />
                Premium Fire Coverage
              </Label>
              <div className="ml-auto font-medium">$30/month</div>
            </div>
            <p className="text-gray-500 mt-1 text-sm">
              Complete fire protection up to $100,000 with no deductible, includes temporary housing
            </p>
          </div>
        </div>
      </RadioGroup>
    </div>
  )
}
