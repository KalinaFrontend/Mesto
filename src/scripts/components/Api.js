export default class Api {
  constructor (cohort, token) {
    this._cohort = cohort,
    this._token = token
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
}
