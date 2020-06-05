// ###########################  Form Validator Class  #############################################

class FormValidator {
    constructor(settings, formElement) {
        this.settings = settings;
        this.formElement = formElement;
    }

    // Function shows error message below input field
    _showErrorMessage(input) {
        const error = this.formElement.querySelector(`#${input.id}-error`);
        
        error.textContent = input.validationMessage; 
        error.classList.add(this.settings.errorClass);
        input.classList.add(this.settings.inputErrorClass);
    }

    // Function hides error message below input field
    _hideErrorMessage(input) {
        const error = this.formElement.querySelector(`#${input.id}-error`);

        error.textContent = "";
        error.classList.remove(this.settings.errorClass);
        input.classList.remove(this.settings.inputErrorClass);
    }

    // Function checks individual input field validity
    _checkInputValidity(input) {
        if (input.validity.valid) {
            this._hideErrorMessage(input);
        } else {
            this._showErrorMessage(input);
        }
    }

    // Function toggles the button state depending on input validity
    _toggleButtonState() {
        const isValid = this._inputs.every((input) => input.validity.valid);

        if (isValid) {
            this._submitButton.classList.remove(this.settings.inactiveButtonClass);
            this._submitButton.removeAttribute("disabled");
        } else {
            this._submitButton.classList.add(this.settings.inactiveButtonClass);
            this._submitButton.setAttribute("disabled", " ");
        }
    }

    enableValidation() {
        this.formElement.addEventListener("submit", (evt) => {
            evt.preventDefault();
        });
    
        // All inputs in the form
        this._inputs = Array.from(this.formElement.querySelectorAll(this.settings.inputSelector));
        // Form submit button
        this._submitButton = this.formElement.querySelector(this.settings.submitButtonSelector);   
        
        // For each input field
        this._inputs.forEach((input) => {
            input.addEventListener("input", () => {
                this._checkInputValidity(input);
                this._toggleButtonState();
            });
        });
    }
}

export { FormValidator };