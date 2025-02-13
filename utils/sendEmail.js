//The sendEmail.js file is responsible for sending emails to users. 
//It sends a confirmation email upon successful registration using Nodemailer and Gmail's SMTP service. 
//The email credentials are stored in environment variables for security.

import nodemailer from "nodemailer"; // Importing Nodemailer for sending emails
import dotenv from "dotenv"; // Importing dotenv to load environment variables

dotenv.config(); // Loading environment variables from .env file

// Function to send an email
export const sendEmail = async (to, subject, text) => {
  try {
    console.log(` Preparing to send email to: ${to}`);

    // Creating a Nodemailer transporter using Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // Sender's email from environment variables
        pass: process.env.EMAIL_PASS, // Email pass-key from environment variables
      },
    });

    // Defining email content and recipient details
    const mailOptions = {
    from: process.env.EMAIL_USER, // Sender's email
    to, // Recipient's email
    subject: `Registration Successful!!`, // Email subject
    html: `
      <div style="font-family: Arial, sans-serif; padding: 10px; border: 1px solid #ddd;">
        <h2 style="color: #4CAF50;">🎉 Registration Successful!</h2>
        <p>Hello,</p>
        <p>You have successfully registered your account. </p>
        <p>Best Regards,</p>
      </div>
    `,
  };

    const info = await transporter.sendMail(mailOptions); // Send the email
    console.log(` Email sent successfully to ${to}: ${info.response}`);
  } catch (error) {
    console.error(" Error sending email:", error);
  }
};
