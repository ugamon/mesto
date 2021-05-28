import { Card } from "./components/Card.js";
import { FormValidator } from "./components/FormValidator.js";
import Section from "./components/Section.js";
import {
  PopupWithForm,
  PopupWithImage,
  PopupDeleteCard,
} from "./components/Popup.js";
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

const state = {
  _id: "",
};

//Cards section //

const cardImagePopup = new PopupWithImage("#imagePlacePopup");
const deleteCardPopup = new PopupDeleteCard("#deletePopup");

cardImagePopup.setEventListeners();
deleteCardPopup.setEventListeners();

const handleCardClick = (data) => {
  cardImagePopup.open(data);
};

const deleteCardCallback = (api, id, e) => {
  deleteCardPopup.setAttributes(api, id, e);
  deleteCardPopup.open();
};

api
  .getCardList()
  .then((cards) => {
    const renderPlaces = new Section(
      {
        items: cards,
        renderer: (data) => {
          return new Card(
            state._id,
            data,
            cardTemplate,
            api,
            handleCardClick,
            deleteCardCallback
          ).render();
        },
      },
      placeContainer
    );

    renderPlaces.renderItems();

    const cardPopup = new PopupWithForm("#placePopup", (data) => {
      console.log(data);
      api
        .addCard(data.name, data.link)
        .then((newCardItem) => {
          renderPlaces.addItem(newCardItem);
          renderPlaces.renderItems();
        })
        .then(() => {
          cardPopup.close();
        });
    });

    cardPopup.setEventListeners();

    addButton.addEventListener("click", () => cardPopup.open());
  })
  .catch((err) => console.log(err));

// avatar section //

const changeAvatarPopup = new PopupWithForm(
  "#avatarChangePopup",
  ({ link }) => {
    api
      .updateAvatar(link)
      .then((user) => {
        editAvatar.setAvatarSrc(user.avatar);
      })
      .then(() => {
        changeAvatarPopup.close();
      });
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
  state._id = user._id;
  userInfo.setUserInfo(user.name, user.about);
  editAvatar.setAvatarSrc(user.avatar);
});

// profile section //

const editPopupCallBack = new Promise((resolve, reject) => {});

const profilePopup = new PopupWithForm("#editPopup", (data) => {
  const { name, profession } = data;
  api
    .updateProfile(name, profession)
    .then((data) => {
      console.log("user data:");
      console.log(data);
      userInfo.setUserInfo(name, profession);
    })
    .then(() => {
      profilePopup.close();
    });
});

profilePopup.setEventListeners();

// buttons sections //
editButton.addEventListener("click", (e) => {
  profilePopup.open();
  const { name, profession } = userInfo.getUserInfo();
  profilePopup.setUserInfo(name, profession);
});

const formList = Array.from(document.querySelectorAll(config.formSelector));
formList.forEach((formElement) => {
  new FormValidator(config, formElement).enableValidation();
});
