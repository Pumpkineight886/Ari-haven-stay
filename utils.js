// Returns the storage key for the currently logged in user
function getCartKey() {
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

// Turns two date strings into a number of nights.
function calculateNights(checkIn, checkOut) {
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  const oneDay = 1000 * 60 * 60 * 24;
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
function updateCartCount() {
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
}

// Add to utils.js

function updateNavigation() {
    const guestLinks = document.getElementById("guest-links");
    const userLinks = document.getElementById("user-links");
    const welcomeUser = document.getElementById("welcome-user");

    if (!guestLinks || !userLinks) return;
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
        guestLinks.classList.add("hidden");
        userLinks.classList.remove("hidden");
        if (welcomeUser) {
            welcomeUser.innerHTML = `
                <i class="fa-solid fa-user"></i> ${currentUser.name}
            `;
        }
    } else {
        guestLinks.classList.remove("hidden");
        userLinks.classList.add("hidden");
    }
    updateCartCount();
}
updateNavigation();

const logoutBtn = document.getElementById("logout-btn");

if (logoutBtn) {
    logoutBtn.addEventListener("click", function (e) {
        e.preventDefault();
        localStorage.removeItem("loggedIn");
        localStorage.removeItem("currentUser");
        updateNavigation();
        alert("You have logged out.");
        window.location.href = "index1.html";
    });
}