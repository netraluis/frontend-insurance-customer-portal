"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ChevronLeft, ChevronRight, Check } from "lucide-react"
import TheftPolicyStep from "./steps/theft-policy-step"
import GlassPolicyStep from "./steps/glass-policy-step"
import WaterDamagePolicyStep from "./steps/water-damage-policy-step"
import CivilLiabilityPolicyStep from "./steps/civil-liability-policy-step"
import FirePolicyStep from "./steps/fire-policy-step"
import FormSummary from "./steps/form-summary"

export type PolicySelection = {
  theft: string | null
  glass: string | null
  waterDamage: string | null
  civilLiability: string | null
  fire: string | null
}

export default function InsuranceForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selections, setSelections] = useState<PolicySelection>({
    theft: null,
    glass: null,
    waterDamage: null,
    civilLiability: null,
    fire: null,
  })

  const totalSteps = 5
  const progress = ((currentStep - 1) / totalSteps) * 100

  const updateSelection = (policyType: keyof PolicySelection, value: string) => {
    setSelections((prev) => ({
      ...prev,
      [policyType]: value,
    }))
  }

  const handleNext = () => {
    if (currentStep < totalSteps + 1) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const isStepComplete = (step: number): boolean => {
    switch (step) {
      case 1:
        return selections.theft !== null
      case 2:
        return selections.glass !== null
      case 3:
        return selections.waterDamage !== null
      case 4:
        return selections.civilLiability !== null
      case 5:
        return selections.fire !== null
      default:
        return false
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <TheftPolicyStep value={selections.theft} onChange={(value) => updateSelection("theft", value)} />
      case 2:
        return <GlassPolicyStep value={selections.glass} onChange={(value) => updateSelection("glass", value)} />
      case 3:
        return (
          <WaterDamagePolicyStep
            value={selections.waterDamage}
            onChange={(value) => updateSelection("waterDamage", value)}
          />
        )
      case 4:
        return (
          <CivilLiabilityPolicyStep
            value={selections.civilLiability}
            onChange={(value) => updateSelection("civilLiability", value)}
          />
        )
      case 5:
        return <FirePolicyStep value={selections.fire} onChange={(value) => updateSelection("fire", value)} />
      case 6:
        return <FormSummary selections={selections} />
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {/* Progress Indicator */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-500">
          <span>
            Step {currentStep} of {totalSteps}
          </span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Step Indicators */}
      <div className="flex justify-between mb-6">
        {Array.from({ length: totalSteps }).map((_, index) => {
          const stepNumber = index + 1
          const isActive = stepNumber === currentStep
          const isCompleted = stepNumber < currentStep || isStepComplete(stepNumber)

          return (
            <div key={stepNumber} className="flex flex-col items-center space-y-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : isCompleted
                      ? "bg-green-100 text-green-700 border border-green-500"
                      : "bg-gray-100 text-gray-500"
                }`}
              >
                {isCompleted && stepNumber < currentStep ? <Check className="h-4 w-4" /> : stepNumber}
              </div>
              <span className="text-xs hidden sm:block">
                {stepNumber === 1
                  ? "Theft"
                  : stepNumber === 2
                    ? "Glass"
                    : stepNumber === 3
                      ? "Water"
                      : stepNumber === 4
                        ? "Liability"
                        : "Fire"}
              </span>
            </div>
          )
        })}
      </div>

      {/* Form Content */}
      <Card>
        <CardContent className="pt-6">{renderStep()}</CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-4">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 1}
          className="flex items-center gap-1"
        >
          <ChevronLeft className="h-4 w-4" /> Previous
        </Button>

        {currentStep <= totalSteps ? (
          <Button onClick={handleNext} disabled={!isStepComplete(currentStep)} className="flex items-center gap-1">
            {currentStep === totalSteps ? "Review" : "Next"} <ChevronRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button className="flex items-center gap-1">
            Submit <Check className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  )
}
