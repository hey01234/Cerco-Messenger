document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    const themeToggleButton = document.getElementById('theme-toggle');

    if (savedTheme) {
        document.body.classList.add(savedTheme);
        themeToggleButton.textContent = savedTheme === 'dark-theme' ? 'Mode clair' : 'Mode sombre';
    } else {
        document.body.classList.add('light-theme');
        themeToggleButton.textContent = 'Mode sombre';
    }

    // Vérification si les éléments existent avant de manipuler leur classList
    const loginLink = document.getElementById('login-link');
    const signupLink = document.getElementById('signup-link');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');

    if (loginLink && signupLink && loginForm && signupForm) {
        signupForm.classList.add('hidden');

        loginLink.addEventListener('click', (e) => {
            e.preventDefault();
            loginForm.classList.remove('hidden');
            signupForm.classList.add('hidden');
        });

        signupLink.addEventListener('click', (e) => {
            e.preventDefault();
            signupForm.classList.remove('hidden');
            loginForm.classList.add('hidden');
        });
    } else {
        console.error("Un ou plusieurs éléments n'ont pas pu être trouvés.");
    }
});
