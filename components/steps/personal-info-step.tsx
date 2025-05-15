"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { IncidentFormData } from "../incident-report-form"

interface PersonalInfoStepProps {
  formData: IncidentFormData
  updateFormData: (fieldName: keyof IncidentFormData, value: any) => void
}

// Country codes for phone numbers
const countryCodes = [
  { code: "US", name: "United States", dial: "+1" },
  { code: "GB", name: "United Kingdom", dial: "+44" },
  { code: "CA", name: "Canada", dial: "+1" },
  { code: "AU", name: "Australia", dial: "+61" },
  { code: "DE", name: "Germany", dial: "+49" },
  { code: "FR", name: "France", dial: "+33" },
  { code: "ES", name: "Spain", dial: "+34" },
  { code: "IT", name: "Italy", dial: "+39" },
  { code: "JP", name: "Japan", dial: "+81" },
  { code: "CN", name: "China", dial: "+86" },
  { code: "IN", name: "India", dial: "+91" },
  { code: "BR", name: "Brazil", dial: "+55" },
  { code: "MX", name: "Mexico", dial: "+52" },
  { code: "RU", name: "Russia", dial: "+7" },
  { code: "ZA", name: "South Africa", dial: "+27" },
  { code: "AR", name: "Argentina", dial: "+54" },
  { code: "CO", name: "Colombia", dial: "+57" },
  { code: "PE", name: "Peru", dial: "+51" },
  { code: "CL", name: "Chile", dial: "+56" },
  { code: "VE", name: "Venezuela", dial: "+58" },
  { code: "EC", name: "Ecuador", dial: "+593" },
  { code: "BO", name: "Bolivia", dial: "+591" },
  { code: "UY", name: "Uruguay", dial: "+598" },
  { code: "PY", name: "Paraguay", dial: "+595" },
  { code: "UZ", name: "Uzbekistan", dial: "+998" },
  { code: "KZ", name: "Kazakhstan", dial: "+7" },
  { code: "TR", name: "Turkey", dial: "+90" },
  { code: "SA", name: "Saudi Arabia", dial: "+966" },
  { code: "AE", name: "United Arab Emirates", dial: "+971" },
  { code: "QA", name: "Qatar", dial: "+974" },
  { code: "KW", name: "Kuwait", dial: "+965" },
  { code: "OM", name: "Oman", dial: "+968" },
  { code: "AND", name: "Andorra", dial: "376" },
  { code: "IS", name: "Iceland", dial: "354" },
  { code: "LI", name: "Liechtenstein", dial: "423" },
  { code: "MC", name: "Monaco", dial: "377" },
  { code: "SM", name: "San Marino", dial: "378" },
  { code: "VA", name: "Vatican City", dial: "379" },
  
  
]

export default function PersonalInfoStep({ formData, updateFormData }: PersonalInfoStepProps) {
  return (
    <div className="space-y-6">
      <p className="text-gray-500">Please provide your contact and policy information</p>

      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="fullName">
              Full Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="fullName"
              placeholder="John Doe"
              value={formData.fullName}
              onChange={(e) => updateFormData("fullName", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">
              Email Address <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="john.doe@example.com"
              value={formData.email}
              onChange={(e) => updateFormData("email", e.target.value)}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="phoneNumber">
            Phone Number <span className="text-red-500">*</span>
          </Label>
          <div className="flex gap-2">
            <div className="w-[120px]">
              <Select value={formData.phoneCountry} onValueChange={(value) => updateFormData("phoneCountry", value)}>
                <SelectTrigger id="phoneCountry">
                  <SelectValue placeholder="Country" />
                </SelectTrigger>
                <SelectContent>
                  {countryCodes.map((country) => (
                    <SelectItem key={country.code} value={country.code}>
                      <div className="flex items-center">
                        <span className="mr-1">{country.dial}</span>
                        <span>{country.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Input
              id="phoneNumber"
              placeholder="Phone number"
              value={formData.phoneNumber}
              onChange={(e) => updateFormData("phoneNumber", e.target.value)}
              className="flex-1"
              required
            />
          </div>
          <p className="text-xs text-gray-500">Please include your area code</p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="policyNumber">
              Policy Number
            </Label>
            <Input
              id="policyNumber"
              placeholder="POL-12345678"
              value={formData.policyNumber}
              onChange={(e) => updateFormData("policyNumber", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">
              Address
            </Label>
            <Input
              id="address"
              placeholder="123 Main St, City, Country"
              value={formData.address}
              onChange={(e) => updateFormData("address", e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
