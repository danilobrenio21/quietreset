/* ==========================================================================
   QUIET RESET — SCRIPT ENGINE WITH APPLE-STYLE SCROLL SCRUBBING
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

// 2. Reader Reviews
const reviewsList = [
  {
    name: "Atty. Christine V.",
    role: "Corporate Counsel & Ministry Leader",
    stars: 5,
    quote: "I started reading Chapter 1 at 11 PM and couldn't put it down. Ladyh articulates the precise ache of someone who looks successful on the outside but is dying of exhaustion on the inside."
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

// 3. Cart State
let cart = [];
let discount = 0;
let isAudioPlaying = false;
let audioContext = null;

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  renderAudienceCards();
  renderReviews();
  setupEventListeners();
  setupAppleScrollScrubEngine();
});

// ==========================================================================
// APPLE-STYLE SCROLL SCRUB & 3D RIG INTERPOLATION
// ==========================================================================
function setupAppleScrollScrubEngine() {
  const progressBar = document.getElementById("scrollProgressLine");
  const stage = document.querySelector(".apple-scroll-stage");
  const bookRig = document.getElementById("appleBookRig");
  const glare = document.getElementById("appleRigGlare");
  const captions = document.querySelectorAll(".apple-caption-card");

  let currentProgress = 0;
  let targetProgress = 0;

  function updateScroll() {
    // Top Progress Line
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if (progressBar && docHeight > 0) {
      progressBar.style.width = ((scrollTop / docHeight) * 100) + "%";
    }

    // Pinned Apple Stage Scrub
    if (stage) {
      const rect = stage.getBoundingClientRect();
      const stageHeight = stage.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      let progress = scrolled / stageHeight;
      progress = Math.max(0, Math.min(1, progress));
      targetProgress = progress;
    }
  }

  // Smooth 60fps / 120fps physics loop (Apple smooth interpolation)
  function renderLoop() {
    currentProgress += (targetProgress - currentProgress) * 0.12;

    if (bookRig) {
      // 3D Rotation Interpolation synced directly to scroll
      // Stage starts angled (-18deg), straightens flat (0deg), then lifts up (+12deg)
      const rotY = -18 + (currentProgress * 26);
      const rotX = 14 - (currentProgress * 22);
      const scale = 0.96 + (currentProgress * 0.22);
      const translateY = -15 + (currentProgress * 30);

      bookRig.style.transform = `perspective(1400px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) scale(${scale.toFixed(3)}) translateY(${translateY.toFixed(1)}px)`;

      // Specular glare moving across the book
      if (glare) {
        const glareX = (currentProgress * 100).toFixed(1);
        glare.style.opacity = (currentProgress > 0.05 && currentProgress < 0.95) ? "0.4" : "0";
        glare.style.background = `radial-gradient(circle at ${glareX}% 40%, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 65%)`;
      }
    }

    // Step Captions fading in/out
    captions.forEach((cap, idx) => {
      const step = parseInt(cap.getAttribute("data-step") || "0", 10);
      const minP = step * 0.33;
      const maxP = (step + 1) * 0.33;

      if (currentProgress >= minP && currentProgress < maxP) {
        cap.classList.add("active");
      } else {
        cap.classList.remove("active");
      }
    });

    requestAnimationFrame(renderLoop);
  }

  window.addEventListener("scroll", updateScroll, { passive: true });
  updateScroll();
  requestAnimationFrame(renderLoop);
}

// Render Audience Cards
function renderAudienceCards() {
  const container = document.getElementById("audienceContainer");
  if (!container) return;

  container.innerHTML = audienceData.map((item, idx) => {
    return '<div class="audience-interactive-card" onclick="toggleAudienceCard(' + idx + ')">' +
      '<div class="card-top-row">' +
        '<i class="fa-solid ' + item.icon + ' audience-icon"></i>' +
        '<i class="fa-solid fa-chevron-down expand-chevron"></i>' +
      '</div>' +
      '<h4 class="audience-title">' + item.title + '</h4>' +
      '<p class="audience-snippet">' + item.preview + '</p>' +
      '<div class="audience-expanded-content" id="audience-expand-' + idx + '">' +
        '<p class="letter-to-reader">"' + item.letter + '"</p>' +
        '<span class="scripture-anchor"><i class="fa-solid fa-book-bible"></i> ' + item.scripture + '</span>' +
      '</div>' +
    '</div>';
  }).join("");
}

function toggleAudienceCard(idx) {
  const cards = document.querySelectorAll(".audience-interactive-card");
  if (cards[idx]) {
    cards[idx].classList.toggle("expanded");
  }
}

// Render Reviews
function renderReviews() {
  const container = document.getElementById("reviewsGrid");
  if (!container) return;

  container.innerHTML = reviewsList.map((r) => {
    let starHtml = "";
    for (let i = 0; i < r.stars; i++) {
      starHtml += '<i class="fa-solid fa-star"></i>';
    }
    return '<div class="review-lux-card">' +
      '<div>' +
        '<div class="stars">' + starHtml + '</div>' +
        '<p class="quote">“' + r.quote + '”</p>' +
      '</div>' +
      '<div class="reviewer-meta">' +
        '<div class="name">' + r.name + '</div>' +
        '<div class="role">' + r.role + '</div>' +
      '</div>' +
    '</div>';
  }).join("");
}

// Event Listeners
function setupEventListeners() {
  const bagTrigger = document.getElementById("bagTrigger");
  const closeCartBtn = document.getElementById("closeCartBtn");
  const cartBackdrop = document.getElementById("cartBackdrop");
  const heroExcerptBtn = document.getElementById("heroExcerptBtn");
  const closeExcerptBtn = document.getElementById("closeExcerptBtn");
  const openReviewBtn = document.getElementById("openReviewBtn");
  const closeReviewModalBtn = document.getElementById("closeReviewModalBtn");
  const reviewForm = document.getElementById("reviewSubmissionForm");
  const applyPromoBtn = document.getElementById("applyPromoBtn");
  const checkoutTriggerBtn = document.getElementById("checkoutTriggerBtn");
  const closeCheckoutBtn = document.getElementById("closeCheckoutBtn");
  const checkoutForm = document.getElementById("checkoutForm");
  const soundToggle = document.getElementById("soundToggle");

  if (bagTrigger) bagTrigger.addEventListener("click", openCartDrawer);
  if (closeCartBtn) closeCartBtn.addEventListener("click", closeCartDrawer);
  if (cartBackdrop) cartBackdrop.addEventListener("click", closeCartDrawer);

  document.querySelectorAll(".add-cart-action").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const b = e.currentTarget;
      const id = b.getAttribute("data-id");
      const name = b.getAttribute("data-name");
      const price = parseFloat(b.getAttribute("data-price") || "0");
      addToBag(id, name, price);
    });
  });

  if (heroExcerptBtn) {
    heroExcerptBtn.addEventListener("click", () => {
      const modal = document.getElementById("excerptModal");
      if (modal) modal.classList.add("active");
    });
  }
  if (closeExcerptBtn) closeExcerptBtn.addEventListener("click", closeAllModals);

  if (openReviewBtn) {
    openReviewBtn.addEventListener("click", () => {
      const modal = document.getElementById("reviewModal");
      if (modal) modal.classList.add("active");
    });
  }
  if (closeReviewModalBtn) closeReviewModalBtn.addEventListener("click", closeAllModals);

  if (reviewForm) {
    reviewForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const nameInput = document.getElementById("revName");
      const roleInput = document.getElementById("revRole");
      const rateInput = document.getElementById("revRating");
      const textInput = document.getElementById("revComment");

      reviewsList.unshift({
        name: nameInput ? nameInput.value : "Anonymous",
        role: roleInput ? roleInput.value : "Reader",
        stars: parseInt(rateInput ? rateInput.value : "5", 10),
        quote: textInput ? textInput.value : ""
      });

      renderReviews();
      closeAllModals();
      showToast("Thank you. Your testimony has been added!");
      e.target.reset();
    });
  }

  if (applyPromoBtn) {
    applyPromoBtn.addEventListener("click", () => {
      const input = document.getElementById("promoCodeInput");
      const code = input ? input.value.trim().toUpperCase() : "";
      const note = document.getElementById("couponNote");

      if (code === "RESET10") {
        discount = 0.10;
        if (note) {
          note.innerText = "10% discount applied!";
          note.style.color = "#345e44";
        }
        updateCartDrawer();
        showToast("Promo code RESET10 applied!");
      } else {
        if (note) {
          note.innerText = "Invalid code. Try RESET10";
          note.style.color = "#b03e3e";
        }
      }
    });
  }

  if (checkoutTriggerBtn) {
    checkoutTriggerBtn.addEventListener("click", () => {
      if (cart.length === 0) {
        showToast("Your bag is currently empty");
        return;
      }
      closeCartDrawer();
      const modal = document.getElementById("checkoutModal");
      if (modal) modal.classList.add("active");
    });
  }

  if (closeCheckoutBtn) closeCheckoutBtn.addEventListener("click", closeAllModals);

  if (checkoutForm) {
    checkoutForm.addEventListener("submit", (e) => {
      e.preventDefault();
      closeAllModals();
      cart = [];
      updateCartDrawer();
      alert("Blessings! Your order has been placed. You will receive an SMS shipping confirmation with your tracking code.");
    });
  }

  if (soundToggle) soundToggle.addEventListener("click", toggleAmbientSound);
}

// Shopping Bag
function addToBag(id, name, price) {
  const existing = cart.find((item) => item.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id: id, name: name, price: price, qty: 1 });
  }
  updateCartDrawer();
  openCartDrawer();
  showToast("Added " + name + " to your bag");
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

  if (!listEl) return;

  const totalItems = cart.reduce((acc, curr) => acc + curr.qty, 0);
  if (countBadge) countBadge.innerText = totalItems;
  if (drawerCount) drawerCount.innerText = totalItems + (totalItems === 1 ? " item" : " items");

  if (cart.length === 0) {
    listEl.innerHTML = '<p style="text-align: center; color: #888; padding: 60px 0;">Your shopping bag is empty.</p>';
    if (subtotalEl) subtotalEl.innerText = "₱0";
    if (totalEl) totalEl.innerText = "₱0";
    if (discountRow) discountRow.style.display = "none";
    if (fillBar) fillBar.style.width = "0%";
    if (statusLabel) statusLabel.innerText = "Add ₱799 for FREE nationwide shipping";
    if (pctLabel) pctLabel.innerText = "0%";
    return;
  }

  listEl.innerHTML = cart.map((item, index) => {
    return '<div class="cart-item-row">' +
      '<div class="item-meta">' +
        '<h4>' + item.name + '</h4>' +
        '<span class="price">₱' + item.price.toLocaleString() + '</span>' +
      '</div>' +
      '<div class="quantity-controller">' +
        '<button onclick="changeQty(' + index + ', -1)">–</button>' +
        '<span>' + item.qty + '</span>' +
        '<button onclick="changeQty(' + index + ', 1)">+</button>' +
      '</div>' +
    '</div>';
  }).join("");

  const subtotal = cart.reduce((acc, curr) => acc + (curr.price * curr.qty), 0);
  const discountVal = subtotal * discount;
  const finalTotal = subtotal - discountVal;

  if (subtotalEl) subtotalEl.innerText = "₱" + subtotal.toLocaleString();
  if (totalEl) totalEl.innerText = "₱" + finalTotal.toLocaleString();

  if (discount > 0) {
    if (discountRow) discountRow.style.display = "flex";
    if (discountEl) discountEl.innerText = "-₱" + discountVal.toLocaleString();
  } else {
    if (discountRow) discountRow.style.display = "none";
  }

  const pct = Math.min(Math.round((subtotal / 799) * 100), 100);
  if (fillBar) fillBar.style.width = pct + "%";
  if (pctLabel) pctLabel.innerText = pct + "%";

  if (statusLabel) {
    if (subtotal >= 799) {
      statusLabel.innerHTML = "<strong>Unlocked!</strong> You qualify for FREE Nationwide Delivery";
    } else {
      statusLabel.innerText = "Add ₱" + (799 - subtotal).toLocaleString() + " more for FREE shipping";
    }
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
  const drawer = document.getElementById("cartDrawer");
  const backdrop = document.getElementById("cartBackdrop");
  if (drawer) drawer.classList.add("active");
  if (backdrop) backdrop.style.display = "block";
}

function closeCartDrawer() {
  const drawer = document.getElementById("cartDrawer");
  const backdrop = document.getElementById("cartBackdrop");
  if (drawer) drawer.classList.remove("active");
  if (backdrop) backdrop.style.display = "none";
}

function closeAllModals() {
  document.querySelectorAll(".modal-backdrop").forEach((m) => m.classList.remove("active"));
}

function showToast(msg) {
  const t = document.getElementById("luxToast");
  const label = document.getElementById("toastMessage");
  if (!t || !label) return;
  label.innerText = msg;
  t.style.display = "flex";
  setTimeout(() => {
    t.style.display = "none";
  }, 2800);
}

// Sanctuary Ambient Audio
function toggleAmbientSound() {
  const btn = document.getElementById("soundStatus");
  if (!isAudioPlaying) {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      audioContext = new AudioCtx();

      const osc1 = audioContext.createOscillator();
      const osc2 = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      osc1.type = "sine";
      osc1.frequency.setValueAtTime(174, audioContext.currentTime);
      osc2.type = "triangle";
      osc2.frequency.setValueAtTime(261.63, audioContext.currentTime);

      gainNode.gain.setValueAtTime(0.04, audioContext.currentTime);

      osc1.connect(gainNode);
      osc2.connect(gainNode);
      gainNode.connect(audioContext.destination);

      osc1.start();
      osc2.start();

      isAudioPlaying = true;
      if (btn) btn.innerText = "Pause Ambience";
    } catch (err) {
      console.log(err);
    }
  } else {
    if (audioContext) {
      audioContext.close();
    }
    isAudioPlaying = false;
    if (btn) btn.innerText = "Play Ambience";
  }
}