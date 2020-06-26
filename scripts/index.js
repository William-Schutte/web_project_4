// ###########################  Global Variable Declarations  #####################################

// Imports of Classes
import Section from "./Section.js";
import Card from "./Card.js";
import PopupWithForm from "./PopupWithForm.js";
import FormValidator from "./FormValidator.js";
import PopupWithImage from "./popupWithImage.js";
import UserInfo from "./UserInfo.js";

// Buttons
const editBtn = document.querySelector('.profile__edit-button');
const addBtn = document.querySelector('.profile__add-button');

// Form Variables
const formList = Array.from(document.querySelectorAll(".form"));
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


// ###########################  Initialization of Page  ###########################################

// Cards Setup: Initialization of precoded cards (x6)
const defaultCards = new Section({ items: initialCards, renderer: (itm) => {
    const card = new Card({ card: itm, handleCardClick: ({name, link}) => {
        imagePopup.open({name, link});
    } }, "#card-template");
    const cardElem = card.generateCard();
    defaultCards.addItem(cardElem);
}}, ".cards__container");
defaultCards.renderSection();

// User Info Setup
const userInfo = new UserInfo({ name: profileName, occ: profileOccupation });

// Form Setup: Edit user info 
const formEdit = new PopupWithForm({ formSubmit: (evt) => {
    evt.preventDefault();
    const vals = formEdit._getInputValues();
    userInfo.setUserInfo({ name: vals[0].value, occ: vals[1].value});
}, selector: '#form-edit' });
formEdit.setEventListeners();


// Form Setup: Add new card 
const formAdd = new PopupWithForm({ formSubmit: (evt) => {
    evt.preventDefault();
    const vals = formAdd._getInputValues();
    const newCard = { name: vals[0].value, link: vals[1].value };
    const card = new Card({ card: newCard, handleCardClick: ({name, link}) => {
        imagePopup.open({name, link});
    } }, "#card-template");
    cardList.prepend(card.generateCard());
}, selector: '#form-add' });
formAdd.setEventListeners();

// Image popup Setup
const imagePopup = new PopupWithImage(".picture");
imagePopup.setEventListeners();


// Listeners for form open buttons
editBtn.addEventListener("click", () => {
    const fields = userInfo.getUserInfo();
    document.querySelector(".form__name").value = fields.name;
    document.querySelector(".form__occupation").value = fields.occ;
    formEdit.open();
});
addBtn.addEventListener("click", () => formAdd.open());

// formEdit.addEventListener("click", (evt) => {
//     evt.stopPropagation();
//     if (evt.target.classList.contains("form")) {
//         closeForm(formEdit);
//     }
// });


// Validation: Form validators
formList.forEach((form) => {
    const formValidator = new FormValidator(settingsObject, form);
    formValidator.enableValidation();
});