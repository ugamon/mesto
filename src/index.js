import { Card } from "./components/Card.js";
import { FormValidator } from "./components/FormValidator.js";
import Section from "./components/Section.js";
import { PopupWithForm } from "./components/Popup.js";
import UserInfo from "./components/UserInfo.js";

import {
  addButton,
  cardTemplate,
  config,
  editButton,
  initialCards,
  placeContainer,
} from "./utils/constants.js";

import "./images/logo.svg";
import "./images/image.jpg";
import "./pages/index.css";

const renderPlaces = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      return new Card(data, cardTemplate).render();
    },
  },
  placeContainer
);

renderPlaces.renderItems();

const cardPopup = new PopupWithForm("#placePopup", (data) => {
  renderPlaces.addItem(new Card(data, cardTemplate).render());
});

cardPopup.setEventListeners();

const userInfo = new UserInfo(".profile__name", ".profile__profession");

const profilePopup = new PopupWithForm("#editPopup", (data) => {
  const { name, profession } = data;
  userInfo.setUserInfo(name, profession);
});

profilePopup.setEventListeners();

addButton.addEventListener("click", (e) => cardPopup.open());

editButton.addEventListener("click", (e) => {
  profilePopup.open();
  const { name, profession } = userInfo.getUserInfo();
  profilePopup.setUserInfo(name, profession);
});

const formList = Array.from(document.querySelectorAll(config.formSelector));
formList.forEach((formElement) => {
  new FormValidator(config, formElement).enableValidation();
});
