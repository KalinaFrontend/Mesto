/* popups */
const popupProfile = document.querySelector('.popup_type_edit-profile');
const popupAddElement = document.querySelector('.popup_type_add-element');
/* buttons */
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');
const buttonCloseProfile = document.querySelector('.popup__close-button_place_edit-profile');
const buttonCloseAddElement = document.querySelector('.popup__close-button_place_add-element');
/* */

const saveButton = document.querySelector('.popup__save-button');

const formPopup = document.querySelector('.popup__form-profile');
const nameInput = formPopup.querySelector('.popup__input_type_name')
const jobInput = formPopup.querySelector('.popup__input_type_job')
const profileName = document.querySelector('.profile__info-name');
const profileJob = document.querySelector('.profile__job');

const elementsContaner = document.querySelector('.elements__items');

// Объявить массив
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// Создать карточку на основе шаблона template
const createCard = (data) => {
  const cardTemplate = document.querySelector('.template').content;
  const cardElement = cardTemplate.querySelector('.elements__item').cloneNode(true);
  cardElement.querySelector('.elements__item-title').textContent = data.name;
  cardElement.querySelector('.elements__item-image').setAttribute('src', data.link);
  //Обработчик клика на лайк
  cardElement.querySelector('.elements__item-like').addEventListener('click', function(evt){
    evt.target.classList.toggle('element__item-like_type_active');
  });
  return cardElement;
};


//Поместить новую карточку в верстку:
const renderCard = (data, elementContaner = elementsContaner) => {
  console.log(elementContaner);
  const cardElement = createCard(data);
  elementContaner.prepend(cardElement);
}


//добавить начальные карточки в верстку:
initialCards.forEach(card => { renderCard(card); });




// Открыть форму PopUp
function popupOpen(popupWindowOpen) {
  popupWindowOpen.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;

};
buttonEdit.addEventListener('click', () => {
  popupOpen(popupProfile);
});
buttonAdd.addEventListener('click', () => {
  popupOpen(popupAddElement);
});

// Закрыть форму PopUp
function popupClose(popupWindowClose) {
  popupWindowClose.classList.remove('popup_opened');
};
buttonCloseProfile.addEventListener('click', ()  => {
  popupClose(popupProfile);
});
buttonCloseAddElement.addEventListener('click', () => {
  popupClose(popupAddElement);
});

// Функции-обработчики:


// Отправить форму
function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  popupClose();
}
formPopup.addEventListener('submit', formSubmitHandler);






