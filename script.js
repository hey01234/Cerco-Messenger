function toggleTheme() {
    const body = document.body;
    const themeIcon = document.getElementById('theme-icon');
        
    if (body.classList.contains('theme-light')) {
        body.classList.remove('theme-light');
        body.classList.add('theme-dark');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
        
    } else {
        body.classList.remove('theme-dark');
        body.classList.add('theme-light');
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
}

function showLoginForm() {
    document.getElementById('homepage').classList.add('hidden');
    document.getElementById('login-section').classList.remove('hidden');
    document.getElementById('register-section').classList.add('hidden');
}

function showRegisterForm() {
    document.getElementById('homepage').classList.add('hidden');
    document.getElementById('login-section').classList.add('hidden');
    document.getElementById('register-section').classList.remove('hidden');
}

function goBack() {
    document.getElementById('homepage').classList.remove('hidden');
    document.getElementById('login-section').classList.add('hidden');
    document.getElementById('register-section').classList.add('hidden');
}


  // Gérer l'inscription
  document.querySelector("#register-section .primary-button").addEventListener("click", async () => {
    const idUtilisateur = document.getElementById("register-username").value;
    const motDePasse = document.getElementById("register-password").value;
    const confirmationMotDePasse = document.getElementById("confirm-password").value;

    try {
      const response = await fetch("http://localhost:3000/inscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idUtilisateur, motDePasse, confirmationMotDePasse }),
      });

      const data = await response.json();
      alert(data.message);
    } catch (error) {
      alert("Erreur lors de l'inscription : " + error.message);
    }
  });

  // Gérer la connexion
  document.querySelector("#login-section .primary-button").addEventListener("click", async () => {
    const idUtilisateur = document.getElementById("login-username").value;
    const motDePasse = document.getElementById("login-password").value;

    try {
      const response = await fetch("http://localhost:3000/connexion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idUtilisateur, motDePasse }),
      });

      const data = await response.json();
      alert(data.message);
    } catch (error) {
      alert("Erreur lors de la connexion : " + error.message);
    }
  });

