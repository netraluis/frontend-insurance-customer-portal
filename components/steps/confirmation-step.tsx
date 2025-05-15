import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ConfirmationStep() {
  return (
    <div className="text-center py-6">
      <div className="flex justify-center mb-6">
        <div className="rounded-full bg-green-100 p-3">
          <CheckCircle className="h-12 w-12 text-green-600" />
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-2">Report Submitted Successfully</h2>

      <p className="text-gray-600 mb-6 max-w-md mx-auto">
        Thank you for submitting your incident report. We have received your information and will process it promptly.
      </p>

      <div className="bg-gray-50 rounded-lg p-4 mb-6 max-w-md mx-auto">
        <h3 className="font-medium mb-2">What happens next?</h3>
        <ul className="text-sm text-gray-600 text-left space-y-2">
          <li className="flex items-start">
            <span className="mr-2">1.</span>
            <span>You will receive a confirmation email with your report details and reference number.</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">2.</span>
            <span>A claims adjuster will review your case within 1-2 business days.</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">3.</span>
            <span>You may be contacted for additional information or documentation.</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">4.</span>
            <span>Once reviewed, you will be notified of the next steps in the claims process.</span>
          </li>
        </ul>
      </div>

      <div className="space-x-4">
        <Button asChild>
          <Link href="/">Return Home</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/claims">View My Claims</Link>
        </Button>
      </div>
    </div>
  )
}
