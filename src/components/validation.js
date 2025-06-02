const regex = /^[A-Za-zА-Яа-я\s-]+$/;

const showInputError = (formElement, inputElement, errorMessage, configValidation) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(`${configValidation.inputErrorClass}`);
  errorElement.classList.add(`${configValidation.errorClass}`);
  errorElement.textContent = errorMessage;
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement, configValidation) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove(`${configValidation.inputErrorClass}`);
  errorElement.classList.remove(`${configValidation.errorClass}`);
  errorElement.textContent = '';
};

const setEventListener = (formElement, configValidation) => {
  const inputList = Array.from(formElement.querySelectorAll(`${configValidation.inputSelector}`));
  const buttonElement = formElement.querySelector(`${configValidation.submitButtonSelector}`);
  toggleButtonState(inputList, buttonElement, configValidation);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, configValidation);
      toggleButtonState(inputList, buttonElement, configValidation);
    });   
  });
};

// Функция, которая проверяет валидность поля
const isValid = (formElement, inputElement, configValidation) => {
  const errorRegexValid = inputElement.getAttribute('data-error-message');
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, configValidation);
  } else if (!regex.test(`${inputElement.value}`) && inputElement.type !== 'url') {
    showInputError(formElement, inputElement, errorRegexValid, configValidation);
  } else {
    hideInputError(formElement, inputElement, configValidation);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return (
      !inputElement.validity.valid ||
      (!regex.test(`${inputElement.value}`) && inputElement.type !== 'url')
    );
  });
};

const toggleButtonState = (inputList, buttonElement, configValidation) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.setAttribute('disabled', 'disabled');
    buttonElement.classList.add(`${configValidation.inactiveButtonClass}`);
  } else {
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove(`${configValidation.inactiveButtonClass}`);
  }
};

export const enableValidation = (configValidation) => {
  
  const formList = Array.from(document.querySelectorAll(`${configValidation.formSelector}`));

  formList.forEach((form) => {
    setEventListener(form, configValidation);
  });
};

export const clearValidation = (formElement, configValidation) => {
  const inputList = Array.from(formElement.querySelectorAll(`${configValidation.inputSelector}`));
  inputList.forEach((input) => {
    hideInputError(formElement, input, configValidation);
  });

  const button = formElement.querySelector(`${configValidation.submitButtonSelector}`);
  toggleButtonState(inputList, button, configValidation);
};
