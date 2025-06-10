"use client"

import type React from "react"

import { useState } from "react"
import { useGeneralClaimForm } from "../general-claim-form-context"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  CheckCircle2,
  Download,
  Mail,
  FileText,
  FileIcon as FilePdf,
  FileImage,
  FileVideo,
  Loader2,
} from "lucide-react"
import { format } from "date-fns"
import { toast } from "@/components/ui/use-toast"
import { generateClaimGeneralPDF } from "@/lib/generate-pdf"
import { sendConfirmationEmail } from "@/app/actions/email-actions"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import Image from "next/image"
import { useTranslations } from 'next-intl'
import { useIsMobile } from "@/hooks/use-mobile"
import { uploadPdfToStorage } from "@/lib/utils"

export default function ReviewSubmit() {
  const { formData, setIsSubmitted, setIsSubmitting } = useGeneralClaimForm()
  const [isLocalSubmitted, setIsLocalSubmitted] = useState(false)
  const [claimNumber, setClaimNumber] = useState("")
  const [pdfUrl, setPdfUrl] = useState<string | null>(null)
  const [pdfBuffer, setPdfBuffer] = useState<Buffer | null>(null)
  const [isEmailSent, setIsEmailSent] = useState(false)
  const [isSendingEmail, setIsSendingEmail] = useState(false)
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false)
  const [pdfGenerationError, setPdfGenerationError] = useState<string | null>(null)

  const tReview = useTranslations('GeneralClaimAuto.ReviewSubmit')
  const t = useTranslations()
  const isMobile = useIsMobile()

  // const handleEditSection = (step: number) => {
  //   setCurrentStep(step)
  //   window.scrollTo(0, 0)
  // }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setPdfGenerationError(null)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Generate a random claim reference number
      const generatedClaimNumber = Math.random().toString(36).substring(2, 10).toUpperCase()

      // Generate PDF - only do this once with the generated claim number
      setIsGeneratingPdf(true)
      const { dataUrl, buffer } = await generateClaimGeneralPDF(formData, generatedClaimNumber, t )
      const publicUrl = await uploadPdfToStorage(buffer, generatedClaimNumber)

      if (!dataUrl || !publicUrl) {
        throw new Error("Failed to generate PDF")
      }

      // Update all state at once to prevent cascading renders
      setClaimNumber(generatedClaimNumber)
      setPdfUrl(publicUrl)
      setPdfBuffer(buffer)
      setIsLocalSubmitted(true)
      setIsSubmitted(true) // Update the context state

      toast({
        title: "Claim Submitted Successfully",
        description: "Your claim has been submitted. You will receive a confirmation email shortly.",
      })

      // Clear local storage
      if (typeof window !== "undefined") {
        localStorage.removeItem("generalClaimFormData")
        localStorage.removeItem("generalClaimFormStep")
      }
    } catch (error) {
      console.error("Error during submission:", error)
      setPdfGenerationError("There was an error generating your claim summary. Please try again.")
      toast({
        title: "Submission Error",
        description: "There was an error submitting your claim. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
      setIsGeneratingPdf(false)
    }
  }

  const handleDownloadPdf = () => {
    if (!pdfUrl) {
      toast({
        title: "Download Error",
        description: "PDF is not available for download. Please try again.",
        variant: "destructive",
      })
      return
    }

    try {
      // Create a link element and trigger download
      const link = document.createElement("a")
      link.href = pdfUrl
      link.download = `Claim_Summary_${claimNumber}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      toast({
        title: "Download Started",
        description: "Your claim summary PDF is being downloaded.",
      })
    } catch (error) {
      console.error("Error downloading PDF:", error)
      toast({
        title: "Download Error",
        description: "There was an error downloading your PDF. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleRegeneratePdf = async () => {
    if (!claimNumber) return

    setIsGeneratingPdf(true)
    setPdfGenerationError(null)

    try {
      const { dataUrl, buffer } = await generateClaimGeneralPDF(formData, claimNumber, t )

      if (!dataUrl) {
        throw new Error("Failed to regenerate PDF")
      }

      setPdfUrl(dataUrl)
      setPdfBuffer(buffer)

      toast({
        title: "PDF Regenerated",
        description: "Your claim summary PDF has been regenerated successfully.",
      })
    } catch (error) {
      console.error("Error regenerating PDF:", error)
      setPdfGenerationError("There was an error regenerating your PDF. Please try again.")
      toast({
        title: "PDF Generation Error",
        description: "There was an error regenerating your PDF. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGeneratingPdf(false)
    }
  }

  const handleSendEmail = async () => {
    if (!pdfBuffer || !claimNumber) return

    setIsSendingEmail(true)
    try {
      const result = await sendConfirmationEmail(formData, claimNumber, pdfBuffer.toString('base64'))

      if (result.success) {
        setIsEmailSent(true)
        toast({
          title: "Email Sent Successfully",
          description: `A confirmation email has been sent to ${formData.email}`,
        })
      } else {
        toast({
          title: "Failed to Send Email",
          description: "There was an error sending the confirmation email. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error sending email:", error)
      toast({
        title: "Failed to Send Email",
        description: "There was an error sending the confirmation email. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSendingEmail(false)
    }
  }

  // Helper function to get file icon based on file type
  const getFileIcon = (type: string) => {
    if (type.includes("pdf")) {
      return <FilePdf className="h-5 w-5 text-red-500" />
    } else if (type.includes("image")) {
      return <FileImage className="h-5 w-5 text-blue-500" />
    } else if (type.includes("video")) {
      return <FileVideo className="h-5 w-5 text-purple-500" />
    } else {
      return <FileText className="h-5 w-5 text-zinc-500" />
    }
  }

  // Format file size
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " bytes"
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB"
    return (bytes / (1024 * 1024)).toFixed(1) + " MB"
  }

  if (isLocalSubmitted) {
    // Return a standalone confirmation screen without the form structure
    return (
      <div className="text-center py-8">
        <div className="px-4 sm:px-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-zinc-100 mb-4">
            <CheckCircle2 className="h-8 w-8 text-zinc-600" />
          </div>
          <h3 className="text-xl font-medium text-zinc-900 mb-2">{tReview('claimSubmittedTitle')}</h3>
          <p className="text-zinc-500 mb-6">{tReview('claimSubmittedDesc')}</p>
          <div className="p-4 bg-zinc-50 rounded-md border border-zinc-200 mb-6 text-left">
            <p className="text-sm text-zinc-500">
              <strong>{tReview('referenceNumber')}</strong> {claimNumber}
            </p>
            <p className="text-sm text-zinc-500">
              <strong>{tReview('submissionDate')}</strong> {format(new Date(), "PPP")}
            </p>
          </div>

          {pdfGenerationError ? (
            <div className="mb-6">
              <p className="text-sm text-red-500 mb-2">{tReview('pdfGenerationError')}</p>
              <Button
                variant="outline"
                onClick={handleRegeneratePdf}
                className="flex items-center gap-2"
                disabled={isGeneratingPdf}
              >
                {isGeneratingPdf ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {tReview('regeneratingPdf')}
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4" />
                    {tReview('regeneratePdf')}
                  </>
                )}
              </Button>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <Button
                onClick={() => {
                  if (isMobile && pdfUrl) {
                    window.open(pdfUrl, '_blank')
                    toast({
                      title: 'PDF abierto',
                      description: 'El PDF se ha abierto en una nueva pestaña. Usa la opción "Compartir" o "Abrir en..." para guardarlo.',
                    })
                  } else {
                    handleDownloadPdf()
                  }
                }}
                className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-900"
                disabled={!pdfUrl || isGeneratingPdf}
              >
                {isGeneratingPdf ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {tReview('generatingPdf')}
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4" />
                    {tReview('downloadClaimSummary')}
                  </>
                )}
              </Button>

              <Button
                onClick={handleSendEmail}
                variant="outline"
                className="flex items-center gap-2"
                disabled={isSendingEmail || isEmailSent || !pdfBuffer || isGeneratingPdf}
              >
                {isSendingEmail ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {tReview('sending')}
                  </>
                ) : isEmailSent ? (
                  <>
                    <Mail className="h-4 w-4" />
                    {tReview('emailSent')}
                  </>
                ) : (
                  <>
                    <Mail className="h-4 w-4" />
                    {tReview('sendConfirmationEmail')}
                  </>
                )}
              </Button>
            </div>
          )}

          {isEmailSent && (
            <p className="text-sm text-zinc-500 mt-4">
              {tReview('emailSentDesc', { email: formData.email })}
            </p>
          )}

          <div className="mt-8 text-sm text-zinc-500">
            <p>{tReview('needHelp')}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <Card className="border-none shadow-none">
      <CardContent className="p-0 space-y-6">
        <div className="px-4 sm:px-6">
          <div className="space-y-2">
            <h3 className="text-lg font-medium text-zinc-900">{tReview('reviewYourClaim')}</h3>
            <p className="text-sm text-zinc-500">{tReview('reviewYourClaimDesc')}</p>
          </div>

          <Accordion type="multiple" defaultValue={["policy"]}>
            {/* Policy Information */}
            <AccordionItem value="policy" className="border border-zinc-200 rounded-md mb-4">
              <AccordionTrigger className="px-4 hover:no-underline hover:bg-zinc-50">
                <div className="flex justify-between items-center w-full">
                  <span className="font-medium">{tReview('policyInformation')}</span>
                  {/* <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 gap-1 text-zinc-500"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleEditSection(1)
                    }}
                  >
                    <Edit className="h-4 w-4" />
                    {tReview('edit')}
                  </Button> */}
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4 pt-2">
                <dl className="grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-zinc-500">{tReview('fullName')}</dt>
                    <dd className="mt-1 text-sm text-zinc-900">
                      {formData.firstName} {formData.lastName}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-zinc-500">{tReview('emailAddress')}</dt>
                    <dd className="mt-1 text-sm text-zinc-900">{formData.email}</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-zinc-500">{tReview('phoneNumber')}</dt>
                    <dd className="mt-1 text-sm text-zinc-900">{formData.phone}</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-zinc-500">{tReview('policyNumber')}</dt>
                    <dd className="mt-1 text-sm text-zinc-900">{formData.policyNumber}</dd>
                  </div>
                </dl>
              </AccordionContent>
            </AccordionItem>

            {/* Accident Details */}
            <AccordionItem value="accident" className="border border-zinc-200 rounded-md mb-4">
              <AccordionTrigger className="px-4 hover:no-underline hover:bg-zinc-50">
                <div className="flex justify-between items-center w-full">
                  <span className="font-medium">{tReview('accidentDetails')}</span>
                  {/* <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 gap-1 text-zinc-500"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleEditSection(2)
                    }}
                  >
                    <Edit className="h-4 w-4" />
                    {tReview('edit')}
                  </Button> */}
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4 pt-2">
                <dl className="grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-zinc-500">{tReview('location')}</dt>
                    <dd className="mt-1 text-sm text-zinc-900">{formData.accidentLocation}</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-zinc-500">{tReview('incidentDate')}</dt>
                    <dd className="mt-1 text-sm text-zinc-900">
                      {formData.accidentDate ? format(formData.accidentDate, "PPP") : "Not specified"}
                    </dd>
                  </div>
                  <div className="sm:col-span-2">
                    <dt className="text-sm font-medium text-zinc-500">{tReview('description')}</dt>
                    <dd className="mt-1 text-sm text-zinc-900">{formData.accidentDescription}</dd>
                  </div>

                  {/* Display damage description */}
                  <div className="sm:col-span-2 mt-2">
                    <dt className="text-sm font-medium text-zinc-500">{tReview('damageDescription')}</dt>
                    <dd className="mt-1 text-sm text-zinc-900 p-3 bg-zinc-50 rounded-md border border-zinc-100">
                      {formData.damageDescription}
                    </dd>
                  </div>

                  {/* Display damage photos if available */}
                  {formData.damagePhotos.length > 0 && (
                    <div className="sm:col-span-2 mt-2">
                      <dt className="text-sm font-medium text-zinc-500">
                        {tReview('damagePhotos')} ({formData.damagePhotos.length})
                      </dt>
                      <dd className="mt-1 text-sm text-zinc-900 p-3 bg-zinc-50 rounded-md border border-zinc-100">
                        <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                          {formData.damagePhotos.map((photo) => (
                            <Dialog key={photo.id}>
                              <DialogTrigger asChild>
                                <div className="aspect-square rounded-md overflow-hidden border border-zinc-200 cursor-pointer hover:opacity-90 transition-opacity">
                                  <Image
                                    src={photo.url || "/placeholder.svg"}
                                    alt={photo.name}
                                    width={400}
                                    height={400}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[800px] p-1">
                                <div className="w-full h-full flex items-center justify-center">
                                  <Image
                                    src={photo.url || "/placeholder.svg"}
                                    alt={photo.name}
                                    className="max-w-full max-h-[70vh] object-contain"
                                    width={400}
                                    height={400}
                                  />
                                </div>
                              </DialogContent>
                            </Dialog>
                          ))}
                        </div>
                      </dd>
                    </div>
                  )}
                </dl>
              </AccordionContent>
            </AccordionItem>

            {/* Additional Information */}
            <AccordionItem value="additional" className="border border-zinc-200 rounded-md mb-4">
              <AccordionTrigger className="px-4 hover:no-underline hover:bg-zinc-50">
                <div className="flex justify-between items-center w-full">
                  <span className="font-medium">{tReview('additionalInformation')}</span>
                  {/* <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 gap-1 text-zinc-500"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleEditSection(3)
                    }}
                  >
                    <Edit className="h-4 w-4" />
                    {tReview('edit')}
                  </Button> */}
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4 pt-2">
                <dl className="grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-zinc-500">{tReview('policeInvolved')}</dt>
                    <dd className="mt-1 text-sm text-zinc-900">{formData.policeInvolved ? "Yes" : "No"}</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-zinc-500">{tReview('trafficServiceInvolved')}</dt>
                    <dd className="mt-1 text-sm text-zinc-900">{formData.trafficServiceInvolved ? "Yes" : "No"}</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-zinc-500">{tReview('firefightersInvolved')}</dt>
                    <dd className="mt-1 text-sm text-zinc-900">{formData.firefightersInvolved ? "Yes" : "No"}</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-zinc-500">{tReview('policeReport')}</dt>
                    <dd className="mt-1 text-sm text-zinc-900">{formData.policeReport ? "Yes" : "No"}</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-zinc-500">{tReview('bodilyInjuries')}</dt>
                    <dd className="mt-1 text-sm text-zinc-900">{formData.bodilyInjuries ? "Yes" : "No"}</dd>
                  </div>

                  {/* Display police report document if available */}
                  {formData.policeReport && formData.policeReportDocument && (
                    <div className="sm:col-span-2 mt-2">
                      <dt className="text-sm font-medium text-zinc-500">{tReview('policeReportDocument')}</dt>
                      <dd className="mt-1 text-sm text-zinc-900 p-3 bg-zinc-50 rounded-md border border-zinc-100">
                        <div className="flex items-center gap-2">
                          {getFileIcon(formData.policeReportDocument.type)}
                          <div>
                            <p className="font-medium">{formData.policeReportDocument.name}</p>
                            <p className="text-xs text-zinc-500">{formatFileSize(formData.policeReportDocument.size)}</p>
                          </div>
                          <a
                            href={formData.policeReportDocument.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-auto text-xs text-zinc-600 hover:text-zinc-900 underline"
                          >
                            {tReview('view')}
                          </a>
                        </div>
                      </dd>
                    </div>
                  )}

                  {/* Display bodily injuries description if available */}
                  {formData.bodilyInjuries && formData.bodilyInjuriesDescription && (
                    <div className="sm:col-span-2 mt-2">
                      <dt className="text-sm font-medium text-zinc-500">{tReview('injuriesDescription')}</dt>
                      <dd className="mt-1 text-sm text-zinc-900 p-3 bg-zinc-50 rounded-md border border-zinc-100">
                        {formData.bodilyInjuriesDescription}
                      </dd>
                    </div>
                  )}

                  {/* Display medical report document if available */}
                  {formData.bodilyInjuries && formData.medicalReportDocument && (
                    <div className="sm:col-span-2 mt-2">
                      <dt className="text-sm font-medium text-zinc-500">{tReview('medicalReportDocument')}</dt>
                      <dd className="mt-1 text-sm text-zinc-900 p-3 bg-zinc-50 rounded-md border border-zinc-100">
                        <div className="flex items-center gap-2">
                          {getFileIcon(formData.medicalReportDocument.type)}
                          <div>
                            <p className="font-medium">{formData.medicalReportDocument.name}</p>
                            <p className="text-xs text-zinc-500">{formatFileSize(formData.medicalReportDocument.size)}</p>
                          </div>
                          <a
                            href={formData.medicalReportDocument.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-auto text-xs text-zinc-600 hover:text-zinc-900 underline"
                          >
                            {tReview('view')}
                          </a>
                        </div>
                      </dd>
                    </div>
                  )}
                </dl>
              </AccordionContent>
            </AccordionItem>

            {/* Involved Parties */}
            <AccordionItem value="parties" className="border border-zinc-200 rounded-md mb-4">
              <AccordionTrigger className="px-4 hover:no-underline hover:bg-zinc-50">
                <div className="flex justify-between items-center w-full">
                  <span className="font-medium">{tReview('involvedParties')}</span>
                  {/* <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 gap-1 text-zinc-500"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleEditSection(4)
                    }}
                  >
                    <Edit className="h-4 w-4" />
                    {tReview('edit')}
                  </Button> */}
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4 pt-2">
                <div className="space-y-4">
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-zinc-500">{tReview('otherPartiesInvolved')}</dt>
                    <dd className="mt-1 text-sm text-zinc-900">{formData.hasInvolvedParties ? "Yes" : "No"}</dd>
                  </div>

                  {formData.hasInvolvedParties && (
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-zinc-500">{tReview('knowsInvolvedPerson')}</dt>
                      <dd className="mt-1 text-sm text-zinc-900">{formData.knowsInvolvedPerson ? "Yes" : "No"}</dd>
                    </div>
                  )}

                  {formData.hasInvolvedParties && formData.knowsInvolvedPerson && formData.involvedParties.length > 0 ? (
                    <div>
                      <h4 className="text-sm font-medium text-zinc-500 mb-2">{tReview('involvedParties')}</h4>
                      <ul className="space-y-4">
                        {formData.involvedParties.map((party, index) => (
                          <li key={index} className="border border-zinc-100 rounded-md p-3">
                            <div className="grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
                              <div className="sm:col-span-1">
                                <dt className="text-sm font-medium text-zinc-500">{tReview('name')}</dt>
                                <dd className="mt-1 text-sm text-zinc-900">{party.fullName}</dd>
                              </div>
                              <div className="sm:col-span-1">
                                <dt className="text-sm font-medium text-zinc-500">{tReview('contact')}</dt>
                                <dd className="mt-1 text-sm text-zinc-900">
                                  {party.email} {party.phone ? `/ ${party.phone}` : ""}
                                </dd>
                              </div>
                              <div className="sm:col-span-1">
                                <dt className="text-sm font-medium text-zinc-500">{tReview('insurance')}</dt>
                                <dd className="mt-1 text-sm text-zinc-900">
                                  {party.insuranceCompany} {party.policyNumber ? `(${party.policyNumber})` : ""}
                                </dd>
                              </div>
                              <div className="sm:col-span-2">
                                <dt className="text-sm font-medium text-zinc-500">{tReview('involvement')}</dt>
                                <dd className="mt-1 text-sm text-zinc-900">{party.description}</dd>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    formData.hasInvolvedParties &&
                    formData.knowsInvolvedPerson && <p className="text-sm text-zinc-500">{tReview('noInvolvedParties')}</p>
                  )}

                  {formData.testimonies.length > 0 ? (
                    <div>
                      <h4 className="text-sm font-medium text-zinc-500 mb-2">{tReview('testimonies')}</h4>
                      <ul className="space-y-4">
                        {formData.testimonies.map((testimony, index) => (
                          <li key={index} className="border border-zinc-100 rounded-md p-3">
                            <div className="grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
                              <div className="sm:col-span-1">
                                <dt className="text-sm font-medium text-zinc-500">{tReview('name')}</dt>
                                <dd className="mt-1 text-sm text-zinc-900">{testimony.fullName}</dd>
                              </div>
                              <div className="sm:col-span-1">
                                <dt className="text-sm font-medium text-zinc-500">{tReview('contact')}</dt>
                                <dd className="mt-1 text-sm text-zinc-900">
                                  {testimony.email} {testimony.phone ? `/ ${testimony.phone}` : ""}
                                </dd>
                              </div>
                              <div className="sm:col-span-2">
                                <dt className="text-sm font-medium text-zinc-500">{tReview('testimony')}</dt>
                                <dd className="mt-1 text-sm text-zinc-900">{testimony.description}</dd>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <p className="text-sm text-zinc-500">{tReview('noTestimonies')}</p>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Additional Documentation */}
            <AccordionItem value="documents" className="border border-zinc-200 rounded-md mb-4">
              <AccordionTrigger className="px-4 hover:no-underline hover:bg-zinc-50">
                <div className="flex justify-between items-center w-full">
                  <span className="font-medium">{tReview('additionalDocumentation')}</span>
                  {/* <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 gap-1 text-zinc-500"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleEditSection(5)
                    }}
                  >
                    <Edit className="h-4 w-4" />
                    {tReview('edit')}
                  </Button> */}
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4 pt-2">
                {formData.additionalDocuments.length > 0 ? (
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-zinc-500 mb-2">{tReview('additionalDocuments')}</h4>
                    <ul className="space-y-2">
                      {formData.additionalDocuments.map((doc) => (
                        <li
                          key={doc.id}
                          className="flex items-center justify-between py-2 border-b border-zinc-100 last:border-0"
                        >
                          <div className="flex items-center gap-2">
                            {getFileIcon(doc.type)}
                            <span className="text-sm text-zinc-900">{doc.name}</span>
                            <span className="text-xs text-zinc-500 capitalize">({doc.type.split("/")[1] || "file"})</span>
                          </div>
                          <a
                            href={doc.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-zinc-600 hover:text-zinc-900 underline"
                          >
                            {tReview('view')}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <p className="text-sm text-zinc-500 mb-4">{tReview('noAdditionalDocuments')}</p>
                )}

                {formData.additionalComments && (
                  <div>
                    <h4 className="text-sm font-medium text-zinc-500 mb-2">{tReview('additionalComments')}</h4>
                    <div className="p-3 bg-zinc-50 rounded-md border border-zinc-100">
                      <p className="text-sm text-zinc-900">{formData.additionalComments}</p>
                    </div>
                  </div>
                )}
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="border-t border-zinc-200 pt-6">
            <form id="review-form" onSubmit={handleSubmit}>
              <div className="flex items-center mb-6">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  className="h-4 w-4 rounded border-zinc-300 text-zinc-600 focus:ring-zinc-600"
                  required
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-zinc-500">
                  {tReview('confirmInfo')}
                </label>
              </div>

              <div className="flex justify-end">
                {/* <Button type="submit" className="w-full sm:w-auto bg-zinc-800 hover:bg-zinc-900" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      {tReview('submitting')}
                    </div>
                  ) : (
                    tReview('submitClaim')
                  )}
                </Button> */}
              </div>
            </form>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
