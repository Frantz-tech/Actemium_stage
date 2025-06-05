import { fetchFap } from './fap/fetchFap.js';

document.querySelector('h1').innerText = 'FAP ACTEMIUM';

const btnMail = document.createElement('button');
btnMail.classList.add('btnMail');
btnMail.textContent = `Envoyer par mail`;

const btnExporterPDF = document.createElement('button');
btnExporterPDF.classList.add('btnExporter');
btnExporterPDF.textContent = `Exporter PDF`;

const buttons = document.createElement('div');
buttons.classList.add('buttons');
buttons.append(btnMail, btnExporterPDF);

const main = document.querySelector('main');

main.appendChild(buttons);

fetchFap();
