export class Card {
  constructor(
    id,
    data,
    cardSelector,
    api,
    handleCardClick,
    deleteCardCallback
  ) {
    this._id = id;
    this._data = data;
    this._cardSelector = cardSelector;
    this._api = api;
    this._handleCardClick = handleCardClick;
    this._deleteCardCallback = deleteCardCallback;
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
    this._image = this._getElement(".place__image");
    this._description = this._getElement(".place__title");
    this._likeIcon = this._getElement(".place__button-like");
    this._likesCount = this._getElement(".place__likes-count");
    this._deleteButton = this._getElement(".place__bucket");
    this._previewButton = this._getElement("button:not(.place__bucket)");
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
      } else return false;
    });

    if (res) {
      this._likeIcon.classList.add("place__button-like_active");
    }

    this._image.src = link;
    this._image.alt = name;
    this._description.textContent = name;
  }

  _toggleBucketInvisible() {
    this._deleteButton.classList.add("place__bucket_invisible");
  }

  _handleCardDelete(e) {
    this._deleteCardCallback(this._api, this._data._id, e);
  }

  _handleLikeIcon(e) {
    if (e.target.classList.contains("place__button-like_active")) {
      this._api
        .deleteLike(this._data._id)
        .then((data) => {
          console.log(data);
          this._likesCount.textContent = data.likes.length;
          this._likeIcon.classList.remove("place__button-like_active");
        })
        .catch((err) => console.log(err));
    } else {
      this._api
        .addLike(this._data._id)
        .then((data) => {
          this._likesCount.textContent = data.likes.length;
          this._likeIcon.classList.add("place__button-like_active");
        })
        .catch((err) => console.log(err));
    }
  }

  _handleImagePopupOpen(e) {
    this._handleCardClick(this._data);
  }

  _addEventListeners() {
    this._likeIcon.addEventListener("click", (e) => this._handleLikeIcon(e));
    this._deleteButton.addEventListener("click", (e) =>
      this._handleCardDelete(e)
    );
    this._previewButton.addEventListener("click", (e) =>
      this._handleImagePopupOpen(e)
    );
  }

  render() {
    this._copyTemplate();
    this._layoutSetup();
    this._fillLayout();
    this._addEventListeners();
    return this._templateCopy;
  }
}
