const nodemailer = require("nodemailer")
require("dotenv").config()

const sendemail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  })
  const msgOpt = {
    from: "Darsy.lms.com",
    to: options.email,
    sender: process.env.EMAIL_USER,
    subject: options.message,
    html: `<div style="background-color: #f1f1f1; padding: 10px 20px; border-radius: 15px; height: fit-content">
    <h1 style="color: #007BFF; font-size: 25px; margin-bottom: 20px;">Welcome to Darsy LMS</h1>
    <h3 style="color: #333; margin-bottom: 15px;">Hello ${options.name},</h3>
    <p style="color: #555; font-size: 18px;">
        ${options.text}
    </p>
    <p style="color: #555;font-size: 18px; margin-top: 20px;">
        Thank you for using our Learning Management System. If you have any questions or need assistance, feel free to contact our support team.
    </p>
</div>
`,
    // text:options.text
  }
  await transporter.sendMail(msgOpt)
}
module.exports = sendemail
