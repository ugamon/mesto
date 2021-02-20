const root = document.querySelector('.root');
const editButton = root.querySelector('.profile__edit-button');
const placeContainer = root.querySelector('.place-container');

const jobField = root.querySelector('.profile__profession');
const nameField = root.querySelector('.profile__name');


const addButton = root.querySelector('.profile__add-button');

const profilePopup = root.querySelector('#editPopup');
const nameInput = profilePopup.querySelector('input[name=name]');
const jobInput = profilePopup.querySelector('input[name=profession]')
const editPopupCloseButton = profilePopup.querySelector('.popup__close-button');

const cardPopup = root.querySelector('#placePopup');
const placeInput = cardPopup.querySelector('input[name=place]');
const linkInput = cardPopup.querySelector('input[name=link]')
const placePopupCloseButton = cardPopup.querySelector('.popup__close-button');


const imagePopup = root.querySelector('#imagePlacePopup');
const imageElement = imagePopup.querySelector('.place-popup__image');
const headerElement = imagePopup.querySelector('.place-popup__header')
const closeImagePlacePopup = imagePopup.querySelector('.place-popup__close-button')

const cardTemplate = document.querySelector('#place-template').content;

function fullNodeCopy(parent, selector) {
    return parent.querySelector(selector).cloneNode(true)
};

const openPopup = (popup) => {
    popup.classList.add("popup_opened")
}

const closePopup = (popup) => {
    popup.classList.remove("popup_opened")
}


const handleProfileSubmit = (e) => {
    e.preventDefault();
    nameField.textContent = nameInput.value;
    jobField.textContent = jobInput.value;
    closePopup(editPopup);
}

const handleCardSubmit = (e) => {
    e.preventDefault();
    const name = placeInput.value
    const link = linkInput.value

    renderCard(
        {
            name: name,
            link: link,

        }, placeContainer
    )

    placeInput.value = ''
    linkInput.value = ''

    closePopup(placePopup)
}

function handleCardDelete(e) {
    e.preventDefault();
    e.target.closest('.place').remove()
}

function handleImagePopupOpen(data) {
    const { link, name } = data
    imageElement.src = link;
    imageElement.alt = name;
    headerElement.textContent = name;
    openPopup(imagePopup);
}


const handleLikeIcon = (likeIconElement) => likeIconElement.classList.toggle("place__button-like_active")

const getCard = (data) => {
    const placeCardCopy = fullNodeCopy(cardTemplate, '.place');

    const likeIcon = placeCardCopy.querySelector('.place__button-like');
    const deleteButton = placeCardCopy.querySelector('.place__bucket');
    const image = placeCardCopy.querySelector('.place__image');
    const previewButton = placeCardCopy.querySelector('button:not(.place__bucket)');
    const desciption = placeCardCopy.querySelector('.place__title')

    image.src = data.link;
    image.alt = data.name;
    desciption.textContent = data.name;

    likeIcon.addEventListener("click", (e) => handleLikeIcon(likeIcon));
    deleteButton.addEventListener("click", handleCardDelete)
    previewButton.addEventListener("click", (e) => handleImagePopupOpen(data))

    return placeCardCopy;
}


const renderCard = (data, wrap) => {
    wrap.prepend(getCard(data))
}

const renderPlaces = () => {
    initialCards.map((data) => {
        renderCard(data, placeContainer);
    })
}


renderPlaces();

/* ------------------------------ event listeners ------------------------------ */

editButton.addEventListener("click", (e) => {
    nameInput.value = nameField.textContent;
    jobInput.value = jobField.textContent;
    openPopup(profilePopup)
});
editPopupCloseButton.addEventListener("click", (e) => closePopup(profilePopup));
profilePopup.addEventListener("submit", handleProfileSubmit

);

addButton.addEventListener("click", (e) => openPopup(cardPopup));
placePopupCloseButton.addEventListener("click", (e) => closePopup(cardPopup));

cardPopup.addEventListener("submit", handleCardSubmit

);
closeImagePlacePopup.addEventListener('click', (e) => closePopup(imagePopup))