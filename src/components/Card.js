export default class Card {
  constructor ( card, userId, cardTemplate, handleCardClick, handleDeleteClick, handleLikeCard){
    this._name = card.name;
    this._link = card.link;
    this._like = card.likes;
    this._id = card._id;
    this._owner = card.owner;
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


  numberOfLikes(newlikes) {
    this._like = newlikes;
    this._likeItem.textContent = this._like.length;
  }

  statusLike() {
    this._isLike = !this._isLike;
  }

  toggleLike() {
    this._cardElement.classList.toggle('element__item-like_type_active');
  }

  deleteCard() {
    this._cardElement.remove();
  }

  _handleImageClick() {
      this._handleCardClick(this._name, this._link);
    };

  _setEventListener = () => {
    this._cardElement.querySelector('.elements__item-like')
    .addEventListener('click', evt => this._handleLikeCard(this));

    if (this._cardElement.querySelector('.elements__delete')) this._cardElement.querySelector('.elements__delete')
    .addEventListener('click', () =>  this._handleDeleteClick(this));

    this._imageItem.addEventListener('click', () =>  this._handleImageClick());
  }
}
