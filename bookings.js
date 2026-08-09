const ariCartItemsEl = document.getElementById("ari-cart-items");
const ariCheckoutForm = document.getElementById("ari-checkout-form");

const SERVICE_FEE = 2000;

function ariRenderCart() {
  const cart = getCart();
  const ariCartLayout = document.getElementById("ari-cart-layout");
  const ariEmptyWrap = document.getElementById("ari-cart-empty-wrap");

  if (cart.length === 0) {
    ariCartLayout.style.display = "none";
    ariEmptyWrap.style.display = "block";
    return;
  }

  ariCartLayout.style.display = "grid";
  ariEmptyWrap.style.display = "none";

  ariCartItemsEl.innerHTML = cart.map(item => `
    <div class="ari-cart-item">
      <img src="${item.image}" alt="${item.name}">
      <div class="ari-cart-item-info">
        <h3>${item.name}</h3>
        <p>${item.checkIn} &rarr; ${item.checkOut} (${item.nights} night${item.nights > 1 ? "s" : ""})</p>
        <span class="ari-cart-item-price-night">${formatPrice(item.pricePerNight)} / night</span>
      </div>
      <div class="ari-cart-item-total">
        <span class="ari-cart-item-price">${formatPrice(item.total)}</span>
        <button class="ari-remove-btn" data-id="${item.cartItemId}">Remove</button>
      </div>
    </div>
  `).join("");

  document.querySelectorAll(".ari-remove-btn").forEach(btn => {
    btn.addEventListener("click", ariHandleRemove);
  });

  ariUpdateSummary(cart);
}

function ariHandleRemove(event) {
  const id = Number(event.target.dataset.id);
  const cart = getCart().filter(item => item.cartItemId !== id);
  saveCart(cart);
  updateCartCount();
  ariRenderCart();
  showToast("Room removed from your bookings.");
}

function ariUpdateSummary(cart) {
  const subtotal = cart.reduce((sum, item) => sum + item.total, 0);
  const fee = cart.length > 0 ? SERVICE_FEE : 0;
  const total = subtotal + fee;

  document.getElementById("ari-summary-count").textContent = cart.length;
  document.getElementById("ari-summary-subtotal").textContent = formatPrice(subtotal);
  document.getElementById("ari-summary-fee").textContent = formatPrice(fee);
  document.getElementById("ari-summary-total").textContent = formatPrice(total);
}

if (ariCheckoutForm) {
  ariCheckoutForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const cart = getCart();
    if (cart.length === 0) {
      showToast("Add a room before checking out.");
      return;
    }

    const name = document.getElementById("ari-guest-name").value.trim();
    const email = document.getElementById("ari-guest-email").value.trim();
    const phone = document.getElementById("ari-guest-phone").value.trim();

    if (!name || !email || !phone) {
      showToast("Please fill in your guest details.");
      return;
    }

    // Placeholder for now — swap this for a real payment/reservation flow later.
    showToast("Booking confirmed! We can't wait to host you.");
    saveCart([]);
    updateCartCount();
    ariRenderCart();
    ariCheckoutForm.reset();
  });
}

document.addEventListener("DOMContentLoaded", ariRenderCart);