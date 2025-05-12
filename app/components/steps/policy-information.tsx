"use client"

import type React from "react"

import { useClaimForm } from "@/app/components/claim-form-context"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { PhoneInput } from "@/app/components/phone-input"

export default function PolicyInformation() {
  const { formData, updateFormData } = useClaimForm()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    updateFormData({ [name]: value })
  }

  const handlePhoneChange = (value: string, isValid: boolean) => {
    updateFormData({ phone: value })
  }

  return (
    <Card className="border-none shadow-none">
      <CardContent className="p-0 space-y-6">
        <div className="space-y-2">
          <h3 className="text-lg font-medium text-zinc-900">Informació personal</h3>
          <p className="text-sm text-zinc-500">Si us plau, proporcioneu les vostres dades de contacte per a processar la vostra reclamació.</p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="firstName">Nom</Label>
            <Input
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Introdueix el teu nom"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName">Cognom</Label>
            <Input
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Introdueix el teu cognom"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Adreça de correu electrònic</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your.email@example.com"
              required
            />
          </div>

          <div className="space-y-2">
            <PhoneInput
              id="phone"
              value={formData.phone}
              onChange={handlePhoneChange}
              defaultCountry="AD"
              label="Número de telèfon"
              placeholder="Introdueix el teu número de telèfon"
              required
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
