import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    const imageElement = this._popupElement.querySelector(".popup__image");
    const headerElement = this._popupElement.querySelector(".popup__header");
  }

  open({ link, name }) {
    imageElement.src = link;
    imageElement.alt = name;
    headerElement.textContent = name;
    super.open();
  }
}
