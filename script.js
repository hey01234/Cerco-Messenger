document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    const themeToggleButton = document.getElementById('theme-toggle');
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

    // Afficher le formulaire de connexion par défaut, masquer celui d'inscription
    loginForm.classList.remove('hidden');
    signupForm.classList.add('hidden');

    // Ajouter l'événement pour changer de formulaire lorsqu'on clique sur "Se connecter"
    loginLink.addEventListener('click', (e) => {
        e.preventDefault();
        loginForm.classList.remove('hidden');
        signupForm.classList.add('hidden');
    });

    // Ajouter l'événement pour changer de formulaire lorsqu'on clique sur "S'inscrire"
    signupLink.addEventListener('click', (e) => {
        e.preventDefault();
        signupForm.classList.remove('hidden');
        loginForm.classList.add('hidden');
    });
});
