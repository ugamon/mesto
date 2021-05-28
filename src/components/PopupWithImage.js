import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._imageElement = this.popupElement.querySelector(".popup__image");
    this._headerElement = this.popupElement.querySelector(".popup__header");
  }

  open({ link, name }) {
    this._imageElement.src = link;
    this._imageElement.alt = name;
    this._headerElement.textContent = name;
    super.open();
  }
}
