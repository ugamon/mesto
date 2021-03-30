import {Card} from './Card.js'
import {FormValidator} from './FormValidator.js'

const root = document.querySelector('.root');
const editButton = root.querySelector('.profile__edit-button');
const placeContainer = root.querySelector('.place-container');
const jobField = root.querySelector('.profile__profession');
const nameField = root.querySelector('.profile__name');
const addButton = root.querySelector('.profile__add-button');
const profilePopup = root.querySelector('#editPopup');
const nameInput = profilePopup.querySelector('input[name=name]');
const jobInput = profilePopup.querySelector('input[name=profession]');
const cardPopup = root.querySelector('#placePopup');
const placeInput = cardPopup.querySelector('input[name=place]');
const linkInput = cardPopup.querySelector('input[name=link]');


const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error'
};

const initialCards = [
    {

        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',

    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',

    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
    }
];



const cardTemplate = document.querySelector('#place-template').content;
const popups = document.querySelectorAll('.popup');


function handleEscapeKeydown(e) {
    if (e.key === "Escape"){
        const popupOpened = document.querySelector('.popup_opened');
        closePopup(popupOpened);
    }
}

function openPopup(popupElement) {
    popupElement.classList.add("popup_opened");
    document.addEventListener("keydown", handleEscapeKeydown);
}

function closePopup(popupElement) {
    popupElement.classList.remove("popup_opened");
    document.removeEventListener("keydown", handleEscapeKeydown);
}

function handleProfileSubmit(e) {
    e.preventDefault();
    nameField.textContent = nameInput.value;
    jobField.textContent = jobInput.value;
    closePopup(editPopup);
}

function handleCardSubmit(e) {
    e.preventDefault();
    const name = placeInput.value;
    const link = linkInput.value;

    renderCard({
            name: name,
            link: link
        }
        , placeContainer
    );

    placeInput.value = '';
    linkInput.value = '';

    closePopup(placePopup)
}


const renderCard = (data, wrap) => {
    wrap.prepend(new Card(data, cardTemplate, openPopup).render())
};

const renderPlaces = () => {
    initialCards.map((data) => {
        renderCard(data, placeContainer);
    })
};

editButton.addEventListener("click", (e) => {
    nameInput.value = nameField.textContent;
    jobInput.value = jobField.textContent;
    openPopup(profilePopup)
});


function handleClose() {
    popups.forEach((popup) => {
        popup.addEventListener('click', (e)=> {
            if(e.target.classList.contains('popup_opened')){
                closePopup(popup)
            }
            if(e.target.classList.contains('popup__close-button')){
                closePopup(popup)
            }
        })
    })
}

profilePopup.addEventListener("submit", handleProfileSubmit);
addButton.addEventListener("click", (e) => openPopup(cardPopup));
cardPopup.addEventListener("submit", handleCardSubmit);


handleClose();
renderPlaces();

const formList = Array.from(document.querySelectorAll(config.formSelector));
formList.forEach((formElement) => {
    new FormValidator(config, formElement).enableValidation()
});







