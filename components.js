/* Shared nav + footer injector */
(function () {
  const NAV_HTML = `
<nav class="navbar">
  <div class="nav-inner">
    <a href="index.html" class="nav-brand">
      <div class="logo-icon">csmc</div>
      <span>橋積電</span>
    </a>
    <ul class="nav-links">
      <li><a href="index.html">首頁</a></li>
      <li><a href="about.html">關於我們</a></li>
      <li><a href="services.html">服務項目</a></li>
      <li><a href="resources.html">資源中心</a></li>
      <li><a href="contact.html">聯絡我們</a></li>
      <li>
        <span class="nav-links cart-toggle" style="cursor:pointer;padding:6px 12px;display:flex;align-items:center;gap:6px;color:var(--text-muted)">
          🛒 <span class="cart-badge">0</span>
        </span>
      </li>
      <li><a href="careers.html" class="btn-hire">應徵</a></li>
    </ul>
    <button class="hamburger" aria-label="Menu">
      <span></span><span></span><span></span>
    </button>
  </div>
</nav>`;

  const FOOTER_HTML = `
<footer>
  <p>©2026 橋積電股份有限公司 &nbsp;·&nbsp; <span>All Rights Reserved</span></p>
</footer>`;

  const CART_HTML = `
<div class="cart-overlay" id="cartOverlay">
  <div class="cart-panel">
    <div class="cart-header">
      <h3>🛒 購物車</h3>
      <button class="cart-close" id="cartClose">✕</button>
    </div>
    <div class="cart-items" id="cartItems"></div>
    <div class="cart-total">
      <span class="cart-total-label">合計</span>
      <span class="cart-total-val" id="cartTotal">NT$0</span>
    </div>
    <button class="btn btn-primary btn-full" onclick="alert('結帳功能開發中，感謝您的耐心等候！')">前往結帳</button>
  </div>
</div>`;

  document.body.insertAdjacentHTML('afterbegin', NAV_HTML);
  document.body.insertAdjacentHTML('beforeend', FOOTER_HTML);
  document.body.insertAdjacentHTML('beforeend', CART_HTML);
})();
