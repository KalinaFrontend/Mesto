export default class Popup {
    constructor (popupSelector) {
        this._popupElememt = popupSelector;
    }

    open() {
        this._popupElememt.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose.bind(this));
    }

    close() {
      this._popupElememt.classList.remove('popup_opened');
      document.removeEventListener('keydown', this._handleEscClose.bind(this))
    }

    setEventListeners(){
      this._popupElememt.addEventListener('mousedown', evt => {
        if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close-button')) {
          this.close();
        }
      });
    }

    _handleEscClose(evt) {
            if (evt.key === 'Escape') {
              this.close();
            }
    }
}
