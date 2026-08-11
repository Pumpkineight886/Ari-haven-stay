const ariGalleryImages = document.querySelectorAll(".ari-gallery-grid img");
const ariLightbox = document.getElementById("ari-lightbox");
const ariLightboxImg = document.getElementById("ari-lightbox-img");
const ariLightboxCounter = document.getElementById("ari-lightbox-counter");
const ariLightboxClose = document.getElementById("ari-lightbox-close");
const ariLightboxPrev = document.getElementById("ari-lightbox-prev");
const ariLightboxNext = document.getElementById("ari-lightbox-next");

let ariCurrentIndex = 0;

function ariOpenLightbox(index) {
  ariCurrentIndex = index;
  ariUpdateLightboxImage();
  ariLightbox.classList.add("active");
  document.body.classList.add("ari-lightbox-open");
}

function ariCloseLightbox() {
  ariLightbox.classList.remove("active");
  document.body.classList.remove("ari-lightbox-open");
}

function ariUpdateLightboxImage() {
  const img = ariGalleryImages[ariCurrentIndex];
  ariLightboxImg.src = img.src;
  ariLightboxImg.alt = img.alt;
  ariLightboxCounter.textContent = `${ariCurrentIndex + 1} / ${ariGalleryImages.length}`;
}

function ariShowPrev() {
  ariCurrentIndex = (ariCurrentIndex - 1 + ariGalleryImages.length) % ariGalleryImages.length;
  ariUpdateLightboxImage();
}

function ariShowNext() {
  ariCurrentIndex = (ariCurrentIndex + 1) % ariGalleryImages.length;
  ariUpdateLightboxImage();
}

ariGalleryImages.forEach((img, index) => {
  img.style.cursor = "pointer";
  img.addEventListener("click", () => ariOpenLightbox(index));
});

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