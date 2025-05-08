import { cn } from "@/lib/utils"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, Car, Shield, FileText, CreditCard, Download, ArrowLeft, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { ClaimCard } from "@/app/components/claim-card"
import { DocumentCard } from "@/app/components/document-card"

export default function PolicyDetail({ params }: { params: { id: string } }) {
  // In a real app, you would fetch the policy details based on the ID
  const policy = {
    id: params.id,
    title: "Auto Insurance",
    type: "auto",
    status: "active",
    premium: "$128.45/month",
    renewalDate: "May 15, 2025",
    coverageAmount: "$500,000",
    deductible: "$500",
    startDate: "May 15, 2023",
    vehicle: {
      make: "Toyota",
      model: "Camry",
      year: "2022",
      vin: "1HGCM82633A123456",
      licensePlate: "ABC-1234",
    },
    coverages: [
      { name: "Liability", amount: "$300,000", description: "Bodily injury and property damage" },
      { name: "Collision", amount: "$100,000", description: "Damage to your vehicle from collision" },
      { name: "Comprehensive", amount: "$100,000", description: "Damage to your vehicle not from collision" },
      { name: "Medical Payments", amount: "$10,000", description: "Medical expenses for you and passengers" },
      { name: "Uninsured Motorist", amount: "$300,000", description: "Protection if hit by uninsured driver" },
    ],
    claims: [
      {
        id: "CLM-001",
        title: "Auto Accident Claim",
        date: "April 10, 2025",
        status: "in-progress",
        progress: 65,
        amount: "$3,450.00",
      },
    ],
    documents: [
      {
        id: "DOC-001",
        title: "Auto Insurance Policy",
        type: "policy",
        date: "April 15, 2025",
        fileSize: "1.2 MB",
        fileType: "PDF",
      },
      {
        id: "DOC-003",
        title: "Auto Claim Report",
        type: "claim",
        date: "April 10, 2025",
        fileSize: "0.8 MB",
        fileType: "PDF",
      },
      {
        id: "DOC-004",
        title: "Payment Receipt",
        type: "billing",
        date: "April 1, 2025",
        fileSize: "0.3 MB",
        fileType: "PDF",
      },
    ],
    payments: [
      { id: "PAY-001", date: "April 1, 2025", amount: "$128.45", status: "paid" },
      { id: "PAY-002", date: "March 1, 2025", amount: "$128.45", status: "paid" },
      { id: "PAY-003", date: "February 1, 2025", amount: "$128.45", status: "paid" },
    ],
  }

  return (
    <div className="flex flex-col min-h-screen animate-in">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
        <SidebarTrigger />
        <Button variant="ghost" size="icon" asChild>
          <Link href="/policies">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold">{policy.title}</h1>
          <Badge variant={policy.status === "active" ? "default" : "outline"} className="capitalize">
            {policy.status}
          </Badge>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <Button variant="outline" size="icon">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Notifications</span>
          </Button>
          <Avatar>
            <AvatarImage src="/vibrant-street-market.png" alt="User" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </div>
      </header>

      <main className="flex-1 p-6 pt-4 page-transition">
        <div className="grid gap-6">
          <Tabs defaultValue="overview">
            <TabsList className="mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="coverage">Coverage</TabsTrigger>
              <TabsTrigger value="claims">Claims</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="billing">Billing</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Policy Summary</CardTitle>
                    <CardDescription>AI-generated summary of your policy coverage</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm text-zinc-600">
                        This auto insurance policy provides comprehensive coverage for your 2022 Toyota Camry. It
                        includes liability protection of $300,000 for bodily injury and property damage, collision
                        coverage of $100,000 with a $500 deductible, and comprehensive coverage of $100,000.
                      </p>
                      <p className="text-sm text-zinc-600">
                        Additional coverages include $10,000 for medical payments and $300,000 for uninsured motorist
                        protection. The policy is active and set to renew on May 15, 2025, with a monthly premium of
                        $128.45.
                      </p>
                      <div className="flex items-center gap-2 text-sm text-zinc-600">
                        <Shield className="h-4 w-4 text-green-600" />
                        <span>Your policy meets all state minimum requirements and provides excellent protection.</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Policy Details</CardTitle>
                    <CardDescription>Key information about your policy</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <dl className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <dt className="text-zinc-500">Policy Number</dt>
                        <dd className="font-medium">{policy.id}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-zinc-500">Premium</dt>
                        <dd className="font-medium">{policy.premium}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-zinc-500">Renewal Date</dt>
                        <dd className="font-medium">{policy.renewalDate}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-zinc-500">Start Date</dt>
                        <dd className="font-medium">{policy.startDate}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-zinc-500">Coverage Amount</dt>
                        <dd className="font-medium">{policy.coverageAmount}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-zinc-500">Deductible</dt>
                        <dd className="font-medium">{policy.deductible}</dd>
                      </div>
                    </dl>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Vehicle Information</CardTitle>
                  <CardDescription>Details about the insured vehicle</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100">
                          <Car className="h-5 w-5 text-zinc-700" />
                        </div>
                        <div>
                          <h3 className="font-medium">
                            {policy.vehicle.year} {policy.vehicle.make} {policy.vehicle.model}
                          </h3>
                          <p className="text-sm text-zinc-500">Primary Vehicle</p>
                        </div>
                      </div>

                      <dl className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <dt className="text-zinc-500">VIN</dt>
                          <dd className="font-medium">{policy.vehicle.vin}</dd>
                        </div>
                        <div>
                          <dt className="text-zinc-500">License Plate</dt>
                          <dd className="font-medium">{policy.vehicle.licensePlate}</dd>
                        </div>
                      </dl>
                    </div>

                    <div className="flex items-center justify-center">
                      <img
                        src="/sleek-camry-drive.png"
                        alt="Toyota Camry 2022"
                        className="max-h-[150px] object-contain"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="coverage" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Coverage Details</CardTitle>
                  <CardDescription>Breakdown of your policy coverage</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {policy.coverages.map((coverage, index) => (
                      <div key={index} className="border-b pb-4 last:border-0 last:pb-0">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">{coverage.name}</h3>
                          <span className="font-semibold">{coverage.amount}</span>
                        </div>
                        <p className="mt-1 text-sm text-zinc-500">{coverage.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="claims" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Claims History</CardTitle>
                  <CardDescription>History of claims filed under this policy</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {policy.claims.map((claim) => (
                      <ClaimCard
                        key={claim.id}
                        id={claim.id}
                        title={claim.title}
                        date={claim.date}
                        status={claim.status as "in-progress" | "completed" | "denied"}
                        progress={claim.progress}
                        policyId={policy.id}
                        amount={claim.amount}
                      />
                    ))}
                    {policy.claims.length === 0 && (
                      <div className="flex flex-col items-center justify-center py-8 text-center">
                        <CheckCircle2 className="h-12 w-12 text-green-500 mb-2" />
                        <h3 className="text-lg font-medium">No Claims Filed</h3>
                        <p className="text-sm text-zinc-500 max-w-md mt-1">
                          You haven't filed any claims under this policy. If you need to file a claim, please use the
                          button below.
                        </p>
                        <Button className="mt-4">File a New Claim</Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="documents" className="space-y-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Policy Documents</CardTitle>
                    <CardDescription>Access and download your policy documents</CardDescription>
                  </div>
                  <Button>
                    <FileText className="mr-2 h-4 w-4" />
                    Upload Document
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {policy.documents.map((document) => (
                      <DocumentCard
                        key={document.id}
                        id={document.id}
                        title={document.title}
                        type={document.type as "policy" | "claim" | "billing"}
                        date={document.date}
                        policyId={policy.id}
                        fileSize={document.fileSize}
                        fileType={document.fileType}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="billing" className="space-y-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Payment History</CardTitle>
                    <CardDescription>Record of your premium payments</CardDescription>
                  </div>
                  <Button>
                    <CreditCard className="mr-2 h-4 w-4" />
                    Make a Payment
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="py-3 text-left font-medium text-zinc-500">Payment ID</th>
                          <th className="py-3 text-left font-medium text-zinc-500">Date</th>
                          <th className="py-3 text-left font-medium text-zinc-500">Amount</th>
                          <th className="py-3 text-left font-medium text-zinc-500">Status</th>
                          <th className="py-3 text-left font-medium text-zinc-500">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {policy.payments.map((payment) => (
                          <tr key={payment.id} className="border-b">
                            <td className="py-3 text-sm">{payment.id}</td>
                            <td className="py-3 text-sm">{payment.date}</td>
                            <td className="py-3 text-sm font-medium">{payment.amount}</td>
                            <td className="py-3 text-sm">
                              <Badge
                                variant={payment.status === "paid" ? "default" : "outline"}
                                className={cn(
                                  "capitalize",
                                  payment.status === "paid" && "bg-green-100 text-green-700 hover:bg-green-100",
                                )}
                              >
                                {payment.status}
                              </Badge>
                            </td>
                            <td className="py-3 text-sm">
                              <Button variant="ghost" size="sm">
                                <Download className="mr-1 h-3 w-3" />
                                Receipt
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Payment Schedule</CardTitle>
                  <CardDescription>Upcoming premium payments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b pb-4">
                      <div>
                        <h3 className="font-medium">Next Payment</h3>
                        <p className="text-sm text-zinc-500">May 1, 2025</p>
                      </div>
                      <span className="font-semibold">$128.45</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Payment Method</h3>
                        <p className="text-sm text-zinc-500">Visa ending in 4242</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Change
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
