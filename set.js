// script.js

// Gestion du thème clair/sombre
const themeSwitch = document.getElementById('theme-switch');
const themeIcon = document.getElementById('theme-icon');
const themeName = document.getElementById('theme-name');

themeSwitch.addEventListener('change', () => {
  const isDark = document.body.classList.toggle('dark-theme');
  themeName.textContent = isDark ? 'sombre' : 'clair';
  themeIcon.textContent = isDark ? '🌙' : '☀️';
});

// Sauvegarde des modifications
const saveButton = document.getElementById('save-button');
saveButton.addEventListener('click', () => {
  alert('Vos modifications ont été sauvegardées avec succès !');
});

// Détection des changements de langue
const languageSelect = document.getElementById('language-select');
languageSelect.addEventListener('change', (event) => {
  const selectedLanguage = event.target.value;
  alert(`Langue sélectionnée : ${selectedLanguage}`);
});

// Ajout d'une animation au bouton retour
const backButton = document.getElementById('back-button');
backButton.addEventListener('click', () => {
  backButton.classList.add('button-clicked');
  setTimeout(() => backButton.classList.remove('button-clicked'), 300);
  // Go to Profile Page
  window.location.href = 'msg.html';
});

// CSS dynamique pour les animations
const style = document.createElement('style');
style.innerHTML = `
  .button-clicked {
    transform: scale(0.9);
    transition: transform 0.2s ease;
  }

  body.dark-theme {
    background-color: #1c1c1e;
    color: #f5f5f7;
  }

  body.dark-theme .profile-section,
  body.dark-theme .settings-section {
    background-color: #2c2c2e;
  }

  body.dark-theme .btn {
    background: linear-gradient(90deg, #ff7eb3, #ff758c);
  }
`;
document.head.appendChild(style);

// Ajout d'une logique pour la gestion des notifications
const notificationsSwitch = document.getElementById('notifications-switch');
notificationsSwitch.addEventListener('change', () => {
  const isEnabled = notificationsSwitch.checked;
  alert(`Notifications ${isEnabled ? 'activées' : 'désactivées'}`);
});

// Gestion du switch "Sons"
const soundSwitch = document.getElementById('sound-switch');
soundSwitch.addEventListener('change', () => {
  const isSoundEnabled = soundSwitch.checked;
  alert(`Sons ${isSoundEnabled ? 'activés' : 'désactivés'}`);
});

// Gestion du bouton Déconnexion
const logoutButton = document.getElementById('logout-button');
logoutButton.addEventListener('click', () => {
  if (confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
    // Redirection vers la page de connexion
    window.location.href = 'index.html';
  }
});
