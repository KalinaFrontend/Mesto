import {initialCards} from '../utils/arrCards.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js'
import Section from '../components/Section.js'
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithDelete from '../components/PopupWithDelete.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import '../../pages/index.css';

import {
  popupProfile,
  popupAddElement,
  popupImage,
  popupDelete,
  popupUpdateAvatar,
  popupUserNameValue,
  popupUseJobValue,
  popupUserName,
  popupUseJob,
  popupUserAvatar,
  popupFormProfile,
  popupFormAddElement,
  popupFormAvatar,
  buttonEdit,
  buttonAdd,
  buttonUpdateAvatar,
  cohort,
  token,
  settings
} from '../utils/constants.js'
import { data } from 'autoprefixer';

const cards = {};

const api = new Api(cohort, token);

/** Инициализация класса Section -  который отвечает за отрисовку элементов на странице */
const section = new Section({
  items: [],
  renderer: (data) => {
    const card = new Card(data, userInfo.getUserId(), '#template', handleCardClick, handleDeleteClick, handleLikeCard);
    cards[data._id] = card;
    return card.generateCard();
  }
},'.elements__items');


/** Загрузить начальные карточки */
api.getCard()
.then(res => {
section.clear();
res.forEach(data => {
const cardNew = section.renderItems(data);
section.addItem(cardNew);
});
});

function handleCardClick (name, link) {
  popupWithImage.open(name, link);
}

function handleDeleteClick (id) {
  popupWithDelete.setDeleteCard(id);
  popupWithDelete.open();
}

function handleLikeCard (id, isLike) {
  if (isLike) {
    api.deleteLike(id)
    .then(res => {
      cards[id].like(res.likes);
    })
  } else {
    api.setLike(id)
    .then(res => {
      cards[id].like(res.likes);
    })
  }
}

/** Инициализация класса FormValidator - отвечает валидацию форм */
const popupFormProfileValidation = new FormValidator(settings, popupFormProfile);
const popupFormAddElementValidation = new FormValidator(settings, popupFormAddElement);
const popupFormWithAvatarValidation = new FormValidator(settings, popupFormAvatar);
popupFormProfileValidation.enableValidation();
popupFormAddElementValidation.enableValidation();
popupFormWithAvatarValidation.enableValidation();


/** Инициализация класса UserInfo - отвечает за управление отображением информации о пользователе на странице */
const userInfo = new UserInfo({
  nameSelector: popupUserName,
  jobSelector: popupUseJob,
  avatarSelector: popupUserAvatar
});

/** Загрузить информации о пользователе */
api.getUserInfo()
.then(res => {
  userInfo.setUserInfo(res)
})


/** Инициализация класса PopupWithForm для PopUp редактирования профиля */
const popupProfileWithForm = new PopupWithForm(popupProfile, data => {
  api.setUserInfo(data)
    .then((res) => {
      userInfo.setUserInfo(res)
      popupProfileWithForm.close();
    })
})

/** Инициализация класса PopupWithForm для PopUp добавления карточки */
const popupAddElementForm = new PopupWithForm(popupAddElement, data => {
  api.setCard(data)
  .then((res) => {
    const cardNew = section.renderItems(res);
    section.addItem(cardNew);
  })
  popupAddElementForm.close();
});

/** Инициализация класса PopupWithImage для PopUp просмотра карточки */
const popupWithImage = new PopupWithImage(popupImage);

/** Инициализация класса PopupWithDelete для PopUp удаления карточки */
const popupWithDelete = new PopupWithDelete(popupDelete, data => {
  api.deleteCard(data)
  .then(() => {
    cards[data].deleteCard();
    popupWithDelete.close();
  })
});

/** Инициализация класса PopupWithAvatar для PopUp обновления аватара */
const popupWithAvatar =  new PopupWithForm(popupUpdateAvatar, data => {
  api.updateAvatar(data)
    .then(() => {
      userInfo.setAvatar(data);
      popupWithAvatar.close();
    })
})


popupProfileWithForm.setEventListeners();
popupAddElementForm.setEventListeners();
popupWithImage.setEventListeners();
popupWithDelete.setEventListeners();
popupWithAvatar.setEventListeners();

buttonEdit.addEventListener('click', () => {
  popupProfileWithForm.setInputValues(userInfo.getUserInfo());
  popupProfileWithForm.open();
})

buttonAdd.addEventListener('click', () => {
  popupFormAddElementValidation.resetValidation();
  popupAddElementForm.open();
});

buttonUpdateAvatar.addEventListener('click', () => {
  popupFormWithAvatarValidation.resetValidation();
  popupWithAvatar.open();
});

