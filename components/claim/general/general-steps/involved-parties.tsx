"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { useGeneralClaimForm, type InvolvedParty, type Testimony } from "../general-claim-form-context"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Plus, Trash2, Edit2, AlertCircle, Users, Eye } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"

export default function InvolvedParties() {
  const { formData, updateFormData } = useGeneralClaimForm()
  const isMobile = useIsMobile()

  // State for the initial questions
  const [hasInvolvedParties, setHasInvolvedParties] = useState(formData.hasInvolvedParties)
  const [knowsInvolvedPerson, setKnowsInvolvedPerson] = useState(formData.knowsInvolvedPerson)

  // Involved Party state
  const [partyDialogOpen, setPartyDialogOpen] = useState(false)
  const [editingPartyIndex, setEditingPartyIndex] = useState<number | null>(null)
  const [partyFormData, setPartyFormData] = useState<InvolvedParty>({
    fullName: "",
    email: "",
    phone: "",
    description: "",
    insuranceCompany: "",
    policyNumber: "",
  })

  // Testimony state
  const [testimonyDialogOpen, setTestimonyDialogOpen] = useState(false)
  const [editingTestimonyIndex, setEditingTestimonyIndex] = useState<number | null>(null)
  const [testimonyFormData, setTestimonyFormData] = useState<Testimony>({
    fullName: "",
    email: "",
    phone: "",
    description: "",
  })

  // Refs for focusing first input in modals
  const partyNameRef = useRef<HTMLInputElement>(null)
  const testimonyNameRef = useRef<HTMLInputElement>(null)

  // Focus first input when modal opens
  useEffect(() => {
    if (partyDialogOpen) {
      setTimeout(() => {
        partyNameRef.current?.focus()
      }, 100)
    }
  }, [partyDialogOpen])

  useEffect(() => {
    if (testimonyDialogOpen) {
      setTimeout(() => {
        testimonyNameRef.current?.focus()
      }, 100)
    }
  }, [testimonyDialogOpen])

  // Update form data when toggles change
  // useEffect(() => {
    
  //   // If user switches to "No" for involved parties, clear the involved parties array
  //   if (!hasInvolvedParties && formData.involvedParties.length > 0) {
  //     updateFormData({ involvedParties: [], hasInvolvedParties })
  //   }else if (JSON.stringify(formData.hasInvolvedParties) !== JSON.stringify(hasInvolvedParties)) {
  //     updateFormData({ hasInvolvedParties })
  //   }
  // }, [hasInvolvedParties, updateFormData])

  // useEffect(() => {
  //   updateFormData({ knowsInvolvedPerson })

  //   // If user switches to "No" for knows involved person, clear the involved parties array
  //   if (!knowsInvolvedPerson ) {
  //     updateFormData({ knowsInvolvedPerson: false })
  //   }else if (JSON.stringify(formData.knowsInvolvedPerson) !== JSON.stringify(knowsInvolvedPerson)) {
  //     updateFormData({ knowsInvolvedPerson })
  //   }
  // }, [knowsInvolvedPerson, updateFormData])

  // Involved Party handlers
  const handlePartyChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setPartyFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddParty = () => {
    if (editingPartyIndex !== null) {
      // Update existing party
      const updatedParties = [...formData.involvedParties]
      updatedParties[editingPartyIndex] = partyFormData
      updateFormData({ involvedParties: updatedParties })
    } else {
      // Add new party
      updateFormData({ involvedParties: [...formData.involvedParties, partyFormData] })
    }

    resetPartyForm()
    setPartyDialogOpen(false)
  }

  const handleEditParty = (index: number) => {
    setPartyFormData(formData.involvedParties[index])
    setEditingPartyIndex(index)
    setPartyDialogOpen(true)
  }

  const handleDeleteParty = (index: number) => {
    const updatedParties = formData.involvedParties.filter((_, i) => i !== index)
    updateFormData({ involvedParties: updatedParties })
  }

  const resetPartyForm = () => {
    setPartyFormData({
      fullName: "",
      email: "",
      phone: "",
      description: "",
      insuranceCompany: "",
      policyNumber: "",
    })
    setEditingPartyIndex(null)
  }

  // Testimony handlers
  const handleTestimonyChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setTestimonyFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddTestimony = () => {
    if (editingTestimonyIndex !== null) {
      // Update existing testimony
      const updatedTestimonies = [...formData.testimonies]
      updatedTestimonies[editingTestimonyIndex] = testimonyFormData
      updateFormData({ testimonies: updatedTestimonies })
    } else {
      // Add new testimony
      updateFormData({ testimonies: [...formData.testimonies, testimonyFormData] })
    }

    resetTestimonyForm()
    setTestimonyDialogOpen(false)
  }

  const handleEditTestimony = (index: number) => {
    setTestimonyFormData(formData.testimonies[index])
    setEditingTestimonyIndex(index)
    setTestimonyDialogOpen(true)
  }

  const handleDeleteTestimony = (index: number) => {
    const updatedTestimonies = formData.testimonies.filter((_, i) => i !== index)
    updateFormData({ testimonies: updatedTestimonies })
  }

  const resetTestimonyForm = () => {
    setTestimonyFormData({
      fullName: "",
      email: "",
      phone: "",
      description: "",
    })
    setEditingTestimonyIndex(null)
  }

  // Render mobile card view for involved parties
  const renderPartyCard = (party: InvolvedParty, index: number) => (
    <div key={index} className="border rounded-md overflow-hidden mb-3">
      <div className="bg-zinc-50 p-3 flex justify-between items-center">
        <div className="font-medium">{party.fullName}</div>
        <div className="flex gap-1">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => handleEditParty(index)}>
            <Edit2 className="h-4 w-4" />
            <span className="sr-only">Edit</span>
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => handleDeleteParty(index)}>
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Delete</span>
          </Button>
        </div>
      </div>
      <div className="p-3 space-y-2">
        <div className="flex justify-between">
          <span className="text-sm text-zinc-500">Contact:</span>
          <span className="text-sm text-right">{party.email || party.phone || "Not provided"}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-zinc-500">Insurance:</span>
          <span className="text-sm text-right">
            {party.insuranceCompany} {party.policyNumber ? `(${party.policyNumber})` : ""}
          </span>
        </div>
        <div className="pt-1">
          <span className="text-sm text-zinc-500 block mb-1">Involvement:</span>
          <p className="text-sm bg-zinc-50 p-2 rounded-md">{party.description}</p>
        </div>
      </div>
    </div>
  )

  // Render mobile card view for testimonies
  const renderTestimonyCard = (testimony: Testimony, index: number) => (
    <div key={index} className="border rounded-md overflow-hidden mb-3">
      <div className="bg-zinc-50 p-3 flex justify-between items-center">
        <div className="font-medium">{testimony.fullName}</div>
        <div className="flex gap-1">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => handleEditTestimony(index)}>
            <Edit2 className="h-4 w-4" />
            <span className="sr-only">Edit</span>
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => handleDeleteTestimony(index)}>
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Delete</span>
          </Button>
        </div>
      </div>
      <div className="p-3 space-y-2">
        <div className="flex justify-between">
          <span className="text-sm text-zinc-500">Contact:</span>
          <span className="text-sm text-right">{testimony.email || testimony.phone || "Not provided"}</span>
        </div>
        <div className="pt-1">
          <span className="text-sm text-zinc-500 block mb-1">Testimony:</span>
          <p className="text-sm bg-zinc-50 p-2 rounded-md">{testimony.description}</p>
        </div>
      </div>
    </div>
  )

  return (
    <Card className="border-none shadow-none">
      <CardContent className="p-0 space-y-6">
        <div className="space-y-2">
          <h3 className="text-lg font-medium text-zinc-900">Involved Parties</h3>
          <p className="text-sm text-zinc-500">
            Provide information about other parties involved in or witnessing the incident.
          </p>
        </div>

        {/* Involved Parties Box */}
        <div className="border rounded-lg overflow-hidden">
          {/* Involved Parties Question */}
          <div className="flex items-center justify-between p-4 bg-zinc-50 border-b">
            <div className="flex items-start gap-3">
              <Users className="h-5 w-5 text-zinc-700 mt-0.5" />
              <div>
                <h4 className="font-medium text-zinc-900">Were other parties involved in the incident?</h4>
                <p className="text-sm text-zinc-500">
                  Select &apos;Yes&apos; if there were other people or companies involved in the incident.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-zinc-500">{hasInvolvedParties ? "Yes" : "No"}</span>
              <Switch
                checked={hasInvolvedParties}
                onCheckedChange={setHasInvolvedParties}
                aria-label="Toggle involved parties"
              />
            </div>
          </div>

          {/* Involved Parties Content */}
          {hasInvolvedParties && (
            <div className="p-4 space-y-4">
              {/* Do you know the person involved? */}
              <div className="border border-zinc-200 rounded-md overflow-hidden">
                <div className="bg-zinc-50 px-3 sm:px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-zinc-500" />
                    <div>
                      <h4 className="text-md font-medium text-zinc-900">Do you know the person involved?</h4>
                      <p className="text-sm text-zinc-500">
                        Select &apos;Yes&apos; if you have information about the involved person or company.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-zinc-500">{knowsInvolvedPerson ? "Yes" : "No"}</span>
                    <Switch
                      checked={knowsInvolvedPerson}
                      onCheckedChange={setKnowsInvolvedPerson}
                      aria-label="Toggle knows involved person"
                    />
                  </div>
                </div>
              </div>

              {knowsInvolvedPerson && (
                <>
                  <div className="flex justify-between items-center">
                    <h5 className="text-sm font-medium text-zinc-900">Involved Parties</h5>
                    <Dialog
                      open={partyDialogOpen}
                      onOpenChange={(open) => {
                        setPartyDialogOpen(open)
                        if (!open) resetPartyForm()
                      }}
                    >
                      <DialogTrigger asChild>
                        <Button
                          onClick={() => {
                            resetPartyForm()
                            setPartyDialogOpen(true)
                          }}
                          size="sm"
                          className="flex items-center gap-1"
                        >
                          <Plus className="h-4 w-4" />
                          Add Party
                        </Button>
                      </DialogTrigger>
                      <DialogContent
                        className={isMobile ? "w-[calc(100%-32px)] p-0 h-[90vh] max-h-[600px]" : "sm:max-w-[600px]"}
                      >
                        <DialogHeader className={isMobile ? "px-4 py-3 border-b" : ""}>
                          <DialogTitle>{editingPartyIndex !== null ? "Edit Party" : "Add Party"}</DialogTitle>
                          <DialogDescription className={isMobile ? "text-sm" : ""}>
                            Enter the details of the person or company involved in the incident.
                          </DialogDescription>
                        </DialogHeader>

                        <ScrollArea className={isMobile ? "h-[calc(90vh-130px)] max-h-[470px]" : ""}>
                          <div className={`grid grid-cols-1 gap-4 sm:grid-cols-2 ${isMobile ? "p-4" : "py-4"}`}>
                            <div className="space-y-2 sm:col-span-2">
                              <Label htmlFor="fullName">
                                Full Name / Company <span className="text-red-500">*</span>
                              </Label>
                              <Input
                                id="fullName"
                                name="fullName"
                                value={partyFormData.fullName}
                                onChange={handlePartyChange}
                                placeholder="Full name or company name"
                                required
                                ref={partyNameRef}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="email">Email</Label>
                              <Input
                                id="email"
                                name="email"
                                type="email"
                                value={partyFormData.email}
                                onChange={handlePartyChange}
                                placeholder="Email address"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="phone">Phone</Label>
                              <Input
                                id="phone"
                                name="phone"
                                value={partyFormData.phone}
                                onChange={handlePartyChange}
                                placeholder="Phone number"
                              />
                            </div>
                            <div className="space-y-2 sm:col-span-2">
                              <Label htmlFor="description">
                                Description of Involvement <span className="text-red-500">*</span>
                              </Label>
                              <Textarea
                                id="description"
                                name="description"
                                value={partyFormData.description}
                                onChange={handlePartyChange}
                                placeholder="Describe how this party was involved in the incident"
                                rows={4}
                                required
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="insuranceCompany">Insurance Company</Label>
                              <Input
                                id="insuranceCompany"
                                name="insuranceCompany"
                                value={partyFormData.insuranceCompany}
                                onChange={handlePartyChange}
                                placeholder="Insurance company name"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="policyNumber">Policy Number</Label>
                              <Input
                                id="policyNumber"
                                name="policyNumber"
                                value={partyFormData.policyNumber}
                                onChange={handlePartyChange}
                                placeholder="Insurance policy number"
                              />
                            </div>
                          </div>
                          <div
                            className={`text-sm text-zinc-500 flex items-center gap-1 mb-4 ${isMobile ? "px-4" : ""}`}
                          >
                            <AlertCircle className="h-4 w-4" />
                            <span>
                              Fields marked with <span className="text-red-500">*</span> are required
                            </span>
                          </div>
                        </ScrollArea>

                        <DialogFooter className={isMobile ? "flex p-4 border-t bg-zinc-50" : ""}>
                          <Button variant="outline" onClick={() => setPartyDialogOpen(false)}>
                            Cancel
                          </Button>
                          <Button
                            onClick={handleAddParty}
                            disabled={!partyFormData.fullName || !partyFormData.description}
                          >
                            {editingPartyIndex !== null ? "Update" : "Add"} Party
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>

                  {formData.involvedParties.length > 0 ? (
                    <>
                      {/* Desktop table view */}
                      <div className="hidden sm:block border rounded-md">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Name</TableHead>
                              <TableHead>Contact</TableHead>
                              <TableHead>Insurance</TableHead>
                              <TableHead className="w-[100px]">Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {formData.involvedParties.map((party, index) => (
                              <TableRow key={index}>
                                <TableCell>
                                  <div className="font-medium">{party.fullName}</div>
                                  <div className="text-sm text-zinc-500 line-clamp-1">{party.description}</div>
                                </TableCell>
                                <TableCell>
                                  <div>{party.email || "No email provided"}</div>
                                  <div className="text-sm text-zinc-500">{party.phone || "No phone provided"}</div>
                                </TableCell>
                                <TableCell>
                                  <div>{party.insuranceCompany || "Not provided"}</div>
                                  <div className="text-sm text-zinc-500">
                                    {party.policyNumber || "No policy number"}
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <div className="flex space-x-2">
                                    <Button variant="ghost" size="icon" onClick={() => handleEditParty(index)}>
                                      <Edit2 className="h-4 w-4" />
                                      <span className="sr-only">Edit</span>
                                    </Button>
                                    <Button variant="ghost" size="icon" onClick={() => handleDeleteParty(index)}>
                                      <Trash2 className="h-4 w-4" />
                                      <span className="sr-only">Delete</span>
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>

                      {/* Mobile card view */}
                      <div className="sm:hidden">
                        {formData.involvedParties.map((party, index) => renderPartyCard(party, index))}
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-6 border border-dashed rounded-md border-zinc-300 bg-zinc-50">
                      <p className="text-zinc-500">No involved parties added yet.</p>
                      <p className="text-sm text-zinc-400 mt-1">
                        Click &apos;Add Party&apos; to add information about other parties involved.
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>

        {/* Testimonies Box */}
        <div className="border rounded-lg overflow-hidden">
          <div className="flex items-center justify-between p-4 bg-zinc-50 border-b">
            <div className="flex items-start gap-3">
              <Eye className="h-5 w-5 text-zinc-700 mt-0.5" />
              <div>
                <h4 className="font-medium text-zinc-900">Add Testimony</h4>
                <p className="text-sm text-zinc-500">
                  Add testimony from witnesses or other relevant parties if applicable.
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 space-y-4">
            <div className="flex justify-between items-center">
              <h5 className="text-sm font-medium text-zinc-900">Testimonies</h5>
              <Dialog
                open={testimonyDialogOpen}
                onOpenChange={(open) => {
                  setTestimonyDialogOpen(open)
                  if (!open) resetTestimonyForm()
                }}
              >
                <DialogTrigger asChild>
                  <Button
                    onClick={() => {
                      resetTestimonyForm()
                      setTestimonyDialogOpen(true)
                    }}
                    size="sm"
                    className="flex items-center gap-1"
                  >
                    <Plus className="h-4 w-4" />
                    Add Testimony
                  </Button>
                </DialogTrigger>
                <DialogContent
                  className={isMobile ? "w-[calc(100%-32px)] p-0 h-[90vh] max-h-[600px]" : "sm:max-w-[600px]"}
                >
                  <DialogHeader className={isMobile ? "px-4 py-3 border-b" : ""}>
                    <DialogTitle>{editingTestimonyIndex !== null ? "Edit Testimony" : "Add Testimony"}</DialogTitle>
                    <DialogDescription className={isMobile ? "text-sm" : ""}>
                      Enter the details of a testimony related to the incident.
                    </DialogDescription>
                  </DialogHeader>

                  <ScrollArea className={isMobile ? "h-[calc(90vh-130px)] max-h-[470px]" : ""}>
                    <div className={`grid grid-cols-1 gap-4 sm:grid-cols-2 ${isMobile ? "p-4" : "py-4"}`}>
                      <div className="space-y-2 sm:col-span-2">
                        <Label htmlFor="testimonyFullName">
                          Full Name <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="testimonyFullName"
                          name="fullName"
                          value={testimonyFormData.fullName}
                          onChange={handleTestimonyChange}
                          placeholder="Full name"
                          required
                          ref={testimonyNameRef}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="testimonyEmail">Email</Label>
                        <Input
                          id="testimonyEmail"
                          name="email"
                          type="email"
                          value={testimonyFormData.email}
                          onChange={handleTestimonyChange}
                          placeholder="Email address"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="testimonyPhone">Phone</Label>
                        <Input
                          id="testimonyPhone"
                          name="phone"
                          value={testimonyFormData.phone}
                          onChange={handleTestimonyChange}
                          placeholder="Phone number"
                        />
                      </div>
                      <div className="space-y-2 sm:col-span-2">
                        <Label htmlFor="testimonyDescription">
                          Testimony Description <span className="text-red-500">*</span>
                        </Label>
                        <Textarea
                          id="testimonyDescription"
                          name="description"
                          value={testimonyFormData.description}
                          onChange={handleTestimonyChange}
                          placeholder="Testimony description or statement"
                          rows={4}
                          required
                        />
                      </div>
                    </div>
                    <div className={`text-sm text-zinc-500 flex items-center gap-1 mb-4 ${isMobile ? "px-4" : ""}`}>
                      <AlertCircle className="h-4 w-4" />
                      <span>
                        Fields marked with <span className="text-red-500">*</span> are required
                      </span>
                    </div>
                  </ScrollArea>

                  <DialogFooter className={isMobile ? "flex p-4 border-t bg-zinc-50" : ""}>
                    <Button variant="outline" onClick={() => setTestimonyDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button
                      onClick={handleAddTestimony}
                      disabled={!testimonyFormData.fullName || !testimonyFormData.description}
                    >
                      {editingTestimonyIndex !== null ? "Update" : "Add"} Testimony
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            {formData.testimonies.length > 0 ? (
              <>
                {/* Desktop table view */}
                <div className="hidden sm:block border rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Testimony</TableHead>
                        <TableHead className="w-[100px]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {formData.testimonies.map((testimony, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <div className="font-medium">{testimony.fullName}</div>
                          </TableCell>
                          <TableCell>
                            <div>{testimony.email || "No email provided"}</div>
                            <div className="text-sm text-zinc-500">{testimony.phone || "No phone provided"}</div>
                          </TableCell>
                          <TableCell>
                            <div className="max-w-[200px] truncate">{testimony.description}</div>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button variant="ghost" size="icon" onClick={() => handleEditTestimony(index)}>
                                <Edit2 className="h-4 w-4" />
                                <span className="sr-only">Edit</span>
                              </Button>
                              <Button variant="ghost" size="icon" onClick={() => handleDeleteTestimony(index)}>
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Delete</span>
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Mobile card view */}
                <div className="sm:hidden">
                  {formData.testimonies.map((testimony, index) => renderTestimonyCard(testimony, index))}
                </div>
              </>
            ) : (
              <div className="text-center py-6 border border-dashed rounded-md border-zinc-300 bg-zinc-50">
                <p className="text-zinc-500">No testimonies added yet.</p>
                <p className="text-sm text-zinc-400 mt-1">
                  Click &apos;Add Testimony&apos; to add information about testimonies related to the incident.
                </p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
