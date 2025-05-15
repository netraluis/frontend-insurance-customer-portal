"use client"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { GlassWater, Glasses, Maximize2 } from "lucide-react"

interface GlassPolicyStepProps {
  value: string | null
  onChange: (value: string) => void
}

export default function GlassPolicyStep({ value, onChange }: GlassPolicyStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2">Broken Glass Coverage</h2>
        <p className="text-gray-500">Choose your coverage for windows, mirrors, and glass items</p>
      </div>

      <RadioGroup value={value || ""} onValueChange={onChange} className="space-y-4">
        <div className="flex items-start space-x-3 border rounded-lg p-4 hover:bg-gray-50 transition-colors">
          <RadioGroupItem value="basic" id="glass-basic" className="mt-1" />
          <div className="flex-1">
            <div className="flex items-center">
              <Label htmlFor="glass-basic" className="text-base font-medium flex items-center gap-2">
                <Glasses className="h-5 w-5 text-gray-500" />
                Basic Glass Coverage
              </Label>
              <div className="ml-auto font-medium">$3/month</div>
            </div>
            <p className="text-gray-500 mt-1 text-sm">
              Covers replacement of windows and mirrors up to $500 with a $100 deductible
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-3 border rounded-lg p-4 hover:bg-gray-50 transition-colors">
          <RadioGroupItem value="standard" id="glass-standard" className="mt-1" />
          <div className="flex-1">
            <div className="flex items-center">
              <Label htmlFor="glass-standard" className="text-base font-medium flex items-center gap-2">
                <GlassWater className="h-5 w-5 text-blue-500" />
                Standard Glass Coverage
              </Label>
              <div className="ml-auto font-medium">$8/month</div>
            </div>
            <p className="text-gray-500 mt-1 text-sm">
              Covers replacement of all glass items up to $2,000 with a $50 deductible
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-3 border rounded-lg p-4 hover:bg-gray-50 transition-colors">
          <RadioGroupItem value="premium" id="glass-premium" className="mt-1" />
          <div className="flex-1">
            <div className="flex items-center">
              <Label htmlFor="glass-premium" className="text-base font-medium flex items-center gap-2">
                <Maximize2 className="h-5 w-5 text-green-500" />
                Premium Glass Coverage
              </Label>
              <div className="ml-auto font-medium">$15/month</div>
            </div>
            <p className="text-gray-500 mt-1 text-sm">
              Unlimited glass replacement with no deductible, includes specialty glass
            </p>
          </div>
        </div>
      </RadioGroup>
    </div>
  )
}
