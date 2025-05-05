document.querySelector('h1').innerText = 'ACTEMIUM';

const btnSignInt = document.querySelector('.btnSignIn');
btnSignInt.innerText = 'Se Connecter';
btnSignInt.addEventListener('click', () => {
  window.location.href = '../pages/accueil.html';
});

const footerSignIn = document.querySelector('.footerSignIn');

const footerParag = document.createElement('p');
footerParag.appendChild(document.createTextNode('Pas encore de compte ? '));

const signInLink = document.createElement('a');
signInLink.classList.add('signUpLink');
signInLink.textContent = 'Inscrivez-vous !';
signInLink.href = '../pages/signUp.html';
footerParag.appendChild(signInLink);
footerSignIn.appendChild(footerParag);
