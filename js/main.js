import images from "../gallery-items.js";
let largeImageINDEX = 0;
const galleryRef = document.querySelector(".js-gallery");
const lightboxRef = document.querySelector(".js-lightbox");
const lightboxImageRef = document.querySelector(".lightbox__image");
const lightboxCloseRef = document.querySelector(
  'button[data-action="close-lightbox"]'
);
const lightboxOverlayRef = document.querySelector(".lightbox__overlay");

function createGalleryItems() {
  const itemsToAdd = [];
  images.forEach((image) => {
    const itemLiRef = document.createElement("li");
    itemLiRef.classList.add("gallery__item");

    const itemLinkRef = document.createElement("a");
    itemLinkRef.classList.add("gallery__link");
    itemLinkRef.setAttribute("href", image.original);
    itemLiRef.append(itemLinkRef);

    const itemImageRef = document.createElement("img");
    itemImageRef.classList.add("gallery__image");
    itemImageRef.setAttribute("src", image.preview);
    itemImageRef.setAttribute("data-source", image.original);
    itemImageRef.setAttribute("alt", image.description);
    itemImageRef.setAttribute("data-index", images.indexOf(image));
    itemLinkRef.append(itemImageRef);

    itemsToAdd.push(itemLiRef);
    galleryRef.append(...itemsToAdd);
  });
}

galleryRef.addEventListener("click", onGalleryClick);
lightboxCloseRef.addEventListener("click", closeModal);
lightboxOverlayRef.addEventListener("click", closeModal);
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeModal();
  }
  if (event.key === "ArrowLeft") {
    showPreviousImage(largeImageINDEX);
  }
  if (event.key === "ArrowRight") {
    showNextImage(largeImageINDEX);
  }
});

function onGalleryClick(event) {
  event.preventDefault();
  if (event.target.nodeName !== "IMG") {
    return;
  }
  const imageRef = event.target;
  const largeImageURL = imageRef.dataset.source;
  const largeImageALT = imageRef.alt;
  largeImageINDEX = Number(imageRef.dataset.index);
  setLightboxImage(largeImageURL, largeImageALT);
  openModal();
}

function setLightboxImage(url, alt) {
  lightboxImageRef.src = url;
  lightboxImageRef.alt = alt;
}

function removeLightboxImage() {
  lightboxImageRef.src = "";
  lightboxImageRef.alt = "";
}

function openModal() {
  lightboxRef.classList.add("is-open");
}

function closeModal() {
  lightboxRef.classList.remove("is-open");
  removeLightboxImage();
}

function showPreviousImage(index) {
  if (index > 0) {
    lightboxImageRef.src = images[index - 1].original;
    lightboxImageRef.alt = images[index - 1].description;
    largeImageINDEX -= 1;
  }
}

function showNextImage(index) {
  if (index < images.length - 1) {
    lightboxImageRef.src = images[index + 1].original;
    lightboxImageRef.alt = images[index + 1].description;
    largeImageINDEX += 1;
  }
}

createGalleryItems();