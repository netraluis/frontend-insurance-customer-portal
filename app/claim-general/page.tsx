"use client"

import { GeneralClaimFormProvider } from "@/components/general-claim-form-context"
import GeneralClaimFormLayout from "@/components/general-claim-form-layout"

export default function GeneralClaimPage() {
  return (
    <GeneralClaimFormProvider>
      <GeneralClaimFormLayout />
    </GeneralClaimFormProvider>
  )
}
