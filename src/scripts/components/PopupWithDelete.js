import Popup from './Popup.js'

export default class PopupWithDelete extends Popup {
  constructor(popupSelector,  popupSubmitСallback) {
    super(popupSelector);
    this._popupSubmitСallback = popupSubmitСallback;
    this._button = this._popupElememt.querySelector('.popup__save-button_place_delete-card')
  }

  setDeleteCard(id) {
    this._id = id;
  }

  setEventListeners() {
    super.setEventListeners();
    this._button.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._popupSubmitСallback(this._id);
    });
  }
}
