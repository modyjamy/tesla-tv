// api/trial.js
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ status: "error", message: "Method not allowed" });
  }

  const { name, email, deviceType, app } = req.body;

  // إعداد Nodemailer
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, // حساب البريد الإلكتروني الذي ستُرسل منه الرسائل
      pass: process.env.EMAIL_PASS  // كلمة مرور حساب البريد الإلكتروني
    }
  });

  const mailOptions = {
    from: `"Tesla TV" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,  // هذا هو البريد الذي ستستقبل عليه الطلبات
    subject: "🚨 New Trial Request - Tesla TV",
    html: `
      <h2>New Trial Request</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Device Type:</strong> ${deviceType}</p>
      <p><strong>App:</strong> ${app}</p>
      <p>📩 Please respond manually with the trial credentials.</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ status: "sent" }); // ✅ إرسال البريد بنجاح
  } catch (error) {
    console.error("Email error:", error);
    return res.status(500).json({ status: "error", message: error.message }); // ⚠️ في حال حدوث خطأ
  }
}
