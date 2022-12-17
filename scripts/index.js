import {initialCards} from './ArrCards.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js'
import Section from './Section.js'
import PopupWithForm from './PopupWithForm.js';
import PopupWithImage from './PopupWithImage.js';
import UserInfo from './UserInfo.js';
/** Popups */
const popupProfile = document.querySelector('.popup_type_edit-profile');
const popupAddElement = document.querySelector('.popup_type_add-element');
const popupImage = document.querySelector('.popup_type_image-view');
/** Popup imput*/
const popupUserNameValue = document.querySelector('#userName-input');
const popupUseJobValue = document.querySelector('#useJob-input');
/** Profile value*/
const popupUserName = document.querySelector('.profile__info-name');
const popupUseJob = document.querySelector('.profile__job');
/** Popups form */
const popupFormProfile = popupProfile.querySelector('.popup__form');
const popupFormAddElement = popupAddElement.querySelector('.popup__form');
/** Buttons */
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');

const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}

/** Создать новую карточку */
const section = new Section({
  items: initialCards,
  renderer: (data) => {
    const card = new Card(data, '#template', handleCardClick);
    return card.generateCard();
  }
},'.elements__items');

//* Загрузить начальные карточки */
section.renderItems();


function handleCardClick (name, link) {
  popupWithImage.open(name, link);
}

const popupFormProfileValidation = new FormValidator(settings, popupFormProfile);
const popupFormAddElementValidation = new FormValidator(settings, popupFormAddElement);
popupFormProfileValidation.enableValidation();
popupFormAddElementValidation.enableValidation();

const userInfo = new UserInfo({
  nameSelector: popupUserName,
  jobSelector: popupUseJob
});

// Для каждого попапа создавайте свой экземпляр класса PopupWithForm.
const popupProfileWithForm = new PopupWithForm(popupProfile, (evt) => {
  evt.preventDefault();
  const dataForm = popupProfileWithForm.getData();
  userInfo.setUserInfo(dataForm);
  popupProfileWithForm.close();
})

const popupAddElementForm = new PopupWithForm(popupAddElement, (evt) => {
 evt.preventDefault();
 const dataForm = popupAddElementForm.getData();

 const card = new Card(dataForm, '#template', handleCardClick);
 const newcard = card.generateCard();
 section.addItem(newcard);
 popupAddElementForm.close();
});

popupProfileWithForm.setEventListeners();
popupAddElementForm.setEventListeners();

buttonEdit.addEventListener('click', () => {
  const dataForm = userInfo.getUserInfo();
  popupUserNameValue.value = dataForm.name;
  popupUserNameValue.dispatchEvent(new Event('input'));
  popupUseJobValue.value = dataForm.job;
  popupUseJobValue.dispatchEvent(new Event('input'));
  popupProfileWithForm.open();
})

buttonAdd.addEventListener('click', () => {
  popupAddElementForm.open();
});

const popupWithImage = new PopupWithImage(popupImage);


/*
// Открыть форму PopUp
const  openPopup = (popupWindowOpen) => {
  popupWindowOpen.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
}

// Закрыть форму PopUp
const closePopup = (popupWindowClose) => {
  popupWindowClose.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc);
}


//Закрыть форму PopUp нажатием Esc
const closePopupEsc = evt => {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}



// Обработчки событий
buttonEdit.addEventListener('click', () => {
  inputName.value = profileName.textContent;
  inputName.dispatchEvent(new Event('input'));
  inputJob.value = profileJob.textContent;
  inputJob.dispatchEvent(new Event('input'));
  openPopup(popupProfile);
});

buttonAdd.addEventListener('click', () => {
//Очистка формы перед открытием
  popupFormAddElement.reset();
  popupFormAddElementValidation.resetValidation();
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



//Отправить форму
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
*/
