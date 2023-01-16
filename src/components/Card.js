export default class Card {
  constructor ( {link, name, likes, _id, owner}, userId, cardTemplate, handleCardClick, handleDeleteClick, handleLikeCard){
    this._name = name;
    this._link = link;
    this._like = likes;
    this._id = _id;
    this._owner = owner;
    this._userId = userId;
    this._cardTemplate = cardTemplate;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeCard = handleLikeCard;
    this._isLike = false;
  }

  _getTemplate = () => {
    const cardElement = document.querySelector(this._cardTemplate).content.querySelector('.elements__item').cloneNode(true);
    return cardElement;
  }

  generateCard = () => {
      this._cardElement = this._getTemplate();
      this._imageItem = this._cardElement.querySelector('.elements__item-image');
      this._likeItem = this._cardElement.querySelector('.elements__item-number-likes');
      this._deleteElement = this._cardElement.querySelector('.elements__delete');
      this._cardElement.querySelector('.elements__item-title').textContent = this._name;
      this._imageItem.setAttribute('src', this._link);
      this._imageItem.setAttribute('alt', this._name);
      this._likeItem.textContent = this._like.length;
      if (this._userId !== this._owner._id) {
        this._deleteElement.remove();
      }
      if (this._like.find(item => item._id == this._userId)) {
        this._cardElement.querySelector('.elements__item-like').classList.add('element__item-like_type_active');
        this._isLike = true;
      }
      this._setEventListener();
      return this._cardElement ;
    }

  like(newlikes) {
    this._like = newlikes;
    this._likeItem.textContent = this._like.length;
    this._isLike = !this._isLike;
  }

  _toggleLike(evt) {
    evt.target.classList.toggle('element__item-like_type_active');
    this._handleLikeCard(this._id, this._isLike);
  }

  deleteCard() {
    this._cardElement.remove();
  }

  _handleImageClick() {
      this._handleCardClick(this._name, this._link);
    };

  _setEventListener = () => {
    this._cardElement.querySelector('.elements__item-like')
    .addEventListener('click', evt => this._toggleLike(evt));

    if (this._cardElement.querySelector('.elements__delete')) this._cardElement.querySelector('.elements__delete')
    .addEventListener('click', () =>  this._handleDeleteClick(this._id));

    this._imageItem.addEventListener('click', () =>  this._handleImageClick());
  }
}
