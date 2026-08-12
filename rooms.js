const ariRoomsData = [
  {
    id: "r1",
    name: "Deluxe Garden Room",
    type: "Deluxe",
    price: 65000,
    img: "assets/garden-room-1.jpg",
    desc: "A private terrace opening onto landscaped gardens, with rattan lounge seating."
  },
  {
    id: "r2",
    name: "Executive Suite",
    type: "Suite",
    price: 120000,
    img: "assets/executive-room-1.jpg",
    desc: "Expansive suite with a statement chandelier and a dedicated lounge area."
  },
  {
    id: "r3",
    name: "Family Comfort Room",
    type: "Family",
    price: 85000,
    img: "assets/family-room-1.jpg",
    desc: "Twin beds and a private balcony, designed for stays with the whole family."
  },
  {
    id: "r4",
    name: "Ocean View Room",
    type: "Deluxe",
    price: 70000,
    img: "assets/oceanview-room.jpg",
    desc: "Wake up to a beautiful view every morning. Includes a private balcony."
  },
  {
    id: "r5",
    name: "Presidential Suite",
    type: "Suite",
    price: 200000,
    img: "assets/presidential-room.jpg",
    desc: "Our top-tier suite with a private jacuzzi, dining area and 24-hour butler."
  },
  {
    id: "r6",
    name: "Classic Standard Room",
    type: "Standard",
    price: 45000,
    img: "assets/standard-room-1.jpg",
    desc: "A well-appointed essential stay with everything you need, nothing you don't."
  }
];

const ariRoomsContainer = document.getElementById("ari-rooms-container");
const ariFilterButtons = document.querySelectorAll(".ari-filter-btn");

function ariRenderRooms(rooms) {
  ariRoomsContainer.innerHTML = rooms.map(room => `
    <div class="ari-room-card" data-type="${room.type}">
      <div class="ari-room-image">
        <img src="${room.img}" alt="${room.name}">
        <span class="ari-room-badge">${room.type.toUpperCase()}</span>
      </div>
      <div class="ari-room-content">
        <h3>${room.name}</h3>
        <p class="ari-room-desc">${room.desc}</p>
        <p class="ari-room-price">${formatPrice(room.price)} <span>/ night</span></p>

        <div class="ari-room-dates">
          <div class="ari-date-field">
            <label>Check-in</label>
            <input type="date" class="ari-checkin-input">
          </div>
          <div class="ari-date-field">
            <label>Check-out</label>
            <input type="date" class="ari-checkout-input">
          </div>
        </div>

        <button
          class="ari-add-to-cart-btn"
          data-id="${room.id}"
          data-name="${room.name}"
          data-price="${room.price}"
          data-image="${room.img}"
        >
          Book Now
        </button>
      </div>
    </div>
  `).join("");
}

function ariSetupFilters() {
  ariFilterButtons.forEach(button => {
    button.addEventListener("click", () => {
      ariFilterButtons.forEach(b => b.classList.remove("active"));
      button.classList.add("active");

      const type = button.dataset.type;
      const filtered = type === "All"
        ? ariRoomsData
        : ariRoomsData.filter(room => room.type === type);

      ariRenderRooms(filtered);
      ariAttachCartHandlers();
    });
  });
}

function ariAttachCartHandlers() {
  document.querySelectorAll(".ari-add-to-cart-btn").forEach(btn => {
    btn.addEventListener("click", ariHandleAddToCart);
  });
}

function ariHandleAddToCart(event) {
  const button = event.target;
  const roomId = button.dataset.id;
  const roomName = button.dataset.name;
  const roomPrice = Number(button.dataset.price);
  const roomImage = button.dataset.image;

  const card = button.closest(".ari-room-card");
  const checkIn = card.querySelector(".ari-checkin-input").value;
  const checkOut = card.querySelector(".ari-checkout-input").value;
  const isLoggedIn = localStorage.getItem("loggedIn");

  if (isLoggedIn !== "true") {
    alert("Please login before booking a room.");
    window.location.href = "auth.html";
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
    cartItemId: Date.now(),
    roomId,
    name: roomName,
    image: roomImage,
    pricePerNight: roomPrice,
    checkIn,
    checkOut,
    nights,
    total: roomPrice * nights
  };

  const cart = getCart();
  cart.push(cartItem);
  saveCart(cart);

  updateCartCount();
  showToast(`${roomName} added to cart! (${nights} night${nights > 1 ? "s" : ""})`);
}

document.addEventListener("DOMContentLoaded", () => {
  ariRenderRooms(ariRoomsData);
  ariAttachCartHandlers();
  ariSetupFilters();

  const today = new Date().toISOString().split("T")[0];
  document.querySelectorAll(".ari-checkin-input, .ari-checkout-input").forEach(input => {
    input.min = today;
  });
});