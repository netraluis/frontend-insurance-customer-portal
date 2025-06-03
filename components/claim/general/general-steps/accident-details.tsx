"use client"

import type React from "react"
import { useGeneralClaimForm } from "../general-claim-form-context"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Camera } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"
import { UnifiedUpload, type MediaFile } from "@/components/ui/unified-upload"
import { DateTimePicker } from "../../../ui/custom-calendar"
import { useTranslations } from 'next-intl'

export default function AccidentDetails() {
  const { formData, updateFormData } = useGeneralClaimForm()
  const isMobile = useIsMobile()
  const t = useTranslations('GeneralClaimAuto.AccidentDetails')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    updateFormData({ [name]: value })
  }

  const handleDateChange = (date: Date | undefined) => {
    updateFormData({ accidentDate: date || null })
  }

  // Handle damage photos change
  const handleDamagePhotosChange = (files: MediaFile | MediaFile[] | null) => {
    updateFormData({ damagePhotos: Array.isArray(files) ? files : files ? [files] : [] })
  }

  return (
    <Card className="border-none shadow-none">
      <CardContent className="p-0 space-y-6">
        <div className="space-y-2">
          <h3 className="text-lg font-medium text-zinc-900">{t('accidentDetailsTitle')}</h3>
          <p className="text-sm text-zinc-500">{t('accidentDetailsDescription')}</p>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="accidentLocation">{t('locationLabel')}</Label>
              <Input
                id="accidentLocation"
                name="accidentLocation"
                value={formData.accidentLocation}
                onChange={handleChange}
                placeholder={t('locationPlaceholder')}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="accidentDate">{t('dateLabel')}</Label>
              <DateTimePicker
                value={formData.accidentDate || undefined}
                onChange={handleDateChange}
                granularity="day"
                displayFormat={{ hour24: "dd/MM/yyyy", hour12: "dd/MM/yyyy" }}
                yearRange={100}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="accidentDescription">{t('descriptionLabel')}</Label>
            <Textarea
              id="accidentDescription"
              name="accidentDescription"
              value={formData.accidentDescription}
              onChange={handleChange}
              placeholder={t('descriptionPlaceholder')}
              rows={isMobile ? 4 : 5}
              required
            />
          </div>
        </div>

        {/* Damage Documentation Section */}
        <div className="space-y-4 border border-zinc-200 rounded-md p-3 sm:p-5 bg-zinc-50">
          <div className="space-y-2">
            <h4 className="text-md font-medium text-zinc-900 flex items-center gap-2">
              <Camera className="h-5 w-5 text-zinc-500" />
              {t('damageDocumentationTitle')}
            </h4>
            <p className="text-sm text-zinc-500">
              {t('damageDocumentationDescription')}
            </p>
          </div>

          {/* Damage Description Text Area */}
          <div className="space-y-2">
            <Label htmlFor="damageDescription" className="text-zinc-900">
              {t('damageDescriptionLabel')} <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="damageDescription"
              name="damageDescription"
              value={formData.damageDescription}
              onChange={handleChange}
              placeholder={t('damageDescriptionPlaceholder')}
              rows={isMobile ? 3 : 4}
              className="w-full resize-y min-h-[80px] sm:min-h-[100px]"
              required
            />
          </div>

          {/* Damage Photos Upload - Using Enhanced UnifiedUpload */}
          <UnifiedUpload
            label={t('damagePhotosLabel')}
            description={t('damagePhotosDescription')}
            value={formData.damagePhotos}
            onChange={handleDamagePhotosChange}
            multiple={true}
            maxSize={10}
            maxFiles={10}
            accept={{ "image/*": [".jpeg", ".jpg", ".png"] }}
            placeholder="Upload damage photos"
            buttonText="Select photos"
            mobileButtonText="Add photos"
            icon={<Camera className="w-7 h-7 sm:w-8 sm:h-8 mb-2 text-zinc-500" />}
            successMessage="Photo uploaded successfully!"
            mobileSuccessMessage="Photo added!"
            captureMethod="environment"
          />
        </div>
      </CardContent>
    </Card>
  )
}
