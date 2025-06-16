export async function handleApiError(data) {
  if (data?.error?.name === 'TokenExpiredError') {
    alert('Votre session à expiré, veuillez vous reconnecter');
    localStorage.removeItem('token');
    localStorage.removeItem('utilisateur');
    window.location.href = '../../pages/signIn.html';
  }
}
