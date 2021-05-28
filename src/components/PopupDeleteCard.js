import Popup from "./Popup.js";

export default class PopupDeleteCard extends Popup {
  constructor(selector) {
    super(selector);
  }

  setAttributes(api, id, e) {
    this._api = api;
    this._id = id;
    this._e = e;
  }

  _handleCardSubmit(e) {
    e.preventDefault();
    this._api.deleteCard(this._id).then(() => {
      this._e.target.closest(".place").remove();
      this.close();
    });
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupElement.addEventListener(
      "submit",
      this._handleCardSubmit.bind(this)
    );
  }
}
