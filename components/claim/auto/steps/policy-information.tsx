"use client"

import type React from "react"

import { useClaimForm } from "../claim-form-context"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { PhoneInput } from "@/components/ui/phone-input"
import { Switch } from "@/components/ui/switch"
import { DateTimePicker } from "@/components/ui/custom-calendar"
import { UserCog } from "lucide-react"
import { useTranslations } from 'next-intl'


export default function PolicyInformation() {
  const { formData, updateFormData } = useClaimForm()
  const t = useTranslations('ClaimAuto.PolicyInformationForm')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    updateFormData({ [name]: value })
  }

  const handlePhoneChange = (value: string) => {
    updateFormData({ phone: value })
  }

  const handleDriverPhoneChange = (value: string) => {
    updateFormData({ driverPhone: value })
  }

  const handleDriverDateChange = (date: Date | undefined) => {
    updateFormData({ driverDateOfBirth: date || null })
  }

  const handleDifferentDriverToggle = (checked: boolean) => {
    updateFormData({ hasDifferentDriver: checked })

    // Clear driver fields if toggled off
    if (!checked) {
      updateFormData({
        driverFirstName: "",
        driverLastName: "",
        driverDateOfBirth: null,
        driverID: "",
        driverEmail: "",
        driverPhone: "",
      })
    }
  }

  return (
    <Card className="border-none shadow-none">
      <CardContent className="p-0 space-y-6">
        <div className="space-y-2">
          <h3 className="text-lg font-medium text-zinc-900">{t('personalInformation')}</h3>
          <p className="text-sm text-zinc-500">{t('personalInformationDesc')}</p>
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
        </div>

        {/* Redesigned Different Driver Section */}
        <div className="border border-zinc-200 rounded-md overflow-hidden">
          <div className="bg-zinc-50 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <UserCog className="h-5 w-5 text-zinc-500" />
              <div>
                <h4 className="text-md font-medium text-zinc-900">{t('differentDriver')}</h4>
                <p className="text-sm text-zinc-500">{t('differentDriverDesc')}</p>
              </div>
            </div>
            <Switch
              id="hasDifferentDriver"
              checked={formData.hasDifferentDriver}
              onCheckedChange={handleDifferentDriverToggle}
            />
          </div>

          {formData.hasDifferentDriver && (
            <div className="p-4 space-y-6 animate-in fade-in duration-300">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="driverFirstName">
                    {t('driverFirstName')} <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="driverFirstName"
                    name="driverFirstName"
                    value={formData.driverFirstName}
                    onChange={handleChange}
                    placeholder={t('driverFirstNamePlaceholder')}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="driverLastName">
                    {t('driverLastName')} <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="driverLastName"
                    name="driverLastName"
                    value={formData.driverLastName}
                    onChange={handleChange}
                    placeholder={t('driverLastNamePlaceholder')}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="driverDateOfBirth">
                    {t('driverDateOfBirth')} <span className="text-destructive">*</span>
                  </Label>
                  <DateTimePicker
                    value={formData.driverDateOfBirth || undefined}
                    onChange={handleDriverDateChange}
                    granularity="day"
                    displayFormat={{ hour24: "dd/MM/yyyy", hour12: "dd/MM/yyyy" }}
                    yearRange={100}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="driverID">{t('driverID')}</Label>
                  <Input
                    id="driverID"
                    name="driverID"
                    value={formData.driverID}
                    onChange={handleChange}
                    placeholder={t('driverIDPlaceholder')}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="driverEmail">{t('driverEmail')}</Label>
                  <Input
                    id="driverEmail"
                    name="driverEmail"
                    type="email"
                    value={formData.driverEmail}
                    onChange={handleChange}
                    placeholder={t('driverEmailPlaceholder')}
                  />
                </div>

                <div className="space-y-2">
                  <PhoneInput
                    id="driverPhone"
                    value={formData.driverPhone}
                    onChange={handleDriverPhoneChange}
                    defaultCountry="AD"
                    label={t('driverPhone')}
                    placeholder={t('driverPhonePlaceholder')}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
