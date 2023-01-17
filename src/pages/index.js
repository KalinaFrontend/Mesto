import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js'
import Section from '../components/Section.js'
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithDelete from '../components/PopupWithDelete.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import '../pages/index.css';

import {
  popupProfile,
  popupAddElement,
  popupImage,
  popupDelete,
  popupUpdateAvatar,
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

function handleCardClick (name, link) {
  popupWithImage.open(name, link);
}

function handleDeleteClick (card) {
  popupWithDelete.setDeleteCard(card);
  popupWithDelete.open();
}

function handleLikeCard (card) {
  if (card._isLike) {
    api.deleteLike(card._id)
    .then(res => {
      card.numberOfLikes(res.likes);
      card.statusLike();
      card.toggleLike();
    })
    .catch(err => console.log(`Ошибка.....: ${err}`));
  } else {
    api.setLike(card._id)
    .then(res => {
      card.numberOfLikes(res.likes);
      card.statusLike();
      card.toggleLike();
    })
    .catch(err => console.log(`Ошибка.....: ${err}`));
  }
}

const api = new Api(cohort, token);

/** Инициализация класса Section -  который отвечает за отрисовку элементов на странице */
const section = new Section({
  items: [],
  renderer: (data) => {
    const card = new Card(data, userInfo.getUserId(), '#template', handleCardClick, handleDeleteClick, handleLikeCard);
    return card.generateCard();
  }
},'.elements__items');

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


/** Инициализация класса PopupWithForm для PopUp редактирования профиля */
const popupProfileWithForm = new PopupWithForm(popupProfile, data => {
  api.setUserInfo(data)
    .then((res) => {
      userInfo.setUserInfo(res);
      popupProfileWithForm.close();
    })
    .catch(err => console.log(`Ошибка.....: ${err}`))
    .finally(() => {
    popupProfileWithForm.submitButtonInactive();
    })
})

/** Инициализация класса PopupWithForm для PopUp добавления карточки */
const popupAddElementForm = new PopupWithForm(popupAddElement, data => {
  api.setCard(data)
  .then((res) => {
    const cardNew = section.renderItems(res);
    section.addItem(cardNew);
    popupAddElementForm.close();
  })
  .catch(err => console.log(`Ошибка.....: ${err}`))
  .finally(() => {
    popupAddElementForm.submitButtonInactive();
  })
});

/** Инициализация класса PopupWithImage для PopUp просмотра карточки */
const popupWithImage = new PopupWithImage(popupImage);

/** Инициализация класса PopupWithDelete для PopUp удаления карточки */
const popupWithDelete = new PopupWithDelete(popupDelete, card => {
  api.deleteCard(card._id)
  .then(() => {
    card.deleteCard();
    popupWithDelete.close();
  })
  .catch(err => console.log(`Ошибка.....: ${err}`));
});

/** Инициализация класса PopupWithAvatar для PopUp обновления аватара */
const popupWithAvatar =  new PopupWithForm(popupUpdateAvatar, data => {
  api.updateAvatar(data)
    .then(() => {
      userInfo.setAvatar(data);
      popupWithAvatar.close();
    })
    .catch(err => console.log(`Ошибка.....: ${err}`))
    .finally(() => {
      popupWithAvatar.submitButtonInactive();
    })
})

/** Загрузить информации о пользователе и начальные карточки */
Promise.all([
  api.getUserInfo(),
  api.getCard()
])
.then(res=> {
  userInfo.setUserInfo(res[0]);
  section.clear();
  res[1].forEach(data => {
  const cardNew = section.renderItems(data);
  section.addItem(cardNew);
  })
})
.catch(err => console.error(err));


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

