"use client"

import React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Paperclip, X, FileText, Plus, Trash, Users, AlertCircle, Table, Trash2, Edit2 } from "lucide-react"
import type { IncidentFormData } from "../incident-report-form"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Driver } from "../claim-form-context"
import { TableBody, TableCell, TableHead, TableRow } from "../ui/table"
import { TableHeader } from "../ui/table"


interface DocumentationStepProps {
  formData: IncidentFormData
  updateFormData: (fieldName: keyof IncidentFormData, value: any) => void
  updateMultipleFields: (fields: Partial<IncidentFormData>) => void
}

export default function DocumentationStep({ formData, updateFormData, updateMultipleFields }: DocumentationStepProps) {
  const [dragActive, setDragActive] = useState(false)
  const [hasDrivers, setHasDrivers] = useState(false)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files)
    }
  }

  const handleFiles = (files: FileList) => {
    const newFiles = Array.from(files)
    updateFormData("files", [...formData.files, ...newFiles])
  }

  const removeFile = (index: number) => {
    const updatedFiles = [...formData.files]
    updatedFiles.splice(index, 1)
    updateFormData("files", updatedFiles)
  }

  const formatFileSize = (size: number) => {
    if (size < 1024) return size + " bytes"
    else if (size < 1024 * 1024) return (size / 1024).toFixed(1) + " KB"
    else return (size / (1024 * 1024)).toFixed(1) + " MB"
  }

  const addWitness = () => {
    updateFormData("witnesses", [...formData.witnesses, { name: "", contact: "" }])
  }

  const updateWitness = (index: number, field: "name" | "contact", value: string) => {
    const updatedWitnesses = [...formData.witnesses]
    updatedWitnesses[index][field] = value
    updateFormData("witnesses", updatedWitnesses)
  }

  const removeWitness = (index: number) => {
    const updatedWitnesses = [...formData.witnesses]
    updatedWitnesses.splice(index, 1)
    updateFormData("witnesses", updatedWitnesses)
  }

  const handleDeleteDriver = (index: number) => {
    const updatedDrivers = formData.drivers.filter((_, i) => i !== index)
    updateFormData("drivers", updatedDrivers)
  }

  const handleDriverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setDriverFormData((prev) => ({ ...prev, [name]: value }))
  }

  const [editingDriverIndex, setEditingDriverIndex] = useState<number | null>(null)
  const [driverDialogOpen, setDriverDialogOpen] = useState(false)
  const [driverFormData, setDriverFormData] = useState<Driver>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    vehicleMake: "",
    vehicleModel: "",
    licensePlate: "",
    insuranceCompany: "",
    policyNumber: "",
  })

  const resetDriverForm = () => {
    setDriverFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      vehicleMake: "",
      vehicleModel: "",
      licensePlate: "",
      insuranceCompany: "",
      policyNumber: "",
    })
    setEditingDriverIndex(null)
  }

  

  const handleAddDriver = () => {
    if (editingDriverIndex !== null) {
      // Add new driver
      updateFormData("drivers", [...formData.drivers, driverFormData])
    }

    resetDriverForm()
    setDriverDialogOpen(false)
  }

  const handleEditDriver = (index: number) => {
    setDriverFormData(formData.drivers[index])
    setEditingDriverIndex(index)
    setDriverDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      <p className="text-gray-500">Upload any relevant documents or photos related to the incident</p>

      <div className="space-y-6">
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center ${
            dragActive ? "border-primary bg-primary/5" : "border-gray-300"
          }`}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
        >
          <Paperclip className="mx-auto h-10 w-10 text-gray-400 mb-3" />
          <p className="text-sm text-gray-600 mb-1">Drag and drop files here, or click to select files</p>
          <p className="text-xs text-gray-500 mb-4">Supports images, PDFs, and documents up to 10MB each</p>
          <Input id="fileUpload" type="file" className="hidden" onChange={handleFileChange} multiple />
          <Button variant="outline" onClick={() => document.getElementById("fileUpload")?.click()} type="button">
            Select Files
          </Button>
        </div>

        {formData.files.length > 0 && (
          <div className="space-y-3">
            <Label>Uploaded Files</Label>
            <div className="space-y-2">
              {formData.files.map((file, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-md border">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium truncate max-w-[200px] sm:max-w-xs">{file.name}</p>
                      <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => removeFile(index)} className="h-8 w-8 p-0">
                    <X className="h-4 w-4" />
                    <span className="sr-only">Remove file</span>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="border rounded-lg overflow-hidden">
          {/* Third Party Involved */}
          <div className="flex items-center justify-between p-4 bg-zinc-50 border-b">
            <div className="flex items-start gap-3">
              <Users className="h-5 w-5 text-zinc-700 mt-0.5" />
              <div>
                <h4 className="font-medium text-zinc-900">Were more people involved in the accident?</h4>
                <p className="text-sm text-zinc-500">
                  Select 'Yes' if there were more than one person involved in the incident.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-zinc-500">{hasDrivers ? "Yes" : "No"}</span>
              <Switch checked={hasDrivers} onCheckedChange={setHasDrivers} aria-label="Toggle drivers involved" />
            </div>
          </div>
        </div>

        {hasDrivers && (
            <div className="p-4 space-y-4">
              <div className="flex justify-between items-center">
                <h5 className="text-sm font-medium text-zinc-900">Other Drivers</h5>
                <Dialog open={driverDialogOpen} onOpenChange={setDriverDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      onClick={() => {
                        resetDriverForm()
                        setDriverDialogOpen(true)
                      }}
                      size="sm"
                      className="flex items-center gap-1"
                    >
                      <Plus className="h-4 w-4" />
                      Add Third Person
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                      <DialogTitle>{editingDriverIndex !== null ? "Edit Driver" : "Add Driver"}</DialogTitle>
                      <DialogDescription>
                        Enter the details of the other person involved in the accident.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="driverFirstName">
                          First Name <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="driverFirstName"
                          name="firstName"
                          value={driverFormData.firstName}
                          onChange={handleDriverChange}
                          placeholder="First name"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="driverLastName">
                          Last Name <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="driverLastName"
                          name="lastName"
                          value={driverFormData.lastName}
                          onChange={handleDriverChange}
                          placeholder="Last name"
                          required
                        />
                      </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="driverPhone">Phone</Label>
                        <Input
                          id="driverPhone"
                          name="phone"
                          value={driverFormData.phone}
                          onChange={handleDriverChange}
                          placeholder="Phone number"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="driverInsuranceCompany">Insurance Company</Label>
                        <Input
                          id="driverInsuranceCompany"
                          name="insuranceCompany"
                          value={driverFormData.insuranceCompany}
                          onChange={handleDriverChange}
                          placeholder="Insurance company name"
                        />
                      </div>
                    <div className="text-sm text-zinc-500 flex items-center gap-1 mb-4">
                      <AlertCircle className="h-4 w-4" />
                      <span>
                        Fields marked with <span className="text-red-500">*</span> are required
                      </span>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setDriverDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button
                        onClick={handleAddDriver}
                        disabled={
                          !driverFormData.firstName ||
                          !driverFormData.lastName ||
                          !driverFormData.vehicleMake ||
                          !driverFormData.vehicleModel ||
                          !driverFormData.licensePlate
                        }
                      >
                        {editingDriverIndex !== null ? "Update" : "Add"} Driver
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              {formData && formData.drivers && formData.drivers.length > 0 ? (
                <div className="border rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Vehicle</TableHead>
                        <TableHead>Insurance</TableHead>
                        <TableHead className="w-[100px]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {formData.drivers.map((driver, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <div className="font-medium">
                              {driver.firstName} {driver.lastName}
                            </div>
                            <div className="text-sm text-zinc-500">{driver.email}</div>
                          </TableCell>
                          <TableCell>
                            <div>
                              {driver.vehicleMake} {driver.vehicleModel}
                            </div>
                            <div className="text-sm text-zinc-500">{driver.licensePlate}</div>
                          </TableCell>
                          <TableCell>
                            <div>{driver.insuranceCompany || "Not provided"}</div>
                            <div className="text-sm text-zinc-500">{driver.policyNumber || "No policy number"}</div>
                          </TableCell>
                          <TableCell>
                          <div className="flex space-x-2">
                              <Button variant="ghost" size="icon" onClick={() => handleEditDriver(index)}>
                                <Edit2 className="h-4 w-4" />
                                <span className="sr-only">Edit</span>
                              </Button>
                              <Button variant="ghost" size="icon" onClick={() => handleDeleteDriver(index)}>
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
              ) : (
                <div className="text-center py-6 border border-dashed rounded-md border-zinc-300 bg-zinc-50">
                  <p className="text-zinc-500">No drivers added yet.</p>
                  <p className="text-sm text-zinc-400 mt-1">
                    Click "Add Driver" to add information about other drivers involved.
                  </p>
                </div>
              )}
            </div>
          )}

        <div className="space-y-4 pt-4 border-t">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="hasWitnesses">Witnesses</Label>
              <p className="text-sm text-gray-500">Were there any witnesses to the incident?</p>
            </div>
            <Switch
              id="hasWitnesses"
              checked={formData.hasWitnesses}
              onCheckedChange={(checked) => {
                updateMultipleFields({
                  hasWitnesses: checked,
                  witnesses: checked ? formData.witnesses : [],
                })
              }}
            />
          </div>


          {formData.hasWitnesses && (
            <div className="space-y-4">
              {formData.witnesses.map((witness, index) => (
                <div key={index} className="p-4 border rounded-md space-y-3">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Witness {index + 1}</h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeWitness(index)}
                      className="h-8 w-8 p-0 text-red-500"
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor={`witness-name-${index}`}>Name</Label>
                      <Input
                        id={`witness-name-${index}`}
                        value={witness.name}
                        onChange={(e) => updateWitness(index, "name", e.target.value)}
                        placeholder="Full Name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`witness-contact-${index}`}>Contact Information</Label>
                      <Input
                        id={`witness-contact-${index}`}
                        value={witness.contact}
                        onChange={(e) => updateWitness(index, "contact", e.target.value)}
                        placeholder="Phone or Email"
                      />
                    </div>
                  </div>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={addWitness}
                className="w-full flex items-center justify-center gap-1"
              >
                <Plus className="h-4 w-4" /> Add Another Witness
              </Button>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="additionalNotes">Additional Notes</Label>
          <Textarea
            id="additionalNotes"
            placeholder="Please provide any additional information that might be relevant to your claim"
            value={formData.additionalNotes}
            onChange={(e) => updateFormData("additionalNotes", e.target.value)}
            rows={4}
          />
        </div>
      </div>
    </div>
  )
}
