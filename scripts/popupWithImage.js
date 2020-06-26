import Popup from "./popup.js";

export default class PopupWithImage extends Popup {
    constructor(selector) {
        super(selector);
    }

    open({name, link}) {
        this._popup.querySelector(".picture__title").textContent = name;
        this._popup.querySelector(".picture__img").src = link;
        super.open();
    }
}
