// const placeContainer = root.querySelector('.place-container');
export const root = document.querySelector('.root');
export const editButton = root.querySelector('.profile__edit-button');
export const placeContainer = '.place-container';
export const addButton = root.querySelector('.profile__add-button');
export const profilePopup = root.querySelector('#editPopup');
export const nameInput = profilePopup.querySelector('input[name=name]');
export const jobInput = profilePopup.querySelector('input[name=profession]');
export const cardPopup = root.querySelector('#placePopup');
export const placeInput = cardPopup.querySelector('input[name=place]');
export const linkInput = cardPopup.querySelector('input[name=link]');
export const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error'
};
export const initialCards = [
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
export const cardTemplate = document.querySelector('#place-template').content;
export const popups = document.querySelectorAll('.popup');