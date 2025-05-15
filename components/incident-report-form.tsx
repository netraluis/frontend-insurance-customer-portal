"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ChevronLeft, ChevronRight, Check } from "lucide-react"
import { useToast } from "@/hooks/use-toast"


import PersonalInfoStep from "./steps/personal-info-step"
import IncidentTypeStep from "./steps/incident-type-step"
import TheftDetailsStep from "./steps/theft-details-step"
import GlassDetailsStep from "./steps/glass-details-step"
import WaterDamageDetailsStep from "./steps/water-damage-details-step"
import CivilLiabilityDetailsStep from "./steps/civil-liability-details-step"
import FireDetailsStep from "./steps/fire-details-step"
import DocumentationStep from "./steps/documentation-step"
import ReviewStep from "./steps/review-step"
import ConfirmationStep from "./steps/confirmation-step"
import { error } from "console"

export type IncidentFormData = {
  // Personal Info
  fullName: string
  email: string
  phoneCountry: string
  phoneNumber: string
  policyNumber: string
  address: string

  // Incident Type
  incidentType: "theft" | "glass" | "water" | "civil" | "fire"
  incidentDate: string
  incidentTime: string
  incidentLocation: string

  // Theft Details
  theftMethod: string[]
  wasPropertyOccupied: boolean
  isCommercialProperty: boolean
  stolenItems: string
  estimatedValue: string
  policeReportFiled: boolean
  policeReportNumber: string

  // Glass Details
  glassType: string
  glassDimensions: {
    width: string
    height: string
  }
  glassLocation: string
  emergencyServicesCalled: boolean
  glassBreakLocation: string
  glassBreakCause: string
  glassDamageEstimate: string

  // Water Damage Details
  waterSource: string
  affectedAreas: string[]
  isStormRelated: boolean
  neighborProperty: boolean
  waterDamageExtent: string

  // Civil Liability Details
  liabilityType: string
  involvedParties: {
    name: string
    contact: string
    relationship: string
  }[]
  damageDescription: string
  claimAmount: string

  // Fire Details
  fireCause: string
  firefightersIntervened: boolean
  fireExtinguisherUsed: boolean
  affectedItems: string
  fireExtent: string

  // Documentation
  files: File[]
  additionalNotes: string

  // Witnesses
  hasWitnesses: boolean
  witnesses: {
    name: string
    contact: string
  }[]

  // Bodily Injuries
  bodilyInjuries: boolean
  injuryDetails: string
}

export default function IncidentReportForm() {
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<IncidentFormData>({
    // Personal Info
    fullName: "",
    email: "",
    phoneCountry: "US",
    phoneNumber: "",
    policyNumber: "",
    address: "",

    // Incident Type
    incidentType: "theft",
    incidentDate: "",
    incidentTime: "",
    incidentLocation: "",

    // Theft Details
    theftMethod: [],
    wasPropertyOccupied: false,
    isCommercialProperty: false,
    stolenItems: "",
    estimatedValue: "",
    policeReportFiled: false,
    policeReportNumber: "",

    // Glass Details
    glassType: "",
    glassDimensions: {
      width: "",
      height: "",
    },
    glassLocation: "",
    emergencyServicesCalled: false,
    glassBreakLocation: "",
    glassBreakCause: "",
    glassDamageEstimate: "",
    // Water Damage Details
    waterSource: "",
    affectedAreas: [],
    isStormRelated: false,
    neighborProperty: false,
    waterDamageExtent: "",

    // Civil Liability Details
    liabilityType: "",
    involvedParties: [{ name: "", contact: "", relationship: "" }],
    damageDescription: "",
    claimAmount: "",

    // Fire Details
    fireCause: "",
    firefightersIntervened: false,
    fireExtinguisherUsed: false,
    affectedItems: "",
    fireExtent: "",

    // Documentation
    files: [],
    additionalNotes: "",

    // Witnesses
    hasWitnesses: false,
    witnesses: [],

    // Bodily Injuries
    bodilyInjuries: false,
    injuryDetails: "",
  })

  // Calculate total steps based on incident type
  const getTotalSteps = () => {
    // All incident types have these steps: Personal Info, Incident Type, Documentation, Review
    const baseSteps = 4

    // Add 1 for the specific incident type details step
    return baseSteps + 1
  }

  const totalSteps = getTotalSteps()
  const progress = ((currentStep - 1) / totalSteps) * 100

  const updateFormData = (fieldName: keyof IncidentFormData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }))
  }

  const updateMultipleFields = (fields: Partial<IncidentFormData>) => {
    setFormData((prev) => ({
      ...prev,
      ...fields,
    }))
  }

  const handleNext = () => {
    if (currentStep < totalSteps + 1) {
      // Validate current step before proceeding
      if (validateCurrentStep()) {
        setCurrentStep((prev) => prev + 1)
        window.scrollTo(0, 0)
      }
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1)
      window.scrollTo(0, 0)
    }
  }

  const validateCurrentStep = (): boolean => {
    let isValid = true
    let errorMessage = ""

    switch (currentStep) {
      case 1: // Personal Info
        if (!formData.fullName || !formData.email || !formData.phoneNumber) {
          isValid = false
          errorMessage = "Please fill in all required personal information fields"
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          isValid = false
          errorMessage = "Please enter a valid email address"
        } else if (!/^\d{6,15}$/.test(formData.phoneNumber.replace(/\D/g, ""))) {
          isValid = false
          errorMessage = "Please enter a valid phone number"
        }
        break
      case 2: // Incident Type
        if (!formData.incidentType || !formData.incidentDate) {
          isValid = false
          errorMessage = "Please select an incident type and provide incident details"
        }
        break
      case 3: // Specific Incident Details
        if (formData.incidentType === "theft") {
          if (formData.theftMethod.length === 0 || !formData.stolenItems) {
            isValid = false
            errorMessage = "Please provide details about the theft"
          }
          if (formData.policeReportFiled && !formData.policeReportNumber) {
            isValid = false
            errorMessage = "Please provide the police report number"
          }
        } else if (formData.incidentType === "glass") {
          if (!formData.glassType || !formData.glassDimensions.width || !formData.glassDimensions.height) {
            isValid = false
            errorMessage = "Please provide details about the broken glass"
          }
        } else if (formData.incidentType === "water") {
          if (!formData.waterSource || formData.affectedAreas.length === 0) {
            isValid = false
            errorMessage = "Please provide details about the water damage"
          }
        } else if (formData.incidentType === "civil") {
          if (!formData.liabilityType || !formData.damageDescription) {
            isValid = false
            errorMessage = "Please provide details about the civil liability incident"
          }
          if (formData.involvedParties.some((party) => !party.name || !party.contact)) {
            isValid = false
            errorMessage = "Please provide complete information for all involved parties"
          }
        } else if (formData.incidentType === "fire") {
          if (!formData.fireCause || !formData.affectedItems) {
            isValid = false
            errorMessage = "Please provide details about the fire incident"
          }
        }
        break
      case 4: // Documentation
        // Documentation is optional, so no validation needed
        break
      case 5: // Review
        // No validation needed for review step
        break
    }

    if (!isValid) {
      toast(`error: ${errorMessage}. Error in step ${currentStep}`)
    }

    return isValid
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    try {
      // Simulate API call with a delay
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // In a real application, you would send the form data to your API here
      console.log("Form submitted:", formData)

      // Move to confirmation step
      setCurrentStep(totalSteps + 1)
    } catch (error) {
      toast(`error: ${error}. Error in step ${currentStep}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return "Personal Information"
      case 2:
        return "Incident Type & Details"
      case 3:
        switch (formData.incidentType) {
          case "theft":
            return "Theft Details"
          case "glass":
            return "Broken Glass Details"
          case "water":
            return "Water Damage Details"
          case "civil":
            return "Civil Liability Details"
          case "fire":
            return "Fire Incident Details"
          default:
            return "Incident Details"
        }
      case 4:
        return "Documentation"
      case 5:
        return "Review & Submit"
      case 6:
        return "Confirmation"
      default:
        return ""
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <PersonalInfoStep formData={formData} updateFormData={updateFormData} />
      case 2:
        return <IncidentTypeStep formData={formData} updateFormData={updateFormData} />
      case 3:
        switch (formData.incidentType) {
          case "theft":
            return (
              <TheftDetailsStep
                formData={formData}
                updateFormData={updateFormData}
                updateMultipleFields={updateMultipleFields}
              />
            )
          case "glass":
            return (
              <GlassDetailsStep
                formData={formData}
                updateFormData={updateFormData}
                updateMultipleFields={updateMultipleFields}
              />
            )
          case "water":
            return (
              <WaterDamageDetailsStep
                formData={formData}
                updateFormData={updateFormData}
                updateMultipleFields={updateMultipleFields}
              />
            )
          case "civil":
            return (
              <CivilLiabilityDetailsStep
                formData={formData}
                updateFormData={updateFormData}
                updateMultipleFields={updateMultipleFields}
              />
            )
          case "fire":
            return (
              <FireDetailsStep
                formData={formData}
                updateFormData={updateFormData}
                updateMultipleFields={updateMultipleFields}
              />
            )
          default:
            return null
        }
      case 4:
        return (
          <DocumentationStep
            formData={formData}
            updateFormData={updateFormData}
            updateMultipleFields={updateMultipleFields}
          />
        )
      case 5:
        return <ReviewStep formData={formData} />
      case 6:
        return <ConfirmationStep incidentType = {formData.incidentType} />
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {currentStep <= totalSteps && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-500">
            <span>
              Step {currentStep} of {totalSteps}
            </span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      )}

      {/* Step Indicators */}
      {currentStep <= totalSteps && (
        <div className="flex justify-between mb-6">
          <div className={`flex flex-col items-center ${currentStep === 1 ? "text-primary" : "text-gray-500"}`}>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep === 1
                  ? "bg-primary text-primary-foreground"
                  : currentStep > 1
                    ? "bg-green-100 text-green-700 border border-green-500"
                    : "bg-gray-100 text-gray-500"
              }`}
            >
              {currentStep > 1 ? <Check className="h-4 w-4" /> : 1}
            </div>
            <span className="text-xs mt-1 hidden sm:block">Personal</span>
          </div>

          <div className={`flex flex-col items-center ${currentStep === 2 ? "text-primary" : "text-gray-500"}`}>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep === 2
                  ? "bg-primary text-primary-foreground"
                  : currentStep > 2
                    ? "bg-green-100 text-green-700 border border-green-500"
                    : "bg-gray-100 text-gray-500"
              }`}
            >
              {currentStep > 2 ? <Check className="h-4 w-4" /> : 2}
            </div>
            <span className="text-xs mt-1 hidden sm:block">Type</span>
          </div>

          <div className={`flex flex-col items-center ${currentStep === 3 ? "text-primary" : "text-gray-500"}`}>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep === 3
                  ? "bg-primary text-primary-foreground"
                  : currentStep > 3
                    ? "bg-green-100 text-green-700 border border-green-500"
                    : "bg-gray-100 text-gray-500"
              }`}
            >
              {currentStep > 3 ? <Check className="h-4 w-4" /> : 3}
            </div>
            <span className="text-xs mt-1 hidden sm:block">Details</span>
          </div>

          <div className={`flex flex-col items-center ${currentStep === 4 ? "text-primary" : "text-gray-500"}`}>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep === 4
                  ? "bg-primary text-primary-foreground"
                  : currentStep > 4
                    ? "bg-green-100 text-green-700 border border-green-500"
                    : "bg-gray-100 text-gray-500"
              }`}
            >
              {currentStep > 4 ? <Check className="h-4 w-4" /> : 4}
            </div>
            <span className="text-xs mt-1 hidden sm:block">Documents</span>
          </div>

          <div className={`flex flex-col items-center ${currentStep === 5 ? "text-primary" : "text-gray-500"}`}>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep === 5
                  ? "bg-primary text-primary-foreground"
                  : currentStep > 5
                    ? "bg-green-100 text-green-700 border border-green-500"
                    : "bg-gray-100 text-gray-500"
              }`}
            >
              {currentStep > 5 ? <Check className="h-4 w-4" /> : 5}
            </div>
            <span className="text-xs mt-1 hidden sm:block">Review</span>
          </div>
        </div>
      )}

      {/* Form Content */}
      <Card className="p-6">
        <h2 className="text-2xl font-semibold mb-4">{getStepTitle()}</h2>
        {renderStep()}
      </Card>

      {/* Navigation Buttons */}
      {currentStep <= totalSteps && (
        <div className="flex justify-between pt-4">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="flex items-center gap-1"
          >
            <ChevronLeft className="h-4 w-4" /> Previous
          </Button>

          {currentStep < totalSteps ? (
            <Button onClick={handleNext} className="flex items-center gap-1">
              Next <ChevronRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} disabled={isSubmitting} className="flex items-center gap-1">
              {isSubmitting ? "Submitting..." : "Submit Report"}
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
