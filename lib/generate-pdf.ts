import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"
import type { FormData } from "@/app/components/claim-form-context"
import { format } from "date-fns"

export function generateClaimPDF(formData: FormData, claimNumber: string): { dataUrl: string; buffer: Buffer } {
  try {
    // Create a new PDF document
    const doc = new jsPDF()
    const pageWidth = doc.internal.pageSize.getWidth()

    // Add header with logo and title
    doc.setFillColor(241, 241, 243) // Light zinc color
    doc.rect(0, 0, pageWidth, 40, "F")

    doc.setFont("helvetica", "bold")
    doc.setFontSize(20)
    doc.setTextColor(24, 24, 27) // Zinc-900
    doc.text("AUTO CLAIM SUMMARY", pageWidth / 2, 20, { align: "center" })

    doc.setFont("helvetica", "normal")
    doc.setFontSize(10)
    doc.setTextColor(113, 113, 122) // Zinc-500
    doc.text(`Claim Reference: ${claimNumber}`, pageWidth / 2, 30, { align: "center" })
    doc.text(`Generated on: ${format(new Date(), "PPP")}`, pageWidth / 2, 35, { align: "center" })

    // Add claimant information
    doc.setFontSize(14)
    doc.setTextColor(24, 24, 27) // Zinc-900
    doc.setFont("helvetica", "bold")
    doc.text("Claimant Information", 14, 50)

    doc.setFontSize(10)
    doc.setFont("helvetica", "normal")
    autoTable(doc, {
      startY: 55,
      head: [["Nom", "Email", "Telèfon"]],
      body: [[`${formData.firstName} ${formData.lastName}`, formData.email, formData.phone]],
      theme: "grid",
      headStyles: { fillColor: [161, 161, 170], textColor: [255, 255, 255] }, // Zinc-400
      styles: { fontSize: 10 },
    })

    // Add vehicle information
    doc.setFontSize(14)
    doc.setFont("helvetica", "bold")
    doc.text("Informació del vehicle", 14, doc.lastAutoTable.finalY + 15)

    doc.setFontSize(10)
    doc.setFont("helvetica", "normal")
    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 20,
      head: [["Marca", "Matrícula", "Tipus de cobertura", "Data de l'incident"]],
      body: [
        [
          `${formData.vehicleMake} ${formData.vehicleModel}`,
          formData.licensePlate,
          formData.coverageType.charAt(0).toUpperCase() + formData.coverageType.slice(1),
          formData.incidentDate ? format(formData.incidentDate, "PPP") : "No especificat",
        ],
      ],
      theme: "grid",
      headStyles: { fillColor: [161, 161, 170], textColor: [255, 255, 255] }, // Zinc-400
      styles: { fontSize: 10 },
    })

    // Add accident details
    doc.setFontSize(14)
    doc.setFont("helvetica", "bold")
    doc.text("Detalls de l'accident", 14, doc.lastAutoTable.finalY + 15)

    doc.setFontSize(10)
    doc.setFont("helvetica", "normal")
    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 20,
      head: [["Lloc", "Descripció"]],
      body: [[formData.accidentLocation, formData.accidentDescription]],
      theme: "grid",
      headStyles: { fillColor: [161, 161, 170], textColor: [255, 255, 255] }, // Zinc-400
      styles: { fontSize: 10 },
      columnStyles: {
        1: { cellWidth: 100 },
      },
    })

    // Add additional accident information
    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 5,
      head: [["Policia involucrada", "Servei de trànsit", "Reportatge amistós", "Víctimes físiques"]],
      body: [
        [
          formData.policeInvolved ? "Sí" : "No",
          formData.trafficServiceInvolved ? "Sí" : "No",
          formData.friendlyReport ? "Sí" : "No",
          formData.bodilyInjuries ? "Sí" : "No",
        ],
      ],
      theme: "grid",
      headStyles: { fillColor: [161, 161, 170], textColor: [255, 255, 255] }, // Zinc-400
      styles: { fontSize: 10 },
    })

    // Add involved parties if any
    if (formData.drivers.length > 0) {
      doc.setFontSize(14)
      doc.setFont("helvetica", "bold")
      doc.text("Altres conductors", 14, doc.lastAutoTable.finalY + 15)

      doc.setFontSize(10)
      doc.setFont("helvetica", "normal")

      const driversData = formData.drivers.map((driver) => [
        `${driver.firstName} ${driver.lastName}`,
        driver.email,
        `${driver.vehicleMake} ${driver.vehicleModel}`,
        driver.licensePlate,
        driver.insuranceCompany,
        driver.policyNumber,
      ])

      autoTable(doc, {
        startY: doc.lastAutoTable.finalY + 20,
        head: [["Nom", "Email", "Marca", "Matrícula", "Assistència", "Número de polissa"]],
        body: driversData,
        theme: "grid",
        headStyles: { fillColor: [161, 161, 170], textColor: [255, 255, 255] }, // Zinc-400
        styles: { fontSize: 9 },
        columnStyles: {
          0: { cellWidth: 30 },
          1: { cellWidth: 40 },
          2: { cellWidth: 30 },
          3: { cellWidth: 25 },
          4: { cellWidth: 30 },
          5: { cellWidth: 30 },
        },
      })
    }

    // Add witnesses if any
    if (formData.witnesses.length > 0) {
      // Check if we need a new page
      if (doc.lastAutoTable.finalY > 230) {
        doc.addPage()
      } else {
        doc.setFontSize(14)
        doc.setFont("helvetica", "bold")
        doc.text("Testimonis", 14, doc.lastAutoTable.finalY + 15)
      }

      doc.setFontSize(10)
      doc.setFont("helvetica", "normal")

      const witnessesData = formData.witnesses.map((witness) => [
        `${witness.firstName} ${witness.lastName}`,
        witness.email,
        witness.phone,
        witness.description,
      ])

      autoTable(doc, {
        startY: doc.lastAutoTable.finalY + 20,
        head: [["Nom", "Email", "Telèfon", "Declaració"]],
        body: witnessesData,
        theme: "grid",
        headStyles: { fillColor: [161, 161, 170], textColor: [255, 255, 255] }, // Zinc-400
        styles: { fontSize: 9 },
        columnStyles: {
          3: { cellWidth: 80 },
        },
      })
    }

    // Add documents if any
    if (formData.documents.length > 0) {
      // Check if we need a new page
      if (doc.lastAutoTable.finalY > 230) {
        doc.addPage()
      } else {
        doc.setFontSize(14)
        doc.setFont("helvetica", "bold")
        doc.text("Documents pujats", 14, doc.lastAutoTable.finalY + 15)
      }

      doc.setFontSize(10)
      doc.setFont("helvetica", "normal")

      const documentsData = formData.documents.map((doc) => [
        doc.name,
        doc.type.charAt(0).toUpperCase() + doc.type.slice(1),
      ])

      autoTable(doc, {
        startY: doc.lastAutoTable.finalY + 20,
        head: [["Nom del document", "Tipus"]],
        body: documentsData,
        theme: "grid",
        headStyles: { fillColor: [161, 161, 170], textColor: [255, 255, 255] }, // Zinc-400
        styles: { fontSize: 10 },
      })
    }

    // Add footer
    const pageCount = doc.internal.getNumberOfPages()
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i)
      doc.setFontSize(8)
      doc.setTextColor(113, 113, 122) // Zinc-500
      doc.text(
        `Pàgina ${i} de ${pageCount} | Ref. Auto: ${claimNumber}`,
        pageWidth / 2,
        doc.internal.pageSize.getHeight() - 10,
        { align: "center" },
      )
    }

    // Return both the data URL for browser display and the buffer for email attachment
    return {
      dataUrl: doc.output("dataurlstring"),
      buffer: Buffer.from(doc.output("arraybuffer")),
    }
  } catch (error) {
    console.error("Error al generar el PDF:", error)
    return {
      dataUrl: "",
      buffer: Buffer.from(""),
    }
  }
}
