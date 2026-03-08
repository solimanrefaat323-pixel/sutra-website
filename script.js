// 1. تغيير الثيم (داكن / فاتح)
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
  if (localStorage.getItem('theme') === 'light') {
    document.body.classList.remove('dark-mode');
    document.body.classList.add('light-mode');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }

  themeToggle.addEventListener('click', () => {
    if (document.body.classList.contains('dark-mode')) {
      document.body.classList.remove('dark-mode');
      document.body.classList.add('light-mode');
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
      localStorage.setItem('theme', 'light');
    } else {
      document.body.classList.remove('light-mode');
      document.body.classList.add('dark-mode');
      themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
      localStorage.setItem('theme', 'dark');
    }
  });
}

// 2. صفحة login
if (document.getElementById('login-form')) {
  document.getElementById('login-form').addEventListener('submit', e => {
    e.preventDefault();
    localStorage.setItem('isLoggedIn', 'true');
    window.location.href = 'profile.html';
  });

  // لو مسجل دخول → روح للصفحة الرئيسية
  if (localStorage.getItem('isLoggedIn') === 'true') {
    window.location.href = 'profile.html';
  }
}

// 3. صفحة signup
if (document.getElementById('signup-form')) {
  document.getElementById('signup-form').addEventListener('submit', e => {
    e.preventDefault();
    const pass = document.getElementById('signup-password').value;
    const confirm = document.getElementById('signup-confirm').value;

    if (pass !== confirm) {
      alert('كلمتا المرور غير متطابقتين!');
      return;
    }

    alert('تم إنشاء الحساب بنجاح! سجل الدخول الآن.');
    window.location.href = 'login.html';
  });
}

// 4. صفحة profile
if (document.getElementById('size-form')) {
  document.getElementById('size-form').addEventListener('submit', e => {
    e.preventDefault();

    const height = parseFloat(document.getElementById('height').value) / 100;
    const weight = parseFloat(document.getElementById('weight').value);

    const bmi = weight / (height * height);
    let size = 'M';

    if (bmi < 18.5) size = 'S';
    else if (bmi < 25) size = 'M';
    else if (bmi < 30) size = 'L';
    else size = 'XL أو أكبر';

    document.getElementById('result').innerHTML = `المقاس المقترح: <strong>${size}</strong><br>BMI ≈ ${bmi.toFixed(1)}`;
    document.getElementById('result').classList.remove('hidden');
  });

  document.getElementById('logout-btn').addEventListener('click', () => {
    localStorage.removeItem('isLoggedIn');
    window.location.href = 'login.html';
  });
}

// 5. حماية profile
if (window.location.pathname.includes('profile.html')) {
  if (localStorage.getItem('isLoggedIn') !== 'true') {
    window.location.href = 'login.html';
  }
}