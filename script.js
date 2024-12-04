function toggleMode() {
    const body = document.body;
    const button = document.getElementById('modeButton');
    const icon = document.getElementById('modeIcon');
    if (body.classList.contains('bg-gray-100')) {
        body.classList.remove('bg-gray-100', 'text-gray-800');
        body.classList.add('bg-gray-800', 'text-gray-100');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        button.title = 'Mode clair';
    } else {
        body.classList.remove('bg-gray-800', 'text-gray-100');
        body.classList.add('bg-gray-100', 'text-gray-800');
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        button.title = 'Mode sombre';
    }
}

function showLoginForm() {
    document.getElementById('homePage').classList.add('hidden');
    document.getElementById('loginForm').classList.remove('hidden');
    document.getElementById('registerForm').classList.add('hidden');
}

function showRegisterForm() {
    document.getElementById('homePage').classList.add('hidden');
    document.getElementById('loginForm').classList.add('hidden');
    document.getElementById('registerForm').classList.remove('hidden');
}

function goBack() {
    document.getElementById('homePage').classList.remove('hidden');
    document.getElementById('loginForm').classList.add('hidden');
    document.getElementById('registerForm').classList.add('hidden');
}
