// State Management
let cart = [];
let discountRate = 0;

// Audience Data from Back Cover
const audienceData = [
  {
    title: "The overworked & mentally drained",
    preview: "Running on empty, but afraid to stop.",
    reflection: "Your worth is not measured by relentless output. Rest is not quitting; it is an act of holy trust."
  },
  {
    title: "The leaders who pour out but feel unseen",
    preview: "Secretly battling quiet exhaustion.",
    reflection: "You cannot pour from a dry cup. God sees every quiet tear and every selfless hour in secret."
  },
  {
    title: "The business owners carrying silent burdens",
    preview: "Afraid to admit the immense pressure.",
    reflection: "Unless the Lord builds the house, those who build labor in vain. Hand the company back to Him."
  },
  {
    title: "The wives fighting unseen battles",
    preview: "Longing to be deeply understood.",
    reflection: "You do not have to carry the emotional weight of your household in isolation."
  },
  {
    title: "The ministry workers falsely judged",
    preview: "Questioning your original calling.",
    reflection: "When people misjudge your heart, remember that God vindicates the humble."
  },
  {
    title: "Couples who succeeded together yet drifted",
    preview: "Wondering if genuine love can be restored.",
    reflection: "Busyness creates silent distance. A quiet reset gives you space to reconnect heart to heart."
  },
  {
    title: "The believers who wonder if God still sees them",
    preview: "Trusting God through deafening silence.",
    reflection: "Silence does not equal absence. Even when He is quiet, His hand is shaping your next dawn."
  }
];

// Initial Reviews
const reviews = [
  {
    name: "Sarah G.",
    role: "Church Volunteer & Mother",
    stars: 5,
    text: "I wept reading chapter 1. I felt so seen. It gave me permission to finally rest without guilt."
  },
  {
    name: "Mark T.",
    role: "E-Commerce Founder",
    stars: 5,
    text: "As a business owner, the weight is suffocating at times. This book guided me back to stillness."
  },
  {
    name: "Rochelle M.",
    role: "Ministry Worker",
    stars: 5,
    text: "Quiet Reset helped heal silent wounds from ministry burnout. Essential reading for every leader."
  }
];

// Initialization
document.addEventListener("DOMContentLoaded", () => {
  renderAudience();
  renderReviews();
  setupEventListeners();
});

// Render Audience Cards
function renderAudience() {
  const container = document.getElementById("audienceGrid");
  container.innerHTML = audienceData.map((item, index) => `
    <div class="audience-card" onclick="toggleAudience(${index})">
      <h4><i class="fa-regular fa-compass"></i> ${item.title}</h4>
      <p class="preview">${item.preview}</p>
      <div class="reflection" id="audience-${index}">
        <p>${item.reflection}</p>
      </div>
    </div>
  `).join("");
}

function toggleAudience(index) {
  const card = document.querySelectorAll(".audience-card")[index];
  card.classList.toggle("active");
}

// Render Reviews
function renderReviews() {
  const container = document.getElementById("reviewsContainer");
  container.innerHTML = reviews.map(rev => `
    <div class="review-card">
      <div class="review-stars">${"★".repeat(rev.stars)}</div>
      <p class="review-text">"${rev.text}"</p>
      <div class="review-author">${rev.name}</div>
      <div class="review-role">${rev.role}</div>
    </div>
  `).join("");
}

// Event Listeners
function setupEventListeners() {
  // Cart open / close
  document.getElementById("openCartBtn").addEventListener("click", openCart);
  document.getElementById("closeCartBtn").addEventListener("click", closeCart);
  document.getElementById("cartOverlay").addEventListener("click", closeCart);

  // Add to Bag buttons
  document.querySelectorAll(".add-to-cart-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const id = e.target.getAttribute("data-id");
      const name = e.target.getAttribute("data-name");
      const price = parseFloat(e.target.getAttribute("data-price"));
      addToCart(id, name, price);
    });
  });

  // Promo Code
  document.getElementById("applyPromoBtn").addEventListener("click", () => {
    const code = document.getElementById("promoInput").value.trim().toUpperCase();
    if (code === "RESET10") {
      discountRate = 0.10;
      showToast("Promo RESET10 applied! 10% off");
      updateCartDisplay();
    } else {
      showToast("Invalid promo code");
    }
  });

  // Excerpt Modal
  document.getElementById("openExcerptBtn").addEventListener("click", () => {
    document.getElementById("excerptModal").classList.add("active");
  });
  document.getElementById("closeExcerptBtn").addEventListener("click", closeModals);

  // Review Modal
  document.getElementById("openReviewModalBtn").addEventListener("click", () => {
    document.getElementById("reviewModal").classList.add("active");
  });
  document.getElementById("closeReviewBtn").addEventListener("click", closeModals);

  // Review Submission
  document.getElementById("reviewForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const newRev = {
      name: document.getElementById("reviewerName").value,
      role: document.getElementById("reviewerRole").value,
      stars: parseInt(document.getElementById("reviewerRating").value),
      text: document.getElementById("reviewerText").value
    };
    reviews.unshift(newRev);
    renderReviews();
    closeModals();
    showToast("Thank you for your review!");
    e.target.reset();
  });

  // Checkout Button
  document.getElementById("checkoutBtn").addEventListener("click", () => {
    if (cart.length === 0) {
      showToast("Your bag is empty");
      return;
    }
    alert("Checkout initiated! You can connect this to your preferred payment gateway (GCash, Maya, PayMongo).");
  });
}

// Cart Logic
function addToCart(id, name, price) {
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id, name, price, qty: 1 });
  }
  updateCartDisplay();
  openCart();
  showToast(`Added ${name} to bag`);
}

function updateCartDisplay() {
  const cartItemsEl = document.getElementById("cartItems");
  const cartBadge = document.getElementById("cartBadge");
  const drawerCount = document.getElementById("drawerCount");
  const subtotalEl = document.getElementById("subtotalPrice");
  const totalEl = document.getElementById("totalPrice");
  const discountLine = document.getElementById("discountLine");
  const discountPriceEl = document.getElementById("discountPrice");
  const shippingProgress = document.getElementById("shippingProgress");
  const shippingText = document.getElementById("shippingText");

  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
  cartBadge.innerText = totalQty;
  drawerCount.innerText = totalQty;

  if (cart.length === 0) {
    cartItemsEl.innerHTML = `<p style="text-align:center; color:#888; padding: 40px 0;">Your bag is currently empty.</p>`;
    subtotalEl.innerText = "₱0";
    totalEl.innerText = "₱0";
    discountLine.style.display = "none";
    shippingProgress.style.width = "0%";
    shippingText.innerText = "Add ₱799 for FREE shipping";
    return;
  }

  cartItemsEl.innerHTML = cart.map((item, idx) => `
    <div class="cart-item">
      <div>
        <strong>${item.name}</strong>
        <div>₱${item.price.toLocaleString()} x${item.qty}</div>
      </div>
      <div>
        <button onclick="changeQty(${idx}, -1)" style="padding: 2px 8px;">-</button>
        <span style="margin: 0 6px;">${item.qty}</span>
        <button onclick="changeQty(${idx}, 1)" style="padding: 2px 8px;">+</button>
      </div>
    </div>
  `).join("");

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const discount = subtotal * discountRate;
  const finalTotal = subtotal - discount;

  subtotalEl.innerText = `₱${subtotal.toLocaleString()}`;
  totalEl.innerText = `₱${finalTotal.toLocaleString()}`;

  if (discountRate > 0) {
    discountLine.style.display = "flex";
    discountPriceEl.innerText = `-₱${discount.toLocaleString()}`;
  } else {
    discountLine.style.display = "none";
  }

  // Free shipping bar (₱799 threshold)
  const percent = Math.min((subtotal / 799) * 100, 100);
  shippingProgress.style.width = `${percent}%`;
  if (subtotal >= 799) {
    shippingText.innerText = "🎉 You've unlocked FREE Nationwide Shipping!";
  } else {
    shippingText.innerText = `Add ₱${(799 - subtotal).toLocaleString()} more for FREE shipping`;
  }
}

function changeQty(index, delta) {
  cart[index].qty += delta;
  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }
  updateCartDisplay();
}

function openCart() {
  document.getElementById("cartDrawer").classList.add("active");
  document.getElementById("cartOverlay").style.display = "block";
}

function closeCart() {
  document.getElementById("cartDrawer").classList.remove("active");
  document.getElementById("cartOverlay").style.display = "none";
}

function closeModals() {
  document.querySelectorAll(".modal-overlay").forEach(modal => modal.classList.remove("active"));
}

function showToast(msg) {
  const toast = document.getElementById("toastNotification");
  toast.innerText = msg;
  toast.style.display = "block";
  setTimeout(() => {
    toast.style.display = "none";
  }, 2500);
}