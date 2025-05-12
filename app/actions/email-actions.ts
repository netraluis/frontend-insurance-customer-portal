"use server"

import nodemailer from "nodemailer"
import type { FormData } from "@/components/claim-form-context"
import { format } from "date-fns"

// Create a transporter using SMTP
// For production, you would use your actual email service credentials
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || "smtp.example.com",
  port: Number.parseInt(process.env.EMAIL_PORT || "587"),
  secure: process.env.EMAIL_SECURE === "true",
  auth: {
    user: process.env.EMAIL_USER || "user@example.com",
    pass: process.env.EMAIL_PASSWORD || "password",
  },
})

export async function sendConfirmationEmail(formData: FormData, claimNumber: string, pdfBuffer: Buffer) {
  try {
    // Format the incident date
    const formattedDate = formData.incidentDate ? format(new Date(formData.incidentDate), "PPP") : "Not specified"

    // Create HTML content for the email
    const htmlContent = `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #f5f5f5; padding: 20px; text-align: center; }
            .content { padding: 20px; }
            .footer { background-color: #f5f5f5; padding: 20px; text-align: center; font-size: 12px; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
            th, td { padding: 10px; text-align: left; border-bottom: 1px solid #ddd; }
            th { background-color: #f9f9f9; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Auto Claim Confirmation</h1>
              <p>Reference Number: ${claimNumber}</p>
            </div>
            <div class="content">
              <p>Dear ${formData.firstName} ${formData.lastName},</p>
              <p>Thank you for submitting your auto claim. This email confirms that we have received your claim details and it is now being processed.</p>
              
              <h2>Claim Summary</h2>
              <table>
                <tr>
                  <th colspan="2">Policy Information</th>
                </tr>
                <tr>
                  <td>Name:</td>
                  <td>${formData.firstName} ${formData.lastName}</td>
                </tr>
                <tr>
                  <td>Email:</td>
                  <td>${formData.email}</td>
                </tr>
                <tr>
                  <td>Phone:</td>
                  <td>${formData.phone}</td>
                </tr>
                
                <tr>
                  <th colspan="2">Vehicle Information</th>
                </tr>
                <tr>
                  <td>Vehicle:</td>
                  <td>${formData.vehicleMake} ${formData.vehicleModel}</td>
                </tr>
                <tr>
                  <td>License Plate:</td>
                  <td>${formData.licensePlate}</td>
                </tr>
                <tr>
                  <td>Coverage Type:</td>
                  <td>${formData.coverageType}</td>
                </tr>
                <tr>
                  <td>Incident Date:</td>
                  <td>${formattedDate}</td>
                </tr>
                
                <tr>
                  <th colspan="2">Accident Details</th>
                </tr>
                <tr>
                  <td>Location:</td>
                  <td>${formData.accidentLocation}</td>
                </tr>
                <tr>
                  <td>Police Involved:</td>
                  <td>${formData.policeInvolved ? "Yes" : "No"}</td>
                </tr>
                <tr>
                  <td>Bodily Injuries:</td>
                  <td>${formData.bodilyInjuries ? "Yes" : "No"}</td>
                </tr>
              </table>
              
              <p>A complete PDF summary of your claim is attached to this email for your records.</p>
              
              <p>What happens next?</p>
              <ol>
                <li>Our claims team will review your submission within 1-2 business days.</li>
                <li>A claims adjuster will be assigned to your case and will contact you.</li>
                <li>You may be asked to provide additional information or documentation.</li>
              </ol>
              
              <p>If you have any questions or need to provide additional information, please contact our claims department at claims@example.com or call (555) 123-4567. Please reference your claim number ${claimNumber} in all communications.</p>
              
              <p>Thank you for your patience during this process.</p>
              
              <p>Sincerely,<br>The Claims Team</p>
            </div>
            <div class="footer">
              <p>This is an automated message. Please do not reply to this email.</p>
              <p>© 2025 Auto Insurance Company. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `

    // Send the email
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM || '"Auto Claims" <claims@example.com>',
      to: formData.email,
      subject: `Auto Claim Confirmation - Reference #${claimNumber}`,
      html: htmlContent,
      attachments: [
        {
          filename: `Claim_Summary_${claimNumber}.pdf`,
          content: pdfBuffer,
          contentType: "application/pdf",
        },
      ],
    })

    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error("Error sending confirmation email:", error)
    return { success: false, error: (error as Error).message }
  }
}
