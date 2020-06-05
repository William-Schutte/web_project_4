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
const pictureTemplate = document.querySelector("#picture-popup-template");
const page = document.querySelector(".content");
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

// Variable for delay functions, used to time closing of popups w/ CSS animation time
const animationDelay = 0;

// ###########################  Image Popup Functions  #############################################

// Function for closing image
function closeImgPopup() {
    const picPopup = document.querySelector(".picture");
    document.removeEventListener("keyup", escClose);
    picPopup.classList.add("fade-out");
}

// Function closes form popup
function closeForm(form) {
    form.classList.remove('form_opened');
    form.classList.remove('fade-out');
    form.removeEventListener("animationend", () => closeForm(form));
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
    if (evt.key === "Escape" && document.querySelector(".form_opened")) {
        let form = document.querySelector(".form_opened");
        document.removeEventListener("keyup", escClose);
        form.classList.add('fade-out');
        form.addEventListener("animationend", () => closeForm(form));
    } else if (evt.key === "Escape") {
        closeImgPopup();
    }
}

// Function that opens/creates image popup
function openImgPopup(evt) {
    
    const imgUrl = evt.target.getAttribute("src");
    const card = evt.target.closest(".card");
    const imgName = card.querySelector(".card__name").textContent;
    const picturePopup = pictureTemplate.content.cloneNode(true).querySelector(".picture");
    picturePopup.querySelector(".picture__img").setAttribute("src", imgUrl);
    picturePopup.querySelector(".picture__img").setAttribute("alt", `Photo of ${imgName}`);
    picturePopup.querySelector(".picture__title").textContent = imgName;
    
    document.addEventListener("keyup", escClose);
    picturePopup.addEventListener("click", function (evt) {
        if (evt.target.classList.contains("picture__exit-button") || evt.target.classList.contains("picture")) {
            closeImgPopup();
        }
    });
    picturePopup.addEventListener("animationend", function (evt) {
        if (evt.animationName === 'fadeOut') {
            picturePopup.classList.toggle("cool");
            picturePopup.remove();
        }
    });
    picturePopup.classList.add("fade-in");
    page.append(picturePopup);
}

// ###########################  Form Open/Closing Functions  ######################################

// Opens the form popup for editing profile info
function openFormEdit() {
    formName.value = profileName.textContent;
    formOccupation.value = profileOccupation.textContent;
    document.addEventListener("keyup", escClose);
    formEdit.classList.add('form_opened');
}

// Opens the form popup for adding cards
function openFormAdd() {
    document.addEventListener("keyup", escClose);
    formAdd.classList.add('form_opened');
}

// Save Form function, works for both form types
function saveForm(evt) {
    evt.preventDefault();
    let form = document.querySelector(".form_opened");

    // Logic for EDIT FORM and ADD FORM
    if (form.getAttribute("id") === "form-edit") {
        const nameInput = formName.value;
        const occInput = formOccupation.value;
        profileName.textContent = nameInput;
        profileOccupation.textContent = occInput;
    } else {
        const newCard = {
            name: "",
            link: ""
        };
        newCard.name = formPlace.value;
        newCard.link = formUrl.value;
        
        // Creates new Card object and adds the element to the DOM
        const card = new Card(newCard, "#card-template");
        const cardElem = card.generateCard();
        cardList.prepend(cardElem);

        // Reset fields for next open
        formPlace.value = "";
        formUrl.value = "";
    }

    document.removeEventListener("keyup", escClose);
    form.classList.add('fade-out');
}

// Creates listeners for closing and saving forms
function formListeners(evt) {
    evt.stopPropagation();
    if (evt.target.classList.contains("form") || evt.target.classList.contains("form__exit-button")) {
        let form = document.querySelector(".form_opened");
        document.removeEventListener("keyup", escClose);
        form.classList.add('fade-out');
    } else if (evt.target.classList.contains("form__save-button")) {
        saveForm(evt);
    }
}

// ###########################  Initialization of Page  ###########################################

// Initialization of precoded cards (x6)
initialCards.forEach((itm) => {
    const card = new Card(itm, "#card-template");
    const cardElem = card.generateCard();
    cardList.prepend(cardElem);
});

// Listeners for edit btn, add btn, and both forms
editBtn.addEventListener("click", openFormEdit);
addBtn.addEventListener("click", openFormAdd);

formEdit.addEventListener("click", formListeners);
formEdit.addEventListener("animationend", function (evt) {
    if (evt.animationName === 'fadeOut') {closeForm(formEdit)}
});

formAdd.addEventListener("click", formListeners);
formAdd.addEventListener("animationend", function (evt) {
    if (evt.animationName === 'fadeOut') {closeForm(formAdd)}
});

// Listener for image popup
page.addEventListener("click", function (evt) {
    if (evt.target.classList.contains("card__image")) {
        openImgPopup(evt);
    }
});

// From Validation objects
formList.forEach((form) => {
    const formValidator = new FormValidator(settingsObject, form);
    formValidator.enableValidation();
});