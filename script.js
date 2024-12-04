// script.js

// Gestion du thème clair/sombre avec un bouton
const themeButton = document.getElementById('theme-btn');
themeButton.addEventListener('click', function () {
    const body = document.body;

    if (body.classList.contains('light-theme')) {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
        this.textContent = 'Mode clair'; // Met à jour le texte du bouton
    } else {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
        this.textContent = 'Mode sombre'; // Met à jour le texte du bouton
    }
});

// Gestion des formulaires
document.getElementById('login-btn').addEventListener('click', function () {
    document.getElementById('signup-form').classList.add('hidden');
    document.getElementById('login-form').classList.remove('hidden');
});

document.getElementById('signup-btn').addEventListener('click', function () {
    document.getElementById('login-form').classList.add('hidden');
    document.getElementById('signup-form').classList.remove('hidden');
});
