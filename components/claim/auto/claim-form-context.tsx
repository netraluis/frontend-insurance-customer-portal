"use client"

import { createContext, useContext, useState, type ReactNode, useEffect } from "react"

export type Witness = {
  firstName: string
  lastName: string
  email: string
  phone: string
  description: string
}

export type Driver = {
  firstName: string
  lastName: string
  email: string
  phone: string
  vehicleMake: string
  vehicleModel: string
  licensePlate: string
  insuranceCompany: string
  policyNumber: string
  description: string
}

// export type Document = {
//   id: string
//   name: string
//   type: string
//   url: string
//   size: number
// }

// // Type for the friendly report document
// export type FriendlyReportDocument = {
//   id: string
//   name: string
//   type: string
//   url: string
//   size: number
// }

// // Types for damage photos and videos
// export type DamageMedia = {
//   id: string
//   name: string
//   type: string
//   url: string
//   size: number
//   thumbnail?: string // For video thumbnails
// }

export type MediaFile = {
  id: string
  name: string
  type: string
  url: string
  size: number
  thumbnail?: string
  // buffer: Buffer
}

// Update the FormData type to include vehicleType
export type FormData = {
  // Step 1: Policy Information
  firstName: string // *
  lastName: string // *
  email: string // *
  phone: string // *

  // Additional driver information
  hasDifferentDriver: boolean
  driverFirstName: string // * si esta activo, es obligatorio
  driverLastName: string // * si esta activo, es obligatorio
  driverDateOfBirth: Date | null // * si esta activo, es obligatorio
  driverPhone: string
  driverEmail: string 
  driverID: string 

  // Step 2: Vehicle Information
  vehicleMake: string // *
  vehicleModel: string // *
  licensePlate: string // *
  vehicleType: string // *
  vehicleComments: string
  // coverageType field removed

  // Step 3: Accident Details
  incidentDate: Date | null // *
  accidentLocation: string // *
  accidentDescription: string // *
  policeInvolved: boolean
  trafficServiceInvolved: boolean
  friendlyReport: boolean
  friendlyReportDocument: MediaFile | null
  bodilyInjuries: boolean
  bodilyInjuriesDescription: string
  damageDescription: string // *
  damagePhotos: MediaFile[]

  // Step 4: Involved Parties
  drivers: Driver[] // no es obligatorio
  witnesses: Witness[] // *

  // Step 5: Documentation
  documents: MediaFile[]
}

// Update the isStepComplete function for step 2 to include vehicleType check

type ClaimFormContextType = {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
  currentStep: number
  setCurrentStep: (step: number) => void
  isStepComplete: (step: number) => boolean
  saveProgress: () => void
  loadProgress: () => boolean
  isSubmitted: boolean
  setIsSubmitted: (value: boolean) => void
  isSubmitting: boolean
  setIsSubmitting: (value: boolean) => void
}

// Update the FormData type to include vehicleType
const initialFormData: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",

  hasDifferentDriver: false,
  driverFirstName: "",
  driverLastName: "",
  driverDateOfBirth: null,
  driverPhone: "",
  driverEmail: "",
  driverID: "",

  vehicleMake: "",
  vehicleModel: "",
  licensePlate: "",
  vehicleType: "", // Initialize with empty string
  vehicleComments: "",
  // coverageType field removed

  incidentDate: null,
  accidentLocation: "",
  accidentDescription: "",
  policeInvolved: false,
  trafficServiceInvolved: false,
  friendlyReport: false,
  friendlyReportDocument: null,
  bodilyInjuries: false,
  bodilyInjuriesDescription: "",
  damageDescription: "",
  damagePhotos: [],

  drivers: [],
  witnesses: [],

  documents: [],
}

const ClaimFormContext = createContext<ClaimFormContextType | undefined>(undefined)

export function ClaimFormProvider({ children }: { children: ReactNode }) {
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const updateFormData = (data: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  const isStepComplete = (step: number): boolean => {
    switch (step) {
      case 1:
        if (formData.hasDifferentDriver) {
          return (
            !!formData.firstName &&
            !!formData.lastName &&
            !!formData.email &&
            !!formData.phone &&
            !!formData.driverFirstName &&
            !!formData.driverLastName &&
            !!formData.driverDateOfBirth
          )
        }
        return !!formData.firstName && !!formData.lastName && !!formData.email && !!formData.phone
      case 2:
        // Updated validation - include vehicleType check
        return !!formData.vehicleMake && !!formData.vehicleModel && !!formData.licensePlate && !!formData.vehicleType
      case 3:
        return (
          !!formData.accidentLocation &&
          !!formData.accidentDescription &&
          !!formData.incidentDate &&
          !!formData.damageDescription && // Keep damage description required
          (!formData.bodilyInjuries || !!formData.bodilyInjuriesDescription) &&
          (!formData.friendlyReport || !!formData.friendlyReportDocument)
          // Removed: formData.damagePhotos.length > 0
        )
      case 4:
        return true // Optional step, can proceed without adding drivers or witnesses
      case 5:
        return true // Optional step, can proceed without uploading documents
      default:
        return false
    }
  }

  const saveProgress = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("autoClaimFormData", JSON.stringify(formData))
      localStorage.setItem("autoClaimFormStep", currentStep.toString())
    }
  }

  const loadProgress = (): boolean => {
    if (typeof window !== "undefined") {
      const savedData = localStorage.getItem("autoClaimFormData")
      const savedStep = localStorage.getItem("autoClaimFormStep")

      if (savedData) {
        try {
          const parsedData = JSON.parse(savedData)
          // Convert the date string back to Date object if it exists
          if (parsedData.incidentDate) {
            parsedData.incidentDate = new Date(parsedData.incidentDate)
          }
          if (parsedData.driverDateOfBirth) {
            parsedData.driverDateOfBirth = new Date(parsedData.driverDateOfBirth)
          }

          // Only update state if the data is different
          if (JSON.stringify(parsedData) !== JSON.stringify(formData)) {
            setFormData(parsedData)
          }

          if (savedStep && Number.parseInt(savedStep) !== currentStep) {
            setCurrentStep(Number.parseInt(savedStep))
          }
          return true
        } catch (e) {
          console.error("Error loading saved progress:", e)
        }
      }
    }
    return false
  }

  useEffect(() => {
    // Try to load saved progress when component mounts
    loadProgress()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // Empty dependency array ensures this only runs once

  // Expose form state and step to window for debugging/testing (non-production only)
  useEffect(() => {
    if (typeof window !== "undefined" && process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).__CLAIM_FORM_STATE__ = formData;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).__CLAIM_FORM_STEP__ = currentStep;
    }
  }, [formData, currentStep]);

  return (
    <ClaimFormContext.Provider
      value={{
        formData,
        updateFormData,
        currentStep,
        setCurrentStep,
        isStepComplete,
        saveProgress,
        loadProgress,
        isSubmitted,
        setIsSubmitted,
        isSubmitting,
        setIsSubmitting,
      }}
    >
      {children}
    </ClaimFormContext.Provider>
  )
}

export function useClaimForm() {
  const context = useContext(ClaimFormContext)
  if (context === undefined) {
    throw new Error("useClaimForm must be used within a ClaimFormProvider")
  }
  return context
}
