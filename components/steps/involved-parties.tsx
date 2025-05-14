"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useClaimForm, type Driver, type Witness } from "../claim-form-context"
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
  const { formData, updateFormData } = useClaimForm()
  const isMobile = useIsMobile()

  // State for the initial questions
  const [hasDrivers, setHasDrivers] = useState(formData.drivers.length > 0)
  const [hasWitnesses, setHasWitnesses] = useState(formData.witnesses.length > 0)

  // Driver state
  const [driverDialogOpen, setDriverDialogOpen] = useState(false)
  const [editingDriverIndex, setEditingDriverIndex] = useState<number | null>(null)
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

  // Witness state
  const [witnessDialogOpen, setWitnessDialogOpen] = useState(false)
  const [editingWitnessIndex, setEditingWitnessIndex] = useState<number | null>(null)
  const [witnessFormData, setWitnessFormData] = useState<Witness>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    description: "",
  })

  // Refs for focusing first input in modals
  const driverFirstNameRef = useRef<HTMLInputElement>(null)
  const witnessFirstNameRef = useRef<HTMLInputElement>(null)

  // Focus first input when modal opens
  useEffect(() => {
    if (driverDialogOpen) {
      setTimeout(() => {
        driverFirstNameRef.current?.focus()
      }, 100)
    }
  }, [driverDialogOpen])

  useEffect(() => {
    if (witnessDialogOpen) {
      setTimeout(() => {
        witnessFirstNameRef.current?.focus()
      }, 100)
    }
  }, [witnessDialogOpen])

  // Update form data when toggles change
  useEffect(() => {
    // If user switches to "No" for drivers, clear the drivers array
    if (!hasDrivers && formData.drivers.length > 0) {
      updateFormData({ drivers: [] })
    }

    // If user switches to "No" for witnesses, clear the witnesses array
    if (!hasWitnesses && formData.witnesses.length > 0) {
      updateFormData({ witnesses: [] })
    }
  }, [hasDrivers, hasWitnesses, formData.drivers.length, formData.witnesses.length, updateFormData])

  // Driver handlers
  const handleDriverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setDriverFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddDriver = () => {
    if (editingDriverIndex !== null) {
      // Update existing driver
      const updatedDrivers = [...formData.drivers]
      updatedDrivers[editingDriverIndex] = driverFormData
      updateFormData({ drivers: updatedDrivers })
    } else {
      // Add new driver
      updateFormData({ drivers: [...formData.drivers, driverFormData] })
    }

    resetDriverForm()
    setDriverDialogOpen(false)
  }

  const handleEditDriver = (index: number) => {
    setDriverFormData(formData.drivers[index])
    setEditingDriverIndex(index)
    setDriverDialogOpen(true)
  }

  const handleDeleteDriver = (index: number) => {
    const updatedDrivers = formData.drivers.filter((_, i) => i !== index)
    updateFormData({ drivers: updatedDrivers })
  }

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

  // Witness handlers
  const handleWitnessChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setWitnessFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddWitness = () => {
    if (editingWitnessIndex !== null) {
      // Update existing witness
      const updatedWitnesses = [...formData.witnesses]
      updatedWitnesses[editingWitnessIndex] = witnessFormData
      updateFormData({ witnesses: updatedWitnesses })
    } else {
      // Add new witness
      updateFormData({ witnesses: [...formData.witnesses, witnessFormData] })
    }

    resetWitnessForm()
    setWitnessDialogOpen(false)
  }

  const handleEditWitness = (index: number) => {
    setWitnessFormData(formData.witnesses[index])
    setEditingWitnessIndex(index)
    setWitnessDialogOpen(true)
  }

  const handleDeleteWitness = (index: number) => {
    const updatedWitnesses = formData.witnesses.filter((_, i) => i !== index)
    updateFormData({ witnesses: updatedWitnesses })
  }

  const resetWitnessForm = () => {
    setWitnessFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      description: "",
    })
    setEditingWitnessIndex(null)
  }

  // Render mobile card view for drivers
  const renderDriverCard = (driver: Driver, index: number) => (
    <div key={index} className="border rounded-md overflow-hidden mb-3">
      <div className="bg-zinc-50 p-3 flex justify-between items-center">
        <div className="font-medium">
          {driver.firstName} {driver.lastName}
        </div>
        <div className="flex gap-1">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => handleEditDriver(index)}>
            <Edit2 className="h-4 w-4" />
            <span className="sr-only">Edit</span>
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => handleDeleteDriver(index)}>
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Delete</span>
          </Button>
        </div>
      </div>
      <div className="p-3 space-y-2">
        <div className="flex justify-between">
          <span className="text-sm text-zinc-500">Vehicle:</span>
          <span className="text-sm text-right">
            {driver.vehicleMake} {driver.vehicleModel}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-zinc-500">License Plate:</span>
          <span className="text-sm">{driver.licensePlate}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-zinc-500">Contact:</span>
          <span className="text-sm text-right">{driver.email || driver.phone || "Not provided"}</span>
        </div>
        {(driver.insuranceCompany || driver.policyNumber) && (
          <div className="flex justify-between">
            <span className="text-sm text-zinc-500">Insurance:</span>
            <span className="text-sm text-right">
              {driver.insuranceCompany} {driver.policyNumber ? `(${driver.policyNumber})` : ""}
            </span>
          </div>
        )}
      </div>
    </div>
  )

  // Render mobile card view for witnesses
  const renderWitnessCard = (witness: Witness, index: number) => (
    <div key={index} className="border rounded-md overflow-hidden mb-3">
      <div className="bg-zinc-50 p-3 flex justify-between items-center">
        <div className="font-medium">
          {witness.firstName} {witness.lastName}
        </div>
        <div className="flex gap-1">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => handleEditWitness(index)}>
            <Edit2 className="h-4 w-4" />
            <span className="sr-only">Edit</span>
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => handleDeleteWitness(index)}>
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Delete</span>
          </Button>
        </div>
      </div>
      <div className="p-3 space-y-2">
        <div className="flex justify-between">
          <span className="text-sm text-zinc-500">Contact:</span>
          <span className="text-sm text-right">{witness.email || witness.phone || "Not provided"}</span>
        </div>
        <div className="pt-1">
          <span className="text-sm text-zinc-500 block mb-1">Statement:</span>
          <p className="text-sm bg-zinc-50 p-2 rounded-md">{witness.description}</p>
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
            Provide information about other parties involved in or witnessing the accident.
          </p>
        </div>

        {/* Drivers Box */}
        <div className="border rounded-lg overflow-hidden">
          {/* Drivers Question */}
          <div className="flex items-center justify-between p-4 bg-zinc-50 border-b">
            <div className="flex items-start gap-3">
              <Users className="h-5 w-5 text-zinc-700 mt-0.5" />
              <div>
                <h4 className="font-medium text-zinc-900">Were other drivers involved in the accident?</h4>
                <p className="text-sm text-zinc-500">
                  Select 'Yes' if there were other vehicles/drivers involved in the incident.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-zinc-500">{hasDrivers ? "Yes" : "No"}</span>
              <Switch checked={hasDrivers} onCheckedChange={setHasDrivers} aria-label="Toggle drivers involved" />
            </div>
          </div>

          {/* Drivers Content */}
          {hasDrivers && (
            <div className="p-4 space-y-4">
              <div className="flex justify-between items-center">
                <h5 className="text-sm font-medium text-zinc-900">Other Drivers</h5>
                <Dialog
                  open={driverDialogOpen}
                  onOpenChange={(open) => {
                    setDriverDialogOpen(open)
                    if (!open) resetDriverForm()
                  }}
                >
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
                      Add Driver
                    </Button>
                  </DialogTrigger>
                  <DialogContent
                    className={isMobile ? "w-[calc(100%-32px)] p-0 h-[90vh] max-h-[600px]" : "sm:max-w-[600px]"}
                  >
                    <DialogHeader className={isMobile ? "px-4 py-3 border-b" : ""}>
                      <DialogTitle>{editingDriverIndex !== null ? "Edit Driver" : "Add Driver"}</DialogTitle>
                      <DialogDescription className={isMobile ? "text-sm" : ""}>
                        Enter the details of the other driver involved in the accident.
                      </DialogDescription>
                    </DialogHeader>

                    <ScrollArea className={isMobile ? "h-[calc(90vh-130px)] max-h-[470px]" : ""}>
                      <div className={`grid grid-cols-1 gap-4 sm:grid-cols-2 ${isMobile ? "p-4" : "py-4"}`}>
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
                            ref={driverFirstNameRef}
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
                        <div className="space-y-2">
                          <Label htmlFor="driverEmail">Email</Label>
                          <Input
                            id="driverEmail"
                            name="email"
                            type="email"
                            value={driverFormData.email}
                            onChange={handleDriverChange}
                            placeholder="Email address"
                          />
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
                          <Label htmlFor="driverVehicleMake">
                            Vehicle Make <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="driverVehicleMake"
                            name="vehicleMake"
                            value={driverFormData.vehicleMake}
                            onChange={handleDriverChange}
                            placeholder="e.g., Toyota, Honda"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="driverVehicleModel">
                            Vehicle Model <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="driverVehicleModel"
                            name="vehicleModel"
                            value={driverFormData.vehicleModel}
                            onChange={handleDriverChange}
                            placeholder="e.g., Corolla, Civic"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="driverLicensePlate">
                            License Plate <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="driverLicensePlate"
                            name="licensePlate"
                            value={driverFormData.licensePlate}
                            onChange={handleDriverChange}
                            placeholder="License plate number"
                            required
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
                        <div className="space-y-2 sm:col-span-2">
                          <Label htmlFor="driverPolicyNumber">Policy Number</Label>
                          <Input
                            id="driverPolicyNumber"
                            name="policyNumber"
                            value={driverFormData.policyNumber}
                            onChange={handleDriverChange}
                            placeholder="Insurance policy number"
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

              {formData.drivers.length > 0 ? (
                <>
                  {/* Desktop table view */}
                  <div className="hidden sm:block border rounded-md">
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

                  {/* Mobile card view */}
                  <div className="sm:hidden">
                    {formData.drivers.map((driver, index) => renderDriverCard(driver, index))}
                  </div>
                </>
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
        </div>

        {/* Witnesses Box */}
        <div className="border rounded-lg overflow-hidden">
          {/* Witnesses Question */}
          <div className="flex items-center justify-between p-4 bg-zinc-50 border-b">
            <div className="flex items-start gap-3">
              <Eye className="h-5 w-5 text-zinc-700 mt-0.5" />
              <div>
                <h4 className="font-medium text-zinc-900">Were there any witnesses to the accident?</h4>
                <p className="text-sm text-zinc-500">
                  Select 'Yes' if anyone witnessed the accident and can provide a statement.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-zinc-500">{hasWitnesses ? "Yes" : "No"}</span>
              <Switch checked={hasWitnesses} onCheckedChange={setHasWitnesses} aria-label="Toggle witnesses present" />
            </div>
          </div>

          {/* Witnesses Content */}
          {hasWitnesses && (
            <div className="p-4 space-y-4">
              <div className="flex justify-between items-center">
                <h5 className="text-sm font-medium text-zinc-900">Witnesses</h5>
                <Dialog
                  open={witnessDialogOpen}
                  onOpenChange={(open) => {
                    setWitnessDialogOpen(open)
                    if (!open) resetWitnessForm()
                  }}
                >
                  <DialogTrigger asChild>
                    <Button
                      onClick={() => {
                        resetWitnessForm()
                        setWitnessDialogOpen(true)
                      }}
                      size="sm"
                      className="flex items-center gap-1"
                    >
                      <Plus className="h-4 w-4" />
                      Add Witness
                    </Button>
                  </DialogTrigger>
                  <DialogContent
                    className={isMobile ? "w-[calc(100%-32px)] p-0 h-[90vh] max-h-[600px]" : "sm:max-w-[600px]"}
                  >
                    <DialogHeader className={isMobile ? "px-4 py-3 border-b" : ""}>
                      <DialogTitle>{editingWitnessIndex !== null ? "Edit Witness" : "Add Witness"}</DialogTitle>
                      <DialogDescription className={isMobile ? "text-sm" : ""}>
                        Enter the details of a witness to the accident.
                      </DialogDescription>
                    </DialogHeader>

                    <ScrollArea className={isMobile ? "h-[calc(90vh-130px)] max-h-[470px]" : ""}>
                      <div className={`grid grid-cols-1 gap-4 sm:grid-cols-2 ${isMobile ? "p-4" : "py-4"}`}>
                        <div className="space-y-2">
                          <Label htmlFor="witnessFirstName">
                            First Name <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="witnessFirstName"
                            name="firstName"
                            value={witnessFormData.firstName}
                            onChange={handleWitnessChange}
                            placeholder="First name"
                            required
                            ref={witnessFirstNameRef}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="witnessLastName">
                            Last Name <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="witnessLastName"
                            name="lastName"
                            value={witnessFormData.lastName}
                            onChange={handleWitnessChange}
                            placeholder="Last name"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="witnessEmail">Email</Label>
                          <Input
                            id="witnessEmail"
                            name="email"
                            type="email"
                            value={witnessFormData.email}
                            onChange={handleWitnessChange}
                            placeholder="Email address"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="witnessPhone">Phone</Label>
                          <Input
                            id="witnessPhone"
                            name="phone"
                            value={witnessFormData.phone}
                            onChange={handleWitnessChange}
                            placeholder="Phone number"
                          />
                        </div>
                        <div className="space-y-2 sm:col-span-2">
                          <Label htmlFor="witnessDescription">
                            Statement <span className="text-red-500">*</span>
                          </Label>
                          <Textarea
                            id="witnessDescription"
                            name="description"
                            value={witnessFormData.description}
                            onChange={handleWitnessChange}
                            placeholder="Witness statement or description of what they saw"
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
                      <Button variant="outline" onClick={() => setWitnessDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button
                        onClick={handleAddWitness}
                        disabled={
                          !witnessFormData.firstName || !witnessFormData.lastName || !witnessFormData.description
                        }
                      >
                        {editingWitnessIndex !== null ? "Update" : "Add"} Witness
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              {formData.witnesses.length > 0 ? (
                <>
                  {/* Desktop table view */}
                  <div className="hidden sm:block border rounded-md">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Contact</TableHead>
                          <TableHead>Statement</TableHead>
                          <TableHead className="w-[100px]">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {formData.witnesses.map((witness, index) => (
                          <TableRow key={index}>
                            <TableCell>
                              <div className="font-medium">
                                {witness.firstName} {witness.lastName}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div>{witness.email || "No email provided"}</div>
                              <div className="text-sm text-zinc-500">{witness.phone || "No phone provided"}</div>
                            </TableCell>
                            <TableCell>
                              <div className="max-w-[200px] truncate">{witness.description}</div>
                            </TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button variant="ghost" size="icon" onClick={() => handleEditWitness(index)}>
                                  <Edit2 className="h-4 w-4" />
                                  <span className="sr-only">Edit</span>
                                </Button>
                                <Button variant="ghost" size="icon" onClick={() => handleDeleteWitness(index)}>
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
                    {formData.witnesses.map((witness, index) => renderWitnessCard(witness, index))}
                  </div>
                </>
              ) : (
                <div className="text-center py-6 border border-dashed rounded-md border-zinc-300 bg-zinc-50">
                  <p className="text-zinc-500">No witnesses added yet.</p>
                  <p className="text-sm text-zinc-400 mt-1">
                    Click "Add Witness" to add information about witnesses to the accident.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
