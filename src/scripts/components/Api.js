export default class Api {
  constructor (cohort, token) {
    this._cohort = cohort,
    this._token = token
  }

  _checkResponse(res) {
    if (res.ok) {
      console.log(res);
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
//DELETE https://mesto.nomoreparties.co/v1/cohortId/cards/cardId

}
