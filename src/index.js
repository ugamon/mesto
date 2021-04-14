import {Card} from './components/Card.js'
import {FormValidator} from './components/FormValidator.js'
import Section from './components/Section.js'
import {PopupWithForm} from "./components/Popup.js";
import UserInfo from './components/UserInfo.js';

import {
    addButton,
    cardTemplate,
    config,
    editButton,
    initialCards,
    placeContainer,
} from "./utils/constants.js";

import './images/logo.svg';
import './images/image.jpg';
import './pages/index.css';

const RenderPlaces = new Section({
        items: initialCards,
        renderer: (data) => {
            return new Card(data, cardTemplate).render()
        }
    },
    placeContainer
);

RenderPlaces.renderItems();

const CardPopup = new PopupWithForm('#placePopup', (data) => {
    RenderPlaces.addItem(new Card( data, cardTemplate).render());
});

CardPopup.setEventListeners();

const ProfilePopup = new PopupWithForm('#editPopup', (data) => {
    const {name, profession}  = data;
    new UserInfo('.profile__name', '.profile__profession').setUserInfo(name, profession);
});

ProfilePopup.setEventListeners();

addButton.addEventListener("click", (e) => CardPopup.open());

editButton.addEventListener("click", (e) => {
    ProfilePopup.open()
    ProfilePopup.setUserInfo();
});

const formList = Array.from(document.querySelectorAll(config.formSelector));
formList.forEach((formElement) => {
    new FormValidator(config, formElement).enableValidation()
});
