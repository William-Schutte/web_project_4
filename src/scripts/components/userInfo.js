// ###########################  UserInfo Class  ###################################################

export default class UserInfo {
    constructor({ name, occ }) {
        this._nameElement = name;
        this._occElement = occ;
    }

    getUserInfo() {
        return { name: this._nameElement.textContent, occ: this._occElement.textContent };
    }

    setUserInfo({ name, occ }) {
        this._nameElement.textContent = name;
        this._occElement.textContent = occ;
    }
}
