export async function deletePost(devis_id, libelle) {
  const token = localStorage.getItem('token');
  try {
    const response = await fetch(
      `http://localhost:3000/api/postes?devis_id=${devis_id}&libelle=${encodeURIComponent(libelle)}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    if (!response.ok) {
      const errorData = await response.json();
      throw Error(`Erreur serveur : ${response.status} - ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    console.log('Poste supprimé avec succès :', data);
    return data;
  } catch (error) {
    console.error('Erreur lors de la suppression du poste : ', error);
    throw error;
  }
}
