// ###########################  Card Class  #######################################################

export default class Card {
    constructor({ card, handleCardClick }, templateSelect, user) {
        this.name = card.name;
        this.link = card.link;
        this.likes = card.likes;
        this._id = card._id;
        this._creator = card.owner._id;
        this._templateSelect = templateSelect;        
        this._handleCardClick = handleCardClick;
        this._user = user;
    }

    _getTemplate() {
        return document.querySelector(`${this._templateSelect}`).content.cloneNode(true);
    }

    _setEventListeners() {
        //this._element.querySelector(".card__fav-button").addEventListener("click", (evt) => {this._favToggle(evt)});
        this._element.querySelector(".card__image").parentElement.addEventListener("click", (evt) => {this._handleCardClick(evt, {
            name: this.name,
            link: this.link
        })});
    }

    _favToggle(evt) {
        evt.target.classList.toggle("card__fav-button_active");
    }

    _deleteCard() {
        evt.target.parentElement.remove();
        this._element = null;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        if (this._creator !== this._user) {
            this._element.querySelector(".card__delete-button").style.display = "none";
        } else {
            this._element.querySelector(".card__delete-button").name = this._id;
            this._element.querySelector(".card__fav-button").name = this._id;
        }
        if (this.likes.some((like) => {return (like._id === this._user);})) {
            this._element.querySelector(".card__fav-button").classList.add("card__fav-button_active");
        }
        this._element.querySelector(".card__name").textContent = this.name;
        this._element.querySelector(".card__image").setAttribute('src', this.link);
        this._element.querySelector(".card__image").setAttribute('alt', `Photo of ${this.name}`);
        this._element.querySelector(".card__like-count").textContent = this.likes.length;
        return this._element;
    }
}