// ###########################  Global Variable Declarations  #####################################

// CSS Import 
import "../pages/index.css";

// Imports of Classes
import Section from "./components/section.js";
import Card from "./components/card.js";
import PopupWithForm from "./components/popupWithForm.js";
import FormValidator from "./components/formValidator.js";
import PopupWithImage from "./components/popupWithImage.js";
import UserInfo from "./components/userInfo.js";

// Buttons
const editBtn = document.querySelector('.profile__edit-button');
const addBtn = document.querySelector('.profile__add-button');

// Form Variables
const profileName = document.querySelector(".profile__name");
const profileOccupation = document.querySelector(".profile__occupation");
const formName = document.querySelector(".form__name");
const formOcc = document.querySelector(".form__occupation");

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

// Image popup Setup
const imagePopup = new PopupWithImage(".picture");
imagePopup.setEventListeners();

// Cards Setup: Initialization of precoded cards (x6)
const defaultCards = new Section({ items: initialCards, renderer: (itm) => {
    const card = new Card({ card: itm, handleCardClick: ({name, link}) => {
        imagePopup.open({name, link});
    } }, "#card-template");
    defaultCards.addItem(card.generateCard());
}}, ".cards__container");
defaultCards.renderSection();

// User Info Setup
const userInfo = new UserInfo({ name: profileName, occ: profileOccupation });

// Form Setup: Edit user info 
const formEdit = new PopupWithForm({ formSubmit: (evt, vals) => {
    evt.preventDefault();
    userInfo.setUserInfo({ name: vals.field1, occ: vals.field2 });
}, selector: '#form-edit' });
formEdit.setEventListeners();

// Form Setup: Add new card 
const formAdd = new PopupWithForm({ formSubmit: (evt, vals) => {
    evt.preventDefault();
    const newCard = { name: vals.field1, link: vals.field2 };
    const card = new Card({ card: newCard, handleCardClick: ({name, link}) => {
        imagePopup.open({name, link});
    } }, "#card-template");
    defaultCards.addItem(card.generateCard());
}, selector: '#form-add' });
formAdd.setEventListeners();

// Listeners for form open buttons
editBtn.addEventListener("click", () => {
    const fields = userInfo.getUserInfo();
    formName.value = fields.name;
    formOcc.value = fields.occ;
    formEdit.open();
});
addBtn.addEventListener("click", () => formAdd.open());

// Validation: Form validators
const formValidatorEdit = new FormValidator(settingsObject, "#form-edit");
formValidatorEdit.enableValidation();

const formValidatorAdd = new FormValidator(settingsObject, "#form-add");
formValidatorAdd.enableValidation();