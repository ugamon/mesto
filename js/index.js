const root = document.querySelector('.root');
const editButton = root.querySelector('.profile__edit-button');
const placeContainer = root.querySelector('.place-container');

let jobField = root.querySelector('.profile__profession');
let nameField = root.querySelector('.profile__name');


const saveButton = root.querySelector('.popup__save-button');
const addButton = root.querySelector('.profile__add-button');

const editPopupElement = root.querySelector('#editPopup');
const nameInput = editPopupElement.querySelector('input[name=name]');
const jobInput = editPopupElement.querySelector('input[name=profession]')
const editPopupCloseButton = editPopupElement.querySelector('.popup__close-button');

const placePopupElement = root.querySelector('#placePopup');
const placeInput = placePopupElement.querySelector('input[name=place]');
const linkInput = placePopupElement.querySelector('input[name=link]')
const placePopupCloseButton = placePopupElement.querySelector('.popup__close-button');


const imagePlacePopupElement = root.querySelector('#imagePlacePopup');
const imageElement = imagePlacePopupElement.querySelector('.place-popup__image');
const headerElement = imagePlacePopupElement.querySelector('.place-popup__header')
const closeImagePlacePopup = imagePlacePopupElement.querySelector('.place-popup__close-button')


const initialCards = [
    {

        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
        alt: 'Архыз',
        id: generateRandomId()
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
        alt: 'Челябинская область',
        id: generateRandomId()
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
        alt: 'Иваново',
        id: generateRandomId()
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
        alt: 'Камчатка',
        id: generateRandomId()
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
        alt: 'Холмогорский район',
        id: generateRandomId()
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
        alt: 'Байкал',
        id: generateRandomId()
    }
];



/* -------------------------------- utils -------------------------------- */

function generateRandomId() {
    return Math.random().toString(36).slice(2)
}

function fullNodeCopy(parent, selector) {
    return parent.querySelector(selector).cloneNode(true)
};

/* -------------------------------- popups functions -----------------*/

function openPlacePopup(name, link) {
    imageElement.src = link;
    imageElement.alt = name;
    headerElement.textContent = name;
    switchPopupOpenClass(imagePlacePopupElement);

}



const openPopup = (e) => {
    e.preventDefault();
    switch (e.target.className) {

        case "button profile__edit-button":
            nameInput.value = nameField.textContent;
            jobInput.value = jobField.textContent;
            switchPopupOpenClass(editPopup)
            break

        case "profile__add-button button":
            switchPopupOpenClass(placePopup)
    }
}


const closePopup = (e) => {
    e.preventDefault();

    if (editPopup.classList.contains("popup_opened")) {
        switchPopupOpenClass(editPopup);
    }
    else if (placePopup.classList.contains("popup_opened")) {
        switchPopupOpenClass(placePopup)
    }
}


const switchPopupOpenClass = (popup_element) => {
    popup_element.classList.toggle("popup_opened")
}


const submitHandler = (e) => {
    e.preventDefault();
    nameField.textContent = nameInput.value;
    jobField.textContent = jobInput.value;
    switchPopupOpenClass(editPopup)
}

const submitPlaceHandler = (e) => {
    e.preventDefault();
    const name = placeInput.value
    const link = linkInput.value

    const placeItem = getCard({
        name: name,
        link: link,
        alt: name,
        id: generateRandomId()
    })

    placeContainer.prepend(placeItem)
    switchPopupOpenClass(placePopup)
}



/* ------------------------------ form card ------------------------------ */

const placeTemplate = document.querySelector('#place-template').content;

function deletePlace(e) {
    e.preventDefault();
    const elementToBeRemoved = document.getElementById(e.target.id).parentElement
    placeContainer.removeChild(elementToBeRemoved)
}


const getCard = (data) => {
    const placeCardCopy = fullNodeCopy(placeTemplate, '.place');

    const { link, alt, name, id } = data;
    placeCardCopy.querySelector('.place__image').src = link;
    placeCardCopy.querySelector('.place__image').alt = alt;
    placeCardCopy.querySelector('.place__title').textContent = name;
    placeCardCopy.querySelector('.place__bucket').id = id;
    placeCardCopy.querySelector('button:not(.place__bucket)').addEventListener("click", (e) => {
        openPlacePopup(name, link);
    })
    placeCardCopy.querySelector('.place__bucket').addEventListener("click", deletePlace);

    const likeButton = placeCardCopy.querySelector('.place__button-like');
    likeButton.addEventListener("click", (e) => {
        likeButton.classList.toggle("place__button-like_active")
    })

    return placeCardCopy;
}


const renderCard = (data, wrap) => {
    wrap.prepend(getCard(data))
}


const addPlaceToList = (name, link) => {
    initialCards.unshift(
        {
            name: name,
            link: link,
            alt: name,
            id: generateRandomId()
        })
}

const renderPlaces = () => {
    initialCards.map((data) => {
        renderCard(data, placeContainer);
    })
}


renderPlaces();

/* ------------------------------ event listeners ------------------------------ */

editButton.addEventListener("click", openPopup);
addButton.addEventListener("click", openPopup);
editPopupCloseButton.addEventListener("click", closePopup);
placePopupCloseButton.addEventListener("click", closePopup)
editPopupElement.addEventListener("submit", submitHandler);
placePopupElement.addEventListener("submit", submitPlaceHandler);

closeImagePlacePopup.addEventListener('click', (e) => {
    e.preventDefault();
    switchPopupOpenClass(imagePlacePopupElement);
})