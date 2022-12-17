import Popup from "./Popup.js";

export default class Card {
  constructor (data, cardTemplate, handleCardClick){
     this._name = data.name;
     this._link = data.link;
     this._cardTemplate = cardTemplate;
     this._handleCardClick = handleCardClick;
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
      this._handleCardClick(this._name, this._link);
    });
  }
}
