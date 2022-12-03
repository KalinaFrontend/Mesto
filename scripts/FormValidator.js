export default class FormValidator {

  constructor(settings, formElement) {
    this._settings = settings;
    this._formElement = formElement;
    this._inputSelectorList = Array.from(this._formElement.querySelectorAll(this._settings.inputSelector));
    this._submitButton = this._formElement.querySelector(this._settings.submitButtonSelector);
  }

  _checkInputValidity = inputElement => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
  } else {
    this.hideInputError(inputElement);
  }
  }

 _showInputError = inputElement => {
    const inputErrorId = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._settings.inputErrorClass);
    inputErrorId.classList.add(this._settings.errorClass);
    inputErrorId.textContent = inputElement.validationMessage;
  }

  hideInputError = inputElement => {
    const inputErrorId = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._settings.inputErrorClass);
    inputErrorId.classList.remove(this._settings.errorClass);
    inputErrorId.textContent = '';
  }


  toggleSubmitButtonSelector = () => {
    if (this._hasInvalidInput(this._inputSelectorList)) {
      this._submitButton.classList.add(this._settings.inactiveButtonClass);
      this._submitButton.setAttribute("disabled", "");
      } else {
        this._submitButton.classList.remove(this._settings.inactiveButtonClass);
        this._submitButton.removeAttribute("disabled", "");
      };
  }

  _hasInvalidInput = () => {
    return this._inputSelectorList.some((inputElement) => {
      return !inputElement.validity.valid;
      });
  }

  _setEventListeners = () =>{
    this.toggleSubmitButtonSelector();

    this._inputSelectorList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
    this._checkInputValidity(inputElement);
    this.toggleSubmitButtonSelector();
    });
  });
  }

  enableValidation =() => {
      this._formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      })
      this._setEventListeners();
  }

}
