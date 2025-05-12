"use client"

import { useState } from "react"
import { PhoneInput } from "@/app/components/phone-input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function PhoneInputExample() {
  const [phone, setPhone] = useState("")
  const [isValid, setIsValid] = useState(false)

  const handlePhoneChange = (value: string, valid: boolean) => {
    setPhone(value)
    setIsValid(valid)
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Contact Information</CardTitle>
        <CardDescription>Enter your phone number with country code</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <PhoneInput
          value={phone}
          onChange={handlePhoneChange}
          defaultCountry="AD"
          label="Phone Number"
          helperText="We'll use this to contact you about your claim"
          required
        />

        <div className="text-sm mt-4 p-3 bg-zinc-50 rounded-md">
          <p>
            Current value: <span className="font-mono">{phone || "(empty)"}</span>
          </p>
          <p>Validation status: {isValid ? "✅ Valid" : "❌ Invalid"}</p>
        </div>
      </CardContent>
    </Card>
  )
}
