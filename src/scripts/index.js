// ###########################  Global Variable Declarations  #####################################

// CSS Import 
import "../pages/index.css";

// Imports of Classes
import Section from "./components/section.js";
import Card from "./components/card.js";
import PopupWithDelete from "./components/popupWithDelete.js";
import PopupWithForm from "./components/popupWithForm.js";
import PopupWithFormPic from "./components/popupWithFormPic.js"
import FormValidator from "./components/formValidator.js";
import PopupWithImage from "./components/popupWithImage.js";
import UserInfo from "./components/userInfo.js";
import Api from "./components/api.js";

// Buttons
const editBtn = document.querySelector('.profile__edit-button');
const addBtn = document.querySelector('.profile__add-button');
const picBtn = document.querySelector('.profile__pic-button');

// Form Variables
const profileName = document.querySelector(".profile__name");
const profileOccupation = document.querySelector(".profile__occupation");
const profilePic = document.querySelector(".profile__picture");
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
const myUserId = "f8f04dcbc556fa88927f2ab1";

// ###########################  Initialization of Page  ###########################################

// API initialization
const api = new Api({
    baseUrl: "https://around.nomoreparties.co/v1/group-1",
    headers: {
        authorization: "b3ddd9c8-cc64-4470-93b1-0840e92522c5",
        "Content-Type": "application/json"
    }
});

// Image popup Setup
const imagePopup = new PopupWithImage(".picture");
imagePopup.setEventListeners();

// Cards Setup: Initialization of cards from server and rendering, Click handling of cards
const defaultCards = new Section({ items: [], renderer: (itm) => {
    const card = new Card({ card: itm, handleCardClick: (evt, {name, link}) => {
        if (evt.target.classList.contains("card__image")) {
            imagePopup.open({name, link});
        } else if (evt.target.classList.contains("card__fav-button")) {
            api.likeCard(itm, myUserId)
                .then((res) => {
                    if (res.likes.some((like) => {return (like._id === myUserId);})) {
                        evt.target.classList.add("card__fav-button_active");
                    } else {
                        evt.target.classList.remove("card__fav-button_active");
                    }
                    evt.target.parentElement.querySelector(".card__like-count").textContent = res.likes.length;
                });
        }
    } }, "#card-template", myUserId);
    defaultCards.addItem(card.generateCard());
}}, ".cards__container");

api.getInitialCards()
    .then((res) => {
        defaultCards._items = res;
        defaultCards.renderSection();
    })
    .catch((err) => {console.log(err)});

// User Info Setup
const userInfo = new UserInfo({ name: profileName, about: profileOccupation, pic: profilePic });
api.getUserInfo()
    .then((res) => {
        userInfo.setUserInfo({ name: res.name, about: res.about });
        userInfo.setUserPic({ url: res.avatar });
    })
    .catch((err) => {console.log(err)});


// ############################# Form Setups ##################################

// Form Setup: Edit user info 
const formEdit = new PopupWithForm({ formSubmit: (evt, vals) => {
    evt.preventDefault();
    formEdit.changeLoadingText(true);
    api.patchUserInfo({ name: vals.field1, about: vals.field2 })
        .then((res) => {
            userInfo.setUserInfo({ name: res.name, about: res.about });
            userInfo.setUserPic({ url: res.avatar });
            formEdit.close();})
        .catch((err) => {console.log(err)})
        .finally(() => {
            formEdit.changeLoadingText(false);
            formEdit._popup.reset();
        });

}, selector: '#form-edit' });
formEdit.setEventListeners();

// Form Setup: Edit user pic
const formPic = new PopupWithFormPic({ formSubmit: (evt, vals) => {
    evt.preventDefault();
    formPic.changeLoadingText(true);
    api.patchUserPic({ avatar: vals.field1 })
        .then((res) => {
            userInfo.setUserPic({ url: res.avatar });
            formPic.close();
        })
        .catch((err) => {console.log(err)})
        .finally(() => {
            formPic.changeLoadingText(false);
            formPic._popup.reset();
        });
    }, selector: '#form-pic' });
formPic.setEventListeners();

// Form Setup: Add new card 
const formAdd = new PopupWithForm({ formSubmit: (evt, vals) => {
    evt.preventDefault();
    formAdd.changeLoadingText(true);
    api.addNewCard({ name: vals.field1, link: vals.field2})
        .then((res) => {
            const card = new Card({ card: res, handleCardClick: (evt, {name, link}) => {
                if (evt.target.classList.contains("card__image")) {
                    imagePopup.open({name, link});
                } else if (evt.target.classList.contains("card__fav-button")) {
                    api.likeCard(res, myUserId)
                        .then((res) => {
                            if (res.likes.some((like) => {return (like._id === myUserId);})) {
                                evt.target.classList.add("card__fav-button_active");
                            } else {
                                evt.target.classList.remove("card__fav-button_active");
                            }
                            evt.target.parentElement.querySelector(".card__like-count").textContent = res.likes.length;
                        });
                }
            } }, "#card-template", myUserId);
            defaultCards.addItem(card.generateCard());
            formAdd.close()
        })
        .catch((err) => console.log(err))
        .finally(() => {
            formAdd.changeLoadingText(false);
            formAdd._popup.reset();
        });
    }, selector: '#form-add' });
formAdd.setEventListeners();

// Form Setup: Delete Card
const formDelete = new PopupWithDelete({ formSubmit: () => {
    api.deleteCard(formDelete.currentCardId)
        .catch((err) => console.log(err))
        .finally(() => {
            api.getInitialCards()
            .then((res) => {
                defaultCards._items = res;
                defaultCards.renderSection();
            })
            .catch((err) => {console.log(err)});
        });
}, selector: '#form-delete'});
formDelete.setEventListeners();

// ############################################################################

// Listeners for form open buttons
editBtn.addEventListener("click", () => {
    const fields = userInfo.getUserInfo();
    formName.value = fields.name;
    formOcc.value = fields.about;
    formEdit.open();
});
addBtn.addEventListener("click", () => formAdd.open());
picBtn.addEventListener("click", () => formPic.open());

// Validation: Form validators
const formValidatorEdit = new FormValidator(settingsObject, "#form-edit");
formValidatorEdit.enableValidation();

const formValidatorAdd = new FormValidator(settingsObject, "#form-add");
formValidatorAdd.enableValidation();