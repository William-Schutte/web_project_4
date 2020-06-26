// ###########################  PopupWithForm Class  ##############################################
import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor({ formSubmit, selector }) {
        super(selector);
        this._formSubmit = formSubmit;
    }

    _getInputValues() {
        return this._popup.elements;
    }

    setEventListeners() {
        this._popup.addEventListener("click", (evt) => {
            evt.stopPropagation();
            if (evt.target.classList.contains("form__exit-button")) {
                this.close();
            }
        });
        this._popup.addEventListener("submit", (evt) => {
            this._formSubmit(evt);
            this.close();
            this._popup.reset();
        })
    }

}