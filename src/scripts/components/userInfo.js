// ###########################  UserInfo Class  ###################################################

export default class UserInfo {
    constructor({ name, about, pic }) {
        this._nameElement = name;
        this._occElement = about;
        this._picElement = pic;
    }

    getUserInfo() {
        return { name: this._nameElement.textContent, about: this._occElement.textContent };
    }

    setUserInfo({ name, about }) {
        this._nameElement.textContent = name;
        this._occElement.textContent = about;
    }

    setUserPic({ url }) {
        this._picElement.src = url;
    }
}