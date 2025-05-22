"use client"

import { createContext, useContext, useState, type ReactNode, useEffect } from "react"

export type InvolvedParty = {
  fullName: string
  email: string
  phone: string
  description: string
  insuranceCompany: string
  policyNumber: string
}

export type Testimony = {
  fullName: string
  email: string
  phone: string
  description: string
}

export type Document = {
  id: string
  name: string
  type: string
  url: string
}

// Types for damage photos and documents
export type MediaFile = {
  id: string
  name: string
  type: string
  url: string
  size: number
  thumbnail?: string
}

export type FormData = {
  // Step 1: Policy Information
  firstName: string
  lastName: string
  email: string
  phone: string
  policyNumber: string

  // Step 1.5: Driver Information (si es diferente al asegurado)
  hasDifferentDriver: boolean
  driverFirstName: string
  driverLastName: string
  driverDateOfBirth: Date | null
  driverID: string

  // Step 2: Vehicle Information
  vehicleMake: string
  vehicleModel: string
  licensePlate: string
  vehicleType: string // Add this new field
  // Step 2: Accident Details
  accidentLocation: string
  accidentDate: Date | null
  accidentDescription: string
  damageDescription: string
  damagePhotos: MediaFile[]
  friendlyReportDocument: MediaFile | null

  // Step 3: Additional Information
  policeInvolved: boolean
  trafficServiceInvolved: boolean
  friendlyReport: boolean
  firefightersInvolved: boolean
  policeReport: boolean
  policeReportDocument: MediaFile | null
  bodilyInjuries: boolean
  bodilyInjuriesDescription: string
  medicalReportDocument: MediaFile | null

  // Step 4: Involved Parties
  hasInvolvedParties: boolean
  knowsInvolvedPerson: boolean
  involvedParties: InvolvedParty[]
  testimonies: Testimony[]

  // Step 5: Additional Documentation
  additionalDocuments: MediaFile[]
  additionalComments: string
}

type GeneralClaimFormContextType = {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
  currentStep: number
  setCurrentStep: (step: number) => void
  isStepComplete: (step: number) => boolean
  saveProgress: () => void
  loadProgress: () => boolean
  isSubmitted: boolean
  setIsSubmitted: (value: boolean) => void
}

const initialFormData: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  policyNumber: "",

  hasDifferentDriver: false,
  driverFirstName: "",
  driverLastName: "",
  driverDateOfBirth: null,
  driverID: "",

  vehicleMake: "",
  vehicleModel: "",
  licensePlate: "",
  vehicleType: "",

  accidentLocation: "",
  accidentDate: null,
  accidentDescription: "",
  damageDescription: "",
  damagePhotos: [],
  friendlyReportDocument: null,

  policeInvolved: false,
  trafficServiceInvolved: false,
  friendlyReport: false,
  firefightersInvolved: false,
  policeReport: false,
  policeReportDocument: null,
  bodilyInjuries: false,
  bodilyInjuriesDescription: "",
  medicalReportDocument: null,

  hasInvolvedParties: false,
  knowsInvolvedPerson: false,
  involvedParties: [],
  testimonies: [],

  additionalDocuments: [],
  additionalComments: "",
}

const GeneralClaimFormContext = createContext<GeneralClaimFormContextType | undefined>(undefined)

export function GeneralClaimFormProvider({ children }: { children: ReactNode }) {
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const updateFormData = (data: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  const isStepComplete = (step: number): boolean => {
    switch (step) {
      case 1:
        return (
          !!formData.firstName && !!formData.lastName && !!formData.email && !!formData.phone && !!formData.policyNumber
        )
      case 2:
        return (
          !!formData.accidentLocation &&
          !!formData.accidentDate &&
          !!formData.accidentDescription &&
          !!formData.damageDescription
        )
      case 3:
        return (
          (!formData.policeReport || !!formData.policeReportDocument) &&
          (!formData.bodilyInjuries || !!formData.bodilyInjuriesDescription)
        )
      case 4:
        return true // Optional step, can proceed without adding involved parties or testimonies
      case 5:
        return true // Optional step, can proceed without uploading additional documents
      default:
        return false
    }
  }

  const saveProgress = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("generalClaimFormData", JSON.stringify(formData))
      localStorage.setItem("generalClaimFormStep", currentStep.toString())
    }
  }

  const loadProgress = (): boolean => {
    if (typeof window !== "undefined") {
      const savedData = localStorage.getItem("generalClaimFormData")
      const savedStep = localStorage.getItem("generalClaimFormStep")

      if (savedData) {
        try {
          const parsedData = JSON.parse(savedData)
          // Convert the date string back to Date object if it exists
          if (parsedData.accidentDate) {
            parsedData.accidentDate = new Date(parsedData.accidentDate)
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

  return (
    <GeneralClaimFormContext.Provider
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
      }}
    >
      {children}
    </GeneralClaimFormContext.Provider>
  )
}

export function useGeneralClaimForm() {
  const context = useContext(GeneralClaimFormContext)
  if (context === undefined) {
    throw new Error("useGeneralClaimForm must be used within a GeneralClaimFormProvider")
  }
  return context
}
