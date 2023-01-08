export default class Card {
  constructor ( {link, name, likes}, cardTemplate, handleCardClick){
    this._name = name;
    this._link = link;
    this._like = likes;
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
      this._likeItem = this._cardElement.querySelector('.elements__item-number-likes');
      this._cardElement.querySelector('.elements__item-title').textContent = this._name;
      this._imageItem.setAttribute('src', this._link);
      this._imageItem.setAttribute('alt', this._name);
      this._likeItem.textContent = this._like.length;
      this._setEventListener();
      return this._cardElement ;
    }


  _toggleLike(evt) {
    evt.target.classList.toggle('element__item-like_type_active');
  }

  _deleteCard(evt) {
   evt.target.closest('.elements__item').remove();
  }

  _handleImageClick() {
      this._handleCardClick(this._name, this._link);
    };

  _setLike() {

  }

  _setEventListener = () => {
    this._cardElement.querySelector('.elements__item-like')
    .addEventListener('click', evt => this._toggleLike(evt));

    this._cardElement.querySelector('.elements__delete')
    .addEventListener('click', evt => this._deleteCard(evt));

    this._imageItem.addEventListener('click', () =>  this._handleImageClick());
  }
}
