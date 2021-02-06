const root = document.querySelector('.root');
const popup = root.querySelector('.popup');
const editButton = root.querySelector('.profile__edit-button');
const closeButton = root.querySelector('.popup__close-button');
const saveButton = root.querySelector('.popup__save-button');
const formElement = popup.querySelector('.popup__form');
let nameInput = formElement.querySelector('input[name=name]');
let jobInput = formElement.querySelector('input[name=profession]')
let jobField = root.querySelector('.profile__profession');
let nameField = root.querySelector('.profile__name');


/* спасибо за подсказку, ступил =) теперь понятно что нужно было сделать. */


const openPopup = (e) => {
    e.preventDefault();
    nameInput.value = nameField.textContent;
    jobInput.value = jobField.textContent;
    popup.classList.toggle("popup_opened");

}

const closePopup = (e) => {
    e.preventDefault();
    popup.classList.toggle("popup_opened");
}

const submitHandler = (e) => {
    e.preventDefault();
    nameField.textContent = nameInput.value;
    jobField.textContent = jobInput.value;
    popup.classList.toggle("popup_opened");

}


editButton.addEventListener("click", openPopup);
closeButton.addEventListener("click", closePopup);
formElement.addEventListener("submit", submitHandler);

