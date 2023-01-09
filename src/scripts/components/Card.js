export default class Card {
  constructor ( {link, name, likes, _id}, cardTemplate, handleCardClick, handleDeleteClick){
    this._name = name;
    this._link = link;
    this._like = likes;
    this._id = _id;
    this._cardTemplate = cardTemplate;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
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

  _deleteCard() {
    this._handleDeleteClick(this._id);
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
    .addEventListener('click', () => this._handleDeleteClick());

    this._imageItem.addEventListener('click', () =>  this._handleImageClick());
  }
}
