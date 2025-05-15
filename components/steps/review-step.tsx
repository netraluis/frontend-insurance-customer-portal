import { Card, CardContent } from "@/components/ui/card"
import { format } from "date-fns"
import { ShieldX } from "lucide-react"
import type { IncidentFormData } from "../incident-report-form"

interface ReviewStepProps {
  formData: IncidentFormData
}

export default function ReviewStep({ formData }: ReviewStepProps) {
  // Format the incident type for display
  const formatIncidentType = (type: string) => {
    switch (type) {
      case "theft":
        return "Theft"
      case "glass":
        return "Broken Glass"
      case "water":
        return "Water Damage"
      case "fire":
        return "Fire"
      default:
        return type
    }
  }

  // Format the date for display
  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    try {
      return format(new Date(dateString), "MMMM d, yyyy")
    } catch (error) {
      return dateString
    }
  }

  // Render specific incident details based on type
  const renderIncidentSpecificDetails = () => {
    switch (formData.incidentType) {
      case "theft":
        return (
          <Card className="mb-6">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center gap-2 mb-4">
                <ShieldX className="h-5 w-5 text-red-500" />
                <h3 className="text-lg font-medium">Theft Details</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Method of Theft</p>
                  <p className="mt-1">{formData.theftMethod.join(", ")}</p>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Property Occupied During Theft</p>
                    <p className="mt-1">{formData.wasPropertyOccupied ? "Yes" : "No"}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Commercial Property</p>
                    <p className="mt-1">{formData.isCommercialProperty ? "Yes" : "No"}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Stolen Items</p>
                  <p className="mt-1 whitespace-pre-line">{formData.stolenItems}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Estimated Value</p>
                  <p className="mt-1">${formData.estimatedValue}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Police Report Filed</p>
                  <p className="mt-1">{formData.policeReportFiled ? "Yes" : "No"}</p>
                  {formData.policeReportFiled && (
                    <p className="mt-1">Report Number: {formData.policeReportNumber}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )
      case "glass":
        return (
          <Card className="mb-6">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center gap-2 mb-4">
                <ShieldX className="h-5 w-5 text-green-500" />
                <h3 className="text-lg font-medium">Broken Glass Details</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Location of Glass Breakage</p>
                  <p className="mt-1">{formData.glassBreakLocation}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Cause of Glass Breakage</p>
                  <p className="mt-1">{formData.glassBreakCause}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Estimated Damage</p>
                  <p className="mt-1">${formData.glassDamageEstimate}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      // Add cases for "water" and "fire" if needed
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Incident Review</h2>
      <div className="space-y-4">
        <div>
          <p className="text-sm font-medium text-gray-500">Incident Type</p>
          <p className="mt-1">{formatIncidentType(formData.incidentType)}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Date of Incident</p>
          <p className="mt-1">{formatDate(formData.incidentDate)}</p>
        </div>
        {renderIncidentSpecificDetails()}
      </div>
    </div>
  )
}
