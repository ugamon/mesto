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

const CardPopup = new PopupWithForm("#placePopup", (data) => {
  renderPlaces.addItem(new Card(data, cardTemplate).render());
});

CardPopup.setEventListeners();

const userInfo = new UserInfo(".profile__name", ".profile__profession");

const ProfilePopup = new PopupWithForm("#editPopup", (data) => {
  const { name, profession } = data;
  userInfo.setUserInfo(name, profession);
});

ProfilePopup.setEventListeners();

addButton.addEventListener("click", (e) => CardPopup.open());

editButton.addEventListener("click", (e) => {
  ProfilePopup.open();
  const { name, profession } = new UserInfo(
    ".profile__name",
    ".profile__profession"
  ).getUserInfo();

  ProfilePopup.setUserInfo(name, profession);
});

const formList = Array.from(document.querySelectorAll(config.formSelector));
formList.forEach((formElement) => {
  new FormValidator(config, formElement).enableValidation();
});
