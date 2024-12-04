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

// Interaction pour les boutons "Se connecter" et "S'inscrire"
const loginBtn = document.getElementById('login-btn');
const signupBtn = document.getElementById('signup-btn');
const loginSection = document.getElementById('login-section');
const signupSection = document.getElementById('signup-section');
const welcomeSection = document.getElementById('welcome-section');
const backBtnLogin = document.getElementById('back-btn-login');
const backBtnSignup = document.getElementById('back-btn-signup');

// Afficher le formulaire de login
loginBtn.addEventListener('click', () => {
    welcomeSection.classList.add('hidden');
    loginSection.classList.remove('hidden');
    loginSection.classList.add('active');
});

// Afficher le formulaire d'inscription
signupBtn.addEventListener('click', () => {
    welcomeSection.classList.add('hidden');
    signupSection.classList.remove('hidden');
    signupSection.classList.add('active');
});

// Retour à la page d'accueil
backBtnLogin.addEventListener('click', () => {
    loginSection.classList.remove('active');
    loginSection.classList.add('hidden');
    welcomeSection.classList.remove('hidden');
});

backBtnSignup.addEventListener('click', () => {
    signupSection.classList.remove('active');
    signupSection.classList.add('hidden');
    welcomeSection.classList.remove('hidden');
});
