document.addEventListener('DOMContentLoaded', () => {
    // Récupérer le thème sauvegardé dans le localStorage
    const savedTheme = localStorage.getItem('theme');
    const themeToggleButton = document.getElementById('theme-toggle');

    // Appliquer le thème sauvegardé ou par défaut (clair)
    if (savedTheme) {
        document.body.classList.add(savedTheme);
        if (savedTheme === 'dark-theme') {
            themeToggleButton.textContent = 'Mode clair';
        } else {
            themeToggleButton.textContent = 'Mode sombre';
        }
    } else {
        document.body.classList.add('light-theme');
        themeToggleButton.textContent = 'Mode sombre';
    }

    // Gestion du changement de thème au clic
    themeToggleButton.addEventListener('click', () => {
        if (document.body.classList.contains('light-theme')) {
            document.body.classList.remove('light-theme');
            document.body.classList.add('dark-theme');
            themeToggleButton.textContent = 'Mode clair';
            localStorage.setItem('theme', 'dark-theme');
        } else {
            document.body.classList.remove('dark-theme');
            document.body.classList.add('light-theme');
            themeToggleButton.textContent = 'Mode sombre';
            localStorage.setItem('theme', 'light-theme');
        }
    });

    // Sélectionner les éléments pour les formulaires
    const loginLink = document.getElementById('login-link');
    const signupLink = document.getElementById('signup-link');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');

    // Afficher le formulaire de connexion et masquer celui d'inscription au départ
    loginForm.classList.remove('hidden');
    signupForm.classList.add('hidden');

    // Afficher le formulaire de connexion et masquer celui d'inscription lors du clic sur "Se connecter"
    loginLink.addEventListener('click', (e) => {
        e.preventDefault();
        loginForm.classList.remove('hidden');
        signupForm.classList.add('hidden');
    });

    // Afficher le formulaire d'inscription et masquer celui de connexion lors du clic sur "S'inscrire"
    signupLink.addEventListener('click', (e) => {
        e.preventDefault();
        signupForm.classList.remove('hidden');
        loginForm.classList.add('hidden');
    });
});
