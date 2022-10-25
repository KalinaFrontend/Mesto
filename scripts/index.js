/* popups */
const popupProfile = document.querySelector('.popup_type_edit-profile');
const popupAddElement = document.querySelector('.popup_type_add-element');
/* buttons */
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');
const buttonCloseProfile = document.querySelector('.popup__close-button_place_edit-profile');
const buttonCloseAddElement = document.querySelector('.popup__close-button_place_add-element');

const likeButton = document.querySelectorAll('.element__item-like');
const saveButton = document.querySelector('.popup__save-button');


const formPopup = document.querySelector('.popup__form-profile');
const nameInput = formPopup.querySelector('.popup__input_type_name')
const jobInput = formPopup.querySelector('.popup__input_type_job')
const profileName = document.querySelector('.profile__info-name');
const profileJob = document.querySelector('.profile__job');

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


// Отправить форму
function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    popupClose();
}
formPopup.addEventListener('submit', formSubmitHandler);
