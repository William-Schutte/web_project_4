// ###########################  Card Class  #######################################################
import {animationDelay} from "./index.js";

class Card {
    constructor(newCard, templateSelect) {
        this.name = newCard.name;
        this.link = newCard.link;
        this.templateSelect = templateSelect;
    }

    _getTemplate(tempSelect) {
        const template = document.querySelector(`${tempSelect}`).content.cloneNode(true);
        return template;
    }

    _setEventListeners() {
        const favButton = this._element.querySelector(".card__fav-button");
        const deleteButton = this._element.querySelector(".card__delete-button");

        favButton.addEventListener("click", (evt) => {this._favToggle(evt)});
        deleteButton.addEventListener("click", (evt) => {this._deleteCard(evt)});
    }

    _favToggle(evt) {
        evt.target.classList.toggle("card__fav-button_active");
    }

    _deleteCard(evt) {
        evt.target.parentElement.remove();
    }

    _escClose(evt) {
        if (evt.key === "Escape") {
            console.log(this);
            this._closeImgPopup();
        }
    }

    generateCard() {
        this._element = this._getTemplate(this.templateSelect);
        this._setEventListeners();

        this._element.querySelector(".card__name").textContent = this.name;
        this._element.querySelector(".card__image").setAttribute('src', this.link);
        this._element.querySelector(".card__image").setAttribute('alt', "Photo of " + this.name);
    
        return this._element;
    }
}

export { Card };