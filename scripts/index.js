const editBtn = document.querySelector('.profile__edit-button');
const form = document.querySelector('.form');
const closeBtn = form.querySelector('.form__exit-button');
const saveBtn = form.querySelector('.form__save-button');
let formName = form.querySelector(".form__name");
let formOccupation = form.querySelector(".form__occupation");

let profileName = document.querySelector(".profile__name");
let profileOccupation = document.querySelector(".profile__occupation");

formName.setAttribute('value', profileName.textContent.trim());
formOccupation.setAttribute('value', profileOccupation.textContent);

function openForm() {
    form.classList.toggle('form_opened');
}

console.log(formName);
function saveForm(evt) {
    evt.preventDefault();

    let nameInput = formName.value;
    let occInput = formOccupation.value;
    console.log(nameInput);

    profileName.textContent = nameInput;
    profileOccupation.textContent = occInput;

    form.classList.toggle('form_opened');
}

editBtn.addEventListener("click", openForm);
closeBtn.addEventListener("click", openForm);
saveBtn.addEventListener("click", saveForm);
