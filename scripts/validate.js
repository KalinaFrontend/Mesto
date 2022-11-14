const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}

const showInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
  const inputErrorId = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  inputErrorId.classList.add(errorClass);
  inputErrorId.textContent = inputElement.validationMessage;
}

const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
  const inputErrorId = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  inputErrorId.classList.remove(errorClass);
  inputErrorId.textContent = '';
}

const  checkInputValidity = (formElement, inputElement, inputErrorClass, errorClass) => {
  if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputErrorClass, errorClass);
  } else {
      hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  }
}

const  setEventListeners = (formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass) => {
  const inputSelectorList = Array.from(formElement.querySelectorAll(inputSelector));
  const submitButton = formElement.querySelector(submitButtonSelector);
  toggleSubmitButtonSelector(inputSelectorList, submitButton, inactiveButtonClass);
  inputSelectorList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, inputErrorClass, errorClass);
      toggleSubmitButtonSelector(inputSelectorList, submitButton, inactiveButtonClass);
      });
  });
}

const enableValidation = ({formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}) => {
  const formSelectorList = Array.from(document.querySelectorAll(formSelector));
  formSelectorList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      });
      setEventListeners(formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass);
  });
}

const hasInvalidInput = (inputSelectorList) => {
  return inputSelectorList.some((inputElement) => {
  return !inputElement.validity.valid;
  });
}

const toggleSubmitButtonSelector = (inputSelectorList, submitButton, inactiveButtonClass) => {
  if (hasInvalidInput(inputSelectorList)) {
  submitButton.classList.add(inactiveButtonClass);
  submitButton.setAttribute("disabled", "");
  } else {
  submitButton.classList.remove(inactiveButtonClass);
  submitButton.removeAttribute("disabled", "");
  };
}

enableValidation(settings);
