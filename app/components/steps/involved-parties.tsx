"use client"

import type React from "react"

import { useState } from "react"
import { useClaimForm, type Driver, type Witness } from "@/app/components/claim-form-context"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
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
import { Plus, Trash2, Edit2 } from "lucide-react"

export default function InvolvedParties() {
  const { formData, updateFormData } = useClaimForm()
  const [activeTab, setActiveTab] = useState("drivers")

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

  return (
    <Card className="border-none shadow-none">
      <CardContent className="p-0 space-y-6">
        <div className="space-y-2">
          <h3 className="text-lg font-medium text-zinc-900">Parts Involucrades</h3>
          <p className="text-sm text-zinc-500">
          Afegiu informació sobre altres conductors i testimonis implicats en l&apos;accident.          </p>
        </div>

        <Tabs defaultValue="drivers" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="drivers">Altres conductors</TabsTrigger>
            <TabsTrigger value="witnesses">Testimonis</TabsTrigger>
          </TabsList>

          {/* Drivers Tab */}
          <TabsContent value="drivers" className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="text-md font-medium">Conductors Implicats</h4>
              <Dialog open={driverDialogOpen} onOpenChange={setDriverDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    onClick={() => {
                      resetDriverForm()
                      setDriverDialogOpen(true)
                    }}
                    className="flex items-center gap-1"
                  >
                    <Plus className="h-4 w-4" />
                    Afegir conductor
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>{editingDriverIndex !== null ? "Editar conductor" : "Afegeix conductor"}</DialogTitle>
                    <DialogDescription>
                      Entra les dades de l&apos;altre conductor implicat en l&ldquo;accident.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="driverFirstName">First Name</Label>
                      <Input
                        id="driverFirstName"
                        name="firstName"
                        value={driverFormData.firstName}
                        onChange={handleDriverChange}
                        placeholder="First name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="driverLastName">Last Name</Label>
                      <Input
                        id="driverLastName"
                        name="lastName"
                        value={driverFormData.lastName}
                        onChange={handleDriverChange}
                        placeholder="Last name"
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
                      <Label htmlFor="driverVehicleMake">Vehicle Make</Label>
                      <Input
                        id="driverVehicleMake"
                        name="vehicleMake"
                        value={driverFormData.vehicleMake}
                        onChange={handleDriverChange}
                        placeholder="e.g., Toyota, Honda"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="driverVehicleModel">Vehicle Model</Label>
                      <Input
                        id="driverVehicleModel"
                        name="vehicleModel"
                        value={driverFormData.vehicleModel}
                        onChange={handleDriverChange}
                        placeholder="e.g., Corolla, Civic"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="driverLicensePlate">License Plate</Label>
                      <Input
                        id="driverLicensePlate"
                        name="licensePlate"
                        value={driverFormData.licensePlate}
                        onChange={handleDriverChange}
                        placeholder="License plate number"
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
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setDriverDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddDriver}>{editingDriverIndex !== null ? "Update" : "Add"} Driver</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            {formData.drivers.length > 0 ? (
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
                          <div>{driver.insuranceCompany}</div>
                          <div className="text-sm text-zinc-500">{driver.policyNumber}</div>
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
              <div className="text-center py-8 border border-dashed rounded-md border-zinc-300 bg-zinc-50">
                <p className="text-zinc-500">No conductors afegits encara.</p>
                <p className="text-sm text-zinc-400 mt-1">
                  Clica &apos;Afegeix conductor&apos; per afegir informació sobre altres conductors implicats.
                </p>
              </div>
            )}
          </TabsContent>

          {/* Witnesses Tab */}
          <TabsContent value="witnesses" className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="text-md font-medium">Witnesses</h4>
              <Dialog open={witnessDialogOpen} onOpenChange={setWitnessDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    onClick={() => {
                      resetWitnessForm()
                      setWitnessDialogOpen(true)
                    }}
                    className="flex items-center gap-1"
                  >
                    <Plus className="h-4 w-4" />
                    Add Witness
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>{editingWitnessIndex !== null ? "Edit Witness" : "Add Witness"}</DialogTitle>
                    <DialogDescription>Enter the details of a witness to the accident.</DialogDescription>
                  </DialogHeader>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="witnessFirstName">First Name</Label>
                      <Input
                        id="witnessFirstName"
                        name="firstName"
                        value={witnessFormData.firstName}
                        onChange={handleWitnessChange}
                        placeholder="First name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="witnessLastName">Last Name</Label>
                      <Input
                        id="witnessLastName"
                        name="lastName"
                        value={witnessFormData.lastName}
                        onChange={handleWitnessChange}
                        placeholder="Last name"
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
                      <Label htmlFor="witnessDescription">Statement</Label>
                      <Textarea
                        id="witnessDescription"
                        name="description"
                        value={witnessFormData.description}
                        onChange={handleWitnessChange}
                        placeholder="Witness statement or description"
                        rows={4}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setWitnessDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddWitness}>
                      {editingWitnessIndex !== null ? "Update" : "Add"} Witness
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            {formData.witnesses.length > 0 ? (
              <div className="border rounded-md">
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
                          <div>{witness.email}</div>
                          <div className="text-sm text-zinc-500">{witness.phone}</div>
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
            ) : (
              <div className="text-center py-8 border border-dashed rounded-md border-zinc-300 bg-zinc-50">
                <p className="text-zinc-500">No witnesses added yet.</p>
                <p className="text-sm text-zinc-400 mt-1">
                  Click &apos;Add Witness&apos; to add information about witnesses to the accident.
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
