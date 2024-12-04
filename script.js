// script.js
document.getElementById('theme-switch').addEventListener('change', function () {
    const body = document.body;
    const themeText = document.getElementById('theme-text');

    if (this.checked) {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
        themeText.textContent = 'Mode clair';
    } else {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
        themeText.textContent = 'Mode sombre';
    }
});

document.getElementById('login-btn').addEventListener('click', function () {
    document.getElementById('signup-form').classList.add('hidden');
    document.getElementById('login-form').classList.remove('hidden');
});

document.getElementById('signup-btn').addEventListener('click', function () {
    document.getElementById('login-form').classList.add('hidden');
    document.getElementById('signup-form').classList.remove('hidden');
});
