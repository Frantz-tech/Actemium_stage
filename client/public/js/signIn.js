document.querySelector('h1').innerText = 'ACTEMIUM';
document.querySelector('.btnSignIn').innerHTML = 'Se Connecter';

const footerSignIn = document.querySelector('.footerSignIn');

const footerParag = document.createElement('p');
footerParag.appendChild(document.createTextNode('Pas encore de compte ? '));

const signUpLink = document.createElement('a');
signUpLink.classList.add('signUpLink');
signUpLink.textContent = 'Inscrivez-vous !';
signUpLink.href = '../pages/signUp.html';
footerParag.appendChild(signUpLink);
footerSignIn.appendChild(footerParag);
