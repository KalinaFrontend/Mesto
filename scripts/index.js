let popup = document.querySelector('.popup');
let likeButton = document.querySelectorAll('.element__item-like');
let closeButton = document.querySelector('.popup__close-button');
let addButton = document.querySelector('.popup__save-button');
let editButton = document.querySelector('.profile__edit-button');

/*Ставим лайк фото с фотографиями или убираем лайк*/
likeButton.forEach(likeButton =>
  likeButton.addEventListener ('click', function () {
    likeButton.classList.toggle('element__item-like_type_active');
    }
))

// Открыть форму PopUp
editButton.addEventListener ('click', function() {
  popup.classList.add('popup_opened');
});
// Закрыть форму PopUp
function popupClose() {
  popup.classList.remove('popup_opened');
};
closeButton.addEventListener ('click', popupClose);

// Изменить данные в профиле
let formPopup = document.querySelector('.popup__form-profile');
let nameInput = formPopup.querySelector('.popup__input_type_name')
let jobInput = formPopup.querySelector('.popup__input_type_job')
function formSubmitHandler(e) {
    e.preventDefault();
    let profileName = document.querySelector('.profile__info-name');
    let profileJob = document.querySelector('.profile__job');
    console.log(nameInput.value);
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    popupClose();
}
addButton.addEventListener('click', formSubmitHandler);
