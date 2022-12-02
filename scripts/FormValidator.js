/* Создайте класс FormValidator, который настраивает валидацию полей формы:
принимает в конструктор объект настроек с селекторами и классами формы;
принимает вторым параметром элемент той формы, которая валидируется;
имеет приватные методы, которые обрабатывают форму: проверяют валидность поля, изменяют состояние кнопки сабмита, устанавливают все обработчики;
имеет публичный метод enableValidation, который включает валидацию формы.
Для каждой проверяемой формы создайте экземпляр класса FormValidator. */


export default class FormValidator {

  constructor(settings, formElement) {
    this._settings = settings;
    this._formElement = formElement;
    this._inputSelectorList = Array.from(this._formElement.querySelectorAll(this._settings.inputSelector));
    this._submitButton = this._formElement.querySelector(this._settings.submitButtonSelector);
  }

  _setEventListeners() {
    this._toggleSubmitButtonSelector();

    this._inputSelectorList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
    this._checkInputValidity(inputElement);
    this._toggleSubmitButtonSelector();
    });
  });
  }

  _checkInputValidity() {
    if (!inputElement.validity.valid) {
      this._showInputError();
  } else {
    this._hideInputError();
  }
  }

 _showInputError = () => {
    const inputErrorId = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._settings.inputErrorClass);
    inputErrorId.classList.add(this._settings.errorClass);
    inputErrorId.textContent = inputElement.validationMessage;
  }

  _hideInputError = () => {
    const inputErrorId = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._settings.inputErrorClass);
    inputErrorId.classList.remove(this._settings.errorClass);
    inputErrorId.textContent = '';
  }


  _toggleSubmitButtonSelector() {
    if (this._hasInvalidInput(this._inputSelectorList)) {
      this._submitButton.classList.add(this._settings.inactiveButtonClass);
      this._submitButton.setAttribute("disabled", "");
      } else {
        this._submitButton.classList.remove(this._settings.inactiveButtonClass);
        this._submitButton.removeAttribute("disabled", "");
      };
  }

  _hasInvalidInput() {
    return this._inputSelectorList.some((inputElement) => {
      return !inputElement.validity.valid;
      });
  }


  enableValidation() {
      this._formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      })
      this._setEventListeners();
  }

}















//const  checkInputValidity = (formElement, inputElement, inputErrorClass, errorClass) => {
 // if (!inputElement.validity.valid) {
 ///    showInputError(formElement, inputElement, inputErrorClass, errorClass);
 // } else {
 //     hideInputError(formElement, inputElement, inputErrorClass, errorClass);
 // }
//}

//const  setEventListeners = (formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass) => {
// const inputSelectorList = Array.from(formElement.querySelectorAll(inputSelector));
//  const submitButton = formElement.querySelector(submitButtonSelector);
//  toggleSubmitButtonSelector(inputSelectorList, submitButton, inactiveButtonClass);
//  inputSelectorList.forEach((inputElement) => {
//      inputElement.addEventListener('input', function () {
//      checkInputValidity(formElement, inputElement, inputErrorClass, errorClass);
//      toggleSubmitButtonSelector(inputSelectorList, submitButton, inactiveButtonClass);
//      });
//  });
//}

//const enableValidation = ({formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}) => {
//  const formSelectorList = Array.from(document.querySelectorAll(formSelector));
//  formSelectorList.forEach((formElement) => {
//      formElement.addEventListener('submit', (evt) => {
//      evt.preventDefault();
//      });
//      setEventListeners(formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass);
//  });
//}

//const hasInvalidInput = (inputSelectorList) => {
//  return inputSelectorList.some((inputElement) => {
//  return !inputElement.validity.valid;
//  });
//}

//const toggleSubmitButtonSelector = (inputSelectorList, submitButton, inactiveButtonClass) => {
 // if (hasInvalidInput(inputSelectorList)) {
 // submitButton.classList.add(inactiveButtonClass);
 // submitButton.setAttribute("disabled", "");
 // } else {
 // submitButton.classList.remove(inactiveButtonClass);
 // submitButton.removeAttribute("disabled", "");
 // };
//}

//enableValidation(settings);
