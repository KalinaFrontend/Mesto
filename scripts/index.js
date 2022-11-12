import initialCards from './components/Cards.js';
/* popups */
const popupProfile = document.querySelector('.popup_type_edit-profile');
const popupAddElement = document.querySelector('.popup_type_add-element');
const popupImage = document.querySelector('.popup_type_image-view');
/* popups form */
const popupFormProfile = popupProfile.querySelector('.popup__form');
const popupFormAddElement = popupAddElement.querySelector('.popup__form');
/* buttons */
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');
const buttonCloseProfile = document.querySelector('.popup__close-button_place_edit-profile');
const buttonCloseAddElement = document.querySelector('.popup__close-button_place_add-element');
const buttonCloseImage = document.querySelector('.popup__close-button_place_image-view')
/* Template */
const cardTemplate = document.querySelector('.template').content;
/* Popup imput*/
const inputName = document.querySelector('.popup__input_type_name')
const inputJob = document.querySelector('.popup__input_type_job')
const profileName = document.querySelector('.profile__info-name');
const profileJob = document.querySelector('.profile__job');
const inputImageName = document.querySelector('.popup__input_type_image-name');
const inputImageLink = document.querySelector('.popup__input_type_image-link');
const imageView = document.querySelector('.popup__image');
const imageTitle = document.querySelector('.popup__image-title');
/* Add template*/
const elementsContaner = document.querySelector('.elements__items');
/* Add Like */
function activeLike(evt) {
  evt.target.classList.toggle('element__item-like_type_active');
};

/* Создать карточку на основе шаблона template */
const createCard = (data) => {
  const cardElement = cardTemplate.querySelector('.elements__item').cloneNode(true);
  const imageItem = cardElement.querySelector('.elements__item-image');
  cardElement.querySelector('.elements__item-title').textContent = data.name;
  imageItem.setAttribute('src', data.link);
  imageItem.setAttribute('alt', data.name);
  /* Обработчик лайк */
  cardElement.querySelector('.elements__item-like').addEventListener('click', (evt) => {
    activeLike(evt)
  });
  /* Обработчик удаления карточки */
  cardElement.querySelector('.elements__delete').addEventListener('click', function(evt){
    evt.target.closest('.elements__item').remove();
  });
  /* Обработчик открытия карточки */
  imageItem.addEventListener('click', function(evt) {
    popupOpen(popupImage);
    imageView.setAttribute('src', imageItem.getAttribute('src'));
    imageView.setAttribute('alt', data.name);
    imageTitle.textContent = data.name;
  });
  return cardElement;
};
/* Поместить новую карточку в верстку */
const renderCard = (data, elementContaner = elementsContaner) => {
  const cardElement = createCard(data);
  elementContaner.prepend(cardElement);
}
/* Добавить начальные карточки в верстку */
initialCards.forEach(card => { renderCard(card); });

/* Открыть форму PopUp */
function popupOpen(popupWindowOpen) {
  popupWindowOpen.classList.add('popup_opened');
};
/* Закрыть форму PopUp */
function popupClose(popupWindowClose) {
  popupWindowClose.classList.remove('popup_opened');
};


buttonEdit.addEventListener('click', () => {
  popupOpen(popupProfile);
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
});
buttonAdd.addEventListener('click', () => {
  popupOpen(popupAddElement);
  popupFormAddElement.reset();
});

buttonCloseProfile.addEventListener('click', ()  => {
  popupClose(popupProfile);
});
buttonCloseAddElement.addEventListener('click', () => {
  popupClose(popupAddElement);
});
buttonCloseImage.addEventListener('click', () => {
  popupClose(popupImage);
})

/* Отправить форму */
popupFormProfile.addEventListener('submit', (evt) => {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  popupClose(popupProfile);
});
popupFormAddElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const data = {name: inputImageName.value, link:inputImageLink.value};
  renderCard(data);
  popupClose(popupAddElement);
});


const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-error_active');
}

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_type_error');
  errorElement.classList.remove('popup__input-error_active');
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
  if(!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__save-button');
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function() {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    })
  });
}

const hasInvalidInput = (inputList) => {
  inputList.some((inputElement) => {
    return inputElement.validity.valid;
  });
}

const toggleButtonState = (inputList, buttonElement) => {
  if (!hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__save-button_inactive');
  } else {
    buttonElement.classList.remove('popup__save-button_inactive');
  }
}

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((formElement) => {
    setEventListeners(formElement);
  })
}

enableValidation();
