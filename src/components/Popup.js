import UserInfo from "./UserInfo.js";

class Popup {
  constructor(selector) {
    this.popupElement = document.querySelector(selector);
    this.handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    document.addEventListener("keydown", this.handleEscClose);
    this.popupElement.classList.add("popup_opened");
  }

  close() {
    this.popupElement.classList.remove("popup_opened");
    this._removeEventListeners();
  }

  _handleEscClose(e) {
    if (e.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this.popupElement.addEventListener("click", (e) => {
      if (e.target.classList.contains("popup_opened")) {
        this.close();
      }
      if (e.target.classList.contains("popup__close-button")) {
        this.close();
      }
    });
  }

  _removeEventListeners() {
    document.removeEventListener("keydown", this.handleEscClose);
  }
}

export class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
  }

  open({ link, name }) {
    const imageElement = this.popupElement.querySelector(".popup__image");
    const headerElement = this.popupElement.querySelector(".popup__header");
    imageElement.src = link;
    imageElement.alt = name;
    headerElement.textContent = name;
    super.open();
  }
}

export class PopupWithForm extends Popup {
  constructor(selector, submitCallBack) {
    super(selector);
    this._submitCallBack = submitCallBack;
    this._attributes = {};
    this._inputslist = this.popupElement.querySelectorAll(".popup__input");
  }

  _getInputValues() {
    this._inputslist.forEach((node) => {
      this._attributes[node.getAttribute("name")] = node.value;
    });
  }

  _clearInputValues() {
    this._inputslist.forEach((node) => {
      node.value = "";
    });
  }

  _handleCardSubmit(e) {
    e.preventDefault();
    this._getInputValues();
    this._submitCallBack(this._attributes);
    this.close();
  }

  setUserInfo(name, profession) {
    this._inputslist.forEach((node) => {
      if (node.name === "name") {
        node.value = name;
      } else {
        node.value = profession;
      }
    });
  }

  _removeEventListeners() {
    this.popupElement.removeEventListener(
      "submit",
      this._handleCardSubmit.bind(this)
    );
  }

  setEventListeners() {
    super.setEventListeners();
    this.popupElement.addEventListener(
      "submit",
      this._handleCardSubmit.bind(this)
    );
  }

  open() {
    super.open();
  }

  close() {
    this._clearInputValues();
    super.close();
  }
}
