"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"

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
import { Driver, useClaimForm, Witness } from "../claim-form-context"
import { useTranslations } from "use-intl"

export default function InvolvedParties() {
  const { formData, updateFormData } = useClaimForm()
  const isMobile = useIsMobile()
  const tInvolved = useTranslations('ClaimAuto.InvolvedParties')

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
    description: "",
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
    if (!hasDrivers) {
      if (formData.drivers.length > 0) {
        updateFormData({ drivers: [] })
      }
    }
  }, [hasDrivers, updateFormData, formData.drivers.length])

  useEffect(() => {
    if (!hasWitnesses) {
      if (formData.witnesses.length > 0) {
        updateFormData({ witnesses: [] })
      }
    }
  }, [hasWitnesses, updateFormData, formData.witnesses.length])

  // Driver handlers
  const handleDriverChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      description: "",
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
            <span className="sr-only">{tInvolved('edit')}</span>
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => handleDeleteDriver(index)}>
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">{tInvolved('delete')}</span>
          </Button>
        </div>
      </div>
      <div className="p-3 space-y-2">
        <div className="flex justify-between">
          <span className="text-sm text-zinc-500">{tInvolved('vehicle')}:</span>
          <span className="text-sm text-right">
            {driver.vehicleMake} {driver.vehicleModel}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-zinc-500">{tInvolved('licensePlate')}:</span>
          <span className="text-sm">{driver.licensePlate}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-zinc-500">{tInvolved('contact')}:</span>
          <span className="text-sm text-right">{driver.email || driver.phone || tInvolved('notProvided')}</span>
        </div>
        {(driver.insuranceCompany || driver.policyNumber) && (
          <div className="flex justify-between">
            <span className="text-sm text-zinc-500">{tInvolved('insurance')}:</span>
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
            <span className="sr-only">{tInvolved('edit')}</span>
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => handleDeleteWitness(index)}>
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">{tInvolved('delete')}</span>
          </Button>
        </div>
      </div>
      <div className="p-3 space-y-2">
        <div className="flex justify-between">
          <span className="text-sm text-zinc-500">{tInvolved('contact')}:</span>
          <span className="text-sm text-right">{witness.email || witness.phone || tInvolved('notProvided')}</span>
        </div>
        <div className="pt-1">
          <span className="text-sm text-zinc-500 block mb-1">{tInvolved('statement')}:</span>
          <p className="text-sm bg-zinc-50 p-2 rounded-md">{witness.description}</p>
        </div>
      </div>
    </div>
  )

  return (
    <Card className="border-none shadow-none">
      <CardContent className="p-0 space-y-6">
        <div className="space-y-2">
          <h3 className="text-lg font-medium text-zinc-900">{tInvolved('title')}</h3>
          <p className="text-sm text-zinc-500">
            {tInvolved('description')}
          </p>
        </div>

        {/* Drivers Box */}
        <div className="border rounded-lg overflow-hidden">
          {/* Drivers Question */}
          <div className="flex items-center justify-between p-4 bg-zinc-50 border-b">
            <div className="flex items-start gap-3">
              <Users className="h-5 w-5 text-zinc-700 mt-0.5" />
              <div>
                <h4 className="font-medium text-zinc-900">{tInvolved('driversQuestion')}</h4>
                <p className="text-sm text-zinc-500">
                  {tInvolved('driversHint')}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-zinc-500">{hasDrivers ? tInvolved('yes') : tInvolved('no')}</span>
              <Switch checked={hasDrivers} onCheckedChange={setHasDrivers} aria-label={tInvolved('toggleDrivers')} />
            </div>
          </div>

          {/* Drivers Content */}
          {hasDrivers && (
            <div className="p-4 space-y-4">
              <div className="flex justify-between items-center">
                <h5 className="text-sm font-medium text-zinc-900">{tInvolved('otherDrivers')}</h5>
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
                      {tInvolved('addDriver')}
                    </Button>
                  </DialogTrigger>
                  <DialogContent
                    className={isMobile ? "w-[calc(100%-32px)] p-0 h-[90dvh] pb-2" : "sm:max-w-[600px]"}
                  >
                    <DialogHeader className={isMobile ? "px-4 py-3 border-b" : ""}>
                      <DialogTitle>{editingDriverIndex !== null ? tInvolved('editDriver') : tInvolved('addDriver')}</DialogTitle>
                      <DialogDescription className={isMobile ? "text-sm" : ""}>
                        {tInvolved('driverDialogDescription')}
                      </DialogDescription>
                    </DialogHeader>

                    <ScrollArea>
                      <div className={`grid grid-cols-1 gap-4 sm:grid-cols-2 ${isMobile ? "p-4" : "py-4"}`}>
                        <div className="space-y-2">
                          <Label htmlFor="driverFirstName">
                            {tInvolved('firstName')}
                          </Label>
                          <Input
                            id="driverFirstName"
                            name="firstName"
                            value={driverFormData.firstName}
                            onChange={handleDriverChange}
                            placeholder={tInvolved('firstNamePlaceholder')}
                            ref={driverFirstNameRef}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="driverLastName">
                            {tInvolved('lastName')}
                          </Label>
                          <Input
                            id="driverLastName"
                            name="lastName"
                            value={driverFormData.lastName}
                            onChange={handleDriverChange}
                            placeholder={tInvolved('lastNamePlaceholder')}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="driverEmail">{tInvolved('email')}</Label>
                          <Input
                            id="driverEmail"
                            name="email"
                            type="email"
                            value={driverFormData.email}
                            onChange={handleDriverChange}
                            placeholder={tInvolved('emailPlaceholder')}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="driverPhone">{tInvolved('phone')}</Label>
                          <Input
                            id="driverPhone"
                            name="phone"
                            value={driverFormData.phone}
                            onChange={handleDriverChange}
                            placeholder={tInvolved('phonePlaceholder')}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="driverVehicleMake">
                            {tInvolved('vehicleMake')}
                          </Label>
                          <Input
                            id="driverVehicleMake"
                            name="vehicleMake"
                            value={driverFormData.vehicleMake}
                            onChange={handleDriverChange}
                            placeholder={tInvolved('vehicleMakePlaceholder')}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="driverVehicleModel">
                            {tInvolved('vehicleModel')}
                          </Label>
                          <Input
                            id="driverVehicleModel"
                            name="vehicleModel"
                            value={driverFormData.vehicleModel}
                            onChange={handleDriverChange}
                            placeholder={tInvolved('vehicleModelPlaceholder')}
                            
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="driverLicensePlate">
                            {tInvolved('licensePlate')}
                          </Label>
                          <Input
                            id="driverLicensePlate"
                            name="licensePlate"
                            value={driverFormData.licensePlate}
                            onChange={handleDriverChange}
                            placeholder={tInvolved('licensePlatePlaceholder')}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="driverInsuranceCompany">{tInvolved('insuranceCompany')}</Label>
                          <Input
                            id="driverInsuranceCompany"
                            name="insuranceCompany"
                            value={driverFormData.insuranceCompany}
                            onChange={handleDriverChange}
                            placeholder={tInvolved('insuranceCompanyPlaceholder')}
                          />
                        </div>
                        <div className="space-y-2 sm:col-span-2">
                          <Label htmlFor="driverPolicyNumber">{tInvolved('policyNumber')}</Label>
                          <Input
                            id="driverPolicyNumber"
                            name="policyNumber"
                            value={driverFormData.policyNumber}
                            onChange={handleDriverChange}
                            placeholder={tInvolved('policyNumberPlaceholder')}
                          />
                        </div>
                        <div className="space-y-2 sm:col-span-2">
                          <Label htmlFor="driverDescription">
                            {tInvolved('statement')}
                          </Label>
                          <Textarea
                            id="description"
                            name="description"
                            value={driverFormData.description}
                            onChange={handleDriverChange}
                            placeholder={tInvolved('statementPlaceholder')}
                            rows={4}
                            
                          />
                        </div>
                      </div>
                      {/* <div className={`text-sm text-zinc-500 flex items-center gap-1 mb-4 ${isMobile ? "px-4" : ""}`}>
                        <AlertCircle className="h-4 w-4" />
                        <span>
                          {tInvolved('requiredFields')}
                        </span>
                      </div> */}
                    </ScrollArea>

                    <DialogFooter className={isMobile ? "flex bg-zinc-50 rounded-xs mx-2" : ""}>
                      <Button variant="outline" onClick={() => setDriverDialogOpen(false)}>
                        {tInvolved('cancel')}
                      </Button>
                      <Button
                        onClick={handleAddDriver}
                        // disabled={
                        //   !driverFormData.firstName ||
                        //   !driverFormData.lastName ||
                        //   !driverFormData.vehicleMake ||
                        //   !driverFormData.vehicleModel ||
                        //   !driverFormData.licensePlate
                        // }
                      >
                        {editingDriverIndex !== null ? tInvolved('updateDriver') : tInvolved('addDriver')}
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
                          <TableHead>{tInvolved('name')}</TableHead>
                          <TableHead>{tInvolved('vehicle')}</TableHead>
                          <TableHead>{tInvolved('insurance')}</TableHead>
                          <TableHead className="w-[100px]">{tInvolved('actions')}</TableHead>
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
                              <div>{driver.insuranceCompany || tInvolved('notProvided')}</div>
                              <div className="text-sm text-zinc-500">{driver.policyNumber || tInvolved('noPolicyNumber')}</div>
                            </TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button variant="ghost" size="icon" onClick={() => handleEditDriver(index)}>
                                  <Edit2 className="h-4 w-4" />
                                  <span className="sr-only">{tInvolved('edit')}</span>
                                </Button>
                                <Button variant="ghost" size="icon" onClick={() => handleDeleteDriver(index)}>
                                  <Trash2 className="h-4 w-4" />
                                  <span className="sr-only">{tInvolved('delete')}</span>
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
                  <p className="text-zinc-500">{tInvolved('noDrivers')}</p>
                  <p className="text-sm text-zinc-400 mt-1">
                    {tInvolved('addDriverHint')}
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
                <h4 className="font-medium text-zinc-900">{tInvolved('witnessesQuestion')}</h4>
                <p className="text-sm text-zinc-500">
                  {tInvolved('witnessesHint')}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-zinc-500">{hasWitnesses ? tInvolved('yes') : tInvolved('no')}</span>
              <Switch checked={hasWitnesses} onCheckedChange={setHasWitnesses} aria-label={tInvolved('toggleWitnesses')} />
            </div>
          </div>

          {/* Witnesses Content */}
          {hasWitnesses && (
            <div className="p-4 space-y-4">
              <div className="flex justify-between items-center">
                <h5 className="text-sm font-medium text-zinc-900">{tInvolved('witnesses')}</h5>
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
                      {tInvolved('addWitness')}
                    </Button>
                  </DialogTrigger>
                  <DialogContent
                    className={isMobile ? "w-[calc(100%-32px)] p-0 h-[90dvh] pb-2" : "sm:max-w-[600px]"}
                  >
                    <DialogHeader className={isMobile ? "px-4 py-3 border-b" : ""}>
                      <DialogTitle>{editingWitnessIndex !== null ? tInvolved('editWitness') : tInvolved('addWitness')}</DialogTitle>
                      <DialogDescription className={isMobile ? "text-sm" : ""}>
                        {tInvolved('witnessDialogDescription')}
                      </DialogDescription>
                    </DialogHeader>

                    <ScrollArea>
                      <div className={`grid grid-cols-1 gap-4 sm:grid-cols-2 ${isMobile ? "p-4" : "py-4"}`}>
                        <div className="space-y-2">
                          <Label htmlFor="witnessFirstName">
                            {tInvolved('firstName')} <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="witnessFirstName"
                            name="firstName"
                            value={witnessFormData.firstName}
                            onChange={handleWitnessChange}
                            placeholder={tInvolved('firstNamePlaceholder')}
                            required
                            ref={witnessFirstNameRef}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="witnessLastName">
                            {tInvolved('lastName')} <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="witnessLastName"
                            name="lastName"
                            value={witnessFormData.lastName}
                            onChange={handleWitnessChange}
                            placeholder={tInvolved('lastNamePlaceholder')}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="witnessEmail">{tInvolved('email')}</Label>
                          <Input
                            id="witnessEmail"
                            name="email"
                            type="email"
                            value={witnessFormData.email}
                            onChange={handleWitnessChange}
                            placeholder={tInvolved('emailPlaceholder')}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="witnessPhone">{tInvolved('phone')}</Label>
                          <Input
                            id="witnessPhone"
                            name="phone"
                            value={witnessFormData.phone}
                            onChange={handleWitnessChange}
                            placeholder={tInvolved('phonePlaceholder')}
                          />
                        </div>
                        <div className="space-y-2 sm:col-span-2">
                          <Label htmlFor="witnessDescription">
                            {tInvolved('statement')} <span className="text-red-500">*</span>
                          </Label>
                          <Textarea
                            id="witnessDescription"
                            name="description"
                            value={witnessFormData.description}
                            onChange={handleWitnessChange}
                            placeholder={tInvolved('statementPlaceholder')}
                            rows={4}
                            required
                          />
                        </div>
                      </div>
                      <div className={`text-sm text-zinc-500 flex items-center gap-1 mb-4 ${isMobile ? "px-4" : ""}`}>
                        <AlertCircle className="h-4 w-4" />
                        <span>
                          {tInvolved('requiredFields')}
                        </span>
                      </div>
                    </ScrollArea>

                    <DialogFooter className={isMobile ? "flex bg-zinc-50 rounded-xs mx-2" : ""}>
                      <Button variant="outline" onClick={() => setWitnessDialogOpen(false)}>
                        {tInvolved('cancel')}
                      </Button>
                      <Button
                        onClick={handleAddWitness}
                        disabled={
                          !witnessFormData.firstName || !witnessFormData.lastName || !witnessFormData.description
                        }
                      >
                        {editingWitnessIndex !== null ? tInvolved('updateWitness') : tInvolved('addWitness')}
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
                          <TableHead>{tInvolved('name')}</TableHead>
                          <TableHead>{tInvolved('contact')}</TableHead>
                          <TableHead>{tInvolved('statement')}</TableHead>
                          <TableHead className="w-[100px]">{tInvolved('actions')}</TableHead>
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
                              <div>{witness.email || tInvolved('noEmail')}</div>
                              <div className="text-sm text-zinc-500">{witness.phone || tInvolved('noPhone')}</div>
                            </TableCell>
                            <TableCell>
                              <div className="max-w-[200px] truncate">{witness.description}</div>
                            </TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button variant="ghost" size="icon" onClick={() => handleEditWitness(index)}>
                                  <Edit2 className="h-4 w-4" />
                                  <span className="sr-only">{tInvolved('edit')}</span>
                                </Button>
                                <Button variant="ghost" size="icon" onClick={() => handleDeleteWitness(index)}>
                                  <Trash2 className="h-4 w-4" />
                                  <span className="sr-only">{tInvolved('delete')}</span>
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
                  <p className="text-zinc-500">{tInvolved('noWitnesses')}</p>
                  <p className="text-sm text-zinc-400 mt-1">
                    {tInvolved('addWitnessHint')}
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
