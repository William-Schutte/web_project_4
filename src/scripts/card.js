// ###########################  Card Class  #######################################################

export default class Card {
    constructor({ card, handleCardClick}, templateSelect) {
        this.name = card.name;
        this.link = card.link;
        this.templateSelect = templateSelect;
        this._handleCardClick = handleCardClick;
    }

    _getTemplate(tempSelect) {
        const template = document.querySelector(`${tempSelect}`).content.cloneNode(true);
        return template;
    }

    _setEventListeners() {
        const favButton = this._element.querySelector(".card__fav-button");
        const deleteButton = this._element.querySelector(".card__delete-button");
        const cardImage = this._element.querySelector(".card__image");

        favButton.addEventListener("click", (evt) => {this._favToggle(evt)});
        deleteButton.addEventListener("click", (evt) => {this._deleteCard(evt)});
        cardImage.addEventListener("click", () => {this._handleCardClick({
            name: this.name,
            link: this.link
        })});
    }

    _favToggle(evt) {
        evt.target.classList.toggle("card__fav-button_active");
    }

    _deleteCard(evt) {
        evt.target.parentElement.remove();
    }

    generateCard() {
        this._element = this._getTemplate(this.templateSelect);
        this._setEventListeners();

        this._element.querySelector(".card__name").textContent = this.name;
        this._element.querySelector(".card__image").setAttribute('src', this.link);
        this._element.querySelector(".card__image").setAttribute('alt', `Photo of ${this.name}`);
    
        return this._element;
    }
}