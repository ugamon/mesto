export default class UserInfo {
  constructor(
    nameElementSelector,
    professionElementSelector,
    avatarElementSelector,
    editAvatarButtonSelector,
    popupCallback
  ) {
    this._nameElement = document.querySelector(nameElementSelector);
    this._professionElement = document.querySelector(professionElementSelector);
    this._avatarElement = document.querySelector(avatarElementSelector);
    this._editAvatarElement = document.querySelector(editAvatarButtonSelector);
    this._popupCallback = popupCallback;
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      profession: this._professionElement.textContent,
      avatar: this._avatarElement.src,
    };
  }

  setUserInfo(name, profession, link) {
    this._nameElement.textContent = name;
    this._professionElement.textContent = profession;
    this._avatarElement.src = link;
  }

  setAvatarSrc(link) {
    this._avatarElement.src = link;
  }

  setEventListeners() {
    this._editAvatarElement.addEventListener("click", () => {
      this._popupCallback();
    });
  }
}
