function dateValidation(date) {
  const currentDate = new Date();
  const datePlus18 = new Date(date.getUTCFullYear() + 18, date.getUTCMonth(), date.getUTCDate());

  return currentDate >= datePlus18;
}

export default function ageValidation(field) {
  const birthdate = new Date(field.value);

  if(!dateValidation(birthdate)) {
    field.setCustomValidity('O usuário não é maior de idade.');
  }
}