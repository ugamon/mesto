export default class UserInfo {
    constructor(nameElementSelector, professionElementSelector){
        this._nameElement = document.querySelector(nameElementSelector);
        this._professionElement = document.querySelector(professionElementSelector);
    }

    getUserInfo(){
        return {name: this._nameElement.textContent, profession: this._professionElement.textContent}
    }

    setUserInfo(name, profession){
        this._nameElement.textContent = name;
        this._professionElement.textContent = profession;
    }

}