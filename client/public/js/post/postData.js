export async function postData(url = '', data = {}) {
  const token = localStorage.getItem('token');

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify(data),
  });
  console.log('Réponse status :', response.status);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Erreur serveur : ${response.status} - ${errorText}`);
  }
  const json = await response.json();
  console.log('Réponse JSON', json);
  return json;
}
