function toggleTheme() {
    const body = document.body;
    const themeIcon = document.getElementById('theme-icon');
        
    if (body.classList.contains('theme-light')) {
        body.classList.remove('theme-light');
        body.classList.add('theme-dark');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
        
    } else {
        body.classList.remove('theme-dark');
        body.classList.add('theme-light');
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
}

function showLoginForm() {
    document.getElementById('homepage').classList.add('hidden');
    document.getElementById('login-section').classList.remove('hidden');
    document.getElementById('register-section').classList.add('hidden');
}

function showRegisterForm() {
    document.getElementById('homepage').classList.add('hidden');
    document.getElementById('login-section').classList.add('hidden');
    document.getElementById('register-section').classList.remove('hidden');
}

function goBack() {
    document.getElementById('homepage').classList.remove('hidden');
    document.getElementById('login-section').classList.add('hidden');
    document.getElementById('register-section').classList.add('hidden');
}

