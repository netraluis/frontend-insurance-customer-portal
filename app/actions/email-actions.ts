"use server"

//import nodemailer from "nodemailer"
import type { FormData } from "../components/claim-form-context"
// import { format } from "date-fns"
import { LoopsClient } from "loops";

const loops = new LoopsClient(process.env.LOOPS_API_KEY!);

// Create a transporter using SMTP
// For production, you would use your actual email service credentials
/*const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || "smtp.example.com",
  port: Number.parseInt(process.env.EMAIL_PORT || "587"),
  secure: process.env.EMAIL_SECURE === "true",
  auth: {
    user: process.env.EMAIL_USER || "user@example.com",
    pass: process.env.EMAIL_PASSWORD || "password",
  },
})*/

export async function sendConfirmationEmail(formData: FormData, claimNumber: string, pdfBuffer: Buffer) {
  console.log("Sending confirmation email...", pdfBuffer)
  try {

     await loops.sendTransactionalEmail({
      transactionalId: process.env.TRANSACTION_ID_RESUME_EMAIL!,
      email: formData.email,
      dataVariables: {
        loginUrl: "https://myapp.com/login/",
      },
      // attachments: [
      //   {
      //     filename: "presentation.pdf",
      //     contentType: "application/pdf",
      //     data: pdfBuffer.toString('base64'),
      //   },
      // ],
    });
    
    // // Please contact us to enable attachments on your account.
    // const resp = await loops.sendTransactionalEmail({
    //   transactionalId: "clfq6dinn000yl70fgwwyp82l",
    //   email: "hello@gmail.com",
    //   dataVariables: {
    //     loginUrl: "https://myapp.com/login/",
    //   },
    //   attachments: [
    //     {
    //       filename: "presentation.pdf",
    //       contentType: "application/pdf",
    //       data: "JVBERi0xLjMKJcTl8uXrp/Og0MTGCjQgMCBvYmoKPD...",
    //     },
    //   ],
    // });
    // // Format the incident date
    // const formattedDate = formData.incidentDate ? format(new Date(formData.incidentDate), "PPP") : "Not specified"

    // Create HTML content for the email
    // Send the email
    /*const info = await transporter.sendMail({
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
    })*/

    return { success: true, messageId: "info.messageId" }
  } catch (error) {
    console.error("Error sending confirmation email:", error)
    return { success: false, error: (error as Error).message }
  }
}
