"use client"

import { GeneralClaimFormProvider } from "@/components/claim/general/general-claim-form-context"
import GeneralClaimFormLayout from "@/components/claim/general/general-claim-form-layout"

export default function GeneralClaimPage() {
  return (
    <GeneralClaimFormProvider>
      <GeneralClaimFormLayout />
    </GeneralClaimFormProvider>
  )
}
