// ###########################  Popup Class  #####################################################

export default class Popup {
    constructor(selector) {
        this._popup = document.querySelector(selector);
        this._handleEscClose = this._handleEscClose.bind(this);
        if (this._popup.querySelector(".form__save-button")) {
            this._submitBtn = this._popup.querySelector(".form__save-button")
            this._submitBtnText = this._submitBtn.textContent;
        }
    }

    open() {
        this._popup.classList.add('popup-opened');
        document.addEventListener('keyup', this._handleEscClose);
    }

    close() {
        this._popup.classList.remove('popup-opened');
        document.removeEventListener('keyup', this._handleEscClose);
    }

    _handleEscClose(evt) {
        if (evt.key === "Escape") {
            this.close();
        }
    }

    changeLoadingText(isLoading) {
        if (isLoading) {
            this._submitBtn.textContent = "Saving...";
        } else {
            this._submitBtn.textContent = this._submitBtnText;
        }
    }
    
    setEventListeners() {
        this._popup.addEventListener("click", (evt) => {
            evt.stopPropagation();
            if (evt.target.classList.contains("form__exit-button")) {
                this.close();
            }
        });
    }
}
