// script.js

// Fonction pour appliquer le thème à partir du stockage local
function applyThemeFromLocalStorage() {
    const savedTheme = localStorage.getItem('theme');
    const body = document.body;

    // Si un thème est enregistré, l'appliquer
    if (savedTheme) {
        body.classList.remove('light-theme', 'dark-theme'); // Retirer les deux classes
        body.classList.add(savedTheme); // Appliquer le thème sauvegardé
    } else {
        // Si aucun thème n'est enregistré, appliquer le thème clair par défaut
        body.classList.add('light-theme');
    }
}

// Charger le thème lors du chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    applyThemeFromLocalStorage();

    // Initialiser le texte du bouton en fonction du thème actuel
    const body = document.body;
    const themeToggleButton = document.getElementById('theme-toggle');
    if (body.classList.contains('dark-theme')) {
        themeToggleButton.textContent = 'Mode clair';
    } else {
        themeToggleButton.textContent = 'Mode sombre';
    }
});

// Basculement entre les modes de thème
const themeToggleButton = document.getElementById('theme-toggle');

themeToggleButton.addEventListener('click', () => {
    const body = document.body;

    // Basculer entre les classes de thème
    if (body.classList.contains('light-theme')) {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
        themeToggleButton.textContent = 'Mode clair'; // Changer le texte du bouton
        localStorage.setItem('theme', 'dark-theme'); // Sauvegarder le thème sombre
    } else {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
        themeToggleButton.textContent = 'Mode sombre'; // Changer le texte du bouton
        localStorage.setItem('theme', 'light-theme'); // Sauvegarder le thème clair
    }
});

// Gérer la navigation entre les pages avec animation
document.querySelectorAll('.transition-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();  // Empêcher la redirection immédiate

        // Ajouter la classe slide-out-right pour la page actuelle
        document.body.classList.add('slide-out-right');

        // Récupérer l'URL du lien
        const targetUrl = link.getAttribute('href');

        // Après que l'animation se soit terminée (1 seconde), rediriger vers la nouvelle page
        setTimeout(() => {
            window.location.href = targetUrl;  // Rediriger vers l'URL récupérée
        }, 1000); // Attendre que l'animation dure 1 seconde
    });
});

// Assurer que la page d'accueil se recharge correctement après redirection
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname === 'index.html') {
        // Forcer un léger rafraîchissement si la page d'accueil est vide
        window.location.reload();
    }
});
