export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ status: "error", message: "Method not allowed" });
  }

  const { name, email, deviceType, app, mac, deviceKey, activationCode } = req.body;

  const nodemailer = require("nodemailer");

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: `"Tesla TV" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
    subject: "🚨 New Trial Request - Tesla TV",
    html: `
      <h2>New Trial Request</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Device Type:</strong> ${deviceType}</p>
      <p><strong>Selected App:</strong> ${app}</p>
      <p><strong>MAC Address:</strong> ${mac || 'N/A'}</p>
      <p><strong>Device Key:</strong> ${deviceKey || 'N/A'}</p>
      <p><strong>Activation Code:</strong> ${activationCode || 'N/A'}</p>
      <p>📩 Please respond manually with the trial credentials.</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ status: "sent" });
  } catch (error) {
    console.error("Email error:", error);
    return res.status(500).json({ status: "error", message: error.message });
  }
}
