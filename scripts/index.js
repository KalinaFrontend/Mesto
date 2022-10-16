let popup = document.querySelector('.popup');
let likeButton = document.querySelectorAll('.element__item-like');
let closeButton = document.querySelector('.popup__close-button');
let addButton = document.querySelector('.popup__save-button');
let editButton = document.querySelector('.profile__edit-button');
let formPopup = document.querySelector('.popup__form-profile');
let nameInput = formPopup.querySelector('.popup__input_type_name')
let jobInput = formPopup.querySelector('.popup__input_type_job')
let profileName = document.querySelector('.profile__info-name');
let profileJob = document.querySelector('.profile__job');

// Открыть форму PopUp
function popupOpen() {
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;

};
editButton.addEventListener ('click', popupOpen);

// Закрыть форму PopUp
function popupClose() {
  popup.classList.remove('popup_opened');
};
closeButton.addEventListener ('click', popupClose);

// Отправить форму
function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    popupClose();
}
formPopup.addEventListener('submit', formSubmitHandler);
