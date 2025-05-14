import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"
import type { FormData } from "@/components/claim-form-context"
import { format } from "date-fns"

export function generateClaimPDF(formData: FormData, claimNumber: string): { dataUrl: string; buffer: Buffer } {
  try {
    // Create a new PDF document
    const doc = new jsPDF()
    const pageWidth = doc.internal.pageSize.getWidth()
    const pageHeight = doc.internal.pageSize.getHeight()

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

    // Add policy holder information to the PDF
    doc.setFontSize(10)
    doc.setFont("helvetica", "normal")
    autoTable(doc, {
      startY: 55,
      head: [["Full Name", "Email", "Phone"]],
      body: [[`${formData.firstName} ${formData.lastName}`, formData.email, formData.phone]],
      theme: "grid",
      headStyles: {
        fillColor: [161, 161, 170],
        textColor: [255, 255, 255],
        fontStyle: "bold",
      }, // Zinc-400
      styles: { fontSize: 10 },
      margin: { left: 14, right: 14 },
    })

    // Add driver information if different from policy owner
    if (formData.hasDifferentDriver) {
      doc.setFontSize(14)
      doc.setFont("helvetica", "bold")
      doc.text("Driver Information", 14, (doc.lastAutoTable?.finalY || 0) + 15)

      doc.setFontSize(10)
      doc.setFont("helvetica", "normal")

      const driverData = [
        [
          `${formData.driverFirstName} ${formData.driverLastName}`,
          formData.driverDateOfBirth ? format(formData.driverDateOfBirth, "PPP") : "Not provided",
          formData.driverID || "Not provided",
        ],
      ]

      autoTable(doc, {
        startY: (doc.lastAutoTable?.finalY ?? 0) + 20,
        head: [["Driver Name", "Date of Birth", "Driver ID"]],
        body: driverData,
        theme: "grid",
        headStyles: {
          fillColor: [161, 161, 170],
          textColor: [255, 255, 255],
          fontStyle: "bold",
        }, // Zinc-400
        styles: { fontSize: 10 },
        margin: { left: 14, right: 14 },
      })

      // Add driver contact information if available
      const driverContactData = []
      if (formData.driverEmail) driverContactData.push(formData.driverEmail)
      if (formData.driverPhone) driverContactData.push(formData.driverPhone)

      if (driverContactData.length > 0) {
        const driverContact = driverContactData.join(" / ")
        autoTable(doc, {
          startY: (doc.lastAutoTable?.finalY ?? 0) + 5,
          head: [["Contact Information"]],
          body: [[driverContact]],
          theme: "grid",
          headStyles: {
            fillColor: [161, 161, 170],
            textColor: [255, 255, 255],
            fontStyle: "bold",
          }, // Zinc-400
          styles: { fontSize: 10 },
          margin: { left: 14, right: 14 },
        })
      }
    }

    // Add vehicle information
    doc.setFontSize(14)
    doc.setFont("helvetica", "bold")
    doc.text("Vehicle Information", 14, (doc.lastAutoTable?.finalY ?? 0) + 15)

    doc.setFontSize(10)
    doc.setFont("helvetica", "normal")
    autoTable(doc, {
      startY: (doc.lastAutoTable?.finalY ?? 0) + 20,
      head: [["Vehicle", "License Plate", "Incident Date"]],
      body: [
        [
          `${formData.vehicleMake} ${formData.vehicleModel}`,
          formData.licensePlate,
          formData.incidentDate ? format(formData.incidentDate, "PPP") : "Not specified",
        ],
      ],
      theme: "grid",
      headStyles: {
        fillColor: [161, 161, 170],
        textColor: [255, 255, 255],
        fontStyle: "bold",
      }, // Zinc-400
      styles: { fontSize: 10 },
      margin: { left: 14, right: 14 },
    })

    // Add accident details
    doc.setFontSize(14)
    doc.setFont("helvetica", "bold")
    doc.text("Accident Details", 14, (doc.lastAutoTable?.finalY ?? 0) + 15)

    doc.setFontSize(10)
    doc.setFont("helvetica", "normal")
    autoTable(doc, {
      startY: (doc.lastAutoTable?.finalY ?? 0) + 20,
      head: [["Location", "Description"]],
      body: [[formData.accidentLocation, formData.accidentDescription]],
      theme: "grid",
      headStyles: {
        fillColor: [161, 161, 170],
        textColor: [255, 255, 255],
        fontStyle: "bold",
      }, // Zinc-400
      styles: { fontSize: 10 },
      columnStyles: {
        1: { cellWidth: 100 },
      },
      margin: { left: 14, right: 14 },
    })

    // Add additional accident information
    autoTable(doc, {
      startY: (doc.lastAutoTable?.finalY ?? 0) + 5,
      head: [["Police Involved", "Traffic Service", "Friendly Report", "Bodily Injuries"]],
      body: [
        [
          formData.policeInvolved ? "Yes" : "No",
          formData.trafficServiceInvolved ? "Yes" : "No",
          formData.friendlyReport ? "Yes" : "No",
          formData.bodilyInjuries ? "Yes" : "No",
        ],
      ],
      theme: "grid",
      headStyles: {
        fillColor: [161, 161, 170],
        textColor: [255, 255, 255],
        fontStyle: "bold",
      }, // Zinc-400
      styles: { fontSize: 10 },
      margin: { left: 14, right: 14 },
    })

    // Add damage description
    autoTable(doc, {
      startY: (doc.lastAutoTable?.finalY ?? 0) + 5,
      head: [["Damage Description"]],
      body: [[formData.damageDescription]],
      theme: "grid",
      headStyles: {
        fillColor: [161, 161, 170],
        textColor: [255, 255, 255],
        fontStyle: "bold",
      }, // Zinc-400
      styles: { fontSize: 10 },
      margin: { left: 14, right: 14 },
    })

    // Add damage photos information if available
    if (formData.damagePhotos.length > 0) {
      autoTable(doc, {
        startY: (doc.lastAutoTable?.finalY ?? 0) + 5,
        head: [["Damage Photos"]],
        body: [[`${formData.damagePhotos.length} photo${formData.damagePhotos.length > 1 ? "s" : ""} uploaded`]],
        theme: "grid",
        headStyles: {
          fillColor: [161, 161, 170],
          textColor: [255, 255, 255],
          fontStyle: "bold",
        }, // Zinc-400
        styles: { fontSize: 10 },
        margin: { left: 14, right: 14 },
      })
    }

    // Add friendly report document information if available
    if (formData.friendlyReport && formData.friendlyReportDocument) {
      autoTable(doc, {
        startY: (doc.lastAutoTable?.finalY ?? 0) + 5,
        head: [["Friendly Report Document"]],
        body: [
          [
            `Document: ${formData.friendlyReportDocument.name} (${formData.friendlyReportDocument.type.split("/")[1] || "file"})`,
          ],
        ],
        theme: "grid",
        headStyles: {
          fillColor: [161, 161, 170],
          textColor: [255, 255, 255],
          fontStyle: "bold",
        }, // Zinc-400
        styles: { fontSize: 10 },
        margin: { left: 14, right: 14 },
      })
    }

    // Add bodily injuries description if available
    if (formData.bodilyInjuries && formData.bodilyInjuriesDescription) {
      autoTable(doc, {
        startY: (doc.lastAutoTable?.finalY ?? 0) + 5,
        head: [["Bodily Injuries Description"]],
        body: [[formData.bodilyInjuriesDescription]],
        theme: "grid",
        headStyles: {
          fillColor: [161, 161, 170],
          textColor: [255, 255, 255],
          fontStyle: "bold",
        }, // Zinc-400
        styles: { fontSize: 10 },
        margin: { left: 14, right: 14 },
      })
    }

    // Check if we need a new page before adding involved parties
    if ((doc.lastAutoTable?.finalY ?? 0) > pageHeight - 100) {
      doc.addPage()
    }

    // Add involved parties if any
    if (formData.drivers.length > 0) {
      doc.setFontSize(14)
      doc.setFont("helvetica", "bold")
      doc.text("Other Drivers", 14, (doc.lastAutoTable?.finalY ?? 0) + 15)

      doc.setFontSize(10)
      doc.setFont("helvetica", "normal")

      // Process each driver individually for better formatting
      for (let i = 0; i < formData.drivers.length; i++) {
        const driver = formData.drivers[i]

        // Check if we need a new page
        if (i > 0 && (doc.lastAutoTable?.finalY ?? 0) > pageHeight - 80) {
          doc.addPage()
        }

        // Driver basic info
        autoTable(doc, {
          startY: i === 0 ? (doc.lastAutoTable?.finalY ?? 0) + 20 : (doc.lastAutoTable?.finalY ?? 0) + 10,
          head: [[`Driver ${i + 1}: ${driver.firstName} ${driver.lastName}`]],
          body: [
            [`Email: ${driver.email}`],
            [`Phone: ${driver.phone}`],
            [`Vehicle: ${driver.vehicleMake} ${driver.vehicleModel}`],
            [`License Plate: ${driver.licensePlate}`],
            [`Insurance: ${driver.insuranceCompany}`],
            [`Policy Number: ${driver.policyNumber}`],
          ],
          theme: "grid",
          headStyles: {
            fillColor: [161, 161, 170],
            textColor: [255, 255, 255],
            fontStyle: "bold",
          },
          styles: { fontSize: 10 },
          margin: { left: 14, right: 14 },
        })
      }
    }

    // Add witnesses if any
    if (formData.witnesses.length > 0) {
      // Check if we need a new page
      if ((doc.lastAutoTable?.finalY ?? 0) > pageHeight - 100) {
        doc.addPage()
      }

      doc.setFontSize(14)
      doc.setFont("helvetica", "bold")
      doc.text("Witnesses", 14, (doc.lastAutoTable?.finalY ?? 0) + 15)

      doc.setFontSize(10)
      doc.setFont("helvetica", "normal")

      // Process each witness individually for better formatting
      for (let i = 0; i < formData.witnesses.length; i++) {
        const witness = formData.witnesses[i]

        // Check if we need a new page
        if (i > 0 && (doc.lastAutoTable?.finalY ?? 0) > pageHeight - 80) {
          doc.addPage()
        }

        // Witness info
        autoTable(doc, {
          startY: i === 0 ? (doc.lastAutoTable?.finalY ?? 0) + 20 : (doc.lastAutoTable?.finalY ?? 0) + 10,
          head: [[`Witness ${i + 1}: ${witness.firstName} ${witness.lastName}`]],
          body: [[`Contact: ${witness.email} / ${witness.phone}`], [`Statement: ${witness.description}`]],
          theme: "grid",
          headStyles: {
            fillColor: [161, 161, 170],
            textColor: [255, 255, 255],
            fontStyle: "bold",
          },
          styles: { fontSize: 10 },
          margin: { left: 14, right: 14 },
        })
      }
    }

    // Add documents if any
    if (formData.documents.length > 0) {
      // Check if we need a new page
      if ((doc.lastAutoTable?.finalY ?? 0) > pageHeight - 100) {
        doc.addPage()
      }

      doc.setFontSize(14)
      doc.setFont("helvetica", "bold")
      doc.text("Uploaded Documents", 14, (doc.lastAutoTable?.finalY ?? 0) + 15)

      doc.setFontSize(10)
      doc.setFont("helvetica", "normal")

      const documentsData = formData.documents.map((doc) => [
        doc.name,
        doc.type.split("/")[1] ? doc.type.split("/")[1].toUpperCase() : "File",
      ])

      autoTable(doc, {
        startY: (doc.lastAutoTable?.finalY ?? 0) + 20,
        head: [["Document Name", "Type"]],
        body: documentsData,
        theme: "grid",
        headStyles: {
          fillColor: [161, 161, 170],
          textColor: [255, 255, 255],
          fontStyle: "bold",
        }, // Zinc-400
        styles: { fontSize: 10 },
        margin: { left: 14, right: 14 },
      })
    }

    // Add footer with page numbers
    const pageCount = doc.getNumberOfPages()
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i)
      doc.setFontSize(8)
      doc.setTextColor(113, 113, 122) // Zinc-500
      doc.text(`Page ${i} of ${pageCount} | Auto Claim Reference: ${claimNumber}`, pageWidth / 2, pageHeight - 10, {
        align: "center",
      })
    }

    // Return both the data URL for browser display and the buffer for email attachment
    return {
      dataUrl: doc.output("dataurlstring"),
      buffer: Buffer.from(doc.output("arraybuffer")),
    }
  } catch (error) {
    console.error("Error generating PDF:", error)
    return {
      dataUrl: "",
      buffer: Buffer.from(""),
    }
  }
}
