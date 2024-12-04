// script.js
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
