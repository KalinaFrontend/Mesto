import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
  constructor(popupSelector, popupSubmitСallback) {
    super(popupSelector);
    this._popupSubmitСallback = popupSubmitСallback;
    this._popupForm = this._popupElememt.querySelector('.popup__form');
    this._inputsForm = this._popupForm.querySelectorAll('.popup__input');
    this._submitButton = this._popupElememt.querySelector('.popup__save-button');
  }

  _getInputValues() {
    this._inputsFormArr = {};
    this._inputsForm.forEach(item => {
    this._inputsFormArr[item.name] = item.value
    });
    return this._inputsFormArr;
  }

  getData() {
    return this._getInputValues();
  }


  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._popupSubmitСallback(this.getData());
    });
  }

  setInputValues(data) {
    this._inputsForm.forEach((input) => {
      input.value = data[input.name];
      input.dispatchEvent(new Event('input'));
    });
  }

  close() {
    this._popupForm.reset();
    super.close();
  }
}
