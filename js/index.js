const root = document.querySelector('.root');
const popup = root.querySelector('.popup');
const editButton = root.querySelector('.button_type_edit');
const closeButton = root.querySelector('.popup__close-button');
const formElement = popup.querySelector('.popup__form');
let nameInput = formElement.querySelector('input[name=name]');
let jobInput = formElement.querySelector('input[name=profession]')
const saveButton = popup.querySelector('.button_type_save');
let jobField = root.querySelector('.profile__profession');
let nameField = root.querySelector('.profile__name');

const togglePopup = (e, parent=root, className="popup_opened") => {
    const popup = parent.querySelector('.popup');
    e.preventDefault();
    popup.classList.toggle(className);

}

const submitHandler = (e) => {
    e.preventDefault();
    nameField.textContent = nameInput.value;
    jobField.textContent = jobInput.value;

}

editButton.addEventListener("click", togglePopup);
closeButton.addEventListener("click", togglePopup);
formElement.addEventListener("submit", submitHandler);
