"use client"

import type React from "react"
import { useClaimForm } from "../claim-form-context"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
  AlertCircle,
  FileText,
  Camera,
  Shield,
  FileCheckIcon as FileReport,
  Activity,
  Car,
} from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"
import { FileObject, UnifiedUpload } from "@/components/ui/unified-upload"
import { DateTimePicker } from "@/components/ui/custom-calendar"

export default function AccidentDetails() {
  const { formData, updateFormData } = useClaimForm()
  const isMobile = useIsMobile()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    updateFormData({ [name]: value })
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    updateFormData({ [name]: checked })

    // If bodily injuries is turned off, clear the description
    if (name === "bodilyInjuries" && !checked) {
      updateFormData({ bodilyInjuriesDescription: "" })
    }

    // If friendly report is turned off, clear the document
    if (name === "friendlyReport" && !checked) {
      updateFormData({ friendlyReportDocument: null })
    }
  }

  const handleDateChange = (date: Date | undefined) => {
    updateFormData({ incidentDate: date || null })
  }

  // Handle damage photos change
  const handleDamagePhotosChange = (files: FileObject | FileObject[] | null) => {
    updateFormData({ damagePhotos: Array.isArray(files) ? files : files ? [files] : [] });
  }

  // Handle friendly report document change
  const handleFriendlyReportChange = (files: FileObject | FileObject[] | null) => {
    // If files is an array, take the first file; if it's a single file, use it; if null, set null
    const file = Array.isArray(files) ? files[0] ?? null : files ?? null;
    updateFormData({ friendlyReportDocument: file });
  };

  return (
    <Card className="border-none shadow-none">
      <CardContent className="p-0 space-y-6">
        <div className="space-y-2">
          <h3 className="text-lg font-medium text-zinc-900">Accident Details</h3>
          <p className="text-sm text-zinc-500">Please provide detailed information about the accident.</p>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="accidentLocation">Location of the Accident</Label>
              <Input
                id="accidentLocation"
                name="accidentLocation"
                value={formData.accidentLocation}
                onChange={handleChange}
                placeholder="Enter the address or location where the accident occurred"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="incidentDate">Date of Incident</Label>
              <DateTimePicker
                value={formData.incidentDate || undefined}
                onChange={handleDateChange}
                granularity="day"
                displayFormat={{ hour24: "dd/MM/yyyy", hour12: "dd/MM/yyyy" }}
                yearRange={100}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="accidentDescription">Detailed Description of the Accident</Label>
            <Textarea
              id="accidentDescription"
              name="accidentDescription"
              value={formData.accidentDescription}
              onChange={handleChange}
              placeholder="Please describe what happened in detail..."
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
              Damage Documentation
            </h4>
            <p className="text-sm text-zinc-500">
              Please provide a detailed description of the vehicle damage and attach photos if available.
            </p>
          </div>

          {/* Damage Description Text Area */}
          <div className="space-y-2">
            <Label htmlFor="damageDescription" className="text-zinc-900">
              Damage Description <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="damageDescription"
              name="damageDescription"
              value={formData.damageDescription}
              onChange={handleChange}
              placeholder="Describe the damage to your vehicle in detail..."
              rows={isMobile ? 3 : 4}
              className="w-full resize-y min-h-[80px] sm:min-h-[100px]"
              required
            />
          </div>

          {/* Damage Photos Upload - Using Enhanced UnifiedUpload */}
          <UnifiedUpload
            label="Damage Photos"
            description="Upload clear photos showing the damage to your vehicle if available."
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

        <div className="space-y-4">
          <h4 className="text-md font-medium text-zinc-900">Additional Information</h4>

          {/* Police Involvement Section */}
          <div className="border border-zinc-200 rounded-md overflow-hidden">
            <div className="bg-zinc-50 px-3 sm:px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-zinc-500" />
                <div>
                  <h4 className="text-md font-medium text-zinc-900">Police Involvement</h4>
                  <p className="text-sm text-zinc-500">Was the police involved in the accident?</p>
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
                <Car className="h-5 w-5 text-zinc-500" />
                <div>
                  <h4 className="text-md font-medium text-zinc-900">Traffic Service Involvement</h4>
                  <p className="text-sm text-zinc-500">Was the local traffic service involved?</p>
                </div>
              </div>
              <Switch
                id="trafficServiceInvolved"
                checked={formData.trafficServiceInvolved}
                onCheckedChange={(checked) => handleSwitchChange("trafficServiceInvolved", checked)}
              />
            </div>
          </div>

          {/* Friendly Accident Report Section */}
          <div className="border border-zinc-200 rounded-md overflow-hidden">
            <div className="bg-zinc-50 px-3 sm:px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileReport className="h-5 w-5 text-zinc-500" />
                <div>
                  <h4 className="text-md font-medium text-zinc-900">Friendly Accident Report</h4>
                  <p className="text-sm text-zinc-500">Was a friendly accident report filed?</p>
                </div>
              </div>
              <Switch
                id="friendlyReport"
                checked={formData.friendlyReport}
                onCheckedChange={(checked) => handleSwitchChange("friendlyReport", checked)}
              />
            </div>

            {formData.friendlyReport && (
              <div className="p-3 sm:p-4 space-y-3 sm:space-y-4 animate-in fade-in duration-300">
                {/* Friendly Report Upload - Using Enhanced UnifiedUpload */}
                <UnifiedUpload
                  label="Upload Friendly Accident Report"
                  description="Please upload a scanned copy or photo of the friendly accident report."
                  value={formData.friendlyReportDocument}
                  onChange={handleFriendlyReportChange}
                  multiple={false}
                  maxSize={10}
                  accept={{
                    "image/*": [".jpeg", ".jpg", ".png"],
                    "application/pdf": [".pdf"],
                  }}
                  placeholder="Upload report"
                  buttonText="Select file"
                  mobileButtonText="Add document"
                  icon={<FileText className="h-7 w-7 sm:h-8 sm:h-8 text-zinc-500" />}
                  successMessage="Report uploaded successfully!"
                  mobileSuccessMessage="Report added!"
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
                  <h4 className="text-md font-medium text-zinc-900">Bodily Injuries</h4>
                  <p className="text-sm text-zinc-500">Were there any bodily injuries?</p>
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
                        Bodily Injuries Description
                      </Label>
                      <p className="text-sm text-zinc-500 mb-2">
                        {isMobile
                          ? "Describe the injuries sustained."
                          : "Please provide details about the injuries sustained in the accident."}
                      </p>
                    </div>
                  </div>
                  <Textarea
                    id="bodilyInjuriesDescription"
                    name="bodilyInjuriesDescription"
                    value={formData.bodilyInjuriesDescription}
                    onChange={handleChange}
                    placeholder={
                      isMobile
                        ? "Describe injuries and medical attention received..."
                        : "Describe the nature and extent of the injuries, who was injured, and any medical attention received..."
                    }
                    rows={isMobile ? 3 : 4}
                    className="w-full resize-y min-h-[80px] sm:min-h-[100px]"
                    required={formData.bodilyInjuries}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
