export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ status: 'error', message: 'Method not allowed' });
  }

  const { name, email } = req.body;

  return res.status(200).json({
    status: "sent",
    data: {
      name,
      email,
      message: "Trial created successfully",
      url: "http://m3u-domain.com/get.php?username=testuser&password=testpass&type=m3u_plus&output=ts"
    }
  });
}
