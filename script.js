// Fonction pour basculer entre les thèmes clair et sombre
function toggleTheme() {
    const body = document.body;
    const themeIcon = document.getElementById('theme-icon');
    const logo = document.querySelector('.logo'); // Sélection du logo

    if (body.classList.contains('theme-light')) {
        // Passage au mode sombre
        body.classList.remove('theme-light');
        body.classList.add('theme-dark');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
        logo.src = "logo-dark.png"; // Chemin vers le logo pour le mode sombre
    } else {
        // Passage au mode clair
        body.classList.remove('theme-dark');
        body.classList.add('theme-light');
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
        logo.src = "logo.png"; // Chemin vers le logo pour le mode clair
    }
}

// Fonction pour afficher le formulaire de connexion
function showLoginForm() {
    document.getElementById('homepage').classList.add('hidden'); // Cache la page d'accueil
    document.getElementById('login-section').classList.remove('hidden'); // Affiche la section connexion
    document.getElementById('register-section').classList.add('hidden'); // Cache la section inscription
}

// Fonction pour afficher le formulaire d'inscription
function showRegisterForm() {
    document.getElementById('homepage').classList.add('hidden'); // Cache la page d'accueil
    document.getElementById('login-section').classList.add('hidden'); // Cache la section connexion
    document.getElementById('register-section').classList.remove('hidden'); // Affiche la section inscription
}

// Fonction pour revenir à la page d'accueil
function goBack() {
    document.getElementById('homepage').classList.remove('hidden'); // Affiche la page d'accueil
    document.getElementById('login-section').classList.add('hidden'); // Cache la section connexion
    document.getElementById('register-section').classList.add('hidden'); // Cache la section inscription
}

// Écouteur d'événements pour s'assurer que tout est chargé avant exécution
document.addEventListener('DOMContentLoaded', () => {
    const themeButton = document.getElementById('toggle-theme');
    themeButton.addEventListener('click', toggleTheme); // Attache la fonction de changement de thème
});
