import images from "../gallery-items.js";

const galleryRef = document.querySelector(".js-gallery");
const lightboxRef = document.querySelector(".js-lightbox");
const lightboxImageRef = document.querySelector(".lightbox__image");
const lightboxCloseRef = document.querySelector(
  'button[data-action="close-lightbox"]'
);

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
    itemLinkRef.append(itemImageRef);

    itemsToAdd.push(itemLiRef);
    galleryRef.append(...itemsToAdd);
  });
}

createGalleryItems();

galleryRef.addEventListener("click", onGalleryClick);
lightboxCloseRef.addEventListener("click", closeModal);

function onGalleryClick(event) {
  event.preventDefault();
  if (event.target.nodeName !== "IMG") {
    return;
  }
  const imageRef = event.target;
  const largeImageURL = imageRef.dataset.source;
  const largeImageALT = imageRef.alt;
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
  removeLightboxImage()
}
