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
        // Mettre à jour le texte du bouton en fonction du thème
        if (savedTheme === 'dark-theme') {
            themeToggleButton.textContent = 'Mode clair';
        } else {
            themeToggleButton.textContent = 'Mode sombre';
        }
    } else {
        // Si aucun thème n'est sauvegardé, appliquer le thème par défaut (clair)
        document.body.classList.add('light-theme');
        themeToggleButton.textContent = 'Mode sombre';
    }

    // Sélectionner les formulaires et les liens
    const loginLink = document.getElementById('login-link');
    const signupLink = document.getElementById('signup-link');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');

    // Afficher le formulaire de connexion par défaut
    loginForm.classList.add('active');
    signupForm.classList.add('active');

    // Ajouter l'événement pour changer de formulaire lorsqu'on clique sur "Se connecter"
    loginLink.addEventListener('click', (e) => {
        e.preventDefault();
        loginForm.classList.add('active');
        signupForm.classList.remove('active');
    });

    // Ajouter l'événement pour changer de formulaire lorsqu'on clique sur "S'inscrire"
    signupLink.addEventListener('click', (e) => {
        e.preventDefault();
        signupForm.classList.add('active');
        loginForm.classList.remove('active');
    });
});
