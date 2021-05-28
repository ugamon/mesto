import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selector, submitCallBack) {
    super(selector);
    this._submitCallBack = submitCallBack;
    this._attributes = {};
    this.submutButtonElement = this._popupElement.querySelector(
      ".popup__save-button"
    );
    this.inputsList = this._popupElement.querySelectorAll(".popup__input");
  }

  _getInputValues() {
    this.inputsList.forEach((node) => {
      this._attributes[node.getAttribute("name")] = node.value;
    });
  }

  _clearInputValues() {
    this.inputsList.forEach((node) => {
      node.value = "";
    });
  }

  _handleCardSubmit(e) {
    e.preventDefault();
    this._getInputValues();
    this.submutButtonElement.value = "Cохранение...";
    this._submitCallBack(this._attributes);
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupElement.addEventListener(
      "submit",
      this._handleCardSubmit.bind(this)
    );
  }

  close() {
    this._clearInputValues();
    this.submutButtonElement.value = "Сохранить";
    super.close();
  }
}
