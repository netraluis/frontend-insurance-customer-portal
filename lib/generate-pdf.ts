import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import type { FormData } from "@/components/claim/auto/claim-form-context";
import type { FormData as GeneralFormData } from "@/components/claim/general/general-claim-form-context";
import { format } from "date-fns";

export function generateClaimAutoPDF(
  formData: FormData,
  claimNumber: string
): { dataUrl: string; buffer: Buffer } {
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
    headStyles: {
      fillColor: [161, 161, 170],
      textColor: [255, 255, 255],
      fontStyle: "bold",
    },
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
      headStyles: {
        fillColor: [161, 161, 170],
        textColor: [255, 255, 255],
        fontStyle: "bold",
      },
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
    headStyles: {
      fillColor: [161, 161, 170],
      textColor: [255, 255, 255],
      fontStyle: "bold",
    },
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
    headStyles: {
      fillColor: [161, 161, 170],
      textColor: [255, 255, 255],
      fontStyle: "bold",
    },
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
    headStyles: {
      fillColor: [161, 161, 170],
      textColor: [255, 255, 255],
      fontStyle: "bold",
    },
    margin: { left: 14, right: 14 },
  });

  // Friendly Report Document
  if (formData.friendlyReport && formData.friendlyReportDocument) {
    autoTable(doc, {
      startY: (doc.lastAutoTable?.finalY ?? 0) + 5,
      head: [["Friendly Report Document"]],
      body: [[formData.friendlyReportDocument.name]],
      theme: "grid",
      headStyles: {
        fillColor: [161, 161, 170],
        textColor: [255, 255, 255],
        fontStyle: "bold",
      },
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
      headStyles: {
        fillColor: [161, 161, 170],
        textColor: [255, 255, 255],
        fontStyle: "bold",
      },
      margin: { left: 14, right: 14 },
    });
  }

  // Damage Description & Photos
  autoTable(doc, {
    startY: (doc.lastAutoTable?.finalY ?? 0) + 5,
    head: [["Damage Description"]],
    body: [[formData.damageDescription]],
    theme: "grid",
    headStyles: {
      fillColor: [161, 161, 170],
      textColor: [255, 255, 255],
      fontStyle: "bold",
    },
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
      headStyles: {
        fillColor: [161, 161, 170],
        textColor: [255, 255, 255],
        fontStyle: "bold",
      },
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
      headStyles: {
        fillColor: [161, 161, 170],
        textColor: [255, 255, 255],
        fontStyle: "bold",
      },
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
      headStyles: {
        fillColor: [161, 161, 170],
        textColor: [255, 255, 255],
        fontStyle: "bold",
      },
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
      headStyles: {
        fillColor: [161, 161, 170],
        textColor: [255, 255, 255],
        fontStyle: "bold",
      },
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
    // const logoBase64 = 
    //   "data:image/png;base64,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";
    // const logoBase64 = 'data:image/jpeg;base64,'+ Base64.encode('Koala.jpeg');

    const logoWidth = 120;
    const logoHeight = 22;
    const logoX = (pageWidth - logoWidth) / 2;
    const logoY = 8;
    const logoBase64 = "data:image/png;base64,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";
    // Header
    doc.setFillColor(241, 241, 243);
    doc.rect(0, 0, pageWidth, 40, "F");
    doc.addImage(logoBase64, "PNG", logoX, logoY, logoWidth, logoHeight);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.setTextColor(24, 24, 27); // Zinc-900
    doc.text("GENERAL CLAIM SUMMARY", pageWidth / 2, 20, { align: "center" });
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(113, 113, 122); // Zinc-500
    doc.text(`Claim Reference: ${claimNumber}`, pageWidth / 2, 30, {
      align: "center",
    });
    doc.text(`Generated on: ${format(new Date(), "PPP")}`, pageWidth / 2, 35, {
      align: "center",
    });

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
      body: [
        [
          `${formData.firstName} ${formData.lastName}`,
          formData.email,
          formData.phone,
          formData.policyNumber,
        ],
      ],
      theme: "grid",
      headStyles: {
        fillColor: [161, 161, 170],
        textColor: [255, 255, 255],
        fontStyle: "bold",
      },
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
      body: [
        [
          formData.accidentLocation,
          formData.accidentDate ? format(formData.accidentDate, "PPP") : "N/A",
          formData.accidentDescription,
        ],
      ],
      theme: "grid",
      headStyles: {
        fillColor: [161, 161, 170],
        textColor: [255, 255, 255],
        fontStyle: "bold",
      },
      styles: { fontSize: 10 },
      margin: { left: 14, right: 14 },
    });

    // Damage Description & Photos
    autoTable(doc, {
      startY: (doc.lastAutoTable?.finalY ?? 0) + 5,
      head: [["Damage Description"]],
      body: [[formData.damageDescription]],
      theme: "grid",
      headStyles: {
        fillColor: [161, 161, 170],
        textColor: [255, 255, 255],
        fontStyle: "bold",
      },
      styles: { fontSize: 10 },
      margin: { left: 14, right: 14 },
    });
    if (formData.damagePhotos.length > 0) {
      autoTable(doc, {
        startY: (doc.lastAutoTable?.finalY ?? 0) + 5,
        head: [["Photo Name", "Type", "Size (KB)"]],
        body: formData.damagePhotos.map((photo) => [
          photo.name,
          photo.type,
          (photo.size / 1024).toFixed(1),
        ]),
        theme: "grid",
        headStyles: {
          fillColor: [161, 161, 170],
          textColor: [255, 255, 255],
          fontStyle: "bold",
        },
        styles: { fontSize: 10 },
        margin: { left: 14, right: 14 },
      });
    }

    // Police, Firefighters, Reports, Medical
    autoTable(doc, {
      startY: (doc.lastAutoTable?.finalY ?? 0) + 5,
      head: [
        [
          "Police Involved",
          "Traffic Service",
          "Firefighters",
          "Police Report",
          "Friendly Report",
          "Bodily Injuries",
        ],
      ],
      body: [
        [
          formData.policeInvolved ? "Yes" : "No",
          formData.trafficServiceInvolved ? "Yes" : "No",
          formData.firefightersInvolved ? "Yes" : "No",
          formData.policeReport ? "Yes" : "No",
          formData.friendlyReport ? "Yes" : "No",
          formData.bodilyInjuries ? "Yes" : "No",
        ],
      ],
      theme: "grid",
      headStyles: {
        fillColor: [161, 161, 170],
        textColor: [255, 255, 255],
        fontStyle: "bold",
      },
      styles: { fontSize: 10 },
      margin: { left: 14, right: 14 },
    });
    if (formData.policeReport && formData.policeReportDocument) {
      autoTable(doc, {
        startY: (doc.lastAutoTable?.finalY ?? 0) + 5,
        head: [["Police Report Document"]],
        body: [[formData.policeReportDocument.name]],
        theme: "grid",
        headStyles: {
          fillColor: [161, 161, 170],
          textColor: [255, 255, 255],
          fontStyle: "bold",
        },
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
        headStyles: {
          fillColor: [161, 161, 170],
          textColor: [255, 255, 255],
          fontStyle: "bold",
        },
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
        headStyles: {
          fillColor: [161, 161, 170],
          textColor: [255, 255, 255],
          fontStyle: "bold",
        },
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
        head: [
          [
            "Full Name",
            "Email",
            "Phone",
            "Description",
            "Insurance",
            "Policy Number",
          ],
        ],
        body: formData.involvedParties.map((p) => [
          p.fullName,
          p.email,
          p.phone,
          p.description,
          p.insuranceCompany,
          p.policyNumber,
        ]),
        theme: "grid",
        headStyles: {
          fillColor: [161, 161, 170],
          textColor: [255, 255, 255],
          fontStyle: "bold",
        },
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
        body: formData.testimonies.map((t) => [
          t.fullName,
          t.email,
          t.phone,
          t.description,
        ]),
        theme: "grid",
        headStyles: {
          fillColor: [161, 161, 170],
          textColor: [255, 255, 255],
          fontStyle: "bold",
        },
        styles: { fontSize: 10 },
        margin: { left: 14, right: 14 },
      });
    }

    // Additional Documents
    if (formData.additionalDocuments.length > 0) {
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text(
        "Additional Documents",
        14,
        (doc.lastAutoTable?.finalY ?? 0) + 15
      );
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      autoTable(doc, {
        startY: (doc.lastAutoTable?.finalY ?? 0) + 20,
        head: [["Document Name", "Type", "Size (KB)"]],
        body: formData.additionalDocuments.map((d) => [
          d.name,
          d.type,
          (d.size / 1024).toFixed(1),
        ]),
        theme: "grid",
        headStyles: {
          fillColor: [161, 161, 170],
          textColor: [255, 255, 255],
          fontStyle: "bold",
        },
        styles: { fontSize: 10 },
        margin: { left: 14, right: 14 },
      });
    }

    // Additional Comments
    if (
      formData.additionalComments &&
      formData.additionalComments.trim() !== ""
    ) {
      autoTable(doc, {
        startY: (doc.lastAutoTable?.finalY ?? 0) + 5,
        head: [["Additional Comments"]],
        body: [[formData.additionalComments]],
        theme: "grid",
        headStyles: {
          fillColor: [161, 161, 170],
          textColor: [255, 255, 255],
          fontStyle: "bold",
        },
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
