/* ==========================================================================
   QUIET RESET — SCRIPT ENGINE
   ========================================================================== */

// 1. Audience Profiles from the Back Cover
const audienceData = [
  {
    icon: "fa-battery-quarter",
    title: "The overworked & mentally drained",
    preview: "Running on empty, but terrified to stop.",
    letter: "You have convinced yourself that if you rest, everything falls apart. But God did not design your soul for endless output without deep restoration. Rest is not surrender to failure; it is an act of holy trust.",
    scripture: "Matthew 11:28 — 'Come to me, all who labor and are heavy laden, and I will give you rest.'"
  },
  {
    icon: "fa-eye-slash",
    title: "The leaders who pour out but feel unseen",
    preview: "Secretly battling quiet, suffocating exhaustion.",
    letter: "You stand on platforms and hold up everyone else's faith, but nobody asks who is praying for you in the quiet. God sees every unspoken tear shed behind closed study doors.",
    scripture: "Galatians 6:9 — 'Let us not grow weary of doing good, for in due season we will reap.'"
  },
  {
    icon: "fa-briefcase",
    title: "The business owners carrying silent burdens",
    preview: "Afraid to admit the pressure to clients and employees.",
    letter: "The payroll stress, the fluctuating revenue, the expectation to be fearless. Hand the title of CEO back to the King of Kings. You are a steward, not the sole sustainer.",
    scripture: "Psalm 127:1 — 'Unless the Lord builds the house, those who build it labor in vain.'"
  },
  {
    icon: "fa-heart-pulse",
    title: "The wives fighting unseen battles",
    preview: "Longing to be deeply heard and understood.",
    letter: "Holding household tensions, emotional currents, and silent disappointments inside your spirit. The Lord numbers every tear in His bottle; your quiet faithfulness is honored.",
    scripture: "Psalm 56:8 — 'You keep track of all my sorrows. You have collected all my tears in your bottle.'"
  },
  {
    icon: "fa-cross",
    title: "Ministry workers falsely judged",
    preview: "Questioning your original calling and integrity.",
    letter: "When those you served turn around and misjudge your heart, the sting is sharp. Remember: Jesus was also betrayed by those He broke bread with. Healing begins at His feet.",
    scripture: "Isaiah 61:3 — 'To give them beauty for ashes, the oil of joy for mourning.'"
  },
  {
    icon: "fa-hands-holding-circle",
    title: "Couples who drifted apart quietly",
    preview: "Wondering if tender closeness can ever be rekindled.",
    letter: "Busyness builds walls of silence between spouses. You don't have to stay roommates. A quiet reset gives your marriage safe ground to soften, confess, and begin anew.",
    scripture: "1 Peter 4:8 — 'Above all, keep loving one another earnestly, since love covers a multitude of sins.'"
  },
  {
    icon: "fa-compass",
    title: "Believers questioning if God still sees them",
    preview: "Holding faith while enduring heavy silence.",
    letter: "God's silence is not His absence. In the darkest soil, the seed undergoes quiet transformation before breaking into the daylight.",
    scripture: "Isaiah 45:3 — 'I will give you hidden treasures, riches stored in secret places.'"
  }
];

// 2. Real Reader Reviews
let reviewsList = [
  {
    name: "Atty. Christine V.",
    role: "Corporate Counsel & Ministry Leader",
    stars: 5,
    quote: "I started reading Chapter 1 at 11 PM and couldn't put it down. Ladyh articulate the precise ache of someone who looks successful on the outside but is dying of exhaustion on the inside."
  },
  {
    name: "Rev. Marco Santos",
    role: "Senior Pastor",
    stars: 5,
    quote: "Quiet Reset needs to be mandatory reading in seminaries and leadership retreats. It liberated me from the false idol of Christian hustle culture."
  },
  {
    name: "Janine M.",
    role: "Entrepreneur & Mother of 2",
    stars: 5,
    quote: "The Restoration Journal Set has changed my morning quiet times. My marriage and work feel grounded in actual peace for the first time in 4 years."
  }
];

// 3. E-Commerce Cart State
let cart = [];
let discount = 0;
let isAudioPlaying = false;
let audioContext;

// Initialization
document.addEventListener("DOMContentLoaded", () => {
  renderAudienceCards();
  renderReviews();
  setup3DBookTilt();
  setupEventListeners();
});

// Render Audience Cards
function renderAudienceCards() {
  const container = document.getElementById("audienceContainer");
  container.innerHTML = audienceData.map((item, idx) => `
    <div class="audience-interactive-card" onclick="toggleAudienceCard(${idx})">
      <div class="card-top-row">
        <i class="fa-solid ${item.icon} audience-icon"></i>
        <i class="fa-solid fa-chevron-down expand-chevron"></i>
      </div>
      <h4 class="audience-title">${item.title}</h4>
      <p class="audience-snippet">${item.preview}</p>
      <div class="audience-expanded-content" id="audience-expand-${idx}">
        <p class="letter-to-reader">"${item.letter}"</p>
        <span class="scripture-anchor"><i class="fa-solid fa-book-bible"></i> ${item.scripture}</span>
      </div>
    </div>
  `).join("");
}

function toggleAudienceCard(idx) {
  const cards = document.querySelectorAll(".audience-interactive-card");
  cards[idx].classList.toggle("expanded");
}

// Render Reviews
function renderReviews() {
  const container = document.getElementById("reviewsGrid");
  container.innerHTML = reviewsList.map(r => `
    <div class="review-lux-card">
      <div>
        <div class="stars">${'<i class="fa-solid fa-star"></i>'.repeat(r.stars)}</div>
        <p class="quote">“${r.quote}”</p>
      </div>
      <div class="reviewer-meta">
        <div class="name">${r.name}</div>
        <div class="role">${r.role}</div>
      </div>
    </div>
  `).join("");
}

// 3D Tilt Physics and Specular Light Reflection Engine
function setup3DBookTilt() {
  const viewport = document.getElementById("bookViewport");
  const card = document.getElementById("book3d");
  const glare = document.getElementById("photoGlare");

  if (!viewport || !card) return;

  viewport.addEventListener("mousemove", (e) => {
    const rect = viewport.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = -((y - centerY) / centerY) * 14;
    const rotateY = ((x - centerX) / centerX) * 14;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

    if (glare) {
      glare.style.opacity = "0.4";
      glare.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0) 65%)`;
    }
  });

  viewport.addEventListener("mouseleave", () => {
    card.style.transform = `perspective(1000px) rotateX(6deg) rotateY(-8deg) scale3d(1, 1, 1)`;
    if (glare) {
      glare.style.opacity = "0";
    }
  });
}

// Event Listeners
function setupEventListeners() {
  // Cart Drawer
  document.getElementById("bagTrigger").addEventListener("click", openCartDrawer);
  document.getElementById("closeCartBtn").addEventListener("click", closeCartDrawer);
  document.getElementById("cartBackdrop").addEventListener("click", closeCartDrawer);

  // Add to Bag Buttons
  document.querySelectorAll(".add-cart-action").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const b = e.currentTarget;
      const id = b.getAttribute("data-id");
      const name = b.getAttribute("data-name");
      const price = parseFloat(b.getAttribute("data-price"));
      addToBag(id, name, price);
    });
  });

  // Excerpt Modal
  document.getElementById("heroExcerptBtn").addEventListener("click", () => {
    document.getElementById("excerptModal").classList.add("active");
  });
  document.getElementById("closeExcerptBtn").addEventListener("click", closeAllModals);

  // Review Modal
  document.getElementById("openReviewBtn").addEventListener("click", () => {
    document.getElementById("reviewModal").classList.add("active");
  });
  document.getElementById("closeReviewModalBtn").addEventListener("click", closeAllModals);

  // Review Form Submit
  document.getElementById("reviewSubmissionForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const newRev = {
      name: document.getElementById("revName").value,
      role: document.getElementById("revRole").value,
      stars: parseInt(document.getElementById("revRating").value),
      quote: document.getElementById("revComment").value
    };
    reviewsList.unshift(newRev);
    renderReviews();
    closeAllModals();
    showToast("Thank you. Your testimony has been added!");
    e.target.reset();
  });

  // Promo Code
  document.getElementById("applyPromoBtn").addEventListener("click", () => {
    const code = document.getElementById("promoCodeInput").value.trim().toUpperCase();
    if (code === "RESET10") {
      discount = 0.10;
      document.getElementById("couponNote").innerText = "10% discount applied!";
      document.getElementById("couponNote").style.color = "#345e44";
      updateCartDrawer();
      showToast("Promo code RESET10 applied!");
    } else {
      document.getElementById("couponNote").innerText = "Invalid code. Try RESET10";
      document.getElementById("couponNote").style.color = "#b03e3e";
    }
  });

  // Checkout Triggers
  document.getElementById("checkoutTriggerBtn").addEventListener("click", () => {
    if (cart.length === 0) {
      showToast("Your bag is currently empty");
      return;
    }
    closeCartDrawer();
    document.getElementById("checkoutModal").classList.add("active");
  });

  document.getElementById("closeCheckoutBtn").addEventListener("click", closeAllModals);

  document.getElementById("checkoutForm").addEventListener("submit", (e) => {
    e.preventDefault();
    closeAllModals();
    cart = [];
    updateCartDrawer();
    alert("Blessings! Your order has been placed. You will receive an SMS shipping confirmation with your tracking code.");
  });

  // Sanctuary Audio Generator
  document.getElementById("soundToggle").addEventListener("click", toggleAmbientSound);
}

// Shopping Bag Mechanics
function addToBag(id, name, price) {
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id, name, price, qty: 1 });
  }
  updateCartDrawer();
  openCartDrawer();
  showToast(`Added ${name} to your bag`);
}

function updateCartDrawer() {
  const listEl = document.getElementById("cartItemsList");
  const countBadge = document.getElementById("cartCount");
  const drawerCount = document.getElementById("drawerItemCount");
  const subtotalEl = document.getElementById("summarySubtotal");
  const discountRow = document.getElementById("summaryDiscountRow");
  const discountEl = document.getElementById("summaryDiscount");
  const totalEl = document.getElementById("summaryTotal");
  const fillBar = document.getElementById("shippingFill");
  const statusLabel = document.getElementById("shippingStatusLabel");
  const pctLabel = document.getElementById("shippingPctLabel");

  const totalItems = cart.reduce((acc, curr) => acc + curr.qty, 0);
  countBadge.innerText = totalItems;
  drawerCount.innerText = `${totalItems} ${totalItems === 1 ? 'item' : 'items'}`;

  if (cart.length === 0) {
    listEl.innerHTML = `<p style="text-align: center; color: #888; padding: 60px 0;">Your shopping bag is empty.</p>`;
    subtotalEl.innerText = "₱0";
    totalEl.innerText = "₱0";
    discountRow.style.display = "none";
    fillBar.style.width = "0%";
    statusLabel.innerText = "Add ₱799 for FREE nationwide shipping";
    pctLabel.innerText = "0%";
    return;
  }

  listEl.innerHTML = cart.map((item, index) => `
    <div class="cart-item-row">
      <div class="item-meta">
        <h4>${item.name}</h4>
        <span class="price">₱${item.price.toLocaleString()}</span>
      </div>
      <div class="quantity-controller">
        <button onclick="changeQty(${index}, -1)">–</button>
        <span>${item.qty}</span>
        <button onclick="changeQty(${index}, 1)">+</button>
      </div>
    </div>
  `).join("");

  const subtotal = cart.reduce((acc, curr) => acc + (curr.price * curr.qty), 0);
  const discountVal = subtotal * discount;
  const finalTotal = subtotal - discountVal;

  subtotalEl.innerText = `₱${subtotal.toLocaleString()}`;
  totalEl.innerText = `₱${finalTotal.toLocaleString()}`;

  if (discount > 0) {
    discountRow.style.display = "flex";
    discountEl.innerText = `-₱${discountVal.toLocaleString()}`;
  } else {
    discountRow.style.display = "none";
  }

  // Shipping Progress (₱799 Threshold)
  const pct = Math.min(Math.round((subtotal / 799) * 100), 100);
  fillBar.style.width = `${pct}%`;
  pctLabel.innerText = `${pct}%`;

  if (subtotal >= 799) {
    statusLabel.innerHTML = `<strong>Unlocked!</strong> You qualify for FREE Nationwide Delivery`;
  } else {
    const diff = 799 - subtotal;
    statusLabel.innerText = `Add ₱${diff.toLocaleString()} more for FREE shipping`;
  }
}

function changeQty(index, change) {
  cart[index].qty += change;
  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }
  updateCartDrawer();
}

function openCartDrawer() {
  document.getElementById("cartDrawer").classList.add("active");
  document.getElementById("cartBackdrop").style.display = "block";
}

function closeCartDrawer() {
  document.getElementById("cartDrawer").classList.remove("active");
  document.getElementById("cartBackdrop").style.display = "none";
}

function closeAllModals() {
  document.querySelectorAll(".modal-backdrop").forEach(m => m.classList.remove("active"));
}

function showToast(msg) {
  const t = document.getElementById("luxToast");
  document.getElementById("toastMessage").innerText = msg;
  t.style.display = "flex";
  setTimeout(() => {
    t.style.display = "none";
  }, 2800);
}

// Gentle Ambient Tone Generator
function toggleAmbientSound() {
  const btn = document.getElementById("soundStatus");
  if (!isAudioPlaying) {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioContext = new AudioContext();
      
      const osc1 = audioContext.createOscillator();
      const osc2 = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(174, audioContext.currentTime); // 174Hz peaceful ground
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(261.63, audioContext.currentTime); // C4

      gainNode.gain.setValueAtTime(0.04, audioContext.currentTime);

      osc1.connect(gainNode);
      osc2.connect(gainNode);
      gainNode.connect(audioContext.destination);

      osc1.start();
      osc2.start();

      isAudioPlaying = true;
      btn.innerText = "Pause Ambience";
    } catch (err) {
      console.log(err);
    }
  } else {
    if (audioContext) {
      audioContext.close();
    }
    isAudioPlaying = false;
    btn.innerText = "Play Ambience";
  }
}