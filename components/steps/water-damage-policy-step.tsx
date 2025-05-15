"use client"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Droplets, Umbrella, Waves } from "lucide-react"

interface WaterDamagePolicyStepProps {
  value: string | null
  onChange: (value: string) => void
}

export default function WaterDamagePolicyStep({ value, onChange }: WaterDamagePolicyStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2">Water Damage Protection</h2>
        <p className="text-gray-500">Select coverage for water-related incidents and flooding</p>
      </div>

      <RadioGroup value={value || ""} onValueChange={onChange} className="space-y-4">
        <div className="flex items-start space-x-3 border rounded-lg p-4 hover:bg-gray-50 transition-colors">
          <RadioGroupItem value="basic" id="water-basic" className="mt-1" />
          <div className="flex-1">
            <div className="flex items-center">
              <Label htmlFor="water-basic" className="text-base font-medium flex items-center gap-2">
                <Droplets className="h-5 w-5 text-gray-500" />
                Basic Water Protection
              </Label>
              <div className="ml-auto font-medium">$7/month</div>
            </div>
            <p className="text-gray-500 mt-1 text-sm">
              Covers damage from burst pipes and appliance leaks up to $2,000
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-3 border rounded-lg p-4 hover:bg-gray-50 transition-colors">
          <RadioGroupItem value="standard" id="water-standard" className="mt-1" />
          <div className="flex-1">
            <div className="flex items-center">
              <Label htmlFor="water-standard" className="text-base font-medium flex items-center gap-2">
                <Umbrella className="h-5 w-5 text-blue-500" />
                Standard Water Protection
              </Label>
              <div className="ml-auto font-medium">$15/month</div>
            </div>
            <p className="text-gray-500 mt-1 text-sm">Covers all water damage including minor flooding up to $10,000</p>
          </div>
        </div>

        <div className="flex items-start space-x-3 border rounded-lg p-4 hover:bg-gray-50 transition-colors">
          <RadioGroupItem value="premium" id="water-premium" className="mt-1" />
          <div className="flex-1">
            <div className="flex items-center">
              <Label htmlFor="water-premium" className="text-base font-medium flex items-center gap-2">
                <Waves className="h-5 w-5 text-green-500" />
                Premium Flood Protection
              </Label>
              <div className="ml-auto font-medium">$30/month</div>
            </div>
            <p className="text-gray-500 mt-1 text-sm">
              Complete coverage for all water damage including major flooding up to $50,000
            </p>
          </div>
        </div>
      </RadioGroup>
    </div>
  )
}
