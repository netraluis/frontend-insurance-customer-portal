"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { ArrowUpDown, Upload, Grid, List } from "lucide-react"
import { DocumentList } from "@/app/components/document-list"
import { UploadDocumentDialog } from "@/app/components/upload-document-dialog"
import { useState } from "react"

// Sample document data
const documents = [
  {
    id: "DOC-001",
    title: "Auto Insurance Policy",
    type: "policy",
    date: "April 15, 2025",
    policyId: "POL-AUTO-001",
    fileSize: "1.2 MB",
    fileType: "PDF",
    category: "policy",
    description: "Comprehensive auto insurance policy document",
    lastModified: "April 15, 2025",
    tags: ["auto", "policy", "important"],
  },
  {
    id: "DOC-002",
    title: "Home Insurance Policy",
    type: "policy",
    date: "April 10, 2025",
    policyId: "POL-HOME-001",
    fileSize: "1.5 MB",
    fileType: "PDF",
    category: "policy",
    description: "Home insurance policy with coverage details",
    lastModified: "April 10, 2025",
    tags: ["home", "policy", "important"],
  },
  {
    id: "DOC-003",
    title: "Auto Claim Report",
    type: "claim",
    date: "April 10, 2025",
    policyId: "POL-AUTO-001",
    fileSize: "0.8 MB",
    fileType: "PDF",
    category: "claim",
    description: "Accident report and claim documentation",
    lastModified: "April 10, 2025",
    tags: ["auto", "claim"],
  },
  {
    id: "DOC-004",
    title: "Payment Receipt",
    type: "billing",
    date: "April 1, 2025",
    policyId: "POL-AUTO-001",
    fileSize: "0.3 MB",
    fileType: "PDF",
    category: "billing",
    description: "Monthly premium payment receipt",
    lastModified: "April 1, 2025",
    tags: ["payment", "receipt"],
  },
  {
    id: "DOC-005",
    title: "Driver's License",
    type: "id",
    date: "January 15, 2025",
    policyId: "POL-AUTO-001",
    fileSize: "0.5 MB",
    fileType: "JPG",
    category: "id",
    description: "Copy of driver's license for policy holder",
    lastModified: "January 15, 2025",
    tags: ["id", "personal"],
  },
  {
    id: "DOC-006",
    title: "Vehicle Registration",
    type: "id",
    date: "February 22, 2025",
    policyId: "POL-AUTO-001",
    fileSize: "0.4 MB",
    fileType: "JPG",
    category: "id",
    description: "Vehicle registration document",
    lastModified: "February 22, 2025",
    tags: ["auto", "registration"],
  },
  {
    id: "DOC-007",
    title: "Home Inspection Report",
    type: "policy",
    date: "March 5, 2025",
    policyId: "POL-HOME-001",
    fileSize: "2.1 MB",
    fileType: "PDF",
    category: "policy",
    description: "Home inspection report for insurance coverage",
    lastModified: "March 5, 2025",
    tags: ["home", "inspection"],
  },
  {
    id: "DOC-008",
    title: "Medical Records",
    type: "claim",
    date: "February 18, 2025",
    policyId: "POL-HEALTH-001",
    fileSize: "1.7 MB",
    fileType: "PDF",
    category: "claim",
    description: "Medical records for health insurance claim",
    lastModified: "February 18, 2025",
    tags: ["health", "medical", "confidential"],
  },
  {
    id: "DOC-009",
    title: "Travel Insurance Certificate",
    type: "policy",
    date: "March 20, 2025",
    policyId: "POL-TRAVEL-001",
    fileSize: "0.6 MB",
    fileType: "PDF",
    category: "policy",
    description: "Travel insurance certificate and coverage details",
    lastModified: "March 20, 2025",
    tags: ["travel", "policy"],
  },
  {
    id: "DOC-010",
    title: "Property Photos",
    type: "claim",
    date: "March 15, 2025",
    policyId: "POL-HOME-001",
    fileSize: "3.5 MB",
    fileType: "ZIP",
    category: "claim",
    description: "Photos of property damage for home insurance claim",
    lastModified: "March 15, 2025",
    tags: ["home", "claim", "photos"],
  },
]

export default function DocumentsPage() {
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  // ts-ignore
  const [searchTerm, setSearchTerm] = useState("")
  console.log({setSearchTerm})

  return (
    <div className="flex flex-col min-h-screen animate-in">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
        <SidebarTrigger />
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold">Documents</h1>
        </div>
        <div className="ml-auto"></div>
      </header>

      <main className="flex-1 p-6 pt-4 page-transition">
        <div className="grid gap-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold">Document Repository</h2>
              <p className="text-muted-foreground">Manage and access all your insurance documents</p>
            </div>
            <Button className="w-full md:w-auto" onClick={() => setIsUploadDialogOpen(true)}>
              <Upload className="mr-2 h-4 w-4" />
              Upload Document
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-medium">All Documents</h3>
                  <Badge variant="outline" className="ml-2">
                    {documents.length} Documents
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        <ArrowUpDown className="mr-2 h-3.5 w-3.5" />
                        Sort By
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Name (A-Z)</DropdownMenuItem>
                      <DropdownMenuItem>Name (Z-A)</DropdownMenuItem>
                      <DropdownMenuItem>Date (Newest)</DropdownMenuItem>
                      <DropdownMenuItem>Date (Oldest)</DropdownMenuItem>
                      <DropdownMenuItem>Size (Largest)</DropdownMenuItem>
                      <DropdownMenuItem>Size (Smallest)</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <div className="flex border rounded-md">
                    <Button
                      variant={viewMode === "grid" ? "default" : "ghost"}
                      size="sm"
                      className="rounded-r-none"
                      onClick={() => setViewMode("grid")}
                    >
                      <Grid className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "default" : "ghost"}
                      size="sm"
                      className="rounded-l-none"
                      onClick={() => setViewMode("list")}
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <Tabs defaultValue="all">
                <TabsList className="mb-4">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="policy">Policy</TabsTrigger>
                  <TabsTrigger value="claim">Claims</TabsTrigger>
                  <TabsTrigger value="billing">Billing</TabsTrigger>
                  <TabsTrigger value="id">ID Documents</TabsTrigger>
                </TabsList>
                <TabsContent value="all">
                  <DocumentList documents={documents} view={viewMode} searchTerm={searchTerm} />
                </TabsContent>
                <TabsContent value="policy">
                  <DocumentList
                    documents={documents.filter((doc) => doc.type === "policy")}
                    view={viewMode}
                    searchTerm={searchTerm}
                  />
                </TabsContent>
                <TabsContent value="claim">
                  <DocumentList
                    documents={documents.filter((doc) => doc.type === "claim")}
                    view={viewMode}
                    searchTerm={searchTerm}
                  />
                </TabsContent>
                <TabsContent value="billing">
                  <DocumentList
                    documents={documents.filter((doc) => doc.type === "billing")}
                    view={viewMode}
                    searchTerm={searchTerm}
                  />
                </TabsContent>
                <TabsContent value="id">
                  <DocumentList
                    documents={documents.filter((doc) => doc.type === "id")}
                    view={viewMode}
                    searchTerm={searchTerm}
                  />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>

      <UploadDocumentDialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen} />
    </div>
  )
}
