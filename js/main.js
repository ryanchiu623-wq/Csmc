/* =========================================
   橋積電 CSMC — Main JavaScript
   ========================================= */

/* --- Mobile nav --- */
const hamburger = document.querySelector('.hamburger');
const navLinks  = document.querySelector('.nav-links');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    hamburger.classList.toggle('open');
  });
  // close on link click
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
    });
  });
}

/* --- Active nav link --- */
(function markActive() {
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href') || '';
    if (href === page || (page === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
})();

/* =========================================
   CART
   ========================================= */
let cart = JSON.parse(localStorage.getItem('csmc_cart') || '[]');

function saveCart() {
  localStorage.setItem('csmc_cart', JSON.stringify(cart));
}

function updateCartBadge() {
  const count = cart.reduce((s, i) => s + i.qty, 0);
  document.querySelectorAll('.cart-badge').forEach(b => b.textContent = count);
}

function renderCart() {
  const itemsEl = document.getElementById('cartItems');
  const totalEl = document.getElementById('cartTotal');
  if (!itemsEl) return;

  if (cart.length === 0) {
    itemsEl.innerHTML = '<p class="cart-empty">購物車目前是空的</p>';
    if (totalEl) totalEl.textContent = 'NT$0';
    return;
  }

  itemsEl.innerHTML = cart.map((item, idx) => `
    <div class="cart-item">
      <div class="cart-item-name">${item.name}<br>
        <small style="color:var(--text-muted)">× ${item.qty}</small>
      </div>
      <div class="cart-item-price">NT$${(item.price * item.qty)}</div>
      <button class="cart-item-remove" onclick="removeFromCart(${idx})" aria-label="移除">✕</button>
    </div>
  `).join('');

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  if (totalEl) totalEl.textContent = `NT$${total}`;
}

function removeFromCart(idx) {
  cart.splice(idx, 1);
  saveCart();
  updateCartBadge();
  renderCart();
}

function addToCart(name, price, qty) {
  const existing = cart.find(i => i.name === name);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ name, price, qty });
  }
  saveCart();
  updateCartBadge();

  // flash confirmation
  const btn = [...document.querySelectorAll('.add-cart-btn')].find(b =>
    b.closest('.product-card')?.querySelector('.product-name')?.textContent === name
  );
  if (btn) {
    const orig = btn.textContent;
    btn.textContent = '✓ 已加入';
    btn.disabled = true;
    setTimeout(() => { btn.textContent = orig; btn.disabled = false; }, 1500);
  }
}

// Cart open/close
document.querySelectorAll('.cart-toggle').forEach(el => {
  el.addEventListener('click', () => {
    document.getElementById('cartOverlay')?.classList.add('open');
    renderCart();
  });
});
document.getElementById('cartClose')?.addEventListener('click', () => {
  document.getElementById('cartOverlay')?.classList.remove('open');
});
document.getElementById('cartOverlay')?.addEventListener('click', (e) => {
  if (e.target === document.getElementById('cartOverlay')) {
    document.getElementById('cartOverlay').classList.remove('open');
  }
});

// Wire up add-to-cart buttons
document.querySelectorAll('.add-cart-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const card = btn.closest('.product-card');
    const name  = card.querySelector('.product-name').textContent;
    const price = parseInt(card.querySelector('.product-price').dataset.price, 10);
    const qty   = parseInt(card.querySelector('.qty-val').value || '1', 10);
    addToCart(name, price, qty);
  });
});

// Qty buttons
document.querySelectorAll('.qty-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const input = btn.parentElement.querySelector('.qty-val');
    let v = parseInt(input.value, 10);
    if (btn.dataset.dir === 'up')   v = Math.min(v + 1, 99);
    if (btn.dataset.dir === 'down') v = Math.max(v - 1, 1);
    input.value = v;
  });
});

/* =========================================
   CONTACT FORMS
   ========================================= */
document.querySelectorAll('.contact-form').forEach(form => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const toast = form.querySelector('.form-toast');
    if (toast) {
      toast.classList.add('show');
      form.reset();
      setTimeout(() => toast.classList.remove('show'), 4000);
    }
  });
});

/* =========================================
   SCROLL REVEAL
   ========================================= */
const revealEls = document.querySelectorAll(
  '.team-card, .product-card, .case-card, .testi-card, .resource-card, .feature-row'
);
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        en.target.style.opacity = '1';
        en.target.style.transform = 'translateY(0)';
        io.unobserve(en.target);
      }
    });
  }, { threshold: 0.1 });

  revealEls.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(16px)';
    el.style.transition = 'opacity 0.45s ease, transform 0.45s ease';
    io.observe(el);
  });
}

/* --- init --- */
updateCartBadge();
