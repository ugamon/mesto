import {Card} from '../components/Card.js'
import {FormValidator} from '../components/FormValidator.js'
import Section from '../components/Section.js'
import {PopupWithForm} from "../components/Popup.js";

import {
    addButton,
    cardTemplate,
    config,
    editButton,
    initialCards,
    jobField,
    jobInput,
    linkInput,
    nameField,
    nameInput,
    placeContainer,
    placeInput,
} from "../utils/constants.js";


const RenderPlaces = new Section({
        items: initialCards,
        renderer: (data) => {
            return new Card(data, cardTemplate).render()
        }
    },
    placeContainer
);

RenderPlaces.renderItems();
const formList = Array.from(document.querySelectorAll(config.formSelector));
formList.forEach((formElement) => {
    new FormValidator(config, formElement).enableValidation()
});

//todo: необходимо изменить, передавать в addItem нужно DOM элемент.

const CardPopup = new PopupWithForm('#placePopup', (data) => {
    RenderPlaces.addItem(new Card( data, cardTemplate).render());
});
CardPopup.setEventListeners();

const ProfilePopup = new PopupWithForm('#editPopup', () => {
    nameField.textContent = nameInput.value;
    jobField.textContent = jobInput.value;
});
ProfilePopup.setEventListeners();


addButton.addEventListener("click", (e) => CardPopup.open());
editButton.addEventListener("click", (e) => ProfilePopup.open());
