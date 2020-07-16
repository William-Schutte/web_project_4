// ###########################  PopupWithForm Class  ##############################################
import Popup from "./popup.js";

export default class PopupWithForm extends Popup {
    constructor({ formSubmit, selector }) {
        super(selector);
        this._formSubmit = formSubmit;
    }

    _getInputValue() {
        return { field1: this._popup.elements['primary'].value };
    }

    setEventListeners() {
        super.setEventListeners();
        this._popup.addEventListener("submit", (evt) => {
            this._formSubmit(evt, this._getInputValue());
            //this.close();
            //this._popup.reset();
        })
    }
}
