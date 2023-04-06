/* eslint-disable no-unused-vars */
function displayModal () {
  const modal = document.getElementById('contact_modal');
  modal.style.display = 'block';
  document.getElementById('prenom').focus();
}

function closeModal () {
  const modal = document.getElementById('contact_modal');
  modal.style.display = 'none';
}

function submitInformations () {
  const prenomInput = document.getElementById('prenom').value;
  const nomInput = document.getElementById('nom').value;
  const emailInput = document.getElementById('email').value;
  const messageInput = document.getElementById('message').value;
  console.log('Prénom : ' + prenomInput);
  console.log('Nom : ' + nomInput);
  console.log('Email : ' + emailInput);
  console.log('Message : ' + messageInput);
}

const sendBtn = document.getElementById('send');

sendBtn.addEventListener('click', function (e) {
  e.preventDefault();
  submitInformations();
  closeModal();
});
