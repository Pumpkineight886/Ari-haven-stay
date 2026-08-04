//Explore Section
const exploreData = {
  poolside: [
    {
      tag: "Emerald Coast Escapes",
      title: "Make a Splash in Destin, Florida",
      desc: "Morning laps, a quick dip, or a full day poolside — these stays are built around the water.",
      img: "assets/swimming-pool-1.jpg"
    },
    {
      tag: "Lounging on the Strip",
      title: "Cool Off in Las Vegas, Nevada",
      desc: "Palm-lined pools and cabana service right off the strip, for stays that never rush.",
      img: "assets/swimming-pool-2.jpg"
    }
  ],
  exclusives: [
    {
      tag: "Members Only",
      title: "Unlock Rates Only Bonvoy-Style Members See",
      desc: "Sign in to reveal exclusive pricing at participating HavenStay properties.",
      img: "assets/exclusives-1.jpg"
    },
    {
      tag: "Early Access",
      title: "First Look at New Openings",
      desc: "Members get first booking access before new HavenStay properties go public.",
      img: "assets/exclusives-2.jpg"
    }
  ],
  dining: [
    {
      tag: "Chef's Table",
      title: "Seasonal Menus, Local Ingredients",
      desc: "Every HavenStay kitchen sources within 50 miles of the property.",
      img: "assets/dining-1.jpg"
    },
    {
      tag: "Rooftop Bars",
      title: "Sunset Views, Signature Cocktails",
      desc: "Golden-hour dining reimagined above the city skyline.",
      img: "assets/dining-2.jpg"
    }
  ],
  wellness: [
    {
      tag: "Spa & Recovery",
      title: "Restore With Curated Spa Journeys",
      desc: "Full-service spas designed around rest, not just treatments.",
      img: "assets/wellness-1.webp"
    },
    {
      tag: "Fitness",
      title: "Studios Built for Every Routine",
      desc: "24-hour fitness centers with equipment for strength, cardio, and recovery.",
      img: "assets/wellness-2.webp"
    }
  ]
};

const featureCardsEl = document.getElementById("featureCards");
const tabs = document.querySelectorAll(".tab");

function renderCards(category) {
  const cards = exploreData[category];
  featureCardsEl.innerHTML = cards.map(card => `
    <div class="feature-card" style="background-image: url('${card.img}')">
      <div class="feature-arrow">&rarr;</div>
      <div class="feature-card-content">
        <div class="feature-tag">📍 ${card.tag}</div>
        <h3>${card.title}</h3>
        <p>${card.desc}</p>
      </div>
    </div>
  `).join("");
}

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    renderCards(tab.dataset.category);
  });
});

renderCards("poolside");
// Offers Section
const offersData = [
  { title: "10,000 Points Across our Luxury Brands", img: "assets/offer-1.jpg" },
  { title: "Up to 20% Off Your Resort Stay", img: "assets/offer-2.jpg" },
  { title: "Earn up to 5,000 Bonus Points per Stay", img: "assets/offer-3.jpg" },
  { title: "Free Breakfast on Weekend Getaways", img: "assets/offer-4.avif" },
  { title: "3 Nights for the Price of 2", img: "assets/offer-5.avif" },
  { title: "Spa Credit With Every Suite Booking", img: "assets/offer-6.jpg" }
];

const track = document.getElementById("offersTrack");
const dotsWrap = document.getElementById("offersDots");
const prevBtn = document.getElementById("prevArrow");
const nextBtn = document.getElementById("nextArrow");

let currentIndex = 0;
let visibleCards = 3;
let maxIndex = 0;

function renderOffers() {
  track.innerHTML = offersData.map(offer => `
    <div class="offer-card" style="background-image: url('${offer.img}')">
      <div class="offer-content">
        <h3>${offer.title}</h3>
        <div class="offer-arrow">&rsaquo;</div>
      </div>
    </div>
  `).join("");

  dotsWrap.innerHTML = "";
  maxIndex = offersData.length - Math.floor(visibleCards);
  for (let i = 0; i <= maxIndex; i++) {
    const dot = document.createElement("button");
    dot.className = "dot" + (i === 0 ? " active" : "");
    dot.addEventListener("click", () => goTo(i));
    dotsWrap.appendChild(dot);
  }
}

function updateSlider() {
  const card = track.querySelector(".offer-card");
  const gap = 20;
  const step = card.offsetWidth + gap;
  track.style.transform = `translateX(-${currentIndex * step}px)`;

  [...dotsWrap.children].forEach((dot, i) => {
    dot.classList.toggle("active", i === currentIndex);
  });

  prevBtn.disabled = currentIndex === 0;
  nextBtn.disabled = currentIndex === maxIndex;
}

function goTo(index) {
  currentIndex = Math.max(0, Math.min(index, maxIndex));
  updateSlider();
}

prevBtn.addEventListener("click", () => goTo(currentIndex - 1));
nextBtn.addEventListener("click", () => goTo(currentIndex + 1));
window.addEventListener("resize", updateSlider);

renderOffers();
updateSlider();