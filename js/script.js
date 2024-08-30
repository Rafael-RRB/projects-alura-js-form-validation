import CPFValidation from './cpf-validation.js';
import ageValidation from './age-validation.js';

const formFields = document.querySelectorAll('[required]');
const form = document.querySelector('[data-formulario');

form.addEventListener('submit', event => {
  event.preventDefault();
  const accountList = [];

  const answerList = {
    'nome': event.target.elements['nome'].value,
    'email': event.target.elements['email'].value,
    'rg': event.target.elements['rg'].value,
    'aniversario': event.target.elements['aniversario'].value,
  }

  if(localStorage.getItem('registration') !== null) {
    const tempArray = JSON.parse(localStorage.getItem('registration'));
    accountList.splice(0, 0, ...tempArray);
  }

  accountList.push(answerList);

  localStorage.setItem('registration', JSON.stringify(accountList));
  window.location.href = './abrir-conta-form-2.html';
});

const errorTypes = [
  'valueMissing',
  'typeMismatch',
  'patternMismatch',
  'tooShort',
  'customError'
]

const errorMessages = {
  nome: {
      valueMissing: "O campo de nome não pode estar vazio.",
      patternMismatch: "Por favor, preencha um nome válido.",
      tooShort: "Por favor, preencha um nome válido."
  },
  email: {
      valueMissing: "O campo de e-mail não pode estar vazio.",
      typeMismatch: "Por favor, preencha um email válido.",
      tooShort: "Por favor, preencha um e-mail válido."
  },
  rg: {
      valueMissing: "O campo de RG não pode estar vazio.",
      patternMismatch: "Por favor, preencha um RG válido.",
      tooShort: "O campo de RG não tem caractéres suficientes."
  },
  cpf: {
      valueMissing: 'O campo de CPF não pode estar vazio.',
      patternMismatch: "Por favor, preencha um CPF válido.",
      customError: "O CPF digitado não existe.",
      tooShort: "O campo de CPF não tem caractéres suficientes."
  },
  aniversario: {
      valueMissing: 'O campo de data de nascimento não pode estar vazio.',
      customError: 'Você deve ser maior que 18 anos para se cadastrar.'
  },
  termos: {
      valueMissing: 'Você deve aceitar nossos termos antes de continuar.',
  }
}

function fieldValidation(field) {
  let message = '';
  field.setCustomValidity('');

  (field.name === 'cpf' && field.value.length >= 11) && CPFValidation(field);
  (field.name === 'aniversario' && field.value != '') && ageValidation(field);

  errorTypes.forEach(error => {
    if(field.validity[error]) {
      message = errorMessages[field.name][error];
    }
  });

  const messageSpan = field.parentNode.querySelector('.mensagem-erro');
  const fieldValidity = field.checkValidity();

  if(!fieldValidity) {
    messageSpan.textContent = message;
  } else {
    messageSpan.textContent = '';
  }
}

formFields.forEach(field => {
  // Reminder: 'blur' -> element has lost user focus
  field.addEventListener('blur', () => fieldValidation(field));
  field.addEventListener('invalid', event => event.preventDefault());
});

