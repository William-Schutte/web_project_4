// ###########################  Global Variable Declarations  #####################################

// Imports of Classes
import { Card } from "./card.js";
import { FormValidator } from "./FormValidator.js";

// Buttons
const editBtn = document.querySelector('.profile__edit-button');
const addBtn = document.querySelector('.profile__add-button');

// Form Variables
const formList = Array.from(document.querySelectorAll(".form"));
const formEdit = document.querySelector('#form-edit');
const formAdd = document.querySelector('#form-add');
const formName = formEdit.querySelector(".form__name");
const formOccupation = formEdit.querySelector(".form__occupation");
const formPlace = formAdd.querySelector(".form__place");
const formUrl = formAdd.querySelector(".form__url");
const profileName = document.querySelector(".profile__name");
const profileOccupation = document.querySelector(".profile__occupation");

// Settings object for form validation
const settingsObject = {
    formSelector: ".form",
    inputSelector: ".form__input",
    submitButtonSelector: ".form__save-button",
    inactiveButtonClass: "form__save-button_disabled",
    inputErrorClass: "form__input_error",
    errorClass: "form__error_visible"
};

// Image Cards Variables
const cardList = document.querySelector(".cards__container");
const initialCards = [
    {
        name: "Amsterdam",
        link: "https://images.unsplash.com/photo-1517736996303-4eec4a66bb17?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2134&q=80"
    },
    {
        name: "Bali",
        link: "https://images.unsplash.com/photo-1536152470836-b943b246224c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=678&q=80"
    },
    {
        name: "Machu Picchu",
        link: "https://images.unsplash.com/photo-1509216242873-7786f446f465?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80"
    },
    {
        name: "San Francisco",
        link: "https://images.unsplash.com/photo-1471306224500-6d0d218be372?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
    },
    {
        name: "Athens",
        link: "https://images.unsplash.com/photo-1586172342368-d12ff1546bbc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=701&q=80"
    },
    {
        name: "Switzerland",
        link: "https://images.unsplash.com/photo-1586116458878-8f44c4c290f2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=701&q=80"
    }
];

// ###########################  Close Functions  ##################################################

// Function closes form popup
function closeForm(form) {
    form.classList.add('fade-out');
    form.classList.remove('form_opened', 'fade-in');
    if (form.getAttribute("id") === "form-add") {
        formPlace.value = "";
        formUrl.value = "";
        const submitButton = form.querySelector(".form__save-button");
        submitButton.setAttribute("disabled", " ");
        submitButton.classList.add("form__save-button_disabled");
    }
}


// Function for closing popups with Esc key
function escClose(evt) {
    if (evt.key === "Escape") {
        if (document.querySelector(".form_opened")) {
            closeForm(document.querySelector(".form_opened"));
        } else {
            document.querySelector(".picture").classList.remove("fade-in");
            document.querySelector(".picture").classList.add("fade-out");
        }
    }
}

// ###########################  Open Functions  ###################################################

// Opens the form popup for editing profile info
function openFormEdit() {
    formEdit.classList.remove('form_opened', 'fade-out');
    formName.value = profileName.textContent;
    formOccupation.value = profileOccupation.textContent;
    
    formEdit.classList.add('fade-in', 'form_opened');
}

// Opens the form popup for adding cards
function openFormAdd() {
    formAdd.reset();
    formAdd.classList.remove('form_opened', 'fade-out');
    document.addEventListener("keyup", escClose);
    formAdd.classList.add('fade-in', 'form_opened');
}

// ###########################  Save Functions  ###################################################

// Save Form function, works for both form types
function saveFormEdit(evt) {
    evt.preventDefault();
    // Logic for EDIT Form
    const nameInput = formName.value;
    const occInput = formOccupation.value;
    profileName.textContent = nameInput;
    profileOccupation.textContent = occInput;
    formEdit.classList.add('fade-out');
}

// Edit Form function, works for both form types
function saveFormAdd(evt) {
    evt.preventDefault();
    formAdd.classList.add('fade-out')

    // Logic for ADD Form
    const newCard = {
        name: formPlace.value,
        link: formUrl.value
    };
        
    // Creates new Card object and adds the element to the DOM
    const card = new Card(newCard, "#card-template");
    const cardElem = card.generateCard();
    cardList.prepend(cardElem);
}

// ###########################  Initialization of Page  ###########################################

// Initialization of precoded cards (x6)
initialCards.forEach((itm) => {
    const card = new Card(itm, "#card-template");
    const cardElem = card.generateCard();
    cardList.prepend(cardElem);
});

document.addEventListener("keyup", escClose);

// Listeners for edit btn, add btn, and both forms
editBtn.addEventListener("click", openFormEdit);
addBtn.addEventListener("click", openFormAdd);

formEdit.addEventListener("click", (evt) => {
    evt.stopPropagation();
    if (evt.target.classList.contains("form")) {
        closeForm(formEdit);
    }
});

formAdd.addEventListener("click", (evt) => {
    evt.stopPropagation();
    if (evt.target.classList.contains("form")) {
        closeForm(formAdd);
    }
});

formEdit.addEventListener("submit", saveFormEdit);
formAdd.addEventListener("submit", saveFormAdd);

formEdit.querySelector(".form__exit-button").addEventListener("click", () => closeForm(formEdit));
formAdd.querySelector(".form__exit-button").addEventListener("click", () => closeForm(formAdd));

// From Validation objects
formList.forEach((form) => {
    const formValidator = new FormValidator(settingsObject, form);
    formValidator.enableValidation();
});