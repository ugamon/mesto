export default class UserInfo {
  constructor(
    nameElementSelector,
    professionElementSelector,
    avatarElementSelector
  ) {
    this._nameElement = document.querySelector(nameElementSelector);
    this._professionElement = document.querySelector(professionElementSelector);
    this._avatarElement = document.querySelector(avatarElementSelector);
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
}
