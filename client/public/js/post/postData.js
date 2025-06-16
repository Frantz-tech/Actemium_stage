import { handleApiError } from '../tokenHandler/handleApi.js';

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
  const json = await response.json();
  console.log('Réponse status :', response.status);

  if (!response.ok) {
    throw new Error(json.error || `Erreur serveur : ${response.status}`);
  }
  handleApiError(json);
  console.log('Réponse JSON', json);
  return json;
}

export async function postdatawithfiles(url = '', data = {}, files = {}) {
  const token = localStorage.getItem('token');

  // Création du formdata
  const formData = new FormData();

  // Ajouter les données email / nom

  for (const key in data) {
    formData.append(key, data[key]);
  }

  for (const key in files) {
    formData.append(key, files[key]);
  }

  const reponse = await fetch(url, {
    method: 'POST',
    headers: {
      ...(token && { Authorization: `Bearer${token}` }),
    },
    body: formData,
  });

  if (!reponse.ok) {
    const errorText = await reponse.text();
    throw new Error(`Erreur serveur : ${reponse.status} - ${errorText}`);
  }
  const json = await reponse.json();
  handleApiError(json);
  console.log('Réponse JSON', json);
  return json;
}
