// Listener for closing the image by clicking outside the picture or on exit button
const picturePopup = document.querySelector(".picture");
picturePopup.addEventListener("click", (event) => {
    if (event.target.classList.contains("picture__exit-button") || event.target.classList.contains("picture")) {
        picturePopup.classList.remove("fade-in");
        picturePopup.classList.add("fade-out");
    }
});

// Function that opens/creates image popup
function openImgPopup(evt) {
    const imgUrl = evt.target.getAttribute("src");
    const card = evt.target.closest(".card");
    const imgName = card.querySelector(".card__name").textContent;
    picturePopup.classList.remove("fade-out");
    picturePopup.querySelector(".picture__img").setAttribute("src", imgUrl);
    picturePopup.querySelector(".picture__img").setAttribute("alt", `Photo of ${imgName}`);
    picturePopup.querySelector(".picture__title").textContent = imgName;
    picturePopup.classList.add("fade-in");
}

export { openImgPopup };