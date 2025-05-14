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

    const result = await response.json();

    if (result.status === 'sent') {
      // اظهار رسالة نجاح
      document.getElementById('success-message').style.display = 'block';
      form.reset();
    } else {
      alert(result.message || 'Something went wrong');
    }
  } catch (error) {
    alert('Error: ' + error.message);
  }
});
