import {openPopup} from './index.js';

const popupImage = document.querySelector('.popup_type_image-view');
const imageView = document.querySelector('.popup__image');
const imageTitle = document.querySelector('.popup__image-title');

export default class Card {
  constructor (data, cardTemplate){
     this._name = data.name;
     this._link = data.link;
     this._cardTemplate = cardTemplate;
  }

  _getTemplate = () => {
    const cardElement = document.querySelector(this._cardTemplate).content.querySelector('.elements__item').cloneNode(true);
    return cardElement;
  }

  generateCard = () => {
    this._cardElement = this._getTemplate();
    this._imageItem = this._cardElement.querySelector('.elements__item-image');
    this._cardElement.querySelector('.elements__item-title').textContent = this._name;
    this._imageItem.setAttribute('src', this._link);
    this._imageItem.setAttribute('alt', this._name);
    this._setEventListener();

    return this._cardElement ;
  }

  _setEventListener = () => {
    this._cardElement.querySelector('.elements__item-like')
    .addEventListener('click', evt => evt.target.classList.toggle('element__item-like_type_active'));

    this._cardElement.querySelector('.elements__delete')
    .addEventListener('click', evt => evt.target.closest('.elements__item').remove());

    this._imageItem.addEventListener('click', () => {
      openPopup(popupImage);
      imageView.setAttribute('src', this._imageItem.getAttribute('src'));
      imageView.setAttribute('alt', this._name);
      imageTitle.textContent = this._name;
    });
  }
}
