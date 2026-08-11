/* =====================================================
   WELLNESS SPACES CAROUSEL
   ===================================================== */

const wellnessCarousel = document.querySelector(
  ".wellness-spaces-carousel"
);

const wellnessCards = document.querySelectorAll(
  ".wellness-space-card"
);

const wellnessPrevBtn = document.querySelector(
  ".wellness-spaces-prev"
);

const wellnessNextBtn = document.querySelector(
  ".wellness-spaces-next"
);

const wellnessDots = document.querySelectorAll(
  ".wellness-spaces-pagination span"
);


/* =========================
   Carousel Positions
   ========================= */

const wellnessPositions = [
  0,
  1,
  2
];

let wellnessCurrentPosition = 0;


/* =========================
   Move Carousel
   ========================= */

function moveWellnessCarousel(position) {

  if (!wellnessCarousel) return;

  wellnessCurrentPosition = Math.max(
    0,
    Math.min(position, wellnessPositions.length - 1)
  );

  const targetCard =
    wellnessCards[wellnessCurrentPosition];

  if (!targetCard) return;

  wellnessCarousel.scrollTo({
    left: targetCard.offsetLeft,
    behavior: "smooth"
  });

  updateWellnessPagination();
}


/* =========================
   Update Pagination
   ========================= */

function updateWellnessPagination() {

  wellnessDots.forEach((dot, index) => {

    dot.classList.toggle(
      "active",
      index === wellnessCurrentPosition
    );

  });

}


/* =========================
   Previous Button
   ========================= */

if (wellnessPrevBtn) {

  wellnessPrevBtn.addEventListener("click", () => {

    moveWellnessCarousel(
      wellnessCurrentPosition - 1
    );

  });

}


/* =========================
   Next Button
   ========================= */

if (wellnessNextBtn) {

  wellnessNextBtn.addEventListener("click", () => {

    moveWellnessCarousel(
      wellnessCurrentPosition + 1
    );

  });

}


/* =========================
   Pagination Dots
   ========================= */

wellnessDots.forEach((dot, index) => {

  dot.addEventListener("click", () => {

    moveWellnessCarousel(index);

  });

});


/* =========================
   Detect Manual Scrolling
   ========================= */

if (wellnessCarousel) {

  wellnessCarousel.addEventListener("scroll", () => {

    let closestIndex = 0;
    let closestDistance = Infinity;

    wellnessCards.forEach((card, index) => {

      const distance = Math.abs(
        wellnessCarousel.scrollLeft -
        card.offsetLeft
      );

      if (distance < closestDistance) {

        closestDistance = distance;
        closestIndex = index;

      }

    });

    /* Keep pagination limited to 3 positions */

    wellnessCurrentPosition =
      Math.min(closestIndex, 2);

    updateWellnessPagination();

  });

}