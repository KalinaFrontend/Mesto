import Popup from './Popup.js'

export default class PopupWithDelete extends Popup {
  constructor(popupSelector,  popupSubmitСallback) {
    super(popupSelector);
    this._popupSubmitСallback = popupSubmitСallback;
    this._button = this._popupElememt.querySelector('.popup__save-button_place_delete-card')
  }

  setDeleteCard(card) {
    this._card = card;
  }

  setEventListeners() {
    super.setEventListeners();
    this._button.addEventListener('click', () => {
      this._popupSubmitСallback(this._card);
    });
  }
}
