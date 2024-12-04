// script.js

// Récupérer le bouton de basculement du thème
const themeToggleButton = document.getElementById('theme-toggle');

// Ajouter un événement au clic sur le bouton
themeToggleButton.addEventListener('click', () => {
    const body = document.body;

    // Basculer entre les classes de thème
    if (body.classList.contains('light-theme')) {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
        themeToggleButton.textContent = 'Mode clair'; // Changer le texte du bouton
    } else {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
        themeToggleButton.textContent = 'Mode sombre'; // Changer le texte du bouton
    }
});

// Initialiser le texte du bouton en fonction du thème actuel
document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;

    if (body.classList.contains('dark-theme')) {
        themeToggleButton.textContent = 'Mode clair';
    } else {
        themeToggleButton.textContent = 'Mode sombre';
    }
});
