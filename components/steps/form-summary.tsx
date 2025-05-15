import { Card, CardContent } from "@/components/ui/card"
import { Check } from "lucide-react"
import type { PolicySelection } from "../insurance-form"

interface FormSummaryProps {
  selections: PolicySelection
}

export default function FormSummary({ selections }: FormSummaryProps) {
  // Helper function to get the display name and price for each policy
  const getPolicyDetails = (type: keyof PolicySelection, value: string | null): { name: string; price: string } => {
    if (!value) return { name: "None selected", price: "$0" }

    const policies = {
      theft: {
        basic: { name: "Basic Protection", price: "$5/month" },
        standard: { name: "Standard Protection", price: "$12/month" },
        premium: { name: "Premium Protection", price: "$25/month" },
      },
      glass: {
        basic: { name: "Basic Glass Coverage", price: "$3/month" },
        standard: { name: "Standard Glass Coverage", price: "$8/month" },
        premium: { name: "Premium Glass Coverage", price: "$15/month" },
      },
      waterDamage: {
        basic: { name: "Basic Water Protection", price: "$7/month" },
        standard: { name: "Standard Water Protection", price: "$15/month" },
        premium: { name: "Premium Flood Protection", price: "$30/month" },
      },
      civilLiability: {
        basic: { name: "Basic Liability", price: "$10/month" },
        standard: { name: "Standard Liability", price: "$20/month" },
        premium: { name: "Premium Liability", price: "$35/month" },
      },
      fire: {
        basic: { name: "Basic Fire Coverage", price: "$8/month" },
        standard: { name: "Standard Fire Coverage", price: "$18/month" },
        premium: { name: "Premium Fire Coverage", price: "$30/month" },
      },
    }

    return policies[type][value as "basic" | "standard" | "premium"]
  }

  // Calculate total monthly cost
  const calculateTotal = (): number => {
    let total = 0
    const priceMap = {
      theft: { basic: 5, standard: 12, premium: 25 },
      glass: { basic: 3, standard: 8, premium: 15 },
      waterDamage: { basic: 7, standard: 15, premium: 30 },
      civilLiability: { basic: 10, standard: 20, premium: 35 },
      fire: { basic: 8, standard: 18, premium: 30 },
    }

    Object.entries(selections).forEach(([type, value]) => {
      if (value) {
        total += priceMap[type as keyof PolicySelection][value as "basic" | "standard" | "premium"]
      }
    })

    return total
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2">Your Policy Summary</h2>
        <p className="text-gray-500">Review your selected coverage options before submitting</p>
      </div>

      <div className="space-y-4">
        {Object.entries(selections).map(([type, value]) => {
          const policyType = type as keyof PolicySelection
          const details = getPolicyDetails(policyType, value)

          return (
            <Card key={type}>
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium capitalize">
                      {type === "civilLiability" ? "Civil Liability" : type === "waterDamage" ? "Water Damage" : type}{" "}
                      Coverage
                    </h3>
                    <p className="text-sm text-gray-500">{details.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{details.price}</p>
                    {value && (
                      <span className="text-xs text-green-600 flex items-center justify-end gap-1">
                        <Check className="h-3 w-3" /> Selected
                      </span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}

        <Card className="bg-gray-50 border-primary">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium text-lg">Total Monthly Premium</h3>
              <p className="font-bold text-lg">${calculateTotal()}/month</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
