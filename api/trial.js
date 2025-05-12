export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ status: "error", message: "Method not allowed" });
  }

  const { name, email } = req.body;

  const nodemailer = require("nodemailer");

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"Tesla TV" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "📺 Tesla TV - 24H Free Trial Access",
    html: `
      <h2>📺 Your Free Trial is Ready!</h2>
      <p>Hi <strong>${name}</strong>,</p>
      <p>Here is your 24H IPTV trial:</p>
      <pre><code>
http://m3u-domain.com/get.php?username=testuser&password=testpass&type=m3u_plus&output=ts
      </code></pre>
      <p>Enjoy streaming! 🎬</p>
    `,
  };

  return transporter.sendMail(mailOptions)
  .then(() => {
    return res.status(200).json({
      status: "sent",
      data: {
        message: "Email sent successfully"
      }
    });
  })
  .catch(error => {
    console.error("Email error:", error);
    return res.status(500).json({
      status: "error",
      message: error.message
    });
  });
