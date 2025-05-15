"use client"

import type React from "react"
import { useGeneralClaimForm } from "../general-claim-form-context"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { FileText } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"
import { UnifiedUpload, type MediaFile } from "@/components/ui/unified-upload"

export default function AdditionalDocumentation() {
  const { formData, updateFormData } = useGeneralClaimForm()
  const isMobile = useIsMobile()

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target
    updateFormData({ [name]: value })
  }

  // Handle additional documents change
  const handleDocumentsChange = (files: MediaFile | MediaFile[] | null) => {
    updateFormData({ additionalDocuments: Array.isArray(files) ? files : files ? [files] : [] })
  }

  return (
    <Card className="border-none shadow-none">
      <CardContent className="p-0 space-y-6">
        <div className="space-y-2">
          <h3 className="text-lg font-medium text-zinc-900">Additional Documentation</h3>
          <p className="text-sm text-zinc-500">
            Upload any additional documents that may be relevant to your claim and provide any additional comments.
          </p>
        </div>

        <div className="space-y-4">
          {/* Additional Documents Upload */}
          <UnifiedUpload
            label="Additional Documents"
            description="Upload any additional documents that may support your claim (receipts, contracts, etc.)."
            value={formData.additionalDocuments}
            onChange={handleDocumentsChange}
            multiple={true}
            maxSize={10}
            maxFiles={10}
            accept={{
              "image/*": [".jpeg", ".jpg", ".png"],
              "application/pdf": [".pdf"],
              "application/msword": [".doc"],
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
            }}
            placeholder="Upload documents"
            buttonText="Select files"
            mobileButtonText="Add files"
            icon={<FileText className="w-7 h-7 sm:w-8 sm:h-8 mb-2 text-zinc-500" />}
            successMessage="Documents uploaded successfully!"
            mobileSuccessMessage="Documents added!"
          />

          {/* Additional Comments */}
          <div className="space-y-2">
            <Label htmlFor="additionalComments">Additional Comments</Label>
            <Textarea
              id="additionalComments"
              name="additionalComments"
              value={formData.additionalComments}
              onChange={handleChange}
              placeholder="Provide any additional information or comments that may be relevant to your claim..."
              rows={isMobile ? 4 : 6}
              className="w-full resize-y min-h-[100px] sm:min-h-[150px]"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
