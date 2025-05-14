document.getElementById('trialForm').addEventListener('submit', async function(e) {
  e.preventDefault();

  const form = e.target;
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const deviceType = form.deviceType.value;
  const app = form.app.value;

  // تحقق من تعبئة الحقول
  if (!name || !email || !deviceType || !app) {
    alert('Please fill all required fields.');
    return;
  }

  // جهز البيانات للإرسال
  const data = { name, email, deviceType, app };

  try {
  const response = await fetch('/api/trial', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  const text = await response.text(); // أولاً نقرأ الرد كنص
  try {
    const result = JSON.parse(text); // نجرب نحوله لـ JSON
    if (result.status === 'sent') {
      document.getElementById('success-message').style.display = 'block';
      form.reset();
    } else {
      alert(result.message || 'Something went wrong');
    }
  } catch {
    // لو مش JSON اعرض النص كما هو
    alert('Server response error: ' + text);
  }
} catch (error) {
  alert('Network error: ' + error.message);
}
});
