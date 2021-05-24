import { Card } from "./components/Card.js";
import { FormValidator } from "./components/FormValidator.js";
import Section from "./components/Section.js";
import { PopupWithForm } from "./components/Popup.js";
import UserInfo from "./components/UserInfo.js";
import EditAvatar from "./components/EditAvatar.js";
import Api from "./components/Api.js";
import token from "./credentials.js";
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

//Initializing the classes//
const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-24",
  headers: {
    authorization: token,
    "Content-Type": "application/json",
  },
});

//Cards section //
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

// avatar section //
const changeAvatarPopup = new PopupWithForm(
  "#avatarChangePopup",
  ({ link }) => {
    api.updateAvatar(link).then(
      api.getUserInfo().then(({ avatar }) => {
        editAvatar.setAvatarSrc(avatar);
      })
    );
  }
);

const editAvatar = new EditAvatar(
  ".profile__avatar-container",
  ".profile__avatar",
  ".profile__avatar-edit-button",
  changeAvatarPopup
);

editAvatar.setEventListeners();

// user information section //
const userInfo = new UserInfo(".profile__name", ".profile__profession");

//initial profile and avatar setup
api.getUserInfo().then((user) => {
  userInfo.setUserInfo(user.name, user.about);
  editAvatar.setAvatarSrc(user.avatar);
});

// profile section //
const profilePopup = new PopupWithForm("#editPopup", (data) => {
  const { name, profession } = data;
  api.updateProfile(name, profession);
  userInfo.setUserInfo(name, profession);
});

profilePopup.setEventListeners();

// buttons sections //
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
