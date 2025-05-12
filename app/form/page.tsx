import { ClaimFormProvider } from "@/app/components/claim-form-context"
import ClaimFormLayout from "@/app/components/claim-form-layout"

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <ClaimFormProvider>
        <ClaimFormLayout />
      </ClaimFormProvider>
    </main>
  )
}
