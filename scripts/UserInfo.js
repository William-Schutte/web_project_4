// ###########################  UserInfo Class  ###################################################

export default class UserInfo {
    constructor({ name, occ }) {
        this._name = name,
        this._occ = occ
    }

    getUserInfo() {
        this._name = document.querySelector(".profile__name").textContent;
        this._occ = document.querySelector(".profile__occupation").textContent;
        return { name: this._name, occ: this._occ };
    }

    setUserInfo({ name, occ }) {
        document.querySelector(".profile__name").textContent = name;
        document.querySelector(".profile__occupation").textContent = occ;
    }
}
