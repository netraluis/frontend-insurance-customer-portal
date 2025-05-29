"use client"

import { useEffect, useState } from "react"
import { useClaimForm } from "./claim-form-context"
import { FormStepper } from "./form-stepper"
import PolicyInformation from "./steps/policy-information"
import VehicleInformation from "./steps/vehicle-information"
import AccidentDetails from "./steps/accident-details"
import InvolvedParties from "./steps/involved-parties"
import Documentation from "./steps/documentation"
import ReviewSubmit from "./steps/review-submit"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import { ArrowLeft, ArrowRight, Save } from "lucide-react"
import { useTranslations } from 'next-intl'

export default function ClaimFormLayout() {
  const { currentStep, setCurrentStep, isStepComplete, saveProgress, loadProgress, isSubmitted } = useClaimForm()
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)
  const t = useTranslations('ClaimAuto')

  // Listen for changes in the DOM to detect when the form has been submitted
  useEffect(() => {
    const checkForSubmissionScreen = () => {
      // Look for the success checkmark icon which only appears after submission
      const successIcon = document.querySelector(".text-center .rounded-full .text-zinc-600")
      if (successIcon) {
        setIsFormSubmitted(true)
      }
    }

    // Check initially and set up a mutation observer to detect DOM changes
    checkForSubmissionScreen()

    const observer = new MutationObserver(checkForSubmissionScreen)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    // Try to load saved progress when component mounts - only once
    const hasLoadedProgress = loadProgress()
    if (hasLoadedProgress) {
      toast({
        title: "Progress Restored",
        description: "Your previously saved form data has been loaded.",
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // Empty dependency array ensures this only runs once

  const handleSave = () => {
    saveProgress()
    toast({
      title: "Progress Saved",
      description: "Your form progress has been saved. You can return later to continue.",
    })
  }

  const handleNext = () => {
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1)
      window.scrollTo(0, 0)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      window.scrollTo(0, 0)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <PolicyInformation />
      case 2:
        return <VehicleInformation />
      case 3:
        return <AccidentDetails />
      case 4:
        return <InvolvedParties />
      case 5:
        return <Documentation />
      case 6:
        return <ReviewSubmit />
      default:
        return <PolicyInformation />
    }
  }

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return "Policy Information"
      case 2:
        return "Vehicle Information"
      case 3:
        return "Accident Details"
      case 4:
        return "Involved Parties"
      case 5:
        return "Upload Documentation"
      case 6:
        return "Review and Submit"
      default:
        return "Auto Claim Form"
    }
  }

  // Don't show progress indicator if form is submitted
  const showProgressIndicator = !isFormSubmitted && !isSubmitted

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      {/* Progress indicator moved outside the card */}
      {showProgressIndicator && (
        <div className="mb-4 bg-white rounded-lg shadow-sm border border-zinc-200 p-4">
          <FormStepper currentStep={currentStep} />
        </div>
      )}

      <Card className="border-zinc-200 shadow-sm">
        {/* Only show header if form is not submitted */}
        {!isFormSubmitted && !isSubmitted && (
          <CardHeader className="border-b border-zinc-100 bg-zinc-50/50">
            <CardTitle className="text-2xl font-medium text-zinc-900">{getStepTitle()}</CardTitle>
          </CardHeader>
        )}

        <CardContent className={isFormSubmitted || isSubmitted ? "p-0" : "p-6"}>
          <div>{renderStep()}</div>
        </CardContent>

        {/* Only show footer with buttons if form is not submitted */}
        {!isFormSubmitted && !isSubmitted && (
          <CardFooter className="flex justify-between border-t border-zinc-100 bg-zinc-50/50 p-6">
            <div className="flex gap-2">
              {currentStep > 1 && (
                <Button variant="outline" onClick={handlePrevious} className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  {t('previous')}
                </Button>
              )}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleSave} className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                {t('saveProgress')}
              </Button>
              {currentStep < 6 ? (
                <Button
                  onClick={handleNext}
                  disabled={!isStepComplete(currentStep)}
                  className="flex items-center gap-2"
                >
                  {t('next')}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button type="submit" form="review-form">
                  {t('submitClaim')}
                </Button>
              )}
            </div>
          </CardFooter>
        )}
      </Card>
    </div>
  )
}
