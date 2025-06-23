export function formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Mois avec 2 chiffres
  const day = String(date.getDate()).padStart(2, '0'); // Jour avec 2 chiffres
  // const hours = String(date.getHours()).padStart(2, '0'); // Heure avec 2 chiffres
  // const minutes = String(date.getMinutes()).padStart(2, '0'); // Minutes avec 2 chiffres

  return `${day}-${month}-${year}`;
}
