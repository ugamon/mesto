import { Card } from "./components/Card.js";
import { FormValidator } from "./components/FormValidator.js";
import Section from "./components/Section.js";
import { PopupWithForm } from "./components/Popup.js";
import UserInfo from "./components/UserInfo.js";
import Api from "./components/Api.js";

import {
  addButton,
  cardTemplate,
  config,
  editButton,
  placeContainer,
} from "./utils/constants.js";

import "./images/logo.svg";
import "./images/image.jpg";
import "./pages/index.css";

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-24",
  headers: {
    authorization: "41b03801-bc4d-4d5f-8372-684b2b7fdbc5",
    "Content-Type": "application/json",
  },
});

api
  .getCardList()
  .then((cards) => {
    const renderPlaces = new Section(
      {
        items: cards,
        renderer: (data) => {
          return new Card(data, cardTemplate).render();
        },
      },
      placeContainer
    );

    renderPlaces.renderItems();
  })
  .catch((err) => console.log(err));

const cardPopup = new PopupWithForm("#placePopup", (data) => {
  renderPlaces.addItem(new Card(data, cardTemplate).render());
});

cardPopup.setEventListeners();

const userInfo = new UserInfo(
  ".profile__name",
  ".profile__profession",
  ".profile__avatar"
);
api.getUserInfo().then((user) => {
  userInfo.setUserInfo(user.name, user.about, user.avatar);
});

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
