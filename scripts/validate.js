// ###########################  Validation  #######################################################

const settingsObject = {
    formSelector: ".form",
    inputSelector: ".form__input",
    submitButtonSelector: ".form__save-button",
    inactiveButtonClass: "form__save-button_disabled",
    inputErrorClass: "form__input_error",
    errorClass: "form__error_visible"
};

// Function shows error message below input field
function showErrorMessage(form, input, settings) {
    const error = form.querySelector(`#${input.id}-error`);
    
    error.textContent = input.validationMessage; 
    error.classList.add(settings.errorClass);
    input.classList.add(settings.inputErrorClass);
}

// Function hides error message below input field
function hideErrorMessage(form, input, settings) {
    const error = form.querySelector(`#${input.id}-error`);

    error.textContent = "";
    error.classList.remove(settings.errorClass);
    input.classList.remove(settings.inputErrorClass);
}

// Function checks individual input field validity
function checkInputValidity(form, input, settings) {
    if (input.validity.valid) {
        hideErrorMessage(form, input, settings);
    } else {
        showErrorMessage(form, input, settings);
    }
}

// Function toggles the button state depending on input validity
function toggleButtonState(inputs, submitButton, settings) {
    const isValid = inputs.every((input) => input.validity.valid);

    if (isValid) {
        submitButton.classList.remove(settings.inactiveButtonClass);
        submitButton.removeAttribute("disabled");
    } else {
        submitButton.classList.add(settings.inactiveButtonClass);
        submitButton.setAttribute("disabled", " ");
    }
}

function enableValidation({formSelector, inputSelector, submitButtonSelector, ...rest}) {
    // List of all (both) forms
    const formList = Array.from(document.querySelectorAll(formSelector));
    // Prevent default submit button event
    formList.forEach(function (form) {
        form.addEventListener("submit", function (evt) {
            evt.preventDefault();
        });

        // All inputs in the form
        const inputs = Array.from(form.querySelectorAll(inputSelector));
        // Form submit button
        const submitButton = form.querySelector(submitButtonSelector);

        // For each input field
        inputs.forEach(function (input) {
            input.addEventListener("input", function (evt) {
                checkInputValidity(form, input, rest);
                toggleButtonState(inputs, submitButton, rest);
            })
        })
    });
}

enableValidation(settingsObject);