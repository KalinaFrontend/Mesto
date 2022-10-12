let popup = document.querySelector('.popup');
let editButton = document.querySelector('.button_place_name');
let closeButton = document.querySelector('.button_type_popup-close');
let addButton = document.querySelector('.button_type_popup-save');

editButton.addEventListener ('click', function() {
  popup.classList.add('popup_opened');
});

function popupClose() {
  popup.classList.remove('popup_opened');
};

closeButton.addEventListener ('click', popupClose);


// Находим форму в DOM
let formPopup = document.querySelector('.popup__form-profile');

// Находим поля формы в DOM
let nameInput = formPopup.querySelector('.popup__input_type_name')
console.log(nameInput.value);
let jobInput = formPopup.querySelector('.popup__input_type_job')


function formSubmitHandler(e) {
    e.preventDefault();
    let profileName = document.querySelector('.profile__info-name');
    let profileJob = document.querySelector('.profile__profession');
    console.log(nameInput.value);
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    popupClose();
}

addButton.addEventListener('click', formSubmitHandler);
