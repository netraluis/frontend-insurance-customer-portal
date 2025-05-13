"use client"

import * as React from "react"
import { Check, ChevronDown, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { countries, type Country, validatePhoneNumber } from "@/lib/countries"
import { Label } from "@/components/ui/label"

export interface PhoneInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  value?: string
  onChange?: (value: string, isValid: boolean) => void
  defaultCountry?: string
  error?: string
  label?: string
  helperText?: string
}

export function PhoneInput({
  className,
  value,
  onChange,
  defaultCountry = "AD", // Andorra as default
  error,
  label,
  helperText,
  disabled,
  required,
  ...props
}: PhoneInputProps) {
  const [open, setOpen] = React.useState(false)
  const [phoneNumber, setPhoneNumber] = React.useState(value || "")
  const [selectedCountry, setSelectedCountry] = React.useState<Country | undefined>(
    countries.find((country) => country.code === defaultCountry) || countries.find((country) => country.code === "AD"),
  )
  const [isValid, setIsValid] = React.useState(true)
  const [errorMessage, setErrorMessage] = React.useState(error || "")
  const inputRef = React.useRef<HTMLInputElement>(null)

  // Update phone number when value prop changes
  React.useEffect(() => {
    if (value !== undefined && value !== phoneNumber) {
      setPhoneNumber(value)
    }
  }, [value, phoneNumber])

  // Validate phone number when it changes
  React.useEffect(() => {
    if (selectedCountry && phoneNumber) {
      const valid = validatePhoneNumber(phoneNumber, selectedCountry)
      setIsValid(valid)
      setErrorMessage(valid ? "" : "Please enter a valid phone number")
    } else {
      setIsValid(true)
      setErrorMessage("")
    }
  }, [phoneNumber, selectedCountry])

  // Handle country selection
  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country)
    setOpen(false)

    // Validate with new country
    if (phoneNumber) {
      const valid = validatePhoneNumber(phoneNumber, country)
      setIsValid(valid)
      setErrorMessage(valid ? "" : "Please enter a valid phone number")

      if (onChange) {
        onChange(phoneNumber, valid)
      }
    }

    // Focus the input field after selecting a country
    setTimeout(() => {
      inputRef.current?.focus()
    }, 100)
  }

  // Handle phone number input
  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setPhoneNumber(newValue)

    if (selectedCountry) {
      const valid = validatePhoneNumber(newValue, selectedCountry)
      setIsValid(valid)
      setErrorMessage(valid ? "" : "Please enter a valid phone number")

      if (onChange) {
        onChange(newValue, valid)
      }
    }
  }

  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <Label htmlFor={props.id || "phone-input"} className="text-sm font-medium">
          {label} {required && <span className="text-destructive">*</span>}
        </Label>
      )}

      <div className="relative">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant="outline"
              role="combobox"
              aria-expanded={open}
              disabled={disabled}
              className={cn(
                "absolute left-0 top-0 h-full flex items-center gap-1 px-3 rounded-r-none border-r-0 focus:ring-0 focus:ring-offset-0 z-10",
                !isValid && "border-destructive",
                disabled && "opacity-50 cursor-not-allowed",
                "min-w-[4.5rem] justify-center",
              )}
            >
              <span className="text-base">{selectedCountry?.flag}</span>
              <ChevronDown className="h-3.5 w-3.5 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[280px] p-0" align="start">
            <Command>
              <CommandInput placeholder="Search country..." className="h-9" />
              <CommandList>
                <CommandEmpty>No country found.</CommandEmpty>
                <CommandGroup className="max-h-[300px] overflow-auto">
                  {countries.map((country) => (
                    <CommandItem
                      key={country.code}
                      value={`${country.name} ${country.dialCode}`}
                      onSelect={() => handleCountrySelect(country)}
                      className="flex items-center gap-2"
                    >
                      <span className="text-base">{country.flag}</span>
                      <span className="flex-1 truncate">{country.name}</span>
                      <span className="text-muted-foreground">{country.dialCode}</span>
                      {selectedCountry?.code === country.code && <Check className="h-4 w-4 opacity-100" />}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        <div className="relative">
          <div className="flex">
            {/* Spacer div to create room for the country selector */}
            <div className="w-[4.5rem] flex-shrink-0"></div>

            {/* Dial code display */}
            <div className="absolute left-[4.5rem] inset-y-0 flex items-center pointer-events-none text-muted-foreground pl-2 pr-1">
              {selectedCountry?.dialCode}
            </div>

            {/* Input field */}
            <Input
              {...props}
              ref={inputRef}
              id={props.id || "phone-input"}
              type="tel"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              className={cn(
                "flex-1 pl-[calc(var(--dial-code-width)+0.5rem+0.5rem)]",
                !isValid && "border-destructive focus-visible:ring-destructive",
                disabled && "opacity-50 cursor-not-allowed",
              )}
              style={
                {
                  "--dial-code-width": `${selectedCountry?.dialCode.length || 0}ch`,
                } as React.CSSProperties
              }
              placeholder="Phone number"
              disabled={disabled}
              required={required}
            />
          </div>

          {/* Clear button */}
          {phoneNumber && !disabled && (
            <button
              type="button"
              onClick={() => {
                setPhoneNumber("")
                if (onChange) onChange("", false)
                inputRef.current?.focus()
              }}
              className="absolute inset-y-0 right-3 flex items-center"
              aria-label="Clear phone number"
            >
              <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
            </button>
          )}
        </div>
      </div>

      {(errorMessage || helperText) && (
        <p className={cn("text-sm", errorMessage ? "text-destructive" : "text-muted-foreground")}>
          {errorMessage || helperText}
        </p>
      )}
    </div>
  )
}
