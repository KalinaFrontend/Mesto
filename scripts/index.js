import {initialCards} from './ArrCards.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js'
/** Popups */
const popups = document.querySelectorAll('.popup');
const popupProfile = document.querySelector('.popup_type_edit-profile');
const popupAddElement = document.querySelector('.popup_type_add-element');
const popupImage = document.querySelector('.popup_type_image-view');
/** Popups form */
const popupFormProfile = popupProfile.querySelector('.popup__form');
const popupFormAddElement = popupAddElement.querySelector('.popup__form');
/** Buttons */
const popupCloseButtons = document.querySelectorAll('.popup__close-button');
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');
const buttonCloseProfile = document.querySelector('.popup__close-button_place_edit-profile');
const buttonCloseAddElement = document.querySelector('.popup__close-button_place_add-element');
const buttonCloseImage = document.querySelector('.popup__close-button_place_image-view');
const buttonSaveImage = popupFormAddElement.querySelector('.popup__save-button');
/** Template */
const cardTemplate = document.querySelector('.template').content;
/** Popup imput*/
const inputName = document.querySelector('.popup__input_type_name');
const inputJob = document.querySelector('.popup__input_type_job');
const profileName = document.querySelector('.profile__info-name');
const profileJob = document.querySelector('.profile__job');
const inputImageName = document.querySelector('.popup__input_type_image-name');
const inputImageLink = document.querySelector('.popup__input_type_image-link');;
/** Добавить template*/
const elementsContaner = document.querySelector('.elements__items');

const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}

/** Поместить новую карточку в верстку */
const renderCard = (data) => {
  const card = new Card(data, '#template');
  elementsContaner.prepend(card.generateCard());
};

/** Добавить начальные карточки в верстку */
initialCards.forEach(card => renderCard(card));

/** Открыть форму PopUp */
const  openPopup = (popupWindowOpen) => {
  popupWindowOpen.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
}

export { openPopup };

/** Закрыть форму PopUp */
const closePopup = (popupWindowClose) => {
  popupWindowClose.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc);
}

/** Закрыть форму PopUp нажатием Esc*/
const closePopupEsc = evt => {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

/** Обработчки событий */
buttonEdit.addEventListener('click', () => {
  inputName.value = profileName.textContent;
  inputName.dispatchEvent(new Event('input'));
  inputJob.value = profileJob.textContent;
  inputJob.dispatchEvent(new Event('input'));
  openPopup(popupProfile);
});

buttonAdd.addEventListener('click', () => {
  /** Очистка формы перед открытием */
  popupFormAddElement.reset();
 // popupFormAddElementValidation.enableValidation();
    popupFormAddElementValidation.toggleSubmitButtonSelector();
//  hideInputError(popupAddElement, inputImageName, settings.inputErrorClass, settings.errorClass);
// hideInputError(popupAddElement, inputImageLink, settings.inputErrorClass, settings.errorClass);
  /** Сделать button не активным*/
 // if (!buttonSaveImage.classList.contains(settings.inactiveButtonClass)) {
 //   buttonSaveImage.classList.add(settings.inactiveButtonClass);
//    buttonSaveImage.setAttribute("disabled", "");
 // }
  openPopup(popupAddElement);
});

popups.forEach( popup => {
  popup.addEventListener('mousedown', evt => {
    if(evt.target.classList.contains('popup_opened')) {
      closePopup(popup);
    }
    if(evt.target.classList.contains('popup__close-button')) {
      closePopup(popup);
    }
  });
});


/** Отправить форму */
popupFormProfile.addEventListener('submit', evt => {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closePopup(popupProfile);
});

popupFormAddElement.addEventListener('submit', evt => {
  evt.preventDefault();
  const data = {name: inputImageName.value, link:inputImageLink.value};
  renderCard(data);
  closePopup(popupAddElement);
});

const popupFormProfileValidation = new FormValidator(settings, popupFormProfile);
const popupFormAddElementValidation = new FormValidator(settings, popupFormAddElement);
popupFormProfileValidation.enableValidation();
popupFormAddElementValidation.enableValidation();
