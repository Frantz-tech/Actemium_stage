export async function deleteClient(cmdt_id) {
  const token = localStorage.getItem('token');
  try {
    const response = await fetch(`http://localhost:3000/api/commanditaires/${cmdt_id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw Error(`Erreur serveur : ${response.status} - ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    console.log('Client supprimé avec succès :', data);
    return data;
  } catch (error) {
    console.error('Erreur lors de la suppression du client : ', error);
    throw error;
  }
}
