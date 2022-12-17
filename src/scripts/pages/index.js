import {initialCards} from '../utils/arrCards.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js'
import Section from '../components/Section.js'
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import '../../pages/index.css';

import {
  popupProfile,
  popupAddElement,
  popupImage,
  popupUserNameValue,
  popupUseJobValue,
  popupUserName,
  popupUseJob,
  popupFormProfile,
  popupFormAddElement,
  buttonEdit,
  buttonAdd,
  settings
} from '../utils/constants.js'

/** Инициализация класса Section -  который отвечает за отрисовку элементов на странице */
const section = new Section({
  items: initialCards,
  renderer: (data) => {
    const card = new Card(data, '#template', handleCardClick);
    return card.generateCard();
  }
},'.elements__items');

/** Загрузить начальные карточки */
section.renderItems();


function handleCardClick (name, link) {
  popupWithImage.open(name, link);
}

/** Инициализация класса FormValidator - отвечает валидацию форм */
const popupFormProfileValidation = new FormValidator(settings, popupFormProfile);
const popupFormAddElementValidation = new FormValidator(settings, popupFormAddElement);
popupFormProfileValidation.enableValidation();
popupFormAddElementValidation.enableValidation();


/** Инициализация класса UserInfo - отвечает за управление отображением информации о пользователе на странице */
const userInfo = new UserInfo({
  nameSelector: popupUserName,
  jobSelector: popupUseJob
});

/** Инициализация класса PopupWithForm для PopUp редактирования профиля */
const popupProfileWithForm = new PopupWithForm(popupProfile, (evt) => {
  evt.preventDefault();
  const dataForm = popupProfileWithForm.getData();
  userInfo.setUserInfo(dataForm);
  popupProfileWithForm.close();
})

/** Инициализация класса PopupWithForm для PopUp добавления карточкия */
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

/** Инициализация класса PopupWithImage для PopUp просмотра карточки */
const popupWithImage = new PopupWithImage(popupImage);

buttonEdit.addEventListener('click', () => {
  const dataForm = userInfo.getUserInfo();
  popupUserNameValue.value = dataForm.name;
  popupUserNameValue.dispatchEvent(new Event('input'));
  popupUseJobValue.value = dataForm.job;
  popupUseJobValue.dispatchEvent(new Event('input'));
  popupProfileWithForm.open();
})

buttonAdd.addEventListener('click', () => {
  popupFormAddElementValidation.resetValidation();
  popupAddElementForm.open();
});

