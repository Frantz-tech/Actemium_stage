document.querySelector('h1').innerText = 'ACTEMIUM';

const loginForm = document.querySelector('.loginForm');
const btnSignIn = document.querySelector('.btnSignIn');

btnSignIn.innerText = 'Se Connecter';

// Écoute la soumission du formulaire
loginForm.addEventListener('submit', async e => {
  e.preventDefault();

  const email = document.getElementById('emailLogin').value.trim();
  const password = document.getElementById('passwordLogin').value.trim();

  if (!email || !password) {
    alert('Veuillez remplir tous les champs');
    return;
  }

  try {
    const response = await fetch('http://localhost:3000/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem('token', data.token);
      alert('Connexion réussie !');

      console.log(data);
      // Redirection vers la page d'accueil admin (à adapter)
      if (data.ROLE === 'admin') {
        window.location.href = '../pages/adminDashboard.html';
      } else {
        window.location.href = '../pages/accueil.html';
      }
    } else {
      alert('Erreur : ' + data.message);
    }
  } catch (error) {
    alert('Erreur réseau ou serveur');
    console.error(error);
  }
});
