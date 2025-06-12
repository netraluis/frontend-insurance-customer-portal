"use client"

import type React from "react"
import { useGeneralClaimForm } from "../general-claim-form-context"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { PhoneInput } from "@/components/ui/phone-input"
import { useTranslations } from 'next-intl'

export default function PolicyInformation() {
  const { formData, updateFormData } = useGeneralClaimForm()
  const t = useTranslations('GeneralClaimAuto.PolicyInformation')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    updateFormData({ [name]: value })
  }

  const handlePhoneChange = (value: string) => {
    updateFormData({ phone: value })
  }

  return (
    <Card className="border-none shadow-none">
      <CardContent className="p-0 space-y-6">
        <div className="space-y-2">
          <h3 className="text-lg font-medium text-zinc-900">{t('title')}</h3>
          <p className="text-sm text-zinc-500">{t('description')}</p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="firstName">{t('firstName')} <span className="text-destructive">*</span></Label>
            <Input
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder={t('firstNamePlaceholder')}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName">{t('lastName')} <span className="text-destructive">*</span></Label>
            <Input
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder={t('lastNamePlaceholder')}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">{t('email')} <span className="text-destructive">*</span></Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={t('emailPlaceholder')}
              required
            />
          </div>

          <div className="space-y-2">
            <PhoneInput
              id="phone"
              value={formData.phone}
              onChange={handlePhoneChange}
              defaultCountry="AD"
              label={t('phone')}
              placeholder={t('phonePlaceholder')}
              required
            />
          </div>

          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="policyNumber">{t('policyNumber')} <span className="text-destructive">*</span></Label>
            <Input
              id="policyNumber"
              name="policyNumber"
              value={formData.policyNumber}
              onChange={handleChange}
              placeholder={t('policyNumberPlaceholder')}
              required
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
