import Popup from './Popup.js'

export default class PopupWithImage extends Popup{
  constructor(popupSelector) {
    super(popupSelector);
    this_.imageView = this._popupElememt.querySelector('.popup__image');
    this._imageTitle = this._popupElememt.querySelector('.popup__image-title')
  }

  open(name, link) {
    imageView.setAttribute('src', link);
    imageView.setAttribute('alt', name);
    imageTitle.textContent = name;
    super.open();
  }
}
