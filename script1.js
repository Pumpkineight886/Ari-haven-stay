/* =====================================================
   Active Navigation Link
   ===================================================== */

const currentPage = window.location.pathname.split("/").pop();

document.querySelectorAll(".nav-links a").forEach(link => {

    const href = link.getAttribute("href");

    if (
        href === currentPage ||
        (currentPage === "" && href === "index.html")
    ) {
        link.classList.add("active");
    }

});

//Explore Section
const exploreData = {
  poolside: [
    {
      tag: "Emerald Coast Escapes",
      title: "Make a Splash in  Abuja",
      desc: "Morning laps, a quick dip, or a full day poolside — these stays are built around the water.",
      img: "assets/swimming-pool-1.jpg"
    },
    {
      tag: "Lounging on the Strip",
      title: "Cool Off in Lagos",
      desc: "Palm-lined pools and cabana service right off the strip, for stays that never rush.",
      img: "assets/swimming-pool-2.jpg"
    }
  ],
  exclusives: [
    {
      tag: "Members Only",
      title: "Unlock Rates Only Haven Stay Members See",
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

if (featureCardsEl && tabs.length) {
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
}
// Offers Section
const offersData = [
  { title: "10,000 Points Across our Luxury Brands", img: "assets/offer-1.jpg" },
  { title: "Up to 20% Off Your Resort Stay", img: "assets/offer-2.jpg" },
  { title: "Earn up to 5,000 Bonus Points per Stay", img: "assets/offer-3.jpg" },
  { title: "Free Breakfast on Weekend Getaways", img: "assets/offer-4.avif" },
  { title: "3 Nights for the Price of 2", img: "assets/offer-5.avif" },
  { title: "Spa Credit With Every Suite Booking", img: "assets/spa-image2.jpg" }
];

const track = document.getElementById("offersTrack");
const dotsWrap = document.getElementById("offersDots");
const prevBtn = document.getElementById("prevArrow");
const nextBtn = document.getElementById("nextArrow");

  if (track && dotsWrap && prevBtn && nextBtn) {
    let currentIndex = 0;
    let visibleCards = getVisibleCards();
    let maxIndex = 0;

  function getVisibleCards() {
    if (window.innerWidth <= 768) {
      return 1;
    }
    if (window.innerWidth <= 1024) {
      return 2;
    }
    return 3;
  }

  function renderOffers() {
    visibleCards = getVisibleCards();
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
    if (!card) return;

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
  window.addEventListener("resize", () => {
      const oldVisibleCards = visibleCards;
      visibleCards = getVisibleCards();
      if (oldVisibleCards !== visibleCards) {
          renderOffers();
          currentIndex = Math.min(currentIndex, maxIndex);
      }
      updateSlider();
  });

  renderOffers();
  updateSlider();
}

// Hamburger Menu
const menuToggle = document.getElementById('menu-toggle');
      const navLinks = document.getElementById('nav-links');
      const toggleIcon = menuToggle?.querySelector('i');

      if (menuToggle && navLinks && toggleIcon) {
        menuToggle.addEventListener('click', () => {
          const isOpen = navLinks.classList.toggle('open');
          menuToggle.setAttribute('aria-expanded', String(isOpen));
          toggleIcon.className = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
        });

        navLinks.querySelectorAll('a').forEach((link) => {
          link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            menuToggle.setAttribute('aria-expanded', 'false');
            toggleIcon.className = 'fa-solid fa-bars';
          });
        });

        window.addEventListener('resize', () => {
          if (window.innerWidth > 900) {
            navLinks.classList.remove('open');
            menuToggle.setAttribute('aria-expanded', 'false');
            toggleIcon.className = 'fa-solid fa-bars';
          }
        });
      }

// Returns the storage key for the currently logged in user
/*function getCartKey() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) {
        return null;
    }
    return `hotelCart_${currentUser.email}`;
}

// Gets the current user's cart
function getCart() {
    const cartKey = getCartKey();
    if (!cartKey) {
        return [];
    }
    const data = localStorage.getItem(cartKey);
    return data ? JSON.parse(data) : [];
}

// Saves the current user's cart
function saveCart(cart) {
    const cartKey = getCartKey();
    if (!cartKey) {
        return;
    }
    localStorage.setItem(cartKey, JSON.stringify(cart));
}

/* ------------------------------------------------------------
   2. SMALL HELPER FUNCTIONS
   ------------------------------------------------------------ */

// Turns two date strings into a number of nights.
/*function calculateNights(checkIn, checkOut) {
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  const oneDay = 1000 * 60 * 60 * 24; // milliseconds in a day
  const nights = Math.round((end - start) / oneDay);
  return nights > 0 ? nights : 0;
}

// Formats a number as Naira, e.g. 45000 -> "₦45,000"
function formatPrice(amount) {
  return "₦" + Number(amount).toLocaleString("en-NG");
}

// Shows a short popup message at the bottom of the screen.
function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2500);
}

// Updates the little number next to "Cart" in the navbar.
/*function updateCartCount() {
    const cartCountEl = document.getElementById("cart-count");

    if (!cartCountEl) return;

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) {
        cartCountEl.style.display = "none";
        return;
    }
    const count = getCart().length;
    cartCountEl.style.display = count > 0 ? "inline-block" : "none";
    cartCountEl.textContent = count;
}*/

/*Shows a short popup message at the bottom of the screen.*/
function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2500);
}

/* ------------------------------------------------------------
   3. ADD TO CART
   ------------------------------------------------------------
   Every room card has an "Add to Cart" button. The room's info
   (id, name, price, image) is stored right on the button using
   data-* attributes, so we can read it straight from the HTML
   instead of looking it up in a separate array.
   ------------------------------------------------------------ */
function handleAddToCart(event) {
  const button = event.target;
  const roomId = button.dataset.id;
  const roomName = button.dataset.name;
  const roomPrice = Number(button.dataset.price);
  const roomImage = button.dataset.image;

  // The date inputs live in the same card as the button.
  const card = button.closest(".room-card");
  const checkIn = card.querySelector(".checkin-input").value;
  const checkOut = card.querySelector(".checkout-input").value;
  const isLoggedIn = localStorage.getItem("loggedIn");

  if (isLoggedIn !== "true") {
      alert("Please login before booking a room.");
      window.location.href = "login.html";
      return;
  }

  if (!checkIn || !checkOut) {
    showToast("Please choose a check-in and check-out date.");
    return;
  }

  const nights = calculateNights(checkIn, checkOut);
  if (nights <= 0) {
    showToast("Check-out date must be after check-in date.");
    return;
  }

  const cartItem = {
    cartItemId: Date.now(), // a simple unique id for this cart entry
    roomId,
    name: roomName,
    image: roomImage,
    pricePerNight: roomPrice,
    checkIn,
    checkOut,
    nights,
    total: roomPrice * nights,
  };

  const cart = getCart();
  cart.push(cartItem);
  saveCart(cart);

  updateCartCount();
  showToast(`${roomName} added to cart! (${nights} night${nights > 1 ? "s" : ""})`);
}

/* ------------------------------------------------------------
   4. FILTER BUTTONS (rooms.html only)
   ------------------------------------------------------------
   Each room card has a data-type attribute (e.g. "Suite"). To
   filter, we just show or hide cards instead of rebuilding the
   whole page with JavaScript.
   ------------------------------------------------------------ */
function setupFilters() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const roomCards = document.querySelectorAll("#rooms-container .room-card");
  if (filterButtons.length === 0) return;

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("active"));
      button.classList.add("active");

      const type = button.dataset.type; // e.g. "All", "Suite", "Family"

      roomCards.forEach((card) => {
        const matches = type === "All" || card.dataset.type === type;
        card.style.display = matches ? "" : "none";
      });
    });
  });
}

/* ------------------------------------------------------------
   5. RUN ONCE THE PAGE HAS LOADED
   ------------------------------------------------------------ */
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();

  // Set the minimum date for all check-in and check-out inputs to today
  const today = new Date().toISOString().split("T")[0];

  document.querySelectorAll(".checkin-input, .checkout-input").forEach((input) => {
    input.min = today;
  });

  // Attach the "Add to Cart" click event to every button that exists on this page.
  document.querySelectorAll(".add-to-cart-btn").forEach((btn) => {
    btn.addEventListener("click", handleAddToCart);
  });

  // Only rooms.html has filter buttons.
  setupFilters();
});
