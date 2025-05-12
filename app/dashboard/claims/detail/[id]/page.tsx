'use client'
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Bell,
  ArrowLeft,
  CheckCircle2,
  Clock,
  AlertCircle,
  XCircle,
  Car,
  HomeIcon,
  Heart,
  Plane,
  FileText,
  MessageSquare,
  User,
  Phone,
  Mail,
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function ClaimDetailPage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch the claim details based on the ID
  const claim = {
    id: params.id,
    title: "Auto Accident Claim",
    date: "April 10, 2025",
    status: "in-progress",
    progress: 65,
    policyId: "POL-AUTO-001",
    policyType: "auto",
    amount: "$3,450.00",
    description:
      "Collision damage to front bumper and hood. Accident occurred at intersection of Main St and 5th Ave. Other driver ran a red light and hit the front of my vehicle. Police report filed at the scene.",
    submittedBy: "John Doe",
    assignedTo: "Sarah Johnson",
    lastUpdated: "April 15, 2025",
    timeline: [
      {
        date: "April 10, 2025",
        time: "09:15 AM",
        title: "Claim Submitted",
        description: "Claim was submitted through the online portal",
        status: "completed",
      },
      {
        date: "April 11, 2025",
        time: "10:30 AM",
        title: "Claim Assigned",
        description: "Claim was assigned to Sarah Johnson",
        status: "completed",
      },
      {
        date: "April 12, 2025",
        time: "02:45 PM",
        title: "Initial Assessment",
        description: "Initial assessment completed by claims adjuster",
        status: "completed",
      },
      {
        date: "April 15, 2025",
        time: "11:20 AM",
        title: "Repair Estimate Requested",
        description: "Repair estimate requested from approved auto shop",
        status: "in-progress",
      },
      {
        date: "April 18, 2025",
        time: "TBD",
        title: "Repair Estimate Review",
        description: "Review of repair estimate by claims adjuster",
        status: "pending",
      },
      {
        date: "April 22, 2025",
        time: "TBD",
        title: "Payment Processing",
        description: "Processing of payment for approved claim amount",
        status: "pending",
      },
    ],
    documents: [
      {
        id: "DOC-001",
        title: "Accident Report",
        type: "claim",
        date: "April 10, 2025",
        fileSize: "1.2 MB",
        fileType: "PDF",
      },
      {
        id: "DOC-002",
        title: "Vehicle Photos",
        type: "claim",
        date: "April 10, 2025",
        fileSize: "3.5 MB",
        fileType: "ZIP",
      },
      {
        id: "DOC-003",
        title: "Police Report",
        type: "claim",
        date: "April 11, 2025",
        fileSize: "0.8 MB",
        fileType: "PDF",
      },
    ],
    messages: [
      {
        id: "MSG-001",
        from: "Sarah Johnson",
        role: "Claims Adjuster",
        date: "April 11, 2025",
        time: "11:45 AM",
        content:
          "Hello Mr. Doe, I've been assigned to your claim. I've reviewed the initial information and will need some additional details about the accident. Could you please provide any photos you have of the damage?",
      },
      {
        id: "MSG-002",
        from: "John Doe",
        role: "Policyholder",
        date: "April 11, 2025",
        time: "01:30 PM",
        content:
          "Hi Sarah, I've uploaded photos of the damage to my vehicle. Please let me know if you need anything else.",
      },
      {
        id: "MSG-003",
        from: "Sarah Johnson",
        role: "Claims Adjuster",
        date: "April 12, 2025",
        time: "09:15 AM",
        content:
          "Thank you for the photos. I've scheduled an assessment with our approved auto shop. They will contact you directly to arrange a time for the inspection.",
      },
    ],
  }

  // Get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-4 w-4 text-green-600" />
      case "in-progress":
        return <Clock className="h-4 w-4 text-blue-600" />
      case "pending":
        return <AlertCircle className="h-4 w-4 text-amber-600" />
      case "denied":
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return <Clock className="h-4 w-4 text-zinc-600" />
    }
  }

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700 hover:bg-green-100"
      case "in-progress":
        return "bg-blue-100 text-blue-700 hover:bg-blue-100"
      case "pending":
        return "bg-amber-100 text-amber-700 hover:bg-amber-100"
      case "denied":
        return "bg-red-100 text-red-700 hover:bg-red-100"
      default:
        return "bg-zinc-100 text-zinc-700 hover:bg-zinc-100"
    }
  }

  // Get policy type icon
  const getPolicyTypeIcon = () => {
    switch (claim.policyType) {
      case "auto":
        return <Car className="h-5 w-5 text-zinc-700" />
      case "home":
        return <HomeIcon className="h-5 w-5 text-zinc-700" />
      case "health":
        return <Heart className="h-5 w-5 text-zinc-700" />
      case "travel":
        return <Plane className="h-5 w-5 text-zinc-700" />
      default:
        return <Car className="h-5 w-5 text-zinc-700" />
    }
  }

  return (
    <div className="flex flex-col min-h-screen animate-in">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
        <SidebarTrigger />
        <Button variant="ghost" size="icon" asChild>
          <Link href="/claims">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold">{claim.title}</h1>
          <Badge variant="outline" className={cn("capitalize flex items-center gap-1", getStatusColor(claim.status))}>
            {getStatusIcon(claim.status)}
            <span className="capitalize">{claim.status.replace("-", " ")}</span>
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
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="messages">Messages</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Claim Summary</CardTitle>
                    <CardDescription>Details about your insurance claim</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm text-zinc-600">{claim.description}</p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100">
                              {getPolicyTypeIcon()}
                            </div>
                            <div>
                              <h3 className="font-medium">Policy Information</h3>
                              <p className="text-sm text-zinc-500">{claim.policyId}</p>
                            </div>
                          </div>

                          <dl className="grid grid-cols-2 gap-3 text-sm">
                            <div>
                              <dt className="text-zinc-500">Policy Type</dt>
                              <dd className="font-medium capitalize">{claim.policyType}</dd>
                            </div>
                            <div>
                              <dt className="text-zinc-500">Claim ID</dt>
                              <dd className="font-medium">{claim.id}</dd>
                            </div>
                          </dl>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100">
                              <User className="h-5 w-5 text-zinc-700" />
                            </div>
                            <div>
                              <h3 className="font-medium">Claims Adjuster</h3>
                              <p className="text-sm text-zinc-500">{claim.assignedTo}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 text-sm">
                            <Phone className="h-4 w-4 text-zinc-500" />
                            <span>(555) 123-4567</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Mail className="h-4 w-4 text-zinc-500" />
                            <span>sarah.johnson@insurance.com</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Claim Details</CardTitle>
                    <CardDescription>Key information about your claim</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <dl className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <dt className="text-zinc-500">Claim Number</dt>
                        <dd className="font-medium">{claim.id}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-zinc-500">Date Filed</dt>
                        <dd className="font-medium">{claim.date}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-zinc-500">Last Updated</dt>
                        <dd className="font-medium">{claim.lastUpdated}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-zinc-500">Claim Amount</dt>
                        <dd className="font-medium">{claim.amount}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-zinc-500">Status</dt>
                        <dd className="font-medium capitalize">{claim.status.replace("-", " ")}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-zinc-500">Progress</dt>
                        <dd className="font-medium">{claim.progress}%</dd>
                      </div>
                    </dl>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Claim Progress</CardTitle>
                  <CardDescription>Current status of your claim</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="relative">
                      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-zinc-200" />
                      {claim.timeline.slice(0, 4).map((event, index) => (
                        <div key={index} className="relative pl-10 pb-6 last:pb-0">
                          <div className="absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-full bg-white border border-zinc-200">
                            {getStatusIcon(event.status)}
                          </div>
                          <div>
                            <h3 className="font-medium">{event.title}</h3>
                            <p className="text-sm text-zinc-500">{event.description}</p>
                            <p className="text-xs text-zinc-400 mt-1">
                              {event.date} • {event.time}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" className="w-full">
                      View Full Timeline
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="timeline" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Claim Timeline</CardTitle>
                  <CardDescription>Complete history of your claim</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-zinc-200" />
                    {claim.timeline.map((event, index) => (
                      <div key={index} className="relative pl-10 pb-8 last:pb-0">
                        <div className="absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-full bg-white border border-zinc-200">
                          {getStatusIcon(event.status)}
                        </div>
                        <div>
                          <h3 className="font-medium">{event.title}</h3>
                          <p className="text-sm text-zinc-500">{event.description}</p>
                          <p className="text-xs text-zinc-400 mt-1">
                            {event.date} • {event.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="documents" className="space-y-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Claim Documents</CardTitle>
                    <CardDescription>Documents related to your claim</CardDescription>
                  </div>
                  <Button>
                    <FileText className="mr-2 h-4 w-4" />
                    Upload Document
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {claim.documents.map((document) => (
                      <Card key={document.id} className="overflow-hidden transition-all">
                        <CardContent className="p-6">
                          <div className="flex items-start gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-amber-100">
                              <FileText className="h-5 w-5 text-amber-700" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-medium">{document.title}</h3>
                              <p className="text-sm text-zinc-500">
                                {document.fileType} • {document.fileSize} • {document.date}
                              </p>
                              <div className="mt-2 flex items-center justify-between">
                                <span className="text-xs text-zinc-500">Claim Document</span>
                                <Button variant="ghost" size="sm" className="h-8 gap-1">
                                  <FileText className="h-3.5 w-3.5" />
                                  <span>View</span>
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="messages" className="space-y-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Messages</CardTitle>
                    <CardDescription>Communication about your claim</CardDescription>
                  </div>
                  <Button>
                    <MessageSquare className="mr-2 h-4 w-4" />
                    New Message
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {claim.messages.map((message) => (
                      <div key={message.id} className="border-b pb-6 last:border-0 last:pb-0">
                        <div className="flex items-start gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage
                              src={
                                message.from === "John Doe" ? "/vibrant-street-market.png" : "/abstract-ai-network.png"
                              }
                              alt={message.from}
                            />
                            <AvatarFallback>{message.from[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                              <div>
                                <h3 className="font-medium">{message.from}</h3>
                                <p className="text-xs text-zinc-500">{message.role}</p>
                              </div>
                              <p className="text-xs text-zinc-400 mt-1 sm:mt-0">
                                {message.date} • {message.time}
                              </p>
                            </div>
                            <p className="mt-2 text-sm text-zinc-600">{message.content}</p>
                          </div>
                        </div>
                      </div>
                    ))}
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
