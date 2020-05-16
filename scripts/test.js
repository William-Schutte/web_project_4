
// ####################  Show Input Error
const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add("form__input_type_error");
    errorElement.textContent = errorMessage;
    errorElement.classList.add("form__input-error_active");
};
  
// ####################  Hide Input Error
const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove("form__input_type_error");
    errorElement.classList.remove("form__input-error_active");
    errorElement.textContent = "";
};

// ####################  Check Input Validity of Form for Error Messages
const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(formElement, inputElement);
    }
};

// ####################  Check Validity of Inputs for Button
const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
};

// ####################  Turns Button On/Off
const toggleButtonState = (inputList, buttonElement) => {
    console.log(hasInvalidInput(inputList));
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add("button_inactive");
    } else {
      buttonElement.classList.remove("button_inactive");
    }
};

// ####################  Sets listeners for inputs
const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(".form__input"));
    const buttonElement = formElement.querySelector(".form__submit");
    toggleButtonState(inputList, buttonElement);
    
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", function () {
        checkInputValidity(formElement, inputElement);
        toggleButtonState(inputList, buttonElement);
      });
    });
};

// ####################  Enables validation for the form, sets listener for submit buttons
const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll(".form"));
    formList.forEach((formElement) => {
        formElement.addEventListener("submit", function (evt) {
            evt.preventDefault();
        });
  
        const fieldsetList = Array.from(formElement.querySelectorAll(".form__set"));
  
        fieldsetList.forEach((fieldset) => {
            setEventListeners(fieldset);
        });
    });
};

enableValidation();  