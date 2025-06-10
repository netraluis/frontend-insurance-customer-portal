import jsPDF from "jspdf";
import autoTable, { Color, FontStyle } from "jspdf-autotable";
import type { FormData } from "@/components/claim/auto/claim-form-context";
import type { FormData as GeneralFormData } from "@/components/claim/general/general-claim-form-context";
import { format } from "date-fns";
import { uploadBlobsAndGetUrls } from "./utils";

const margins = {
  top: 10,
  bottom: 20,
  left: 14,
  right: 14,
};

const tableStyles = {
  fillColor: [111, 176, 201] as Color,
  textColor: [255, 255, 255] as Color,
  fontStyle: "bold" as FontStyle,
};

const logoWidht = 60
const logoHeightVar = 11
const footerLogoWidthVar = 220
const footerLogoHeightVar = 28
const logoBase64 =
  "data:image/png;base64,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";

const logoFooterBase64 =
  "data:image/png;base64,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";
export async function generateClaimAutoPDF(
  formData: FormData,
  claimNumber: string,
  t: (key: string) => string
): Promise<{ dataUrl: string; buffer: Buffer }> {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  const logoHeight = logoHeightVar;
  const logoWidth = logoWidht
  const logoX = (pageWidth - logoWidth) / 2;
  const logoY = 8;
  // Header
  // doc.setFillColor(241, 241, 243);
  // doc.rect(0, 0, pageWidth, 40, "F");
  doc.addImage(logoBase64, "PNG", logoX, logoY, logoWidth, logoHeight);

  // Header
  // doc.setFont("helvetica", "bold");
  // doc.setFontSize(18);
  // doc.text("AUTO CLAIM SUMMARY", pageWidth / 2, 15, { align: "center" });
  // doc.setFontSize(10);
  // doc.setFont("helvetica", "normal");
  doc.text(`${t('ClaimAuto.ReviewSubmit.referenceNumber')} ${claimNumber}`, pageWidth / 2, 50, {
    align: "center",
  });

  // Claimant Info
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text(t('ClaimAuto.PolicyInformationForm.personalInformation'), 14, 70);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  autoTable(doc, {
    startY: 75,
    head: [[
      t("ClaimAuto.ReviewSubmit.fullName"),
      t("ClaimAuto.ReviewSubmit.emailAddress"),
      t("ClaimAuto.ReviewSubmit.phoneNumber"),
    ]],
    body: [
      [
        `${formData.firstName} ${formData.lastName}`,
        formData.email,
        formData.phone,
      ],
    ],
    theme: "grid",
    headStyles: tableStyles,
    margin: margins,
  });

  // Driver Info
  if (formData.hasDifferentDriver) {
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text(t('ClaimAuto.ReviewSubmit.driverInformation'), 14, (doc.lastAutoTable?.finalY ?? 0) + 10);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    autoTable(doc, {
      startY: (doc.lastAutoTable?.finalY ?? 0) + 14,
      head: [[
        t("ClaimAuto.ReviewSubmit.driverName"),
        t("ClaimAuto.ReviewSubmit.dateOfBirth"),
        t("ClaimAuto.ReviewSubmit.driverID"),
        t("ClaimAuto.ReviewSubmit.emailAddress"),
        t("ClaimAuto.ReviewSubmit.phoneNumber"),
      ]],
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
      headStyles: tableStyles,
      margin: margins,
    });
  }

  // Vehicle Info
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text(t('ClaimAuto.ReviewSubmit.vehicleInformation'), 14, (doc.lastAutoTable?.finalY ?? 0) + 10);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  autoTable(doc, {
    startY: (doc.lastAutoTable?.finalY ?? 0) + 14,
    head: [[
      t("ClaimAuto.VehicleInformationForm.vehicleMake"),
      t("ClaimAuto.VehicleInformationForm.vehicleModel"),
      t("ClaimAuto.VehicleInformationForm.vehicleType"),
      t("ClaimAuto.VehicleInformationForm.licensePlate"),
    ]],
    body: [
      [
        formData.vehicleMake,
        formData.vehicleModel,
        formData.vehicleType,
        formData.licensePlate,
      ],
    ],
    theme: "grid",
    headStyles: tableStyles,
    margin: margins,
  });

  // Accident Info
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text(t('ClaimAuto.ReviewSubmit.accidentDetails'), 14, (doc.lastAutoTable?.finalY ?? 0) + 10);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  autoTable(doc, {
    startY: (doc.lastAutoTable?.finalY ?? 0) + 14,
    head: [[
      t("ClaimAuto.ReviewSubmit.incidentDate"),
      t("ClaimAuto.ReviewSubmit.location"),
      t("ClaimAuto.ReviewSubmit.description"),
    ]],
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
    headStyles: tableStyles,
    margin: margins,
  });

  // Accident Flags
  autoTable(doc, {
    startY: (doc.lastAutoTable?.finalY ?? 0) + 5,
    head: [
      [
        t("ClaimAuto.ReviewSubmit.policeInvolved"),
        t("ClaimAuto.ReviewSubmit.trafficServiceInvolved"),
        t("ClaimAuto.ReviewSubmit.friendlyAccidentReport"),
        t("ClaimAuto.ReviewSubmit.bodilyInjuries"),
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
    headStyles: tableStyles,
    margin: margins,
  });

  // Friendly Report Document
  if (formData.friendlyReport && formData.friendlyReportDocument) {
    const {
      friendlyReportDocument: { name, type, url },
    } = formData;
    const links = await uploadBlobsAndGetUrls(
      [{ name, type, url }],
      claimNumber
    );
    autoTable(doc, {
      startY: (doc.lastAutoTable?.finalY ?? 0) + 5,
      head: [[t("ClaimAuto.ReviewSubmit.friendlyReportDocument")]],
      body: [[links[0].url]],
      theme: "grid",
      headStyles: tableStyles,
      margin: margins,
    });
  }

  // Bodily Injuries Description
  if (formData.bodilyInjuries && formData.bodilyInjuriesDescription) {
    autoTable(doc, {
      startY: (doc.lastAutoTable?.finalY ?? 0) + 5,
      head: [[t("ClaimAuto.ReviewSubmit.injuriesDescription")]],
      body: [[formData.bodilyInjuriesDescription]],
      theme: "grid",
      headStyles: tableStyles,
      margin: margins,
    });
  }

  // Damage Description & Photos
  autoTable(doc, {
    startY: (doc.lastAutoTable?.finalY ?? 0) + 5,
    head: [[t("ClaimAuto.ReviewSubmit.damageDescription")]],
    body: [[formData.damageDescription]],
    theme: "grid",
    headStyles: tableStyles,
    margin: margins,
  });

  if (formData.damagePhotos.length > 0) {
    const links = await uploadBlobsAndGetUrls(
      formData.damagePhotos,
      claimNumber
    );

    
    autoTable(doc, {
      startY: (doc.lastAutoTable?.finalY ?? 0) + 5,
      head: [[t("ClaimAuto.ReviewSubmit.damagePhotos")]],
      body: links.map((photo) => [photo.url]),
      theme: "grid",
      headStyles: tableStyles,
      margin: margins,
    });
  }

  // Other Drivers
  if (formData.drivers.length > 0) {
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text(t('ClaimAuto.ReviewSubmit.otherDrivers'), 14, (doc.lastAutoTable?.finalY ?? 0) + 10);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    autoTable(doc, {
      startY: (doc.lastAutoTable?.finalY ?? 0) + 14,
      head: [
        [
          t("ClaimAuto.InvolvedParties.name"),
          t("ClaimAuto.InvolvedParties.email"),
          t("ClaimAuto.InvolvedParties.phone"),
          t("ClaimAuto.InvolvedParties.vehicle"),
          t("ClaimAuto.InvolvedParties.licensePlate"),
          t("ClaimAuto.InvolvedParties.insuranceCompany"),
          t("ClaimAuto.InvolvedParties.policyNumber"),
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
      headStyles: tableStyles,
      margin: margins,
    });
  }

  // Witnesses
  if (formData.witnesses.length > 0) {
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text(t('ClaimAuto.ReviewSubmit.witnesses'), 14, (doc.lastAutoTable?.finalY ?? 0) + 10);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    autoTable(doc, {
      startY: (doc.lastAutoTable?.finalY ?? 0) + 14,
      head: [
        [
          t("ClaimAuto.InvolvedParties.name"),
          t("ClaimAuto.InvolvedParties.email"),
          t("ClaimAuto.InvolvedParties.phone"),
          t("ClaimAuto.InvolvedParties.statement"),
        ],
      ],
      body: formData.witnesses.map((w) => [
        `${w.firstName} ${w.lastName}`,
        w.email,
        w.phone,
        w.description,
      ]),
      theme: "grid",
      headStyles: tableStyles,
      margin: margins,
    });
  }

  // Documents
  if (formData.documents.length > 0) {
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text(t('ClaimAuto.Documentation.uploadLabel'), 14, (doc.lastAutoTable?.finalY ?? 0) + 10);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    const links = await uploadBlobsAndGetUrls(formData.documents, claimNumber)
    autoTable(doc, {
      startY: (doc.lastAutoTable?.finalY ?? 0) + 14,
      head: [[t("ClaimAuto.Documentation.tableName")]],
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      body: links.map((docu: any) => [docu.url]),
      theme: "grid",
      headStyles: tableStyles,
      margin: margins,
    });
  }

  // Footer
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    // doc.text(
    //   `Page ${i} of ${pageCount} | Auto Claim Reference: ${claimNumber}`,
    //   pageWidth / 2,
    //   290,
    //   { align: "center" }
    // );

    const footerLogoWidth = footerLogoWidthVar;
    const footerLogoHeight = footerLogoHeightVar;
    const footerLogoX = (pageWidth - footerLogoWidth) / 2;
    const footerLogoY = pageHeight - footerLogoHeight - 3;

    doc.addImage(
      logoFooterBase64,
      "PNG",
      footerLogoX,
      footerLogoY,
      footerLogoWidth,
      footerLogoHeight
    );
  }

  // Return both the data URL for browser display and the buffer for email attachment
  return {
    dataUrl: doc.output("dataurlstring"),
    buffer: Buffer.from(doc.output("arraybuffer")),
  };
}

export async function generateClaimGeneralPDF(
  formData: GeneralFormData,
  claimNumber: string,
  t: (key: string) => string
): Promise<{ dataUrl: string; buffer: Buffer }> {
  try {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    const logoWidth = logoWidht;
    const logoHeight = logoHeightVar;
    const logoX = (pageWidth - logoWidth) / 2;
    const logoY = 8;
    // Header
    doc.addImage(logoBase64, "PNG", logoX, logoY, logoWidth, logoHeight);
    doc.text(`${t('ClaimAuto.ReviewSubmit.referenceNumber')} ${claimNumber}`, pageWidth / 2, 50, {
      align: "center",
    });

    // Claimant Info
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text(t('ClaimAuto.PolicyInformationForm.personalInformation'), 14, 70);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    autoTable(doc, {
      startY: 75,
      head: [[
        t('ClaimAuto.ReviewSubmit.fullName'),
        t('ClaimAuto.ReviewSubmit.emailAddress'),
        t('ClaimAuto.ReviewSubmit.phoneNumber'),
        t('ClaimAuto.InvolvedParties.policyNumber'),
      ]],
      body: [
        [
          `${formData.firstName} ${formData.lastName}`,
          formData.email,
          formData.phone,
          formData.policyNumber,
        ],
      ],
      theme: "grid",
      headStyles: tableStyles,
      styles: { fontSize: 10 },
      margin: margins,
    });

    // Accident Info
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text(t('ClaimAuto.ReviewSubmit.accidentDetails'), 14, (doc.lastAutoTable?.finalY ?? 0) + 15);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    autoTable(doc, {
      startY: (doc.lastAutoTable?.finalY ?? 0) + 20,
      head: [[
        t('ClaimAuto.ReviewSubmit.location'),
        t('ClaimAuto.ReviewSubmit.incidentDate'),
        t('ClaimAuto.ReviewSubmit.description'),
      ]],
      body: [
        [
          formData.accidentLocation,
          formData.accidentDate ? format(formData.accidentDate, "PPP") : "N/A",
          formData.accidentDescription,
        ],
      ],
      theme: "grid",
      headStyles: tableStyles,
      styles: { fontSize: 10 },
      margin: margins,
    });

    // Damage Description & Photos
    autoTable(doc, {
      startY: (doc.lastAutoTable?.finalY ?? 0) + 5,
      head: [[t('ClaimAuto.ReviewSubmit.damageDescription')]],
      body: [[formData.damageDescription]],
      theme: "grid",
      headStyles: tableStyles,
      styles: { fontSize: 10 },
      margin: margins,
    });
    if (formData.damagePhotos.length > 0) {
      const links = await uploadBlobsAndGetUrls(
        formData.damagePhotos,
        claimNumber
      );
      autoTable(doc, {
        startY: (doc.lastAutoTable?.finalY ?? 0) + 5,
        head: [[t('ClaimAuto.ReviewSubmit.damagePhotos')]],
        body: links.map((photo) => [photo.url]),
        theme: "grid",
        headStyles: {
          fillColor: [161, 161, 170],
          textColor: [255, 255, 255],
          fontStyle: "bold",
        },
        styles: { fontSize: 10 },
        margin: margins,
      });
    }

    // Police, Firefighters, Reports, Medical
    autoTable(doc, {
      startY: (doc.lastAutoTable?.finalY ?? 0) + 5,
      head: [[
        t('ClaimAuto.ReviewSubmit.policeInvolved'),
        t('ClaimAuto.ReviewSubmit.trafficServiceInvolved'),
        t('GeneralClaimAuto.AdditionalInformation.firefightersInvolvement'),
        t('GeneralClaimAuto.AdditionalInformation.policeReport'),
        t('ClaimAuto.ReviewSubmit.friendlyAccidentReport'),
        t('ClaimAuto.ReviewSubmit.bodilyInjuries'),
      ]],
      body: [
        [
          formData.policeInvolved ? t('ClaimAuto.ReviewSubmit.yes') : t('ClaimAuto.ReviewSubmit.no'),
          formData.trafficServiceInvolved ? t('ClaimAuto.ReviewSubmit.yes') : t('ClaimAuto.ReviewSubmit.no'),
          formData.firefightersInvolved ? t('ClaimAuto.ReviewSubmit.yes') : t('ClaimAuto.ReviewSubmit.no'),
          formData.policeReport ? t('ClaimAuto.ReviewSubmit.yes') : t('ClaimAuto.ReviewSubmit.no'),
          formData.friendlyReport ? t('ClaimAuto.ReviewSubmit.yes') : t('ClaimAuto.ReviewSubmit.no'),
          formData.bodilyInjuries ? t('ClaimAuto.ReviewSubmit.yes') : t('ClaimAuto.ReviewSubmit.no'),
        ],
      ],
      theme: "grid",
      headStyles: tableStyles,
      styles: { fontSize: 10 },
      margin: margins,
    });
    if (formData.policeReport && formData.policeReportDocument) {
      const links = await uploadBlobsAndGetUrls(
        [formData.policeReportDocument],
        claimNumber
      );
      const urls = links.map((link) => link.url);
      autoTable(doc, {
        startY: (doc.lastAutoTable?.finalY ?? 0) + 5,
        head: [[t('GeneralClaimAuto.ReviewSubmit.policeReportDocument')]],
        body: [[urls]],
        theme: "grid",
        headStyles: {
          fillColor: [161, 161, 170],
          textColor: [255, 255, 255],
          fontStyle: "bold",
        },
        styles: { fontSize: 10 },
        margin: margins,
      });
    }
    if (formData.bodilyInjuries && formData.bodilyInjuriesDescription) {
      autoTable(doc, {
        startY: (doc.lastAutoTable?.finalY ?? 0) + 5,
        head: [[t('ClaimAuto.ReviewSubmit.injuriesDescription')]],
        body: [[formData.bodilyInjuriesDescription]],
        theme: "grid",
        headStyles: {
          fillColor: [161, 161, 170],
          textColor: [255, 255, 255],
          fontStyle: "bold",
        },
        styles: { fontSize: 10 },
        margin: margins,
      });
    }
    if (formData.medicalReportDocument) {
      const links = await uploadBlobsAndGetUrls(
        [formData.medicalReportDocument],
        claimNumber
      );
      const urls = links.map((link) => link.url);
      autoTable(doc, {
        startY: (doc.lastAutoTable?.finalY ?? 0) + 5,
        head: [[t('GeneralClaimAuto.ReviewSubmit.medicalReportDocument')]],
        body: [[urls]],
        theme: "grid",
        headStyles: {
          fillColor: [161, 161, 170],
          textColor: [255, 255, 255],
          fontStyle: "bold",
        },
        styles: { fontSize: 10 },
        margin: margins,
      });
    }

    // Involved Parties
    if (formData.involvedParties.length > 0) {
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text(t('GeneralClaimAuto.InvolvedParties.title'), 14, (doc.lastAutoTable?.finalY ?? 0) + 15);
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      autoTable(doc, {
        startY: (doc.lastAutoTable?.finalY ?? 0) + 20,
        head: [[
          t('ClaimAuto.ReviewSubmit.fullName'),
          t('ClaimAuto.ReviewSubmit.emailAddress'),
          t('ClaimAuto.ReviewSubmit.phoneNumber'),
          t('ClaimAuto.ReviewSubmit.description'),
          t('ClaimAuto.InvolvedParties.insuranceCompany'),
          t('ClaimAuto.InvolvedParties.policyNumber'),
        ]],
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
        margin: margins,
      });
    }

    // Testimonies
    if (formData.testimonies.length > 0) {
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text(t('GeneralClaimAuto.InvolvedParties.testimonies'), 14, (doc.lastAutoTable?.finalY ?? 0) + 15);
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      autoTable(doc, {
        startY: (doc.lastAutoTable?.finalY ?? 0) + 20,
        head: [[
          t('ClaimAuto.ReviewSubmit.fullName'),
          t('ClaimAuto.ReviewSubmit.emailAddress'),
          t('ClaimAuto.ReviewSubmit.phoneNumber'),
          t('ClaimAuto.ReviewSubmit.description'),
        ]],
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
        margin: margins,
      });
    }

    // Additional Documents
    if (formData.additionalDocuments.length > 0) {
      const links = await uploadBlobsAndGetUrls(
        formData.additionalDocuments,
        claimNumber
      );
      const urls = links.map((link) => link.url);
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text(t('GeneralClaimAuto.AdditionalDocumentation.documentsLabel'), 14, (doc.lastAutoTable?.finalY ?? 0) + 15);
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      autoTable(doc, {
        startY: (doc.lastAutoTable?.finalY ?? 0) + 20,
        head: [[t('ClaimAuto.Documentation.tableName')]],
        body: [urls],
        theme: "grid",
        headStyles: {
          fillColor: [161, 161, 170],
          textColor: [255, 255, 255],
          fontStyle: "bold",
        },
        styles: { fontSize: 10 },
        margin: margins,
      });
    }

    // Additional Comments
    if (
      formData.additionalComments &&
      formData.additionalComments.trim() !== ""
    ) {
      autoTable(doc, {
        startY: (doc.lastAutoTable?.finalY ?? 0) + 5,
        head: [[t('GeneralClaimAuto.AdditionalDocumentation.commentsLabel')]],
        body: [[formData.additionalComments]],
        theme: "grid",
        headStyles: {
          fillColor: [161, 161, 170],
          textColor: [255, 255, 255],
          fontStyle: "bold",
        },
        styles: { fontSize: 10 },
        margin: margins,
      });
    }

    // Footer
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(113, 113, 122);
      // doc.text(
      //   `Page ${i} of ${pageCount} | General Claim Reference: ${claimNumber}`,
      //   pageWidth / 2,
      //   pageHeight - 10,
      //   { align: "center" }
      // );

      // const footerLogoWidth = 24; // ancho en px
      // const footerLogoHeight = 12; // alto en px
      // const footerLogoX = 14; // margen izquierdo
      // const footerLogoY = pageHeight - 18; // cerca del borde inferior

      const footerLogoWidth = footerLogoWidthVar;
      const footerLogoHeight = footerLogoHeightVar;
      const footerLogoX = (pageWidth - footerLogoWidth) / 2;
      const footerLogoY = pageHeight - footerLogoHeight - 3;

      doc.addImage(
        logoFooterBase64,
        "PNG",
        footerLogoX,
        footerLogoY,
        footerLogoWidth,
        footerLogoHeight
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
