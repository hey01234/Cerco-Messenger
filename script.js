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

// Fonction de validation du formulaire de connexion
function validateLoginForm() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    if (!username || !password) {
        alert('Veuillez remplir tous les champs');
        return false;
    }
    return true;
}

// Fonction de validation du formulaire d'inscription
function validateRegisterForm() {
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (!username || !password || !confirmPassword) {
        alert('Veuillez remplir tous les champs');
        return false;
    }

    if (password !== confirmPassword) {
        alert('Les mots de passe ne correspondent pas');
        return false;
    }

    return true;
}

// Ajouter un gestionnaire d'événements pour la soumission des formulaires
document.querySelector('#login-section .form button').addEventListener('click', (event) => {
    event.preventDefault(); // Empêche l'envoi du formulaire avant validation
    if (validateLoginForm()) {
        // Soumettre le formulaire ou effectuer d'autres actions
        console.log('Formulaire de connexion validé');
    }
});

document.querySelector('#register-section .form button').addEventListener('click', (event) => {
    event.preventDefault(); // Empêche l'envoi du formulaire avant validation
    if (validateRegisterForm()) {
        // Soumettre le formulaire ou effectuer d'autres actions
        console.log('Formulaire d\'inscription validé');
    }
});

// Écouteur d'événements pour s'assurer que tout est chargé avant exécution
document.addEventListener('DOMContentLoaded', () => {
    const themeButton = document.getElementById('toggle-theme');
    themeButton.addEventListener('click', toggleTheme); // Attache la fonction de changement de thème
});
