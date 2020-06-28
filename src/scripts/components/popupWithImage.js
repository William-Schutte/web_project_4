import Popup from "./popup.js";

export default class PopupWithImage extends Popup {
    open({name, link}) {
        this._popup.querySelector(".picture__title").textContent = name;
        this._popup.querySelector(".picture__img").src = link;
        this._popup.querySelector(".picture__img").alt = `Photo of ${name}`;
        super.open();
    }
}
