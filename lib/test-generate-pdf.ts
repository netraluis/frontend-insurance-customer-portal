import { generateClaimGeneralPDF } from "./generate-pdf"
import { writeFileSync } from "fs"
import { generateClaimAutoPDF } from "./generate-pdf"

// Mock de MediaFile
const mockMediaFile = {
  id: "1",
  name: "foto1.jpg",
  type: "image/jpeg",
  url: "https://via.placeholder.com/150",
  size: 12345,
  thumbnail: "https://via.placeholder.com/50"
}

// Mock de InvolvedParty
const mockInvolvedParty = {
  fullName: "Pedro López",
  email: "pedro.lopez@email.com",
  phone: "987654321",
  description: "Conductor del otro vehículo involucrado.",
  insuranceCompany: "Seguros XYZ",
  policyNumber: "POL-12345"
}

// Mock de Testimony
const mockTestimony = {
  fullName: "Ana Torres",
  email: "ana.torres@email.com",
  phone: "555123456",
  description: "Vio el accidente desde la acera."
}

// Mock de FormData (GeneralFormData) con todos los campos posibles
const mockFormData = {
  // Step 1: Policy Information
  firstName: "Juan",
  lastName: "Pérez",
  email: "juan.perez@email.com",
  phone: "123456789",
  policyNumber: "POL-0001",

  // Campos de vehículo para la tabla de Vehicle Information
  vehicleMake: "Toyota",
  vehicleModel: "Corolla",
  licensePlate: "1234-ABC",
  incidentDate: new Date("2024-05-22T10:30:00Z"),

  // Step 2: Accident Details
  accidentLocation: "Calle Falsa 123, Ciudad",
  accidentDate: new Date("2024-05-22T10:30:00Z"),
  accidentDescription: "Colisión leve con otro vehículo al girar en la esquina.",
  damageDescription: "Abolladura en la puerta delantera derecha.",
  damagePhotos: [
    mockMediaFile,
    { ...mockMediaFile, id: "2", name: "foto2.jpg", url: "https://via.placeholder.com/151" }
  ],

  // Step 3: Additional Information
  policeInvolved: true,
  trafficServiceInvolved: true,
  firefightersInvolved: true,
  policeReport: true,
  policeReportDocument: { ...mockMediaFile, id: "3", name: "police-report.pdf", type: "application/pdf", url: "https://via.placeholder.com/152" },
  bodilyInjuries: true,
  bodilyInjuriesDescription: "Lesión leve en el brazo derecho.",
  medicalReportDocument: { ...mockMediaFile, id: "4", name: "medical-report.pdf", type: "application/pdf", url: "https://via.placeholder.com/153" },

  // Step 4: Involved Parties
  hasInvolvedParties: true,
  knowsInvolvedPerson: true,
  involvedParties: [
    mockInvolvedParty,
    {
      fullName: "Lucía Gómez",
      email: "lucia.gomez@email.com",
      phone: "654321987",
      description: "Pasajera del otro vehículo.",
      insuranceCompany: "Seguros ABC",
      policyNumber: "POL-67890"
    }
  ],
  testimonies: [
    mockTestimony,
    {
      fullName: "Carlos Ruiz",
      email: "carlos.ruiz@email.com",
      phone: "444555666",
      description: "Vio el accidente desde su coche."
    }
  ],

  // Step 5: Additional Documentation
  additionalDocuments: [
    { ...mockMediaFile, id: "5", name: "factura-taller.pdf", type: "application/pdf", url: "https://via.placeholder.com/154" },
    { ...mockMediaFile, id: "6", name: "foto-extra.jpg", url: "https://via.placeholder.com/155" }
  ],
  additionalComments: "El accidente ocurrió bajo lluvia intensa. Se adjuntan todos los documentos relevantes."
}

const claimNumber = "CLM-0001"

const result = generateClaimGeneralPDF(mockFormData as unknown, claimNumber)
writeFileSync("test-claim-general.pdf", Buffer.from(result.buffer))
console.log("PDF generado: test-claim-general.pdf")

// --- TEST PARA generateClaimAutoPDF ---

// Mock de DamageMedia
const mockDamageMedia = {
  id: "1",
  name: "foto1.jpg",
  type: "image/jpeg",
  url: "https://via.placeholder.com/150",
  size: 12345,
  thumbnail: "https://via.placeholder.com/50"
}

// Mock de Document
const mockDocument = {
  id: "2",
  name: "factura-taller.pdf",
  type: "application/pdf",
  url: "https://via.placeholder.com/154",
  size: 23456
}

// Mock de FriendlyReportDocument
const mockFriendlyReportDocument = {
  id: "3",
  name: "parte-amistoso.pdf",
  type: "application/pdf",
  url: "https://via.placeholder.com/155",
  size: 34567
}

// Mock de Driver
const mockDriver = {
  firstName: "Lucía",
  lastName: "Gómez",
  email: "lucia.gomez@email.com",
  phone: "654321987",
  vehicleMake: "Ford",
  vehicleModel: "Fiesta",
  licensePlate: "5678-DEF",
  insuranceCompany: "Seguros ABC",
  policyNumber: "POL-67890"
}

// Mock de Witness
const mockWitness = {
  firstName: "Carlos",
  lastName: "Ruiz",
  email: "carlos.ruiz@email.com",
  phone: "444555666",
  description: "Vio el accidente desde su coche."
}

// Mock de FormData (Auto)
const mockAutoFormData = {
  // Step 1: Policy Information
  firstName: "Juan",
  lastName: "Pérez",
  email: "juan.perez@email.com",
  phone: "123456789",

  hasDifferentDriver: true,
  driverFirstName: "Pedro",
  driverLastName: "López",
  driverDateOfBirth: new Date("1980-01-15T00:00:00Z"),
  driverPhone: "987654321",
  driverEmail: "pedro.lopez@email.com",
  driverID: "DNI-12345678",

  // Step 2: Vehicle Information
  vehicleMake: "Toyota",
  vehicleModel: "Corolla",
  licensePlate: "1234-ABC",
  vehicleType: "car",

  // Step 3: Accident Details
  incidentDate: new Date("2024-05-22T10:30:00Z"),
  accidentLocation: "Calle Falsa 123, Ciudad",
  accidentDescription: "Colisión leve con otro vehículo al girar en la esquina.",
  policeInvolved: true,
  trafficServiceInvolved: true,
  friendlyReport: true,
  friendlyReportDocument: mockFriendlyReportDocument,
  bodilyInjuries: true,
  bodilyInjuriesDescription: "Lesión leve en el brazo derecho.",
  damageDescription: "Abolladura en la puerta delantera derecha.",
  damagePhotos: [
    mockDamageMedia,
    { ...mockDamageMedia, id: "2", name: "foto2.jpg", url: "https://via.placeholder.com/151" }
  ],

  // Step 4: Involved Parties
  drivers: [mockDriver],
  witnesses: [mockWitness],

  // Step 5: Documentation
  documents: [mockDocument, { ...mockDocument, id: "3", name: "presupuesto.pdf", url: "https://via.placeholder.com/156" }]
}

const autoClaimNumber = "CLM-AUTO-0001"

const autoResult = generateClaimAutoPDF(mockAutoFormData as unknown, autoClaimNumber)
writeFileSync("test-claim-auto.pdf", Buffer.from(autoResult.buffer))
console.log("PDF generado: test-claim-auto.pdf") 