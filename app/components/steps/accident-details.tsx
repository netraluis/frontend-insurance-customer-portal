"use client"

import { Button } from "@/components/ui/button"

import type React from "react"

import { useClaimForm } from "@/app/components/claim-form-context"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRef, useState } from "react"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"

export default function AccidentDetails() {
  const { formData, updateFormData } = useClaimForm()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [sketchDataURL, setSketchDataURL] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    updateFormData({ [name]: value })
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    updateFormData({ [name]: checked })
  }

  const handleDateChange = (date: Date | undefined) => {
    updateFormData({ incidentDate: date || null })
  }

  // Canvas drawing functions
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    setIsDrawing(true)

    let clientX, clientY
    if ("touches" in e) {
      clientX = e.touches[0].clientX
      clientY = e.touches[0].clientY
    } else {
      clientX = e.clientX
      clientY = e.clientY
    }

    const rect = canvas.getBoundingClientRect()
    ctx.beginPath()
    ctx.moveTo(clientX - rect.left, clientY - rect.top)
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let clientX, clientY
    if ("touches" in e) {
      clientX = e.touches[0].clientX
      clientY = e.touches[0].clientY
      e.preventDefault() // Prevent scrolling when drawing on touch devices
    } else {
      clientX = e.clientX
      clientY = e.clientY
    }

    const rect = canvas.getBoundingClientRect()
    ctx.lineWidth = 2
    ctx.lineCap = "round"
    ctx.strokeStyle = "#000"

    ctx.lineTo(clientX - rect.left, clientY - rect.top)
    ctx.stroke()
  }

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false)
      const canvas = canvasRef.current
      if (canvas) {
        setSketchDataURL(canvas.toDataURL())
      }
    }
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    setSketchDataURL(null)
  }

  return (
    <Card className="border-none shadow-none">
      <CardContent className="p-0 space-y-6">
        <div className="space-y-2">
          <h3 className="text-lg font-medium text-zinc-900">Accident Details</h3>
          <p className="text-sm text-zinc-500">Please provide detailed information about the accident.</p>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="accidentLocation">Location of the Accident</Label>
              <Input
                id="accidentLocation"
                name="accidentLocation"
                value={formData.accidentLocation}
                onChange={handleChange}
                placeholder="Enter the address or location where the accident occurred"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="incidentDate">Date of Incident</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.incidentDate && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.incidentDate ? format(formData.incidentDate, "PPP") : <span>Select date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.incidentDate || undefined}
                    onSelect={handleDateChange}
                    initialFocus
                    disabled={(date) => date > new Date()}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="accidentDescription">Detailed Description of the Accident</Label>
            <Textarea
              id="accidentDescription"
              name="accidentDescription"
              value={formData.accidentDescription}
              onChange={handleChange}
              placeholder="Please describe what happened in detail..."
              rows={5}
              required
            />
          </div>
        </div>

        <div className="space-y-4">
          <Label>Sketch of Material Damages</Label>
          <Tabs defaultValue="draw" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="draw">Draw Sketch</TabsTrigger>
              <TabsTrigger value="upload">Upload Image</TabsTrigger>
            </TabsList>
            <TabsContent value="draw" className="space-y-4">
              <div className="border border-zinc-200 rounded-md p-2">
                <canvas
                  ref={canvasRef}
                  width={600}
                  height={300}
                  className="w-full h-[300px] border border-zinc-100 rounded touch-none"
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={stopDrawing}
                />
              </div>
              <div className="flex justify-end">
                <Button variant="outline" onClick={clearCanvas} type="button" className="text-sm">
                  Clear Sketch
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="upload">
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="sketch-upload"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-zinc-300 border-dashed rounded-lg cursor-pointer bg-zinc-50 hover:bg-zinc-100"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-4 text-zinc-500"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-zinc-500">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-zinc-500">PNG, JPG or JPEG (MAX. 5MB)</p>
                  </div>
                  <input id="sketch-upload" type="file" className="hidden" accept="image/*" />
                </label>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <h4 className="text-md font-medium text-zinc-900">Additional Information</h4>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="policeInvolved">Police Involvement</Label>
                <p className="text-sm text-zinc-500">Was the police involved in the accident?</p>
              </div>
              <Switch
                id="policeInvolved"
                checked={formData.policeInvolved}
                onCheckedChange={(checked) => handleSwitchChange("policeInvolved", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="trafficServiceInvolved">Traffic Service Involvement</Label>
                <p className="text-sm text-zinc-500">Was the local traffic service involved?</p>
              </div>
              <Switch
                id="trafficServiceInvolved"
                checked={formData.trafficServiceInvolved}
                onCheckedChange={(checked) => handleSwitchChange("trafficServiceInvolved", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="friendlyReport">Friendly Accident Report</Label>
                <p className="text-sm text-zinc-500">Was a friendly accident report filed?</p>
              </div>
              <Switch
                id="friendlyReport"
                checked={formData.friendlyReport}
                onCheckedChange={(checked) => handleSwitchChange("friendlyReport", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="bodilyInjuries">Bodily Injuries</Label>
                <p className="text-sm text-zinc-500">Were there any bodily injuries?</p>
              </div>
              <Switch
                id="bodilyInjuries"
                checked={formData.bodilyInjuries}
                onCheckedChange={(checked) => handleSwitchChange("bodilyInjuries", checked)}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
