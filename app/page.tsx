import Image from "next/image";
import IncidentReportForm from "@/components/incident-report-form"

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpUaofJsQrymdept6nYYVuEPU27DW9iOQZAq4tQyT6q2YWYmZwoLLdbVzLEbtmtSfhpA&usqp=CAU" alt="Insurance Company" className="h-15" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Insurance Incident Report</h1>
          <p className="mt-2 text-lg text-gray-600">Please provide details about your incident to process your claim</p>
        </div>
        <IncidentReportForm />
      </div>
    </main>
  )
}
