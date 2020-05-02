// ###########################  Global Variable Declarations  #####################################
// Buttons
const editBtn = document.querySelector('.profile__edit-button');
const addBtn = document.querySelector('.profile__add-button');

// Edit Form Variables
const formEdit = document.querySelector('#form-edit');
const formAdd = document.querySelector('#form-add');
const closeBtnEdit = formEdit.querySelector('.form__exit-button');
const saveBtnEdit = formEdit.querySelector('.form__save-button');
const closeBtnAdd = formAdd.querySelector('.form__exit-button');
const saveBtnAdd = formAdd.querySelector('.form__save-button');
const formName = formEdit.querySelector(".form__name");
const formOccupation = formEdit.querySelector(".form__occupation");
const formPlace = formAdd.querySelector(".form__place");
const formUrl = formAdd.querySelector(".form__url");

const profileName = document.querySelector(".profile__name");
const profileOccupation = document.querySelector(".profile__occupation");


// Image Cards Variables
const cardList = document.querySelector(".cards__container");
const cardTemplate = document.querySelector("#card-template");
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
const animationDelay = 400;


// ###########################  Card Creation Functions  ##########################################

// Function for adding new cards, also used to set initial cards
function createCard(cardText) {
    const newCard = cardTemplate.content.cloneNode(true);
    const nameString = cardText.name;
    const imgString =  cardText.link;
    newCard.querySelector(".card__name").textContent = nameString;
    newCard.querySelector(".card__image").setAttribute('src', imgString);
    newCard.querySelector(".card__image").setAttribute('alt', "Photo of " + nameString);

    // Adds event listener to each card's fav button, delete button, and img
    const favButton = newCard.querySelector(".card__fav-button");
    favButton.addEventListener("click", favToggle);
    const deleteButton = newCard.querySelector(".card__delete-button");
    deleteButton.addEventListener("click", deleteCard);
    const imgButton = newCard.querySelector(".card__image");
    imgButton.addEventListener("click", imgOpen);

    cardList.prepend(newCard);
}

// Favorite button toggle function
function favToggle(evt) {
    evt.target.classList.toggle("card__fav-button_active");
}

// Delete card function
function deleteCard(evt) {
    evt.target.parentElement.remove();
}

// ###########################  Image Popup Function  #############################################

// Function for closing image, nested in imgOpen due to event listener on created closeButton below
function imgClose(evt) {
    const picPopup = evt.target.parentElement.parentElement;
    picPopup.classList.add("fade-out");
    setTimeout(function () {
        picPopup.remove();
    }, animationDelay);
}

// Function that opens/creates image popup
function imgOpen(evt) {
    const imgUrl = evt.target.getAttribute("src");
    const card = evt.target.closest(".card");
    const imgName = card.querySelector(".card__name").textContent;
    const picturePopup = pictureTemplate.content.cloneNode(true).querySelector(".picture");
    picturePopup.querySelector(".picture__img").setAttribute("src", imgUrl);
    picturePopup.querySelector(".picture__img").setAttribute("alt", "Photo of " + imgName);
    picturePopup.querySelector(".picture__title").textContent = imgName;
        
    const closeButton = picturePopup.querySelector(".picture__exit-button");
    closeButton.addEventListener("click", imgClose);
    picturePopup.classList.add("fade-in");
    page.append(picturePopup);
}

// ###########################  Form Open/Closing Functions  ######################################

// Opens the form popup for editing profile info
function openFormEdit() {
    formName.setAttribute('value', profileName.textContent)
    formOccupation.setAttribute('value', profileOccupation.textContent)

    formEdit.classList.toggle('form_opened');
}

function openFormAdd() {
    formAdd.classList.toggle('form_opened');
}

// Function closes form popup
function closeForm(evt) {
    form = evt.target.parentElement.parentElement;

    form.classList.add('fade-out');
    
    // Timer used to allow time for fade-out animation
    setTimeout(function () {
        form.classList.toggle('form_opened');
        form.classList.remove('fade-out');
    }, animationDelay);  
}

// Save Form function, works for both form types
function saveForm(evt) {
    evt.preventDefault();
    form = evt.target.parentElement.parentElement;

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
        
        createCard(newCard);

        // Reset fields for next open
        formPlace.value = "";
        formUrl.value = "";
    }

    closeForm(evt);
}

// ###########################  Initialization of Page  ###########################################

// Initialization of precoded cards (x6)
initialCards.forEach(function (card) {createCard(card)});

// Listeners for edit btn, add btn, and both btns on each form
editBtn.addEventListener("click", openFormEdit);
addBtn.addEventListener("click", openFormAdd);
closeBtnEdit.addEventListener("click", closeForm);
saveBtnEdit.addEventListener("click", saveForm);
closeBtnAdd.addEventListener("click", closeForm);
saveBtnAdd.addEventListener("click", saveForm);
