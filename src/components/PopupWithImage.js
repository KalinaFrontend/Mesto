import Popup from './Popup.js'

export default class PopupWithImage extends Popup{
  constructor(popupSelector) {
    super(popupSelector);
    this._imageView = this._popupElememt.querySelector('.popup__image');
    this._imageTitle = this._popupElememt.querySelector('.popup__image-title')
  }

  open(name, link) {
    this._imageView.setAttribute('src', link);
    this._imageView.setAttribute('alt', name);
    this._imageTitle.textContent = name;
    super.open();
  }
}
