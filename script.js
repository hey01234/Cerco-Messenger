// script.js

// Gestion du thème sombre/claire
const themeToggleButton = document.getElementById('theme-toggle');
themeToggleButton.addEventListener('click', () => {
    const body = document.body;
    if (body.classList.contains('light-theme')) {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
        themeToggleButton.textContent = 'Mode clair';
        localStorage.setItem('theme', 'dark-theme');
    } else {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
        themeToggleButton.textContent = 'Mode sombre';
        localStorage.setItem('theme', 'light-theme');
    }
});

// Appliquer le thème enregistré au chargement
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.classList.add(savedTheme);
    }
});

// Sélectionner les formulaires et les liens
const loginLink = document.getElementById('login-link');
const signupLink = document.getElementById('signup-link');
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');

// Afficher le formulaire de connexion par défaut
loginForm.classList.remove('hidden');
signupForm.classList.add('hidden');

// Afficher le formulaire de connexion
loginLink.addEventListener('click', (e) => {
    e.preventDefault();
    loginForm.classList.remove('hidden');
    signupForm.classList.add('hidden');
});

// Afficher le formulaire d'inscription
signupLink.addEventListener('click', (e) => {
    e.preventDefault();
    signupForm.classList.remove('hidden');
    loginForm.classList.add('hidden');
});
