/* ============================================================
   cart.js
   ------------------------------------------------------------
   Runs only on cart.html. It:
   1. Shows every item saved in localStorage
   2. Lets the user remove an item
   3. Adds up the total (with a flat service fee)
   4. Handles the checkout form
   ============================================================ */

// ==============================
// Current User & Cart Key
// ==============================

const currentUser = JSON.parse(localStorage.getItem("currentUser"));
if (!currentUser) {
    window.location.href = "login.html";
}
const cartKey = `cart_${currentUser.email}`;


const SERVICE_FEE = 2000; // flat fee in Naira
// Builds one cart-item block of HTML per item and puts it on the page.
function renderCart() {
  const cart = getCart(); // getCart() lives in script.js
  const cartContainer = document.getElementById("cart-items");
  const emptyMessage = document.getElementById("empty-cart-message");
  const summaryBox = document.getElementById("cart-summary");

  if (cart.length === 0) {
    cartContainer.innerHTML = "";
    emptyMessage.style.display = "block";
    summaryBox.style.display = "none";
    return;
  }

  emptyMessage.style.display = "none";
  summaryBox.style.display = "block";

  cartContainer.innerHTML = cart
    .map(
      (item) => `
        <div class="cart-item">
          <img src="${item.image}" alt="${item.name}">
          <div class="cart-item-details">
            <h4>${item.name}</h4>
            <p class="cart-meta">
              ${item.checkIn} &rarr; ${item.checkOut}
              (${item.nights} night${item.nights > 1 ? "s" : ""})
            </p>
            <p class="cart-meta">${formatPrice(item.pricePerNight)} / night</p>
          </div>
          <div class="cart-item-price">
            <p class="price">${formatPrice(item.total)}</p>
            <button class="remove-btn" data-id="${item.cartItemId}">Remove</button>
          </div>
        </div>
      `,
    )
    .join("");

  // Give every "Remove" button a click event.
  document.querySelectorAll(".remove-btn").forEach((btn) => {
    btn.addEventListener("click", () => removeFromCart(Number(btn.dataset.id)));
  });

  renderSummary(cart);
}

// Removes one item from the cart array, then redraws the page.
function removeFromCart(cartItemId) {
  const cart = getCart().filter((item) => item.cartItemId !== cartItemId);
  saveCart(cart);
  updateCartCount();
  renderCart();
  showToast("Room removed from cart.");
}

// Works out subtotal, service fee and total, and displays them.
function renderSummary(cart) {
  const subtotal = cart.reduce((sum, item) => sum + item.total, 0);
  const total = subtotal + SERVICE_FEE;

  document.getElementById("summary-count").textContent = cart.length;
  document.getElementById("summary-subtotal").textContent = formatPrice(subtotal);
  document.getElementById("summary-fee").textContent = formatPrice(SERVICE_FEE);
  document.getElementById("summary-total").textContent = formatPrice(total);
}

// Handles the checkout form: simple validation + fake confirmation.
function setupCheckoutForm() {
  const form = document.getElementById("checkout-form");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault(); // stop the page from reloading

    const cart = getCart();
    if (cart.length === 0) {
      showToast("Your cart is empty - add a room first.");
      return;
    }

    const nameInput = document.getElementById("guest-name");
    const emailInput = document.getElementById("guest-email");
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const nameOk = nameInput.value.trim() !== "";
    const emailOk = emailPattern.test(emailInput.value.trim());

    document.getElementById("name-error").style.display = nameOk ? "none" : "block";
    document.getElementById("email-error").style.display = emailOk ? "none" : "block";

    if (!nameOk || !emailOk) return;

    // "Confirm" the booking: clear the cart and show a success message.
    saveCart([]);
    updateCartCount();
    form.reset();
    document.getElementById("checkout-success").style.display = "block";
    document.getElementById("cart-items").innerHTML = "";
    document.getElementById("cart-summary").style.display = "none";
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderCart();
  setupCheckoutForm();
});
