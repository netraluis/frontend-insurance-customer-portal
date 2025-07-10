import { ClaimFormProvider } from "@/components/claim/auto/claim-form-context"
import ClaimFormLayout from "@/components/claim/auto/claim-form-layout"

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <ClaimFormProvider>
        <ClaimFormLayout />
      </ClaimFormProvider>
    </main>
  )
}
