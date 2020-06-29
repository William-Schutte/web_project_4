// ###########################  PopupWithForm Class  ##############################################
import Popup from "./popup.js";

export default class PopupWithForm extends Popup {
    constructor({ formSubmit, selector }) {
        super(selector);
        this._formSubmit = formSubmit;
    }

    _getInputValues() {
        return { field1: this._popup.elements['primary'].value, field2: this._popup.elements['secondary'].value };
    }

    setEventListeners() {
        super.setEventListeners();
        this._popup.addEventListener("submit", (evt) => {
            this._formSubmit(evt, this._getInputValues());
            this.close();
            this._popup.reset();
        })
    }
}
