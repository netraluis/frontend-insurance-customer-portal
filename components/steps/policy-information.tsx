"use client"

import type React from "react"

import { useClaimForm } from "../claim-form-context"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { PhoneInput } from "@/components/ui/phone-input"
import { Switch } from "@/components/ui/switch"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { CalendarIcon, UserCog } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

export default function PolicyInformation() {
  const { formData, updateFormData } = useClaimForm()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    updateFormData({ [name]: value })
  }

  const handlePhoneChange = (value: string, isValid: boolean) => {
    updateFormData({ phone: value })
  }

  const handleDriverPhoneChange = (value: string, isValid: boolean) => {
    updateFormData({ driverPhone: value })
  }

  const handleDriverDateChange = (date: Date | undefined) => {
    updateFormData({ driverDateOfBirth: date || null })
  }

  const handleDifferentDriverToggle = (checked: boolean) => {
    updateFormData({ hasDifferentDriver: checked })

    // Clear driver fields if toggled off
    if (!checked) {
      updateFormData({
        driverFirstName: "",
        driverLastName: "",
        driverDateOfBirth: null,
        driverID: "",
        driverEmail: "",
        driverPhone: "",
      })
    }
  }

  return (
    <Card className="border-none shadow-none">
      <CardContent className="p-0 space-y-6">
        <div className="space-y-2">
          <h3 className="text-lg font-medium text-zinc-900">Personal Information</h3>
          <p className="text-sm text-zinc-500">Please provide your contact details so we can process your claim.</p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Enter your first name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Enter your last name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your.email@example.com"
              required
            />
          </div>

          <div className="space-y-2">
            <PhoneInput
              id="phone"
              value={formData.phone}
              onChange={handlePhoneChange}
              defaultCountry="AD"
              label="Phone Number"
              placeholder="Phone number"
              required
            />
          </div>
        </div>

        {/* Redesigned Different Driver Section */}
        <div className="border border-zinc-200 rounded-md overflow-hidden">
          <div className="bg-zinc-50 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <UserCog className="h-5 w-5 text-zinc-500" />
              <div>
                <h4 className="text-md font-medium text-zinc-900">Different Driver</h4>
                <p className="text-sm text-zinc-500">Is the driver different from the policy owner?</p>
              </div>
            </div>
            <Switch
              id="hasDifferentDriver"
              checked={formData.hasDifferentDriver}
              onCheckedChange={handleDifferentDriverToggle}
            />
          </div>

          {formData.hasDifferentDriver && (
            <div className="p-4 space-y-6 animate-in fade-in duration-300">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="driverFirstName">
                    First Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="driverFirstName"
                    name="driverFirstName"
                    value={formData.driverFirstName}
                    onChange={handleChange}
                    placeholder="Enter driver's first name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="driverLastName">
                    Last Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="driverLastName"
                    name="driverLastName"
                    value={formData.driverLastName}
                    onChange={handleChange}
                    placeholder="Enter driver's last name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="driverDateOfBirth">
                    Date of Birth <span className="text-destructive">*</span>
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !formData.driverDateOfBirth && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.driverDateOfBirth ? (
                          format(formData.driverDateOfBirth, "PPP")
                        ) : (
                          <span>Select date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={formData.driverDateOfBirth || undefined}
                        onSelect={handleDriverDateChange}
                        initialFocus
                        disabled={(date) => date > new Date()}
                        captionLayout="dropdown-buttons"
                        fromYear={1940}
                        toYear={new Date().getFullYear() - 16}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="driverID">Driver ID</Label>
                  <Input
                    id="driverID"
                    name="driverID"
                    value={formData.driverID}
                    onChange={handleChange}
                    placeholder="Enter driver's ID (optional)"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="driverEmail">Email Address</Label>
                  <Input
                    id="driverEmail"
                    name="driverEmail"
                    type="email"
                    value={formData.driverEmail}
                    onChange={handleChange}
                    placeholder="driver.email@example.com (optional)"
                  />
                </div>

                <div className="space-y-2">
                  <PhoneInput
                    id="driverPhone"
                    value={formData.driverPhone}
                    onChange={handleDriverPhoneChange}
                    defaultCountry="AD"
                    label="Phone Number"
                    placeholder="Phone number (optional)"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
