const ariGalleryImages = document.querySelectorAll(".ari-gallery-grid img");
const ariLightbox = document.getElementById("ari-lightbox");
const ariLightboxImg = document.getElementById("ari-lightbox-img");
const ariLightboxCounter = document.getElementById("ari-lightbox-counter");
const ariLightboxClose = document.getElementById("ari-lightbox-close");
const ariLightboxPrev = document.getElementById("ari-lightbox-prev");
const ariLightboxNext = document.getElementById("ari-lightbox-next");

// Current index of the image being displayed in the lightbox
let ariCurrentIndex = 0;

// Function to open the lightbox with the selected image
function ariOpenLightbox(index) {
  ariCurrentIndex = index;
  ariUpdateLightboxImage();
  ariLightbox.classList.add("active");
  document.body.classList.add("ari-lightbox-open");
}

// Function to close the lightbox
function ariCloseLightbox() {
  ariLightbox.classList.remove("active");
  document.body.classList.remove("ari-lightbox-open");
}

// Function to update the lightbox image and counter
function ariUpdateLightboxImage() {
  const img = ariGalleryImages[ariCurrentIndex];
  ariLightboxImg.src = img.src;
  ariLightboxImg.alt = img.alt;
  ariLightboxCounter.textContent = `${ariCurrentIndex + 1} / ${ariGalleryImages.length}`;
}

// Function to show the previous image in the lightbox
function ariShowPrev() {
  ariCurrentIndex = (ariCurrentIndex - 1 + ariGalleryImages.length) % ariGalleryImages.length;
  ariUpdateLightboxImage();
}

// Function to show the next image in the lightbox
function ariShowNext() {
  ariCurrentIndex = (ariCurrentIndex + 1) % ariGalleryImages.length;
  ariUpdateLightboxImage();
}

// Add click event listeners to each gallery image
ariGalleryImages.forEach((img, index) => {
  img.style.cursor = "pointer";
  img.addEventListener("click", () => ariOpenLightbox(index));
});

// Add event listeners for lightbox controls
ariLightboxClose.addEventListener("click", ariCloseLightbox);
ariLightboxPrev.addEventListener("click", ariShowPrev);
ariLightboxNext.addEventListener("click", ariShowNext);

// Click on the dark backdrop (but not the image itself) also closes it
ariLightbox.addEventListener("click", (e) => {
  if (e.target === ariLightbox) {
    ariCloseLightbox();
  }
});

// Keyboard navigation
document.addEventListener("keydown", (e) => {
  if (!ariLightbox.classList.contains("active")) return;

  if (e.key === "Escape") ariCloseLightbox();
  if (e.key === "ArrowLeft") ariShowPrev();
  if (e.key === "ArrowRight") ariShowNext();
});