"use client"

import { useClaimForm } from "./claim-form-context"
import { cn } from "@/lib/utils"

interface FormStepperProps {
  currentStep: number
}

export function FormStepper({ currentStep }: FormStepperProps) {
  const claimFormContext = useClaimForm()
  const isStepComplete = claimFormContext?.isStepComplete

  const steps = [
    { id: 1, name: "Policy" },
    { id: 2, name: "Vehicle" },
    { id: 3, name: "Accident" },
    { id: 4, name: "Parties" },
    { id: 5, name: "Documents" },
    { id: 6, name: "Review" },
  ]

  // Calculate completion percentage
  const completionPercentage = ((currentStep - 1) / (steps.length - 1)) * 100

  return (
    <div className="w-full">
      {/* Desktop progress bar */}
      <div className="hidden sm:block">
        {/* Percentage indicator */}
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm font-medium text-zinc-900">Form Progress</h3>
          <span className="text-sm font-medium text-zinc-600">{Math.round(completionPercentage)}% Complete</span>
        </div>

        {/* Main progress bar */}
        <div className="relative h-3 bg-zinc-100 rounded-full overflow-hidden">
          <div
            className="absolute left-0 top-0 h-full bg-zinc-600 transition-all duration-500 ease-in-out rounded-full"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>

        {/* Step markers */}
        <div className="relative mt-4">
          <div className="flex justify-between">
            {steps.map((step) => {
              const isActive = currentStep === step.id
              const isCompleted = currentStep > step.id
              const isClickable =
                isCompleted || step.id === currentStep || (isStepComplete ? isStepComplete(currentStep) : false)

              return (
                <div
                  key={step.id}
                  className={cn(
                    "flex flex-col items-center transition-opacity duration-300",
                    isActive ? "opacity-100" : isCompleted ? "opacity-100" : "opacity-60",
                    isClickable && "cursor-pointer hover:opacity-100",
                  )}
                  onClick={() => {
                    if (isClickable) {
                      // Access the setCurrentStep from context
                      const { setCurrentStep } = claimFormContext || {}
                      setCurrentStep && setCurrentStep(step.id)
                      window.scrollTo(0, 0)
                    }
                  }}
                  role={isClickable ? "button" : undefined}
                  tabIndex={isClickable ? 0 : undefined}
                  aria-label={isClickable ? `Go to ${step.name} step` : undefined}
                >
                  <div
                    className={cn(
                      "w-3 h-3 rounded-full mb-2 transition-all duration-300",
                      isActive ? "bg-zinc-600 ring-4 ring-zinc-200" : isCompleted ? "bg-zinc-600" : "bg-zinc-300",
                    )}
                  />
                  <span
                    className={cn(
                      "text-xs font-medium whitespace-nowrap",
                      isActive ? "text-zinc-900" : isCompleted ? "text-zinc-700" : "text-zinc-400",
                    )}
                  >
                    {step.name}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Mobile progress bar */}
      <div className="sm:hidden">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <span className="text-sm font-medium text-zinc-900">
              Step {currentStep}/{steps.length}
            </span>
            <span className="ml-2 text-sm font-medium text-zinc-600">{steps[currentStep - 1].name}</span>
          </div>
          <span className="text-sm font-medium text-zinc-600">{Math.round(completionPercentage)}%</span>
        </div>

        {/* Mobile progress bar */}
        <div className="relative h-2 bg-zinc-100 rounded-full overflow-hidden">
          <div
            className="absolute left-0 top-0 h-full bg-zinc-600 transition-all duration-500 ease-in-out"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      </div>
    </div>
  )
}
