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

const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
      alt: 'Архыз'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
      alt: 'Челябинская область'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
      alt: 'Иваново'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
      alt: 'Камчатка'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
      alt: 'Холмогорский район'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
      alt: 'Байкал'
    }
  ]; 


const placeTemplate = document.querySelector('#place-template').content;
const placeContainer = root.querySelector('.place-container');


initialCards.map(({link, alt, name}) => {
    const placeCard = placeTemplate.querySelector('.place').cloneNode(true);
    placeCard.querySelector('.place__image').src = link;
    placeCard.querySelector('.place__image').alt = alt;
    placeCard.querySelector('.place__title').textContent = name;
    placeContainer.appendChild(placeCard)
})


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

