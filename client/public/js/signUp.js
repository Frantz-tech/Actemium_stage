document.querySelector('h1').innerText = 'ACTEMIUM';
document.querySelector('.btnSignUp').innerHTML = 'S inscrire ';

const footerSignUp = document.querySelector('.footerSignUp');

const footerParag = document.createElement('p');
footerParag.appendChild(document.createTextNode('Déjà un compte ? '));

const signUpLink = document.createElement('a');
signUpLink.classList.add('signUpLink');
signUpLink.textContent = 'Connectez-vous !';
signUpLink.href = '../pages/signIn.html';
footerParag.appendChild(signUpLink);
footerSignUp.appendChild(footerParag);
