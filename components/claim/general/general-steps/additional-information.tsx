"use client"

import type React from "react"
import { useGeneralClaimForm } from "../general-claim-form-context"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { AlertCircle, FileText, Shield, Activity, Flame } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"
import { type MediaFile, UnifiedUpload } from "@/components/ui/unified-upload"
import { useTranslations } from 'next-intl'

export default function AdditionalInformation() {
  const { formData, updateFormData } = useGeneralClaimForm()
  const isMobile = useIsMobile()
  const t = useTranslations('GeneralClaimAuto.AdditionalInformation')

  const handleSwitchChange = (name: string, checked: boolean) => {
    updateFormData({ [name]: checked })

    // If bodily injuries is turned off, clear the description
    if (name === "bodilyInjuries" && !checked) {
      updateFormData({ bodilyInjuriesDescription: "", medicalReportDocument: null })
    }

    // If police report is turned off, clear the document
    if (name === "policeReport" && !checked) {
      updateFormData({ policeReportDocument: null })
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target
    updateFormData({ [name]: value })
  }

  // Handle police report document change
  const handlePoliceReportChange = (files: MediaFile | MediaFile[] | null) => {
    // If files is an array, take the first file; if it's a single file, use it; if null, set null
    const file = Array.isArray(files) ? (files[0] ?? null) : (files ?? null)
    updateFormData({ policeReportDocument: file })
  }

  // Handle medical report document change
  const handleMedicalReportChange = (files: MediaFile | MediaFile[] | null) => {
    // If files is an array, take the first file; if it's a single file, use it; if null, set null
    const file = Array.isArray(files) ? (files[0] ?? null) : (files ?? null)
    updateFormData({ medicalReportDocument: file })
  }

  return (
    <Card className="border-none shadow-none">
      <CardContent className="p-0 space-y-6">
        <div className="space-y-2">
          <h3 className="text-lg font-medium text-zinc-900">{t('title')}</h3>
          <p className="text-sm text-zinc-500">{t('description')}</p>
        </div>

        <div className="space-y-4">
          {/* Police Involvement Section */}
          <div className="border border-zinc-200 rounded-md overflow-hidden">
            <div className="bg-zinc-50 px-3 sm:px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-zinc-500" />
                <div>
                  <h4 className="text-md font-medium text-zinc-900">{t('policeInvolvement')}</h4>
                  <p className="text-sm text-zinc-500">{t('policeInvolvementQuestion')}</p>
                </div>
              </div>
              <Switch
                id="policeInvolved"
                checked={formData.policeInvolved}
                onCheckedChange={(checked) => handleSwitchChange("policeInvolved", checked)}
              />
            </div>
          </div>

          {/* Traffic Service Involvement Section */}
          <div className="border border-zinc-200 rounded-md overflow-hidden">
            <div className="bg-zinc-50 px-3 sm:px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-zinc-500" />
                <div>
                  <h4 className="text-md font-medium text-zinc-900">{t('trafficServiceInvolvement')}</h4>
                  <p className="text-sm text-zinc-500">{t('trafficServiceInvolvementQuestion')}</p>
                </div>
              </div>
              <Switch
                id="trafficServiceInvolved"
                checked={formData.trafficServiceInvolved}
                onCheckedChange={(checked) => handleSwitchChange("trafficServiceInvolved", checked)}
              />
            </div>
          </div>

          {/* Firefighters Involvement Section */}
          <div className="border border-zinc-200 rounded-md overflow-hidden">
            <div className="bg-zinc-50 px-3 sm:px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Flame className="h-5 w-5 text-zinc-500" />
                <div>
                  <h4 className="text-md font-medium text-zinc-900">{t('firefightersInvolvement')}</h4>
                  <p className="text-sm text-zinc-500">{t('firefightersInvolvementQuestion')}</p>
                </div>
              </div>
              <Switch
                id="firefightersInvolved"
                checked={formData.firefightersInvolved}
                onCheckedChange={(checked) => handleSwitchChange("firefightersInvolved", checked)}
              />
            </div>
          </div>

          {/* Police Report Section */}
          <div className="border border-zinc-200 rounded-md overflow-hidden">
            <div className="bg-zinc-50 px-3 sm:px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-zinc-500" />
                <div>
                  <h4 className="text-md font-medium text-zinc-900">{t('policeReport')}</h4>
                  <p className="text-sm text-zinc-500">{t('policeReportQuestion')}</p>
                </div>
              </div>
              <Switch
                id="policeReport"
                checked={formData.policeReport}
                onCheckedChange={(checked) => handleSwitchChange("policeReport", checked)}
              />
            </div>

            {formData.policeReport && (
              <div className="p-3 sm:p-4 space-y-3 sm:space-y-4 animate-in fade-in duration-300">
                {/* Police Report Upload - Using Enhanced UnifiedUpload */}
                <UnifiedUpload
                  label={t('uploadPoliceReport')}
                  description={t('policeReportDescription')}
                  value={formData.policeReportDocument}
                  onChange={handlePoliceReportChange}
                  multiple={false}
                  maxSize={10}
                  accept={{
                    "image/*": [".jpeg", ".jpg", ".png"],
                    "application/pdf": [".pdf"],
                  }}
                  placeholder={t('uploadReportPlaceholder')}
                  buttonText={t('buttonText')}
                  mobileButtonText={t('mobileButtonText')}
                  icon={<FileText className="h-7 w-7 sm:h-8 sm:h-8 text-zinc-500" />}
                  successMessage={t('successMessage')}
                  mobileSuccessMessage={t('mobileSuccessMessage')}
                  captureMethod="environment"
                />
              </div>
            )}
          </div>

          {/* Bodily Injuries Section */}
          <div className="border border-zinc-200 rounded-md overflow-hidden">
            <div className="bg-zinc-50 px-3 sm:px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-zinc-500" />
                <div>
                  <h4 className="text-md font-medium text-zinc-900">{t('bodilyInjuries')}</h4>
                  <p className="text-sm text-zinc-500">{t('bodilyInjuriesQuestion')}</p>
                </div>
              </div>
              <Switch
                id="bodilyInjuries"
                checked={formData.bodilyInjuries}
                onCheckedChange={(checked) => handleSwitchChange("bodilyInjuries", checked)}
              />
            </div>

            {formData.bodilyInjuries && (
              <div className="p-3 sm:p-4 space-y-3 sm:space-y-4 animate-in fade-in duration-300">
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-5 w-5 text-zinc-500 mt-0.5" />
                    <div>
                      <Label htmlFor="bodilyInjuriesDescription" className="text-zinc-900">
                        {t('bodilyInjuriesDescriptionLabel')}
                      </Label>
                      <p className="text-sm text-zinc-500 mb-2">
                        {isMobile ? t('bodilyInjuriesDescriptionShort') : t('bodilyInjuriesDescriptionLong')}
                      </p>
                    </div>
                  </div>
                  <Textarea
                    id="bodilyInjuriesDescription"
                    name="bodilyInjuriesDescription"
                    value={formData.bodilyInjuriesDescription}
                    onChange={handleChange}
                    placeholder={isMobile ? t('bodilyInjuriesPlaceholderShort') : t('bodilyInjuriesPlaceholderLong')}
                    rows={isMobile ? 3 : 4}
                    className="w-full resize-y min-h-[80px] sm:min-h-[100px]"
                    required={formData.bodilyInjuries}
                  />
                </div>

                {/* Medical Report Upload */}
                <UnifiedUpload
                  label={t('uploadMedicalReport')}
                  description={t('medicalReportDescription')}
                  value={formData.medicalReportDocument}
                  onChange={handleMedicalReportChange}
                  multiple={false}
                  maxSize={10}
                  accept={{
                    "image/*": [".jpeg", ".jpg", ".png"],
                    "application/pdf": [".pdf"],
                  }}
                  placeholder={t('uploadMedicalReportPlaceholder')}
                  buttonText={t('medicalButtonText')}
                  mobileButtonText={t('medicalMobileButtonText')}
                  icon={<FileText className="h-7 w-7 sm:h-8 sm:h-8 text-zinc-500" />}
                  successMessage={t('medicalSuccessMessage')}
                  mobileSuccessMessage={t('medicalMobileSuccessMessage')}
                  captureMethod="environment"
                />
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
