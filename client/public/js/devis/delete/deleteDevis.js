export async function deleteDevis(devis_id, ra_id) {
  const token = localStorage.getItem('token');
  try {
    const response = await fetch(`http://localhost:3000/api/devis/${devis_id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ra_id }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw Error(`Erreur serveur : ${response.status} - ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    console.log('Devis supprimé avec succès :', data);
    return data;
  } catch (error) {
    console.error('Erreur lors de la suppression du devis : ', error);
    throw error;
  }
}
