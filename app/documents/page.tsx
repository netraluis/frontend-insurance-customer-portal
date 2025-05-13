"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { ArrowUpDown, Upload, Grid, List } from "lucide-react"
import { DocumentList } from "@/components/document-list"
import { UploadDocumentDialog } from "@/components/upload-document-dialog"
import { useState } from "react"

// Sample document data
const documents = [
  {
    id: "DOC-001",
    title: "Política d'assegurança de cotxe",
    type: "policy",
    date: "15 d'abril de 2025",
    policyId: "POL-AUTO-001",
    fileSize: "1.2 MB",
    fileType: "PDF",
    category: "policy",
    description: "Document de política d'assegurança de cotxe",
    lastModified: "15 d'abril de 2025",
    tags: ["cotxe", "política", "important"],
  },
  {
    id: "DOC-002",
    title: "Política d'assegurança de casa",
    type: "policy",
    date: "10 d'abril de 2025",
    policyId: "POL-HOME-001",
    fileSize: "1.5 MB",
    fileType: "PDF",
    category: "policy",
    description: "Document de política d'assegurança de casa",
    lastModified: "10 d'abril de 2025",
    tags: ["casa", "política", "important"],
  },
  {
    id: "DOC-003",
    title: "Informe de reclamació d'assegurança de cotxe",
    type: "claim",
    date: "10 d'abril de 2025",
    policyId: "POL-AUTO-001",
    fileSize: "0.8 MB",
    fileType: "PDF",
    category: "claim",
    description: "Informe de reclamació i documentació de reclamació",
    lastModified: "10 d'abril de 2025",
    tags: ["cotxe", "reclamació"],
  },
  {
    id: "DOC-004",
    title: "Comprovat de pagament",
    type: "billing",
    date: "1 de abril de 2025",
    policyId: "POL-AUTO-001",
    fileSize: "0.3 MB",
    fileType: "PDF",
    category: "billing",
    description: "Comprovat de pagament mensual",
    lastModified: "1 de abril de 2025",
    tags: ["pagament", "comprovat"],
  },
  {
    id: "DOC-005",
    title: "Carnet de conduir",
    type: "id",
    date: "15 de gener de 2025",
    policyId: "POL-AUTO-001",
    fileSize: "0.5 MB",
    fileType: "JPG",
    category: "id",
    description: "Copia del carnet de conduir per al titular de la política",
    lastModified: "15 de gener de 2025",
    tags: ["id", "personal"],
  },
  {
    id: "DOC-006",
    title: "Inscripció de vehicle",
    type: "id",
    date: "22 de febrer de 2025",
    policyId: "POL-AUTO-001",
    fileSize: "0.4 MB",
    fileType: "JPG",
    category: "id",
    description: "Document d'inscripció de vehicle",
    lastModified: "22 de febrer de 2025",
    tags: ["cotxe", "inscripció"],
  },
  {
    id: "DOC-007",
    title: "Informe d'inspecció de casa",
    type: "policy",
    date: "5 de març de 2025",
    policyId: "POL-HOME-001",
    fileSize: "2.1 MB",
    fileType: "PDF",
    category: "policy",
    description: "Informe d'inspecció de casa per a la cobertura d'assegurança",
    lastModified: "5 de març de 2025",
    tags: ["casa", "inspecció"],
  },
  {
    id: "DOC-008",
    title: "Registres mèdics",
    type: "claim",
    date: "18 de febrer de 2025",
    policyId: "POL-HEALTH-001",
    fileSize: "1.7 MB",
    fileType: "PDF",
    category: "claim",
    description: "Registres mèdics per a la cobertura d'assegurança de salut",
    lastModified: "18 de febrer de 2025",
    tags: ["salut", "mèdic", "confidencial"],
  },
  {
    id: "DOC-009",
    title: "Certificat d'assegurança de viatge",
    type: "policy",
    date: "20 de març de 2025",
    policyId: "POL-TRAVEL-001",
    fileSize: "0.6 MB",
    fileType: "PDF",
    category: "policy",
    description: "Certificat d'assegurança de viatge i detalls de cobertura",
    lastModified: "20 de març de 2025",
    tags: ["viatge", "política"],
  },
  {
    id: "DOC-010",
    title: "Fotos de la propietat",
    type: "claim",
    date: "15 de març de 2025",
    policyId: "POL-HOME-001",
    fileSize: "3.5 MB",
    fileType: "ZIP",
    category: "claim",
    description: "Fotos de danys a la propietat per a la cobertura d'assegurança de casa",
    lastModified: "15 de març de 2025",
    tags: ["casa", "reclamació", "fotos"],
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
                  <h3 className="text-lg font-medium">Tots els documents</h3>
                  <Badge variant="outline" className="ml-2">
                    {documents.length} Documents
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        <ArrowUpDown className="mr-2 h-3.5 w-3.5" />
                        Ordenar per
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Nom (A-Z)</DropdownMenuItem>
                      <DropdownMenuItem>Nom (Z-A)</DropdownMenuItem>
                      <DropdownMenuItem>Data (Més recents)</DropdownMenuItem>
                      <DropdownMenuItem>Data (Més antics)</DropdownMenuItem>
                      <DropdownMenuItem>Tamany (Més grans)</DropdownMenuItem>
                      <DropdownMenuItem>Tamany (Més petits)</DropdownMenuItem>
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
                  <TabsTrigger value="all">Tots</TabsTrigger>
                  <TabsTrigger value="policy">Polítiques</TabsTrigger>
                  <TabsTrigger value="claim">Reclamacions</TabsTrigger>
                  <TabsTrigger value="billing">Pagaments</TabsTrigger>
                  <TabsTrigger value="id">Documents d'identificació</TabsTrigger>
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
