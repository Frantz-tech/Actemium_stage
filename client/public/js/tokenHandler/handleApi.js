export function handleApiError(data) {
  if (data?.error?.name === 'TokenExpiredError') {
    alert('Votre session à expiré, veuillez vous reconnecter');
    localStorage.removeItem('token');
    localStorage.removeItem('utilisateur');
    window.location.href = '../../pages/signIn.html';
  }
}

export function verifierAuthentification() {
  const utilisateur = JSON.parse(localStorage.getItem('utilisateur'));
  const token = localStorage.getItem('token');

  if (!utilisateur || !token) {
    alert('Vous devez être connecté.');
    window.location.href = '../../pages/login.html';
  }
}
