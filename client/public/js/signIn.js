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
    const response = await fetch('http://localhost:3000/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem('token', data.data.token);
      alert('Connexion réussie !');

      console.log(data);
      // Redirection vers la page d'accueil admin (à adapter)
      if (data.data.user && data.data.user.ROLE) {
        const role = data.data.user.ROLE.trim().toLowerCase();
        console.log('Role détecté:', role);
        if (role === 'administrateur') {
          window.location.href = '../pages/adminDashboard.html';
          alert('redirection vers la page admin');
        } else {
          window.location.href = '../pages/accueil.html';
          alert("redirection vers la page d'accueil");
        }
      } else {
        console.log('Aucun rôle détecté dans data.data.user');
      }
    } else {
      alert('Erreur : ' + data.message);
    }
  } catch (error) {
    alert('Erreur réseau ou serveur');
    console.error(error);
  }
});
