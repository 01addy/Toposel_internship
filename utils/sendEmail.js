import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const sendEmail = async (to, subject, text) => {
  try {
    console.log(` Preparing to send email to: ${to}`);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: `Registration Successful!!`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 10px; border: 1px solid #ddd;">
        <h2 style="color: #4CAF50;">🎉 Registration Successful!</h2>
        <p>Hello,</p>
        <p>You have successfully registered your account. </p>
        <p>Best Regards,</p>
      </div>
    `,
  };

    const info = await transporter.sendMail(mailOptions);
    console.log(` Email sent successfully to ${to}: ${info.response}`);
  } catch (error) {
    console.error(" Error sending email:", error);
  }
};