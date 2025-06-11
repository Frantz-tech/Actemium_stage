import { fetchCommanditaires } from './get_devis_segm/getCommanditaire.js';

document.querySelector('h1').innerText = 'CLIENTS';

fetchCommanditaires();
