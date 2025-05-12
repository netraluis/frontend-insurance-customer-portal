"use client"

import type React from "react"

import { useState } from "react"
import { useClaimForm } from "@/app/components/claim-form-context"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { CheckCircle2, Edit, Download, Mail } from "lucide-react"
import { format } from "date-fns"
import { Toaster} from "@/components/ui/sonner"
import { generateClaimPDF } from "@/lib/generate-pdf"
import { sendConfirmationEmail } from "@/app/actions/email-actions"
import { toast } from "sonner"

export default function ReviewSubmit() {
  const { formData, setCurrentStep, setIsSubmitted } = useClaimForm()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLocalSubmitted, setIsLocalSubmitted] = useState(false)
  const [claimNumber, setClaimNumber] = useState("")
  const [pdfUrl, setPdfUrl] = useState<string | null>(null)
  const [pdfBuffer, setPdfBuffer] = useState<Buffer | null>(null)
  const [isEmailSent, setIsEmailSent] = useState(false)
  const [isSendingEmail, setIsSendingEmail] = useState(false)

  const handleEditSection = (step: number) => {
    setCurrentStep(step)
    window.scrollTo(0, 0)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Generate a random claim reference number
    const generatedClaimNumber = Math.random().toString(36).substring(2, 10).toUpperCase()

    // Generate PDF - only do this once with the generated claim number
    const { dataUrl, buffer } = generateClaimPDF(formData, generatedClaimNumber)

    // Update all state at once to prevent cascading renders
    setClaimNumber(generatedClaimNumber)
    setPdfUrl(dataUrl)
    setPdfBuffer(buffer)
    setIsSubmitting(false)
    setIsLocalSubmitted(true)
    setIsSubmitted(true) // Update the context state

    toast("Claim Submitted Successfully")
    // Clear local storage
    if (typeof window !== "undefined") {
      localStorage.removeItem("autoClaimFormData")
      localStorage.removeItem("autoClaimFormStep")
    }
  }

  const handleDownloadPdf = () => {
    if (!pdfUrl) return

    // Create a link element and trigger download
    const link = document.createElement("a")
    link.href = pdfUrl
    link.download = `Claim_Summary_${claimNumber}.pdf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleSendEmail = async () => {
    if (!pdfBuffer || !claimNumber) return

    setIsSendingEmail(true)

    try {
      const result = await sendConfirmationEmail(formData, claimNumber, pdfBuffer)

      if (result.success) {
        setIsEmailSent(true)

        toast(`A confirmation email has been sent to ${formData.email}`)
      } else {
        toast.error("There was an error sending the confirmation email. Please try again.")
      }
    } catch (error) {
      console.error("Error sending email:", error)
      toast.error("There was an error sending the confirmation email. Please try again.")
    } finally {
      setIsSendingEmail(false)
    }
  }

  if (isLocalSubmitted) {
    // Return a standalone confirmation screen without the form structure
    return (
      <div className="text-center py-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-zinc-100 mb-4">
          <CheckCircle2 className="h-8 w-8 text-zinc-600" />
        </div>
        <h3 className="text-xl font-medium text-zinc-900 mb-2">Claim Submitted Successfully</h3>
        <p className="text-zinc-500 mb-6">
          Your claim has been submitted. You will receive a confirmation email shortly with your claim number and next
          steps.
        </p>
        <div className="p-4 bg-zinc-50 rounded-md border border-zinc-200 mb-6 text-left">
          <p className="text-sm text-zinc-500">
            <strong>Reference Number:</strong> {claimNumber}
          </p>
          <p className="text-sm text-zinc-500">
            <strong>Submission Date:</strong> {format(new Date(), "PPP")}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="outline" onClick={handleDownloadPdf} className="flex items-center gap-2" disabled={!pdfUrl}>
            <Download className="h-4 w-4" />
            Download Claim Summary
          </Button>

          <Button
            onClick={handleSendEmail}
            className="flex items-center gap-2"
            disabled={isSendingEmail || isEmailSent || !pdfBuffer}
          >
            <Mail className="h-4 w-4" />
            {isSendingEmail ? "Sending..." : isEmailSent ? "Email Sent" : "Send Confirmation Email"}
          </Button>
        </div>

        {isEmailSent && (
          <p className="text-sm text-zinc-500 mt-4">
            A confirmation email with your claim details has been sent to {formData.email}
          </p>
        )}
      </div>
    )
  }

  return (
    <Card className="border-none shadow-none">
      <CardContent className="p-0 space-y-6">
        <div className="space-y-2">
          <h3 className="text-lg font-medium text-zinc-900">Review Your Claim</h3>
          <p className="text-sm text-zinc-500">Please review all the information before submitting your claim.</p>
        </div>

        <Accordion type="multiple" defaultValue={["policy"]}>
          {/* Policy Information */}
          <AccordionItem value="policy" className="border border-zinc-200 rounded-md mb-4">
            <AccordionTrigger className="px-4 hover:no-underline hover:bg-zinc-50">
              <div className="flex justify-between items-center w-full">
                <span className="font-medium">Policy Information</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 gap-1 text-zinc-500"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleEditSection(1)
                  }}
                >
                  <Edit className="h-4 w-4" />
                  Edit
                </Button>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4 pt-2">
              <dl className="grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-zinc-500">Full Name</dt>
                  <dd className="mt-1 text-sm text-zinc-900">
                    {formData.firstName} {formData.lastName}
                  </dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-zinc-500">Email Address</dt>
                  <dd className="mt-1 text-sm text-zinc-900">{formData.email}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-zinc-500">Phone Number</dt>
                  <dd className="mt-1 text-sm text-zinc-900">{formData.phone}</dd>
                </div>
              </dl>
            </AccordionContent>
          </AccordionItem>

          {/* Vehicle Information */}
          <AccordionItem value="vehicle" className="border border-zinc-200 rounded-md mb-4">
            <AccordionTrigger className="px-4 hover:no-underline hover:bg-zinc-50">
              <div className="flex justify-between items-center w-full">
                <span className="font-medium">Vehicle Information</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 gap-1 text-zinc-500"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleEditSection(2)
                  }}
                >
                  <Edit className="h-4 w-4" />
                  Edit
                </Button>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4 pt-2">
              <dl className="grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-zinc-500">Vehicle</dt>
                  <dd className="mt-1 text-sm text-zinc-900">
                    {formData.vehicleMake} {formData.vehicleModel}
                  </dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-zinc-500">License Plate</dt>
                  <dd className="mt-1 text-sm text-zinc-900">{formData.licensePlate}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-zinc-500">Coverage Type</dt>
                  <dd className="mt-1 text-sm text-zinc-900 capitalize">{formData.coverageType}</dd>
                </div>
              </dl>
            </AccordionContent>
          </AccordionItem>

          {/* Accident Details */}
          <AccordionItem value="accident" className="border border-zinc-200 rounded-md mb-4">
            <AccordionTrigger className="px-4 hover:no-underline hover:bg-zinc-50">
              <div className="flex justify-between items-center w-full">
                <span className="font-medium">Accident Details</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 gap-1 text-zinc-500"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleEditSection(3)
                  }}
                >
                  <Edit className="h-4 w-4" />
                  Edit
                </Button>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4 pt-2">
              <dl className="grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-zinc-500">Location</dt>
                  <dd className="mt-1 text-sm text-zinc-900">{formData.accidentLocation}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-zinc-500">Incident Date</dt>
                  <dd className="mt-1 text-sm text-zinc-900">
                    {formData.incidentDate ? format(formData.incidentDate, "PPP") : "Not specified"}
                  </dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-sm font-medium text-zinc-500">Description</dt>
                  <dd className="mt-1 text-sm text-zinc-900">{formData.accidentDescription}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-zinc-500">Police Involved</dt>
                  <dd className="mt-1 text-sm text-zinc-900">{formData.policeInvolved ? "Yes" : "No"}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-zinc-500">Traffic Service Involved</dt>
                  <dd className="mt-1 text-sm text-zinc-900">{formData.trafficServiceInvolved ? "Yes" : "No"}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-zinc-500">Friendly Accident Report</dt>
                  <dd className="mt-1 text-sm text-zinc-900">{formData.friendlyReport ? "Yes" : "No"}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-zinc-500">Bodily Injuries</dt>
                  <dd className="mt-1 text-sm text-zinc-900">{formData.bodilyInjuries ? "Yes" : "No"}</dd>
                </div>
              </dl>
            </AccordionContent>
          </AccordionItem>

          {/* Involved Parties */}
          <AccordionItem value="parties" className="border border-zinc-200 rounded-md mb-4">
            <AccordionTrigger className="px-4 hover:no-underline hover:bg-zinc-50">
              <div className="flex justify-between items-center w-full">
                <span className="font-medium">Involved Parties</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 gap-1 text-zinc-500"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleEditSection(4)
                  }}
                >
                  <Edit className="h-4 w-4" />
                  Edit
                </Button>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4 pt-2">
              <div className="space-y-4">
                {formData.drivers.length > 0 ? (
                  <div>
                    <h4 className="text-sm font-medium text-zinc-500 mb-2">Other Drivers</h4>
                    <ul className="space-y-4">
                      {formData.drivers.map((driver, index) => (
                        <li key={index} className="border border-zinc-100 rounded-md p-3">
                          <div className="grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
                            <div className="sm:col-span-1">
                              <dt className="text-sm font-medium text-zinc-500">Name</dt>
                              <dd className="mt-1 text-sm text-zinc-900">
                                {driver.firstName} {driver.lastName}
                              </dd>
                            </div>
                            <div className="sm:col-span-1">
                              <dt className="text-sm font-medium text-zinc-500">Contact</dt>
                              <dd className="mt-1 text-sm text-zinc-900">
                                {driver.email} / {driver.phone}
                              </dd>
                            </div>
                            <div className="sm:col-span-1">
                              <dt className="text-sm font-medium text-zinc-500">Vehicle</dt>
                              <dd className="mt-1 text-sm text-zinc-900">
                                {driver.vehicleMake} {driver.vehicleModel} ({driver.licensePlate})
                              </dd>
                            </div>
                            <div className="sm:col-span-1">
                              <dt className="text-sm font-medium text-zinc-500">Insurance</dt>
                              <dd className="mt-1 text-sm text-zinc-900">
                                {driver.insuranceCompany} - {driver.policyNumber}
                              </dd>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <p className="text-sm text-zinc-500">No other drivers added.</p>
                )}

                {formData.witnesses.length > 0 ? (
                  <div>
                    <h4 className="text-sm font-medium text-zinc-500 mb-2">Witnesses</h4>
                    <ul className="space-y-4">
                      {formData.witnesses.map((witness, index) => (
                        <li key={index} className="border border-zinc-100 rounded-md p-3">
                          <div className="grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
                            <div className="sm:col-span-1">
                              <dt className="text-sm font-medium text-zinc-500">Name</dt>
                              <dd className="mt-1 text-sm text-zinc-900">
                                {witness.firstName} {witness.lastName}
                              </dd>
                            </div>
                            <div className="sm:col-span-1">
                              <dt className="text-sm font-medium text-zinc-500">Contact</dt>
                              <dd className="mt-1 text-sm text-zinc-900">
                                {witness.email} / {witness.phone}
                              </dd>
                            </div>
                            <div className="sm:col-span-2">
                              <dt className="text-sm font-medium text-zinc-500">Statement</dt>
                              <dd className="mt-1 text-sm text-zinc-900">{witness.description}</dd>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <p className="text-sm text-zinc-500">No witnesses added.</p>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Documentation */}
          <AccordionItem value="documents" className="border border-zinc-200 rounded-md mb-4">
            <AccordionTrigger className="px-4 hover:no-underline hover:bg-zinc-50">
              <div className="flex justify-between items-center w-full">
                <span className="font-medium">Documentation</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 gap-1 text-zinc-500"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleEditSection(5)
                  }}
                >
                  <Edit className="h-4 w-4" />
                  Edit
                </Button>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4 pt-2">
              {formData.documents.length > 0 ? (
                <ul className="space-y-2">
                  {formData.documents.map((doc) => (
                    <li
                      key={doc.id}
                      className="flex items-center justify-between py-2 border-b border-zinc-100 last:border-0"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-zinc-900">{doc.name}</span>
                        <span className="text-xs text-zinc-500 capitalize">({doc.type})</span>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-zinc-500">No documents uploaded.</p>
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
                I confirm that all the information provided is accurate and complete to the best of my knowledge.
              </label>
            </div>
          </form>
        </div>
      </CardContent>
    </Card>
  )
}
