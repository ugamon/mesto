import { PopupWithImage, PopupDeleteCard } from "./Popup.js";

const imagePopup = new PopupWithImage("#imagePlacePopup");
const deletePopup = new PopupDeleteCard("#deletePopup", (api, id) => {
  api.deleteCard(id).then((data) => console.log(data));
});
deletePopup.setEventListeners();

export class Card {
  constructor(id, data, cardSelector, api) {
    this._id = id;
    this._data = data;
    this._cardSelector = cardSelector;
    this._api = api;
    this._imagePopup = imagePopup;
    this._deletePopup = deletePopup;
  }

  _copyTemplate() {
    this._templateCopy = this._cardSelector
      .querySelector(".place")
      .cloneNode(true);
  }

  _getElement(elementSelector) {
    return this._templateCopy.querySelector(elementSelector);
  }

  _layoutSetup() {
    this.image = this._getElement(".place__image");
    this.desciption = this._getElement(".place__title");
    this._likeIcon = this._getElement(".place__button-like");
    this._likesCount = this._getElement(".place__likes-count");
    this.deleteButton = this._getElement(".place__bucket");
    this.previewButton = this._getElement("button:not(.place__bucket)");
  }

  _fillLayout() {
    const { link, name, likes, owner } = this._data;
    if (owner._id !== this._id) {
      this._toggleBucketInvisible();
    }
    this._likesCount.textContent = likes.length;
    const res = likes.find((element, index, array) => {
      if (array.length > 0) {
        return element._id === this._id;
      } else return False;
    });

    if (res) {
      this._likeIcon.classList.add("place__button-like_active");
    }

    this.image.src = link;
    this.image.alt = name;
    this.desciption.textContent = name;
  }

  _toggleBucketInvisible() {
    this.deleteButton.classList.add("place__bucket_invisible");
  }

  _handleCardDelete(e) {
    e.preventDefault();
    deletePopup.setAttributes(this._api, this._data._id, e);
    deletePopup.open();
  }

  _handleLikeIcon(e) {
    if (e.target.classList.contains("place__button-like_active")) {
      this._api.deleteLike(this._data._id).then((data) => {
        console.log(data);
        this._likesCount.textContent = data.likes.length;
        this._likeIcon.classList.remove("place__button-like_active");
      });
    } else {
      this._api.addLike(this._data._id).then((data) => {
        this._likesCount.textContent = data.likes.length;
        this._likeIcon.classList.add("place__button-like_active");
      });
    }
  }

  _handleImagePopupOpen(e) {
    this._imagePopup.open(this._data);
  }

  _addEventListeners() {
    this._likeIcon.addEventListener("click", (e) => this._handleLikeIcon(e));
    this.deleteButton.addEventListener("click", (e) =>
      this._handleCardDelete(e)
    );
    this.previewButton.addEventListener("click", (e) =>
      this._handleImagePopupOpen(e)
    );
    this._imagePopup.setEventListeners();
  }

  render() {
    this._copyTemplate();
    this._layoutSetup();
    this._fillLayout();
    this._addEventListeners();
    return this._templateCopy;
  }
}
