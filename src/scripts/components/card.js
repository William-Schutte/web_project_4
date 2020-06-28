// ###########################  Card Class  #######################################################

export default class Card {
    constructor({ card, handleCardClick}, templateSelect) {
        this.name = card.name;
        this.link = card.link;
        this._templateSelect = templateSelect;
        this._handleCardClick = handleCardClick;
    }

    _getTemplate() {
        return document.querySelector(`${this._templateSelect}`).content.cloneNode(true);
    }

    _setEventListeners() {
        this._element.querySelector(".card__fav-button").addEventListener("click", (evt) => {this._favToggle(evt)});
        this._element.querySelector(".card__delete-button").addEventListener("click", (evt) => {this._deleteCard(evt)});
        this._element.querySelector(".card__image").addEventListener("click", () => {this._handleCardClick({
            name: this.name,
            link: this.link
        })});
    }

    _favToggle(evt) {
        evt.target.classList.toggle("card__fav-button_active");
    }

    _deleteCard(evt) {
        evt.target.parentElement.remove();
        this._element = null;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();

        this._element.querySelector(".card__name").textContent = this.name;
        this._element.querySelector(".card__image").setAttribute('src', this.link);
        this._element.querySelector(".card__image").setAttribute('alt', `Photo of ${this.name}`);
    
        return this._element;
    }
}