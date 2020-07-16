// ###########################  PopupWithDelete Class  ##############################################
import Popup from "./popup.js";

export default class PopupWithDelete extends Popup {
    constructor({ formSubmit, selector }) {
        super(selector);
        this._formSubmit = formSubmit;
    }

    setEventListeners() {
        super.setEventListeners();
        document.querySelector('.cards').addEventListener("click", (evt) => {
            evt.stopPropagation();
            if (evt.target.classList.contains('card__delete-button')) {
                // Get card ID from the card click event
                this.currentCardId = evt.target.name;
                this.open();
            }
        })
        this._popup.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this._formSubmit();
            this.close();
        });
    }

}