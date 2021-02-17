const root = document.querySelector('.root');
const editButton = root.querySelector('.profile__edit-button');
const placeContainer = root.querySelector('.place-container');

let jobField = root.querySelector('.profile__profession');
let nameField = root.querySelector('.profile__name');

function generateRandomId() {
    return Math.random().toString(36).slice(2)
}

let initialCards = [
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

const popup_config = [
    {
        name: 'editPopup',
        header: 'Редактировать профиль',
        inputs:
            [
                { name: 'name' },
                { name: 'profession' }
            ]
    },
    {
        name: 'placePopup',
        header: 'Новое место',
        inputs:
            [
                { name: 'place', placeholder: 'Название' },
                { name: 'link', placeholder: 'Ссылка на картинку' }
            ]
    },
]

function fullNodeCopy(parent, selector) {
    return parent.querySelector(selector).cloneNode(true)
};


/* ---------------------------------------------------- */

const popupTemplate = document.querySelector('#popup-template').content;

const inputFieldsEditor = (inputfieldsContainer, inputs = []) => {
    const inputElementsArray = inputfieldsContainer.children;

    for (let i = 0; i < inputElementsArray.length; i++) {
        if (inputs[i].hasOwnProperty('placeholder')) {
            inputElementsArray[i].name = inputs[i].name
            inputElementsArray[i].placeholder = inputs[i].placeholder
        }
        else {
            inputElementsArray[i].name = inputs[i].name
        }
    }
}


const createPopup = (configItem) => {
    const { name, header, inputs } = configItem;

    const popupObject = fullNodeCopy(popupTemplate, '.popup')
    const inputfieldsContainer = popupObject.querySelector('.popup__form > div');

    popupObject.id = name;
    popupObject.querySelector('.popup__header').textContent = header
    inputFieldsEditor(inputfieldsContainer, inputs)

    return popupObject
}



const popupGenerator = (config) => {
    const popupContainer = [];
    config.map(
        (configItem) => {
            popupContainer.push(
                { name: configItem.name, popupObject: createPopup(configItem) }
            )
        }
    )
    return popupContainer;
}


const popupsContainer = popupGenerator(popup_config);
const editPopup = popupsContainer.find((item) => { return item.name === 'editPopup' }).popupObject
const placePopup = popupsContainer.find((item) => { return item.name === 'placePopup' }).popupObject

root.appendChild(editPopup);
root.appendChild(placePopup);


/* ---------------------------------------------------- */

const saveButton = root.querySelector('.popup__save-button');
const addButton = root.querySelector('.profile__add-button');

const editPopupCloseButton = editPopup.querySelector('.popup__close-button');
const placePopupCloseButton = placePopup.querySelector('.popup__close-button');

const editPopupFormElement = editPopup.querySelector('.popup__form');
let nameInput = editPopupFormElement.querySelector('input[name=name]');
let jobInput = editPopupFormElement.querySelector('input[name=profession]')

const placePopupFormElement = placePopup.querySelector('.popup__form');
let placeInput = placePopupFormElement.querySelector('input[name=place]');
let linkInput = placePopupFormElement.querySelector('input[name=link]')




/* ---------------------------------------------------- */

const placeTemplate = document.querySelector('#place-template').content;

const renderPlaces = () => {
    placeContainer.innerHTML = '';
    initialCards.map(
        ({ link, alt, name, id }) => {
            const placeCard = fullNodeCopy(placeTemplate, '.place');
            placeCard.querySelector('.place__image').src = link;
            placeCard.querySelector('.place__image').alt = alt;
            placeCard.querySelector('.place__title').textContent = name;
            placeCard.querySelector('.place__bucket').id = id;
            placeCard.querySelector('button:not(.place__bucket)').addEventListener("click", (e) => {
                openPlacePopup(name, link);
            })
            placeContainer.appendChild(placeCard)

            placeCard.querySelector('.place__bucket').addEventListener("click", deletePlace);
        })
}

const placePopupTemplate = document.querySelector('#place-popup-template').content
const imagePopup = placePopupTemplate.querySelector('.place-popup');
imagePopup.querySelector('.place-popup__close-button').addEventListener("click", (e)=> {
    switchPopupOpenClass(imagePopup);
})
root.appendChild(imagePopup);

function openPlacePopup(name, link){
    imagePopup.querySelector('.place-popup__image').src = link;
    imagePopup.querySelector('.place-popup__image').alt = name;
    imagePopup.querySelector('.place-popup__header').textContent = name;
    switchPopupOpenClass(imagePopup);

}



function deletePlace(e) {
    e.preventDefault();

    const _index = initialCards.findIndex((item) => { return item.id == e.target.id })
    initialCards.splice(_index, 1)
    renderPlaces();
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

renderPlaces(initialCards);

/* ---------------------------------------------------- */

const switchPopupOpenClass = (popup_element) => {
    popup_element.classList.toggle("popup_opened")
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
    addPlaceToList(name, link)
    renderPlaces()

    switchPopupOpenClass(placePopup)
}

/* -------------------- delete button -------------------- */


editButton.addEventListener("click", openPopup);
addButton.addEventListener("click", openPopup);
editPopupCloseButton.addEventListener("click", closePopup);
placePopupCloseButton.addEventListener("click", closePopup)
editPopupFormElement.addEventListener("submit", submitHandler);
placePopupFormElement.addEventListener("submit", submitPlaceHandler);
