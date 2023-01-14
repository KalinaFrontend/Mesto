export default class Api {
  constructor (cohort, token) {
    this._cohort = cohort,
    this._token = token
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      console.log('тут')
      return Promise.reject(`${res.status} ${res.statusText}`);
    }
  }

  getUserInfo() {
    return fetch(`https://nomoreparties.co/v1/${this._cohort}/users/me`, {
      method: 'GET',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
  }

  setUserInfo(forms) {
    return fetch(`https://nomoreparties.co/v1/${this._cohort}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(forms)
    }).then(this._checkResponse);
  }

  getCard() {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._cohort}/cards`, {
      method: 'GET',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
  }

  setCard({name, link}) {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._cohort}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        link
      })
    })
    .then(this._checkResponse);
  }

  deleteCard(_id) {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._cohort}/cards/${_id} `, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
    })
    .then(this._checkResponse);
  }

  setLike(_id) {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._cohort}/cards/${_id}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
    })
    .then(this._checkResponse);
  }

  deleteLike(_id) {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._cohort}/cards/${_id}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
    })
    .then(this._checkResponse);
  }


 //PUT https://mesto.nomoreparties.co/v1/cohortId/cards/cardId/likes
 //DELETE https://mesto.nomoreparties.co/v1/cohortId/cards/cardId/likes
 // Вместо cardId в URL нужно подставить свойство _id соответствующей карточки.

//DELETE https://mesto.nomoreparties.co/v1/cohortId/cards/cardId

}
