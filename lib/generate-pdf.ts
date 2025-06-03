import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import type { FormData } from "@/components/claim/auto/claim-form-context";
import type { FormData as GeneralFormData } from "@/components/claim/general/general-claim-form-context";
import { format } from "date-fns";


export function generateClaimAutoPDF(
  formData: FormData,
  claimNumber: string
): { dataUrl: string; buffer: Buffer }  {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();

  // Header
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("AUTO CLAIM SUMMARY", pageWidth / 2, 15, { align: "center" });
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(`Claim Reference: ${claimNumber}`, pageWidth / 2, 22, {
    align: "center",
  });

  // Claimant Info
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Claimant Information", 14, 32);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  autoTable(doc, {
    startY: 36,
    head: [["Full Name", "Email", "Phone"]],
    body: [
      [
        `${formData.firstName} ${formData.lastName}`,
        formData.email,
        formData.phone,
      ],
    ],
    theme: "grid",
    headStyles: { fillColor: [161, 161, 170], textColor: [255, 255, 255], fontStyle: "bold" },
    margin: { left: 14, right: 14 },
  });

  // Driver Info
  if (formData.hasDifferentDriver) {
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Driver Information", 14, (doc.lastAutoTable?.finalY ?? 0) + 10);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    autoTable(doc, {
      startY: (doc.lastAutoTable?.finalY ?? 0) + 14,
      head: [["Name", "Date of Birth", "ID", "Email", "Phone"]],
      body: [
        [
          `${formData.driverFirstName} ${formData.driverLastName}`,
          formData.driverDateOfBirth
            ? new Date(formData.driverDateOfBirth).toLocaleDateString()
            : "N/A",
          formData.driverID,
          formData.driverEmail,
          formData.driverPhone,
        ],
      ],
      theme: "grid",
      headStyles: { fillColor: [161, 161, 170], textColor: [255, 255, 255], fontStyle: "bold" },
      margin: { left: 14, right: 14 },
    });
  }

  // Vehicle Info
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Vehicle Information", 14, (doc.lastAutoTable?.finalY ?? 0) + 10);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  autoTable(doc, {
    startY: (doc.lastAutoTable?.finalY ?? 0) + 14,
    head: [["Make", "Model", "Type", "License Plate"]],
    body: [
      [
        formData.vehicleMake,
        formData.vehicleModel,
        formData.vehicleType,
        formData.licensePlate,
      ],
    ],
    theme: "grid",
    headStyles: { fillColor: [161, 161, 170], textColor: [255, 255, 255], fontStyle: "bold" },
    margin: { left: 14, right: 14 },
  });

  // Accident Info
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Accident Details", 14, (doc.lastAutoTable?.finalY ?? 0) + 10);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  autoTable(doc, {
    startY: (doc.lastAutoTable?.finalY ?? 0) + 14,
    head: [["Date", "Location", "Description"]],
    body: [
      [
        formData.incidentDate
          ? new Date(formData.incidentDate).toLocaleDateString()
          : "N/A",
        formData.accidentLocation,
        formData.accidentDescription,
      ],
    ],
    theme: "grid",
    headStyles: { fillColor: [161, 161, 170], textColor: [255, 255, 255], fontStyle: "bold" },
    margin: { left: 14, right: 14 },
  });

  // Accident Flags
  autoTable(doc, {
    startY: (doc.lastAutoTable?.finalY ?? 0) + 5,
    head: [
      [
        "Police Involved",
        "Traffic Service",
        "Friendly Report",
        "Bodily Injuries",
      ],
    ],
    body: [
      [
        formData.policeInvolved ? "Yes" : "No",
        formData.trafficServiceInvolved ? "Yes" : "No",
        formData.friendlyReport ? "Yes" : "No",
        formData.bodilyInjuries ? "Yes" : "No",
      ],
    ],
    theme: "grid",
    headStyles: { fillColor: [161, 161, 170], textColor: [255, 255, 255], fontStyle: "bold" },
    margin: { left: 14, right: 14 },
  });

  // Friendly Report Document
  if (formData.friendlyReport && formData.friendlyReportDocument) {
    autoTable(doc, {
      startY: (doc.lastAutoTable?.finalY ?? 0) + 5,
      head: [["Friendly Report Document"]],
      body: [[formData.friendlyReportDocument.name]],
      theme: "grid",
      headStyles: { fillColor: [161, 161, 170], textColor: [255, 255, 255], fontStyle: "bold" },
      margin: { left: 14, right: 14 },
    });
  }

  // Bodily Injuries Description
  if (formData.bodilyInjuries && formData.bodilyInjuriesDescription) {
    autoTable(doc, {
      startY: (doc.lastAutoTable?.finalY ?? 0) + 5,
      head: [["Bodily Injuries Description"]],
      body: [[formData.bodilyInjuriesDescription]],
      theme: "grid",
      headStyles: { fillColor: [161, 161, 170], textColor: [255, 255, 255], fontStyle: "bold" },
      margin: { left: 14, right: 14 },
    });
  }

  // Damage Description & Photos
  autoTable(doc, {
    startY: (doc.lastAutoTable?.finalY ?? 0) + 5,
    head: [["Damage Description"]],
    body: [[formData.damageDescription]],
    theme: "grid",
    headStyles: { fillColor: [161, 161, 170], textColor: [255, 255, 255], fontStyle: "bold" },
    margin: { left: 14, right: 14 },
  });

  if (formData.damagePhotos.length > 0) {
    autoTable(doc, {
      startY: (doc.lastAutoTable?.finalY ?? 0) + 5,
      head: [["Photo Damage", "Type", "Size (KB)"]],
      body: formData.damagePhotos.map((photo) => [
        photo.name,
        photo.type,
        (photo.size / 1024).toFixed(1),
      ]),
      theme: "grid",
      headStyles: { fillColor: [161, 161, 170], textColor: [255, 255, 255], fontStyle: "bold" },
      margin: { left: 14, right: 14 },
    });
  }

  // Other Drivers
  if (formData.drivers.length > 0) {
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Other Drivers", 14, (doc.lastAutoTable?.finalY ?? 0) + 10);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    autoTable(doc, {
      startY: (doc.lastAutoTable?.finalY ?? 0) + 14,
      head: [
        [
          "Name",
          "Email",
          "Phone",
          "Vehicle",
          "License Plate",
          "Insurance",
          "Policy Number",
        ],
      ],
      body: formData.drivers.map((driver) => [
        `${driver.firstName} ${driver.lastName}`,
        driver.email,
        driver.phone,
        `${driver.vehicleMake} ${driver.vehicleModel}`,
        driver.licensePlate,
        driver.insuranceCompany,
        driver.policyNumber,
      ]),
      theme: "grid",
      headStyles: { fillColor: [161, 161, 170], textColor: [255, 255, 255], fontStyle: "bold" },
      margin: { left: 14, right: 14 },
    });
  }

  // Witnesses
  if (formData.witnesses.length > 0) {
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Witnesses", 14, (doc.lastAutoTable?.finalY ?? 0) + 10);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    autoTable(doc, {
      startY: (doc.lastAutoTable?.finalY ?? 0) + 14,
      head: [["Name", "Email", "Phone", "Description"]],
      body: formData.witnesses.map((w) => [
        `${w.firstName} ${w.lastName}`,
        w.email,
        w.phone,
        w.description,
      ]),
      theme: "grid",
      headStyles: { fillColor: [161, 161, 170], textColor: [255, 255, 255], fontStyle: "bold" },
      margin: { left: 14, right: 14 },
    });
  }

  // Documents
  if (formData.documents.length > 0) {
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Uploaded Documents", 14, (doc.lastAutoTable?.finalY ?? 0) + 10);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    autoTable(doc, {
      startY: (doc.lastAutoTable?.finalY ?? 0) + 14,
      head: [["Document Name", "Type"]],
      body: formData.documents.map((docu: any) => [docu.name, docu.type]),
      theme: "grid",
      headStyles: { fillColor: [161, 161, 170], textColor: [255, 255, 255], fontStyle: "bold" },
      margin: { left: 14, right: 14 },
    });
  }

  // Footer
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.text(
      `Page ${i} of ${pageCount} | Auto Claim Reference: ${claimNumber}`,
      pageWidth / 2,
      290,
      { align: "center" }
    );
  }

  // Return both the data URL for browser display and the buffer for email attachment
  return {
    dataUrl: doc.output("dataurlstring"),
    buffer: Buffer.from(doc.output("arraybuffer")),
  };
}

export function generateClaimGeneralPDF(
  formData: GeneralFormData,
  claimNumber: string
): { dataUrl: string; buffer: Buffer } {
  try {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    // Header
    doc.setFillColor(241, 241, 243); 
    doc.rect(0, 0, pageWidth, 40, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.setTextColor(24, 24, 27); // Zinc-900
    doc.text("GENERAL CLAIM SUMMARY", pageWidth / 2, 20, { align: "center" });
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(113, 113, 122); // Zinc-500
    doc.text(`Claim Reference: ${claimNumber}`, pageWidth / 2, 30, { align: "center" });
    doc.text(`Generated on: ${format(new Date(), "PPP")}`, pageWidth / 2, 35, { align: "center" });

    // Claimant Info
    doc.setFontSize(14);
    doc.setTextColor(24, 24, 27);
    doc.setFont("helvetica", "bold");
    doc.text("Claimant Information", 14, 50);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    autoTable(doc, {
      startY: 55,
      head: [["Full Name", "Email", "Phone", "Policy Number"]],
      body: [[
        `${formData.firstName} ${formData.lastName}`,
        formData.email,
        formData.phone,
        formData.policyNumber
      ]],
      theme: "grid",
      headStyles: { fillColor: [161, 161, 170], textColor: [255, 255, 255], fontStyle: "bold" },
      styles: { fontSize: 10 },
      margin: { left: 14, right: 14 },
    });

    // Accident Info
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Accident Details", 14, (doc.lastAutoTable?.finalY ?? 0) + 15);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    autoTable(doc, {
      startY: (doc.lastAutoTable?.finalY ?? 0) + 20,
      head: [["Location", "Date", "Description"]],
      body: [[
        formData.accidentLocation,
        formData.accidentDate ? format(formData.accidentDate, "PPP") : "N/A",
        formData.accidentDescription
      ]],
      theme: "grid",
      headStyles: { fillColor: [161, 161, 170], textColor: [255, 255, 255], fontStyle: "bold" },
      styles: { fontSize: 10 },
      margin: { left: 14, right: 14 },
    });

    // Damage Description & Photos
    autoTable(doc, {
      startY: (doc.lastAutoTable?.finalY ?? 0) + 5,
      head: [["Damage Description"]],
      body: [[formData.damageDescription]],
      theme: "grid",
      headStyles: { fillColor: [161, 161, 170], textColor: [255, 255, 255], fontStyle: "bold" },
      styles: { fontSize: 10 },
      margin: { left: 14, right: 14 },
    });
    if (formData.damagePhotos.length > 0) {
      autoTable(doc, {
        startY: (doc.lastAutoTable?.finalY ?? 0) + 5,
        head: [["Photo Name", "Type", "Size (KB)"]],
        body: formData.damagePhotos.map(photo => [photo.name, photo.type, (photo.size / 1024).toFixed(1)]),
        theme: "grid",
        headStyles: { fillColor: [161, 161, 170], textColor: [255, 255, 255], fontStyle: "bold" },
        styles: { fontSize: 10 },
        margin: { left: 14, right: 14 },
      });
    }

    // Police, Firefighters, Reports, Medical
    autoTable(doc, {
      startY: (doc.lastAutoTable?.finalY ?? 0) + 5,
      head: [["Police Involved", "Traffic Service", "Firefighters", "Police Report", "Friendly Report", "Bodily Injuries"]],
      body: [[
        formData.policeInvolved ? "Yes" : "No",
        formData.trafficServiceInvolved ? "Yes" : "No",
        formData.firefightersInvolved ? "Yes" : "No",
        formData.policeReport ? "Yes" : "No",
        formData.friendlyReport ? "Yes" : "No",
        formData.bodilyInjuries ? "Yes" : "No"
      ]],
      theme: "grid",
      headStyles: { fillColor: [161, 161, 170], textColor: [255, 255, 255], fontStyle: "bold" },
      styles: { fontSize: 10 },
      margin: { left: 14, right: 14 },
    });
    if (formData.policeReport && formData.policeReportDocument) {
      autoTable(doc, {
        startY: (doc.lastAutoTable?.finalY ?? 0) + 5,
        head: [["Police Report Document"]],
        body: [[formData.policeReportDocument.name]],
        theme: "grid",
        headStyles: { fillColor: [161, 161, 170], textColor: [255, 255, 255], fontStyle: "bold" },
        styles: { fontSize: 10 },
        margin: { left: 14, right: 14 },
      });
    }
    if (formData.bodilyInjuries && formData.bodilyInjuriesDescription) {
      autoTable(doc, {
        startY: (doc.lastAutoTable?.finalY ?? 0) + 5,
        head: [["Bodily Injuries Description"]],
        body: [[formData.bodilyInjuriesDescription]],
        theme: "grid",
        headStyles: { fillColor: [161, 161, 170], textColor: [255, 255, 255], fontStyle: "bold" },
        styles: { fontSize: 10 },
        margin: { left: 14, right: 14 },
      });
    }
    if (formData.medicalReportDocument) {
      autoTable(doc, {
        startY: (doc.lastAutoTable?.finalY ?? 0) + 5,
        head: [["Medical Report Document"]],
        body: [[formData.medicalReportDocument.name]],
        theme: "grid",
        headStyles: { fillColor: [161, 161, 170], textColor: [255, 255, 255], fontStyle: "bold" },
        styles: { fontSize: 10 },
        margin: { left: 14, right: 14 },
      });
    }

    // Involved Parties
    if (formData.involvedParties.length > 0) {
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text("Involved Parties", 14, (doc.lastAutoTable?.finalY ?? 0) + 15);
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      autoTable(doc, {
        startY: (doc.lastAutoTable?.finalY ?? 0) + 20,
        head: [["Full Name", "Email", "Phone", "Description", "Insurance", "Policy Number"]],
        body: formData.involvedParties.map(p => [p.fullName, p.email, p.phone, p.description, p.insuranceCompany, p.policyNumber]),
        theme: "grid",
        headStyles: { fillColor: [161, 161, 170], textColor: [255, 255, 255], fontStyle: "bold" },
        styles: { fontSize: 10 },
        margin: { left: 14, right: 14 },
      });
    }

    // Testimonies
    if (formData.testimonies.length > 0) {
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text("Testimonies", 14, (doc.lastAutoTable?.finalY ?? 0) + 15);
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      autoTable(doc, {
        startY: (doc.lastAutoTable?.finalY ?? 0) + 20,
        head: [["Full Name", "Email", "Phone", "Description"]],
        body: formData.testimonies.map(t => [t.fullName, t.email, t.phone, t.description]),
        theme: "grid",
        headStyles: { fillColor: [161, 161, 170], textColor: [255, 255, 255], fontStyle: "bold" },
        styles: { fontSize: 10 },
        margin: { left: 14, right: 14 },
      });
    }

    // Additional Documents
    if (formData.additionalDocuments.length > 0) {
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text("Additional Documents", 14, (doc.lastAutoTable?.finalY ?? 0) + 15);
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      autoTable(doc, {
        startY: (doc.lastAutoTable?.finalY ?? 0) + 20,
        head: [["Document Name", "Type", "Size (KB)"]],
        body: formData.additionalDocuments.map(d => [d.name, d.type, (d.size / 1024).toFixed(1)]),
        theme: "grid",
        headStyles: { fillColor: [161, 161, 170], textColor: [255, 255, 255], fontStyle: "bold" },
        styles: { fontSize: 10 },
        margin: { left: 14, right: 14 },
      });
    }

    // Additional Comments
    if (formData.additionalComments && formData.additionalComments.trim() !== "") {
      autoTable(doc, {
        startY: (doc.lastAutoTable?.finalY ?? 0) + 5,
        head: [["Additional Comments"]],
        body: [[formData.additionalComments]],
        theme: "grid",
        headStyles: { fillColor: [161, 161, 170], textColor: [255, 255, 255], fontStyle: "bold" },
        styles: { fontSize: 10 },
        margin: { left: 14, right: 14 },
      });
    }

    // Footer
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(113, 113, 122);
      doc.text(
        `Page ${i} of ${pageCount} | General Claim Reference: ${claimNumber}`,
        pageWidth / 2,
        pageHeight - 10,
        { align: "center" }
      );
    }
    return {
      dataUrl: doc.output("dataurlstring"),
      buffer: Buffer.from(doc.output("arraybuffer")),
    };
  } catch (error) {
    console.error("Error generating PDF:", error);
    return { dataUrl: "", buffer: Buffer.from("") };
  }
}
