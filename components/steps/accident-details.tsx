"use client"

import { Button } from "@/components/ui/button"

import type React from "react"

import { useClaimForm } from "../claim-form-context"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
  CalendarIcon,
  AlertCircle,
  FileText,
  Camera,
  Upload,
  X,
  Shield,
  FileCheckIcon as FileReport,
  Activity,
  Car,
} from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { FileUpload } from "@/components/ui/file-upload"

export default function AccidentDetails() {
  const { formData, updateFormData } = useClaimForm()

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

  // Handle friendly report document upload
  const handleFriendlyReportUpload = (file: File | null) => {
    if (file) {
      const document = {
        id: Date.now().toString(),
        name: file.name,
        type: file.type,
        url: URL.createObjectURL(file),
        size: file.size,
      }
      updateFormData({ friendlyReportDocument: document })
    } else {
      updateFormData({ friendlyReportDocument: null })
    }
  }

  // Handle photo upload
  const handlePhotoUpload = (file: File) => {
    const newPhoto = {
      id: Date.now().toString(),
      name: file.name,
      type: file.type,
      url: URL.createObjectURL(file),
      size: file.size,
    }

    updateFormData({
      damagePhotos: [...formData.damagePhotos, newPhoto],
    })
  }

  // Handle photo removal
  const handleRemovePhoto = (id: string) => {
    const updatedPhotos = formData.damagePhotos.filter((photo) => photo.id !== id)
    updateFormData({ damagePhotos: updatedPhotos })
  }

  // Handle file input change for photo upload
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      handlePhotoUpload(file)
      // Reset the input value so the same file can be selected again if needed
      e.target.value = ""
    }
  }

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
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.incidentDate && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.incidentDate ? format(formData.incidentDate, "PPP") : <span>Select date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.incidentDate || undefined}
                    onSelect={handleDateChange}
                    initialFocus
                    disabled={(date) => date > new Date()}
                  />
                </PopoverContent>
              </Popover>
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
              rows={5}
              required
            />
          </div>
        </div>

        {/* Damage Documentation Section */}
        <div className="space-y-4 border border-zinc-200 rounded-md p-5 bg-zinc-50">
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
              placeholder="Describe the damage to your vehicle in detail (e.g., front bumper dented, driver's side door scratched, broken headlight)..."
              rows={4}
              className="w-full resize-y min-h-[100px]"
              required
            />
          </div>

          {/* Photo Upload Section */}
          <div className="space-y-2 mt-4">
            <Label className="text-zinc-900">
              Damage Photos <span className="text-zinc-500">(Optional)</span>
            </Label>
            <p className="text-sm text-zinc-500 mb-2">
              Upload clear photos showing the damage to your vehicle if available. This step is optional.
            </p>

            {/* Photo Upload Button */}
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="damage-photo-upload"
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-zinc-300 border-dashed rounded-lg cursor-pointer bg-white hover:bg-zinc-50 transition-colors"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-2 text-zinc-500" />
                  <p className="mb-1 text-sm text-zinc-500">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-zinc-500">JPG, PNG, JPEG (MAX. 10MB)</p>
                </div>
                <input
                  id="damage-photo-upload"
                  type="file"
                  className="hidden"
                  accept="image/jpeg,image/png,image/jpg"
                  onChange={handleFileInputChange}
                />
              </label>
            </div>

            {/* Photo Preview Grid */}
            {formData.damagePhotos.length > 0 && (
              <div className="mt-4">
                <h5 className="text-sm font-medium text-zinc-700 mb-2">
                  Uploaded Photos ({formData.damagePhotos.length})
                </h5>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {formData.damagePhotos.map((photo) => (
                    <div key={photo.id} className="relative group border rounded-md overflow-hidden bg-white">
                      {/* Photo Preview */}
                      <div className="aspect-square relative">
                        <img
                          src={photo.url || "/placeholder.svg"}
                          alt={photo.name}
                          className="w-full h-full object-cover"
                        />

                        {/* Remove Button */}
                        <button
                          type="button"
                          onClick={() => handleRemovePhoto(photo.id)}
                          className="absolute top-1 right-1 bg-white bg-opacity-80 rounded-full p-1 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                          aria-label="Remove photo"
                        >
                          <X className="h-4 w-4 text-zinc-700" />
                        </button>
                      </div>

                      {/* Photo Info */}
                      <div className="p-2 text-xs truncate">
                        <p className="font-medium truncate" title={photo.name}>
                          {photo.name}
                        </p>
                        <p className="text-zinc-500">{(photo.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-md font-medium text-zinc-900">Additional Information</h4>

          {/* Police Involvement Section */}
          <div className="border border-zinc-200 rounded-md overflow-hidden">
            <div className="bg-zinc-50 px-4 py-3 flex items-center justify-between">
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

          {/* Traffic Service Involvement Section - Now as a separate box */}
          <div className="border border-zinc-200 rounded-md overflow-hidden">
            <div className="bg-zinc-50 px-4 py-3 flex items-center justify-between">
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
            <div className="bg-zinc-50 px-4 py-3 flex items-center justify-between">
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
              <div className="p-4 space-y-4 animate-in fade-in duration-300">
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <FileText className="h-5 w-5 text-zinc-500 mt-0.5" />
                    <div>
                      <Label htmlFor="friendlyReportDocument" className="text-zinc-900">
                        Upload Friendly Accident Report
                      </Label>
                      <p className="text-sm text-zinc-500 mb-2">
                        Please upload a scanned copy or photo of the friendly accident report.
                      </p>
                    </div>
                  </div>
                  <FileUpload
                    id="friendlyReportDocument"
                    onChange={handleFriendlyReportUpload}
                    maxSize={10} // 10MB max size
                    accept={{
                      "image/*": [".jpeg", ".jpg", ".png"],
                      "application/pdf": [".pdf"],
                    }}
                    previewUrl={formData.friendlyReportDocument?.url}
                    previewName={formData.friendlyReportDocument?.name}
                    previewType={formData.friendlyReportDocument?.type}
                    previewSize={formData.friendlyReportDocument?.size}
                    required={formData.friendlyReport}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Bodily Injuries Section */}
          <div className="border border-zinc-200 rounded-md overflow-hidden">
            <div className="bg-zinc-50 px-4 py-3 flex items-center justify-between">
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
              <div className="p-4 space-y-4 animate-in fade-in duration-300">
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-5 w-5 text-zinc-500 mt-0.5" />
                    <div>
                      <Label htmlFor="bodilyInjuriesDescription" className="text-zinc-900">
                        Bodily Injuries Description
                      </Label>
                      <p className="text-sm text-zinc-500 mb-2">
                        Please provide details about the injuries sustained in the accident.
                      </p>
                    </div>
                  </div>
                  <Textarea
                    id="bodilyInjuriesDescription"
                    name="bodilyInjuriesDescription"
                    value={formData.bodilyInjuriesDescription}
                    onChange={handleChange}
                    placeholder="Describe the nature and extent of the injuries, who was injured, and any medical attention received..."
                    rows={4}
                    className="w-full resize-y min-h-[100px]"
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
