// ###########################  Validation  #######################################################

// ###########################  Edit Profile Form Validation  #####################################
// Both fields required, Name Field between 2 and 40 chars, About Field between 2 and 200 chars
// Name field only letters, spaces, and hyphens
// Use default error messages
// Save button inactive until fields are valid

// ###########################  New Place Form Validation  ########################################
// Both fields required, Title Field between 1 and 30 chars
// URL Field must contain a URL
// Use default error messages
// Save button inactive until fields are valid


// Close the popup by clicking outside the form
// Close the popup by pressing the Esc key

// enabling validation by calling enableValidation()
// pass all the settings on call

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
        submitButton.classList.add("btn-animate");
    } else {
        submitButton.classList.add(settings.inactiveButtonClass);
        submitButton.setAttribute("disabled", " ");
        submitButton.classList.remove("btn-animate");
    }
}

function enableValidation(settings) {
    // List of all (both) forms
    const formList = Array.from(document.querySelectorAll(settings.formSelector));
    // Prevent default submit button event
    formList.forEach((form) => {
        form.addEventListener("submit", function (evt) {
            evt.preventDefault();
        });

        // All inputs in the form
        const inputs = Array.from(form.querySelectorAll(settings.inputSelector));
        // Form submit button
        const submitButton = form.querySelector(settings.submitButtonSelector);

        // For each input field
        inputs.forEach((input) => {
            input.addEventListener("input", () => {
                checkInputValidity(form, input, settings);
                toggleButtonState(inputs, submitButton, settings);
            })
        })
    });
}



enableValidation(settingsObject);
console.log("hello");