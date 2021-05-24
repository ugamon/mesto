export default class EditAvatar {
  constructor(
    profileContainerSelector,
    avatarElementSelector,
    editAvatarSelector,
    popupClassInstance
  ) {
    this._avatarElement = document.querySelector(avatarElementSelector);
    this._editAvatarElement = document.querySelector(editAvatarSelector);
    this._profileContainerElement = document.querySelector(
      profileContainerSelector
    );
    this._changeAvatarPopup = popupClassInstance;

    this.activateHandler = this._activateHandler.bind(this);
    this.deactivateHandler = this._deactivateHandler.bind(this);
    this.popupHandler = this._popupHandler.bind(this);
    console.log(this._editAvatarElement);
  }

  getAvatarSrc() {
    return {
      avatar: this._avatarElement.src,
    };
  }

  setAvatarSrc(link) {
    this._avatarElement.src = link;
  }

  _popupHandler(e) {
    this._changeAvatarPopup.setEventListeners();
    this._changeAvatarPopup.open();
  }

  _activateHandler(e) {
    this._editAvatarElement.classList.add("profile__avatar-edit-button_active");
    this._editAvatarElement.addEventListener("click", this.popupHandler);
  }

  _deactivateHandler(e) {
    this._editAvatarElement.classList.remove(
      "profile__avatar-edit-button_active"
    );
    this._editAvatarElement.removeEventListener("click", this.popupHandler);
  }

  setEventListeners() {
    this._profileContainerElement.addEventListener(
      "mouseenter",
      this.activateHandler
    );
    this._profileContainerElement.addEventListener(
      "mouseleave",
      this.deactivateHandler
    );
  }
}
