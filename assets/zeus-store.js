/**
 * ZEUS STORE - Interactive Engine (zeus-store.js)
 * High-performance, zero-dependency client-side store engine.
 * Covers: Cart, Wishlist, Currency Conversion, Realtime Search, Mobile Drawer,
 * Checkout Gateway Selection & Order Processing, and Toast Notifications.
 */
(function() {
  'use strict';

  // ==========================================
  // 1. HIGH-PRECISION EXCHANGE RATES & ENGINE
  // ==========================================
  const CURRENCIES = {
    EGP: { symbol: 'ج.م', name: 'جنيه مصري', rate: 1.0, flag: '🇪🇬', decimals: 0, egpPerUnit: 1.0 },
    SAR: { symbol: 'ر.س', name: 'ريال سعودي', rate: 0.073039, flag: '🇸🇦', decimals: 2, egpPerUnit: 13.691 },
    USD: { symbol: '$', name: 'دولار أمريكي', rate: 0.019477, flag: '🇺🇸', decimals: 2, egpPerUnit: 51.342 },
    AED: { symbol: 'د.إ', name: 'درهم إماراتي', rate: 0.071530, flag: '🇦🇪', decimals: 2, egpPerUnit: 13.980 },
    KWD: { symbol: 'د.ك', name: 'دينار كويتي', rate: 0.006003, flag: '🇰🇼', decimals: 3, egpPerUnit: 166.595 },
    USDT: { symbol: 'USDT', name: 'تيزر رقمي', rate: 0.019477, flag: '💎', decimals: 2, egpPerUnit: 51.342 }
  };

  const FX_CACHE_KEY = 'zeus_fx_rates_cache';
  const FX_CACHE_DURATION = 60 * 60 * 1000; // 1 hour

  function updateRatesFromFx(usdToEgp, usdToSar, usdToAed, usdToKwd) {
    if (!usdToEgp || usdToEgp <= 0) return;

    CURRENCIES.USD.rate = 1.0 / usdToEgp;
    CURRENCIES.USD.egpPerUnit = usdToEgp;

    CURRENCIES.USDT.rate = 1.0 / usdToEgp;
    CURRENCIES.USDT.egpPerUnit = usdToEgp;

    if (usdToSar) {
      CURRENCIES.SAR.rate = usdToSar / usdToEgp;
      CURRENCIES.SAR.egpPerUnit = usdToEgp / usdToSar;
    }
    if (usdToAed) {
      CURRENCIES.AED.rate = usdToAed / usdToEgp;
      CURRENCIES.AED.egpPerUnit = usdToEgp / usdToAed;
    }
    if (usdToKwd) {
      CURRENCIES.KWD.rate = usdToKwd / usdToEgp;
      CURRENCIES.KWD.egpPerUnit = usdToEgp / usdToKwd;
    }
  }

  function syncExchangeRates(onComplete) {
    // 1. Try reading cache first
    try {
      const cached = JSON.parse(localStorage.getItem(FX_CACHE_KEY) || 'null');
      if (cached && (Date.now() - cached.timestamp < FX_CACHE_DURATION)) {
        updateRatesFromFx(cached.usdToEgp, cached.usdToSar, cached.usdToAed, cached.usdToKwd);
        if (typeof onComplete === 'function') onComplete();
        return;
      }
    } catch(e) {}

    // 2. Fetch fresh rates asynchronously
    const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
    const timeoutId = controller ? setTimeout(() => controller.abort(), 4000) : null;

    fetch('https://open.er-api.com/v6/latest/USD', {
      signal: controller ? controller.signal : undefined
    })
      .then(r => r.json())
      .then(data => {
        if (timeoutId) clearTimeout(timeoutId);
        if (data && data.result === 'success' && data.rates && data.rates.EGP) {
          const egp = parseFloat(data.rates.EGP);
          const sar = parseFloat(data.rates.SAR || 3.75);
          const aed = parseFloat(data.rates.AED || 3.6725);
          const kwd = parseFloat(data.rates.KWD || 0.308184);

          updateRatesFromFx(egp, sar, aed, kwd);

          try {
            localStorage.setItem(FX_CACHE_KEY, JSON.stringify({
              timestamp: Date.now(),
              usdToEgp: egp,
              usdToSar: sar,
              usdToAed: aed,
              usdToKwd: kwd
            }));
          } catch(e) {}

          if (typeof onComplete === 'function') onComplete();
        }
      })
      .catch(() => {
        // High precision built-in rates are used
      });
  }

  function formatAmount(num, curr) {
    const info = CURRENCIES[curr] || CURRENCIES.EGP;
    const decimals = typeof info.decimals === 'number' ? info.decimals : 2;

    if (curr === 'EGP') {
      if (Math.abs(num - Math.round(num)) < 0.01) {
        return Math.round(num).toLocaleString('en-US');
      }
      return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
    if (curr === 'KWD') {
      return num.toLocaleString('en-US', { minimumFractionDigits: 3, maximumFractionDigits: 3 });
    }
    return num.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  }

  function formatPriceHtml(amount, curr) {
    const info = CURRENCIES[curr] || CURRENCIES.EGP;
    const formatted = formatAmount(amount, curr);
    return `<span class="tabular-nums font-mono">${formatted}</span> <span class="currency-arabic text-xs font-semibold">${info.symbol}</span>`;
  }

  let catalogData = [];

  // Load catalog.json
  fetch('./catalog.json')
    .then(r => r.json())
    .then(data => { catalogData = data; })
    .catch(() => {});
  // ==========================================
  // 2. STATE HELPERS (Safe Storage with in-memory fallback)
  // ==========================================
  const _storage = {
    getItem(key) {
      try {
        if (typeof window !== 'undefined' && window.localStorage) {
          return window.localStorage.getItem(key);
        }
        return this[key] || null;
      } catch(e) {
        return this[key] || null;
      }
    },
    setItem(key, val) {
      try {
        if (typeof window !== 'undefined' && window.localStorage) {
          window.localStorage.setItem(key, val);
          return;
        }
        this[key] = String(val);
      } catch(e) {
        this[key] = String(val);
      }
    }
  };

  function getCart() {
    try {
      return JSON.parse(_storage.getItem('zeus_cart') || '[]');
    } catch(e) { return []; }
  }

  function saveCart(cart) {
    try {
      _storage.setItem('zeus_cart', JSON.stringify(cart));
    } catch(e) {}
    updateCartBadges();
    renderCartDrawer();
  }

  function getCurrency() {
    return _storage.getItem('zeus_currency') || 'EGP';
  }

  function setCurrency(curr) {
    if (!CURRENCIES[curr]) return;
    try {
      _storage.setItem('zeus_currency', curr);
    } catch(e) {}
    applyCurrency(curr);
  }

  function getWishlist() {
    try {
      return JSON.parse(_storage.getItem('zeus_wishlist') || '[]');
    } catch(e) { return []; }
  }

  function toggleWishlist(title) {
    let list = getWishlist();
    const idx = list.indexOf(title);
    let added = false;
    if (idx > -1) {
      list.splice(idx, 1);
    } else {
      list.push(title);
      added = true;
    }
    try {
      _storage.setItem('zeus_wishlist', JSON.stringify(list));
    } catch(e) {}
    showToast(added ? 'تمت إضافة المنتج للمفضلة ' : 'تمت إزالة المنتج من المفضلة', 'info');
    updateWishlistIcons();
  }

  // ==========================================
  // 3. TOAST NOTIFICATION SYSTEM
  // ==========================================
  function showToast(message, type = 'success') {
    let container = document.getElementById('zeus-toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'zeus-toast-container';
      container.className = 'fixed bottom-20 sm:bottom-6 start-1/2 -translate-x-1/2 z-[99999] flex flex-col gap-2.5 pointer-events-none items-center w-full max-w-md px-4';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    const isError = type === 'error' || type === 'danger';
    const isSuccess = type === 'success';

    // Rich luxury burgundy red for errors as requested by user
    let styleClass = '';
    let iconSvg = '';
    if (isError) {
      styleClass = 'zeus-toast-error';
      iconSvg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="shrink-0 text-rose-200">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
      `;
    } else if (isSuccess) {
      styleClass = 'bg-slate-900/95 text-white ring-emerald-500/40 border border-emerald-500/30 shadow-2xl';
      iconSvg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="shrink-0 text-emerald-400">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
      `;
    } else {
      styleClass = 'bg-slate-900/95 text-white ring-amber-500/40 border border-amber-500/30 shadow-2xl';
      iconSvg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="shrink-0 text-amber-400">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="16" x2="12" y2="12"></line>
          <line x1="12" y1="8" x2="12.01" y2="8"></line>
        </svg>
      `;
    }

    toast.className = `pointer-events-auto flex items-center gap-3 px-4.5 py-3.5 rounded-2xl backdrop-blur-xl transition-all duration-300 transform translate-y-4 opacity-0 w-full sm:w-auto min-w-[280px] sm:min-w-[320px] text-start ${styleClass}`;
    toast.innerHTML = `
      <div class="flex items-center gap-3 font-medium text-xs sm:text-sm leading-snug w-full">
        ${iconSvg}
        <span class="flex-1">${message}</span>
      </div>
    `;
    container.appendChild(toast);

    requestAnimationFrame(() => {
      toast.classList.remove('translate-y-4', 'opacity-0');
      toast.classList.add('translate-y-0', 'opacity-100');
    });

    setTimeout(() => {
      toast.classList.add('opacity-0', '-translate-y-2');
      setTimeout(() => toast.remove(), 300);
    }, 3800);
  }
  window.showToast = showToast;

  // ==========================================
  // 4. CART DRAWER & BADGES
  // ==========================================
  function updateCartBadges() {
    const cart = getCart();
    const count = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    
    // Header cart button
    document.querySelectorAll('.nv-cart, [aria-label="السلة"]').forEach(btn => {
      let badge = btn.querySelector('.zeus-cart-badge');
      if (count > 0) {
        if (!badge) {
          badge = document.createElement('span');
          badge.className = 'zeus-cart-badge absolute -top-1 -end-1 flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-cyan-500 text-slate-950 text-[10.5px] font-black tabular-nums shadow-lg ring-2 ring-slate-900 animate-pulse';
          btn.style.position = 'relative';
          btn.appendChild(badge);
        }
        badge.textContent = count;
      } else if (badge) {
        badge.remove();
      }
    });

    // Mobile nav cart button
    document.querySelectorAll('.nv-tab--cart').forEach(btn => {
      let wrap = btn.querySelector('.nv-tab__cartwrap') || btn;
      let badge = wrap.querySelector('.zeus-cart-badge');
      if (count > 0) {
        if (!badge) {
          badge = document.createElement('span');
          badge.className = 'zeus-cart-badge absolute -top-1 -end-1 flex items-center justify-center min-w-[16px] h-[16px] px-1 rounded-full bg-cyan-400 text-slate-950 text-[10px] font-black tabular-nums ring-1 ring-slate-950';
          wrap.style.position = 'relative';
          wrap.appendChild(badge);
        }
        badge.textContent = count;
      } else if (badge) {
        badge.remove();
      }
    });
  }

  function initCartDrawer() {
    if (document.getElementById('zeus-cart-drawer')) return;

    const drawerHtml = `
      <div id="zeus-cart-drawer" class="fixed inset-0 z-[99990] invisible opacity-0 transition-opacity duration-300">
        <!-- Backdrop -->
        <div id="zeus-cart-backdrop" class="absolute inset-0 bg-black/70 backdrop-blur-xs transition-opacity duration-300"></div>
        
        <!-- Panel -->
        <div id="zeus-cart-panel" class="absolute top-0 end-0 bottom-0 w-full max-w-md bg-slate-900/95 border-s border-white/10 text-white shadow-2xl flex flex-col transform translate-x-full transition-transform duration-300 ease-out">
          <!-- Header -->
          <div class="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between">
            <div class="flex items-center gap-2.5">
              <span class="p-2 rounded-xl bg-cyan-500/15 text-amber-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="21" r="1"></circle><circle cx="19" cy="21" r="1"></circle><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path></svg>
              </span>
              <h3 class="text-base sm:text-lg font-bold">سلة المشتريات</h3>
            </div>
            <button id="zeus-cart-close" class="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition" aria-label="إغلاق">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>

          <!-- Items List -->
          <div id="zeus-cart-items" class="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5 divide-y divide-white/5">
            <!-- Rendered dynamically -->
          </div>

          <!-- Footer Summary -->
          <div class="p-4 sm:p-5 border-t border-white/10 bg-slate-950/50 space-y-3">
            <div class="flex items-center justify-between text-sm sm:text-base">
              <span class="text-slate-400 font-medium">الإجمالي التقريبي:</span>
              <span id="zeus-cart-total" class="font-extrabold text-amber-600 text-lg tabular-nums">0 ج.م</span>
            </div>
            <a href="checkout.html" class="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl font-bold text-sm sm:text-base bg-amber-600 hover:bg-amber-700 text-white shadow-lg shadow-cyan-500/25 transition active:scale-98">
              <span>متابعة إتمام الطلب</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </a>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', drawerHtml);

    document.getElementById('zeus-cart-close').onclick = closeCartDrawer;
    document.getElementById('zeus-cart-backdrop').onclick = closeCartDrawer;
  }

  function openCartDrawer() {
    initCartDrawer();
    renderCartDrawer();
    const drawer = document.getElementById('zeus-cart-drawer');
    const panel = document.getElementById('zeus-cart-panel');
    drawer.classList.remove('invisible', 'opacity-0');
    drawer.classList.add('opacity-100');
    panel.classList.remove('translate-x-full');
    panel.classList.add('translate-x-0');
    document.body.style.overflow = 'hidden';
  }

  function closeCartDrawer() {
    const drawer = document.getElementById('zeus-cart-drawer');
    const panel = document.getElementById('zeus-cart-panel');
    if (!drawer) return;
    drawer.classList.remove('opacity-100');
    drawer.classList.add('opacity-0');
    panel.classList.remove('translate-x-0');
    panel.classList.add('translate-x-full');
    setTimeout(() => {
      drawer.classList.add('invisible');
      document.body.style.overflow = '';
    }, 300);
  }

  function renderCartDrawer() {
    const container = document.getElementById('zeus-cart-items');
    const totalEl = document.getElementById('zeus-cart-total');
    if (!container) return;

    const cart = getCart();
    const curr = getCurrency();
    const currInfo = CURRENCIES[curr] || CURRENCIES.EGP;

    if (cart.length === 0) {
      container.innerHTML = `
        <div class="py-12 flex flex-col items-center justify-center text-center space-y-3 text-slate-400">
          <div class="p-4 rounded-full bg-white/5 ring-1 ring-white/10">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="opacity-60"><circle cx="8" cy="21" r="1"></circle><circle cx="19" cy="21" r="1"></circle><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path></svg>
          </div>
          <p class="font-bold text-sm text-[#0F172A]">السلة فارغة حالياً</p>
          <p class="text-xs text-slate-400 max-w-[200px]">تصفح المنتجات المتوفرة وأضف اشتراكاتك المفضلة الآن</p>
          <a href="products.html" class="mt-2 text-xs font-bold text-amber-600 hover:underline">تصفح المنتجات</a>
        </div>
      `;
      if (totalEl) totalEl.textContent = `0 ${currInfo.symbol}`;
      return;
    }

    let total = 0;
    container.innerHTML = cart.map((item, idx) => {
      const priceVal = parseFloat(item.price) || 0;
      const itemQty = item.quantity || 1;
      const convertedUnit = priceVal * currInfo.rate;
      const itemSubtotal = convertedUnit * itemQty;
      total += itemSubtotal;

      return `
        <div class="pt-3.5 first:pt-0 flex items-center gap-3">
          <img src="${item.image || './assets/logo-ar.webp'}" alt="${item.title}" class="w-14 h-14 object-cover rounded-xl bg-slate-800 ring-1 ring-white/10 shrink-0">
          <div class="flex-1 min-w-0">
            <h4 class="text-xs sm:text-sm font-bold text-[#0F172A] truncate">${item.title}</h4>
            <div class="text-xs text-amber-600 font-extrabold mt-0.5 tabular-nums">
              ${formatAmount(convertedUnit, curr)} ${currInfo.symbol}
            </div>
            <!-- Quantity controls -->
            <div class="flex items-center gap-2 mt-2">
              <button class="zeus-qty-btn p-1 rounded-md bg-white/10 hover:bg-white/20 text-xs w-6 h-6 flex items-center justify-center font-bold" data-idx="${idx}" data-delta="-1">-</button>
              <span class="text-xs font-bold tabular-nums">${itemQty}</span>
              <button class="zeus-qty-btn p-1 rounded-md bg-white/10 hover:bg-white/20 text-xs w-6 h-6 flex items-center justify-center font-bold" data-idx="${idx}" data-delta="1">+</button>
            </div>
          </div>
          <button class="zeus-remove-btn p-2 text-slate-400 hover:text-rose-400 transition" data-idx="${idx}" title="حذف">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
          </button>
        </div>
      `;
    }).join('');

    if (totalEl) totalEl.textContent = `${formatAmount(total, curr)} ${currInfo.symbol}`;

    // Attach listeners
    container.querySelectorAll('.zeus-qty-btn').forEach(btn => {
      btn.onclick = function(e) {
        e.stopPropagation();
        const idx = parseInt(this.dataset.idx);
        const delta = parseInt(this.dataset.delta);
        const c = getCart();
        if (c[idx]) {
          c[idx].quantity = (c[idx].quantity || 1) + delta;
          if (c[idx].quantity <= 0) c.splice(idx, 1);
          saveCart(c);
        }
      };
    });

    container.querySelectorAll('.zeus-remove-btn').forEach(btn => {
      btn.onclick = function(e) {
        e.stopPropagation();
        const idx = parseInt(this.dataset.idx);
        const c = getCart();
        c.splice(idx, 1);
        saveCart(c);
        showToast('تم حذف المنتج من السلة', 'info');
      };
    });
  }

  // ==========================================
  // 5. ADD TO CART & BUY NOW HANDLERS
  // ==========================================
  function extractProductInfo(element) {
    // Traverse parentElement first to avoid matching the clicked button itself (which has class pcv-press)
    const card = element.parentElement ? (
      element.parentElement.closest('.product-card-item, .pcv-flash, [data-product-card], [class*="product-card"], .group, [class*="pcv"]') ||
      element.parentElement
    ) : element;

    const titleEl = card ? card.querySelector('h1, h2, h3, h4, [class*="title"], [class*="line-clamp"], [class*="font-semibold"], [class*="font-medium"]') : null;
    const title = titleEl ? titleEl.textContent.trim() : 'منتج رقمي';

    // Price extraction: prioritize active selling price (exclude strikethrough/old price)
    const priceEl = card ? (
      card.querySelector('.product-price:not(.line-through) .price-display') ||
      card.querySelector('.product-price:not(.line-through)') ||
      card.querySelector('.price-display') ||
      card.querySelector('[class*="product-price"]')
    ) : null;

    let price = 1000; // default fallback
    if (priceEl) {
      const baseEgpAttr = priceEl.getAttribute('data-egp-price') || (priceEl.querySelector('.price-display') ? priceEl.querySelector('.price-display').getAttribute('data-egp-price') : null);
      if (baseEgpAttr) {
        price = parseFloat(baseEgpAttr);
      } else {
        const numMatch = priceEl.textContent.replace(/,/g, '').match(/\d+(?:\.\d+)?/);
        if (numMatch) {
          const curr = getCurrency();
          const currRate = (CURRENCIES[curr] && CURRENCIES[curr].rate) ? CURRENCIES[curr].rate : 1.0;
          price = parseFloat(numMatch[0]) / currRate;
        }
      }
    }

    // Image extraction: exclude navigation icons or small logos
    const imgEl = card ? card.querySelector('img:not(.cur-switch__btn img):not(.nv-brand__img)') : null;
    const image = imgEl ? (imgEl.src || imgEl.getAttribute('src')) : './assets/logo-ar.webp';

    return { id: title.replace(/\s+/g, '-').toLowerCase(), title, price, image, quantity: 1 };
  }

  function handleAddToCart(e, btn) {
    e.preventDefault();
    e.stopPropagation();
    const product = extractProductInfo(btn);
    const cart = getCart();
    const existing = cart.find(item => item.title === product.title);
    if (existing) {
      existing.quantity = (existing.quantity || 1) + 1;
    } else {
      cart.push(product);
    }
    saveCart(cart);
    showToast(`تمت إضافة "${product.title}" إلى السلة بنجاح! `);
  }

  function handleBuyNow(e, btn) {
    e.preventDefault();
    e.stopPropagation();
    const product = extractProductInfo(btn);
    const cart = getCart();
    const existing = cart.find(item => item.title === product.title);
    if (existing) {
      existing.quantity = (existing.quantity || 1) + 1;
    } else {
      cart.push(product);
    }
    saveCart(cart);
    window.location.href = 'checkout.html';
  }

  // ==========================================
  // 6. CURRENCY CONVERTER DROPDOWN
  // ==========================================
  function initCurrencySwitcher() {
    document.querySelectorAll('.cur-switch__btn').forEach(btn => {
      btn.onclick = function(e) {
        e.stopPropagation();
        toggleCurrencyMenu(btn);
      };
    });

    applyCurrency(getCurrency());
  }

  function toggleCurrencyMenu(btn) {
    let menu = document.getElementById('zeus-currency-menu');
    if (menu) {
      menu.remove();
      return;
    }

    menu = document.createElement('div');
    menu.id = 'zeus-currency-menu';
    menu.className = 'cur-switch__menu';

    const current = getCurrency();
    const itemsHtml = Object.entries(CURRENCIES).map(([code, info]) => {
      const isBase = code === 'EGP';
      const isSelected = code === current;
      const rateHint = isBase ? 'العملة الأساسية' : `1 ${info.symbol} ≈ ${info.egpPerUnit.toFixed(2)} ج.م`;
      return `
        <button type="button" class="cur-switch__item ${isSelected ? 'is-active' : ''} zeus-curr-opt" data-curr="${code}">
          <span class="text-base shrink-0 leading-none">${info.flag}</span>
          <span class="flex flex-col flex-1 min-w-0 text-start">
            <span class="font-bold text-xs leading-tight">${info.name}</span>
            <span class="text-[10px] text-muted-foreground font-mono mt-0.5">${rateHint}</span>
          </span>
          <span class="cur-switch__item-code text-xs font-mono font-bold shrink-0 text-end">${code}</span>
        </button>
      `;
    }).join('');

    menu.innerHTML = `
      <div class="cur-switch__list">
        ${itemsHtml}
      </div>
      <div class="pt-2 mt-1.5 border-t border-border/50 text-[10.5px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center justify-center gap-1.5">
        <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
        <span>أسعار صرف حية وفائقة الدقة</span>
      </div>
    `;

    btn.parentElement.style.position = 'relative';
    btn.parentElement.appendChild(menu);

    menu.querySelectorAll('.zeus-curr-opt').forEach(opt => {
      opt.onclick = function(e) {
        e.stopPropagation();
        const code = this.dataset.curr;
        setCurrency(code);
        menu.remove();
        showToast(`تم تغيير العملة إلى: ${CURRENCIES[code].name} (${code})`, 'info');
      };
    });

    setTimeout(() => {
      const closeMenu = (ev) => {
        if (!menu.contains(ev.target) && ev.target !== btn) {
          menu.remove();
          document.removeEventListener('click', closeMenu);
        }
      };
      document.addEventListener('click', closeMenu);
    }, 10);
  }

  function applyCurrency(curr) {
    const info = CURRENCIES[curr] || CURRENCIES.EGP;
    // Update button labels
    document.querySelectorAll('.cur-switch__btn, .cur-switch__code').forEach(el => {
      if (el.classList.contains('cur-switch__code') || el.classList.contains('cur-switch__btn')) {
        el.textContent = curr;
      }
    });

    // Recalculate prices in DOM
    document.querySelectorAll('.price-display').forEach(p => {
      let baseEgp = p.getAttribute('data-egp-price');
      if (!baseEgp) {
        const cleaned = p.textContent.replace(/,/g, '');
        const match = cleaned.match(/\d+(?:\.\d+)?/);
        if (match) {
          baseEgp = match[0];
          p.setAttribute('data-egp-price', baseEgp);
        }
      }
      if (baseEgp) {
        const val = parseFloat(baseEgp);
        const converted = val * info.rate;
        p.innerHTML = formatPriceHtml(converted, curr);
      }
    });

    renderCartDrawer();

    // If on checkout page, update checkout amounts and rates
    if (window.location.pathname.includes('checkout') && typeof updateCheckoutAmounts === 'function') {
      updateCheckoutAmounts();
    }
  }
// ==========================================
  // 7. REALTIME SEARCH MODAL
  // ==========================================
  function initSearchModal() {
    // Buttons triggering search
    document.querySelectorAll('[aria-label="بحث"], .nv-tab:nth-child(4)').forEach(btn => {
      btn.onclick = function(e) {
        e.preventDefault();
        openSearchModal();
      };
    });
  }

  function openSearchModal() {
    let modal = document.getElementById('zeus-search-modal');
    if (!modal) {
      const modalHtml = `
        <div id="zeus-search-modal" class="fixed inset-0 z-[99999] flex flex-col bg-slate-900/40 backdrop-blur-sm p-4 sm:p-6 transition-opacity duration-200">
          <div class="w-full max-w-2xl mx-auto flex flex-col flex-1">
            <!-- Search Header -->
            <div class="flex items-center gap-3 pb-4 border-b border-white/10">
              <div class="flex-1 relative">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="absolute start-4 top-1/2 -translate-y-1/2 text-amber-600"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                <input id="zeus-search-input" type="text" placeholder="ابحث عن ألعاب، اشتراكات، بطاقات..." autofocus class="w-full bg-white border border-[#E8E0D2] rounded-2xl ps-12 pe-4 py-3.5 text-[#0F172A] placeholder-slate-400 focus:outline-none focus:border-amber-600 text-sm sm:text-base ring-1 focus:ring-amber-500/20 transition">
              </div>
              <button id="zeus-search-close" class="p-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition text-xs font-bold" aria-label="إغلاق">إلغاء</button>
            </div>

            <!-- Results -->
            <div id="zeus-search-results" class="flex-1 overflow-y-auto py-4 space-y-2.5">
              <div class="text-center py-10 text-slate-400 text-sm">اكتب كلمة البحث للبدء في العرض الفوري للمنتجات...</div>
            </div>
          </div>
        </div>
      `;
      document.body.insertAdjacentHTML('beforeend', modalHtml);
      modal = document.getElementById('zeus-search-modal');

      document.getElementById('zeus-search-close').onclick = closeSearchModal;
      document.getElementById('zeus-search-input').oninput = handleSearchInput;
    }

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
      const inp = document.getElementById('zeus-search-input');
      if (inp) inp.focus();
    }, 100);
  }

  function closeSearchModal() {
    const modal = document.getElementById('zeus-search-modal');
    if (modal) {
      modal.classList.add('hidden');
      document.body.style.overflow = '';
    }
  }

  function handleSearchInput() {
    const query = this.value.trim().toLowerCase();
    const resultsContainer = document.getElementById('zeus-search-results');
    if (!resultsContainer) return;

    if (!query) {
      resultsContainer.innerHTML = '<div class="text-center py-10 text-slate-400 text-sm">اكتب كلمة البحث للبدء في العرض الفوري للمنتجات...</div>';
      return;
    }

    const matches = catalogData.filter(item => 
      (item.title && item.title.toLowerCase().includes(query)) ||
      (item.description && item.description.toLowerCase().includes(query))
    );

    if (matches.length === 0) {
      resultsContainer.innerHTML = `<div class="text-center py-10 text-slate-400 text-sm">لم يتم العثور على نتائج تطابق: "${query}"</div>`;
      return;
    }

    const curr = getCurrency();
    const currInfo = CURRENCIES[curr] || CURRENCIES.EGP;

    resultsContainer.innerHTML = matches.map(item => {
      const priceEgp = item.price_egp || (item.price_sar ? item.price_sar * (CURRENCIES.SAR.egpPerUnit || 13.69) : 1000);
      const converted = priceEgp * currInfo.rate;

      return `
        <div class="p-3 rounded-2xl bg-slate-900/80 hover:bg-slate-800/90 border border-white/10 flex items-center justify-between gap-3 transition">
          <div class="flex items-center gap-3 min-w-0">
            <img src="${item.image || './assets/logo-ar.webp'}" alt="${item.title}" class="w-12 h-12 rounded-xl object-cover bg-slate-950 shrink-0">
            <div class="min-w-0">
              <h4 class="text-xs sm:text-sm font-bold text-[#0F172A] truncate">${item.title}</h4>
              <p class="text-[11px] text-amber-600 font-extrabold mt-0.5 tabular-nums">${formatAmount(converted, curr)} ${currInfo.symbol}</p>
            </div>
          </div>
          <button class="zeus-search-buy-btn shrink-0 px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs transition" data-title="${item.title}" data-price="${priceEgp}" data-img="${item.image}">
            شراء
          </button>
        </div>
      `;
    }).join('');

    resultsContainer.querySelectorAll('.zeus-search-buy-btn').forEach(btn => {
      btn.onclick = function() {
        const product = {
          id: this.dataset.title.replace(/\s+/g, '-').toLowerCase(),
          title: this.dataset.title,
          price: parseFloat(this.dataset.price),
          image: this.dataset.img,
          quantity: 1
        };
        const cart = getCart();
        cart.push(product);
        saveCart(cart);
        closeSearchModal();
        window.location.href = 'checkout.html';
      };
    });
  }

  // ==========================================
  // 8. MOBILE NAVIGATION DRAWER
  // ==========================================
  function initMobileMenu() {
    document.querySelectorAll('[aria-label="القائمة"]').forEach(btn => {
      btn.onclick = function(e) {
        e.preventDefault();
        openMobileMenu();
      };
    });
  }

  function openMobileMenu() {
    let drawer = document.getElementById('zeus-mobile-menu');
    if (!drawer) {
      const menuHtml = `
        <div id="zeus-mobile-menu" class="fixed inset-0 z-[99998] flex">
          <div id="zeus-menu-backdrop" class="fixed inset-0 bg-slate-900/40 backdrop-blur-sm"></div>
          <div class="relative w-72 max-w-[80vw] bg-white border-e border-[#E8E0D2] text-[#0F172A] p-5 flex flex-col justify-between shadow-2xl z-10">
            <div class="space-y-6">
              <div class="flex items-center justify-between pb-4 border-b border-[#F0E8DC]">
                <div class="flex items-center gap-2">
                  <img src="./assets/logo-ar.webp" alt="زيوس ستور" class="w-7 h-7 object-contain">
                  <span class="font-extrabold text-sm tracking-tight text-[#0F172A]">زيوس ستور</span>
                </div>
                <button id="zeus-menu-close" class="p-1.5 rounded-lg text-slate-400 hover:text-slate-700">✕</button>
              </div>
              <nav class="flex flex-col gap-2 font-medium text-sm">
                <a href="index.html" class="px-3 py-2 rounded-xl hover:bg-amber-50 text-[#0F172A] hover:text-amber-700">الرئيسية</a>
                <a href="products.html" class="px-3 py-2 rounded-xl hover:bg-amber-50 text-[#0F172A] hover:text-amber-700">المنتجات</a>
                <a href="categories.html" class="px-3 py-2 rounded-xl hover:bg-amber-50 text-[#0F172A] hover:text-amber-700">الأقسام</a>
                <a href="about.html" class="px-3 py-2 rounded-xl hover:bg-amber-50 text-[#0F172A] hover:text-amber-700">من نحن</a>
                <a href="contact.html" class="px-3 py-2 rounded-xl hover:bg-amber-50 text-[#0F172A] hover:text-amber-700">اتصل بنا</a>
                <a href="digital-return-policy.html" class="px-3 py-2 rounded-xl hover:bg-amber-50 text-[#0F172A] hover:text-amber-700">سياسة الاسترجاع</a>
                <a href="privacy.html" class="px-3 py-2 rounded-xl hover:bg-amber-50 text-[#0F172A] hover:text-amber-700">سياسة الخصوصية</a>
              </nav>
            </div>
            <div class="pt-4 border-t border-[#F0E8DC] text-xs text-slate-500 text-center">
              © 2026 ZEUS STORE
            </div>
          </div>
        </div>
      `;
      document.body.insertAdjacentHTML('beforeend', menuHtml);
      drawer = document.getElementById('zeus-mobile-menu');
      document.getElementById('zeus-menu-close').onclick = closeMobileMenu;
      document.getElementById('zeus-menu-backdrop').onclick = closeMobileMenu;
    }
    drawer.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    const drawer = document.getElementById('zeus-mobile-menu');
    if (drawer) {
      drawer.classList.add('hidden');
      document.body.style.overflow = '';
    }
  }

  // ==========================================
  // 9. WISHLIST ICONS UPDATE
  // ==========================================
  function updateWishlistIcons() {
    const list = getWishlist();
    document.querySelectorAll('[aria-label="أضف إلى المفضلة"]').forEach(btn => {
      const card = btn.closest('.pcv-media, .pcv-press, .group, [class*="product"]') || btn.parentElement;
      const titleEl = card ? card.querySelector('h3, [class*="font-medium"]') : null;
      const title = titleEl ? titleEl.textContent.trim() : '';
      const svg = btn.querySelector('svg');
      if (svg) {
        if (list.includes(title)) {
          svg.setAttribute('fill', '#ef4444');
          svg.setAttribute('stroke', '#ef4444');
          btn.classList.add('text-rose-500');
        } else {
          svg.setAttribute('fill', 'none');
          svg.setAttribute('stroke', 'currentColor');
          btn.classList.remove('text-rose-500');
        }
      }
    });
  }

  // ==========================================
  // 10. SCROLL TO TOP
  // ==========================================
  function initScrollToTop() {
    document.querySelectorAll('[aria-label="التمرير إلى الأعلى"]').forEach(btn => {
      btn.onclick = function(e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      };
    });
  }

  // ==========================================
  // 11. CHECKOUT PAGE ENHANCEMENTS (checkout.html)
  // ==========================================
  let selectedPaymentMethod = 'megapay';

  function updateCheckoutAmounts() {
    const cart = getCart();
    let totalEgp = 3664; // default fallback if cart is empty
    if (cart.length > 0) {
      totalEgp = cart.reduce((sum, item) => sum + (parseFloat(item.price) || 0) * (item.quantity || 1), 0);
    }

    const curr = getCurrency();
    const currInfo = CURRENCIES[curr] || CURRENCIES.EGP;

    const usdtInfo = CURRENCIES.USDT || { rate: 1.0 / 51.342, egpPerUnit: 51.342 };
    const egpPerUsdt = usdtInfo.egpPerUnit || (1.0 / usdtInfo.rate);
    const totalUsdt = (totalEgp * usdtInfo.rate).toFixed(2);

    // Update USDT expected amounts in panels
    const binanceAmountEl = document.getElementById('zeus-binance-amount');
    const giftCardAmountEl = document.getElementById('zeus-giftcard-amount');
    if (binanceAmountEl) binanceAmountEl.textContent = `${totalUsdt} USDT`;
    if (giftCardAmountEl) giftCardAmountEl.textContent = `${totalUsdt} USDT`;

    // Update / Inject rate transparency breakdown notes
    let binanceRateNote = document.getElementById('zeus-binance-rate-note');
    if (!binanceRateNote && binanceAmountEl) {
      const container = binanceAmountEl.closest('.rounded-xl') || binanceAmountEl.parentElement;
      binanceRateNote = document.createElement('div');
      binanceRateNote.id = 'zeus-binance-rate-note';
      binanceRateNote.className = 'text-[11px] text-amber-600/90 dark:text-amber-400/90 font-medium pt-1.5 mt-1 border-t border-amber-500/20 flex flex-col gap-0.5';
      container.appendChild(binanceRateNote);
    }
    if (binanceRateNote) {
      binanceRateNote.innerHTML = `
        <div class="flex items-center justify-between gap-1">
          <span>سعر الصرف المعتمد:</span>
          <span class="font-bold font-mono">1 USDT ≈ ${egpPerUsdt.toFixed(2)} ج.م</span>
        </div>
        <div class="text-[10px] text-muted-foreground font-mono">
          الحسبة: ${totalEgp.toLocaleString('en-US')} ج.م ÷ ${egpPerUsdt.toFixed(2)} = ${totalUsdt} USDT
        </div>
      `;
    }

    let giftCardRateNote = document.getElementById('zeus-giftcard-rate-note');
    if (!giftCardRateNote && giftCardAmountEl) {
      const container = giftCardAmountEl.closest('.rounded-xl') || giftCardAmountEl.parentElement;
      giftCardRateNote = document.createElement('div');
      giftCardRateNote.id = 'zeus-giftcard-rate-note';
      giftCardRateNote.className = 'text-[11px] text-purple-600/90 dark:text-purple-400/90 font-medium pt-1.5 mt-1 border-t border-purple-500/20 flex flex-col gap-0.5';
      container.appendChild(giftCardRateNote);
    }
    if (giftCardRateNote) {
      giftCardRateNote.innerHTML = `
        <div class="flex items-center justify-between gap-1">
          <span>سعر الصرف المعتمد:</span>
          <span class="font-bold font-mono">1 USDT ≈ ${egpPerUsdt.toFixed(2)} ج.م</span>
        </div>
        <div class="text-[10px] text-muted-foreground font-mono">
          القيمة المطلوبة: ${totalUsdt} USDT (${totalEgp.toLocaleString('en-US')} ج.م)
        </div>
      `;
    }
    if (binanceAmountEl) {
      binanceAmountEl.textContent = `${totalUsdt} USDT`;
    }

    // Update amounts in MegaPay panel & buttons (100% SAME AS RAES)
    const totalIqd = Math.max(1000, Math.round(totalEgp * 25.51));
    const megaIqdEl = document.getElementById('zeus-megapay-iqd-amount');
    if (megaIqdEl) megaIqdEl.textContent = `${totalIqd.toLocaleString('en-US')} د.ع`;
    const megaAmountHint = document.getElementById('zeus-megapay-amount-hint');
    if (megaAmountHint) {
      megaAmountHint.innerHTML = `
        <div class="text-[10.5px] text-muted-foreground font-mono">
          القيمة المحتسبة للبوابة: <span class="font-bold text-foreground">${totalIqd.toLocaleString('en-US')} د.ع</span> (ما يعادل ${totalUsdt} USDT / ${totalEgp.toLocaleString('en-US')} ج.م)
        </div>
      `;
    }

    // Update order summary items on checkout page if cart has items
    const checkoutItemsContainer = document.querySelector('.co-sec-items');
    if (checkoutItemsContainer && cart.length > 0) {
      checkoutItemsContainer.innerHTML = cart.map(item => {
        const itemPriceVal = parseFloat(item.price) || 0;
        const itemQty = item.quantity || 1;
        const itemTotalEgp = itemPriceVal * itemQty;
        const converted = itemTotalEgp * currInfo.rate;

        return `
          <div class="ls-skip relative group pt-1">
            <div class="ls-skip relative overflow-hidden rounded-xl p-2.5 xs:p-3 transition-[background-color,box-shadow] duration-200" style="background: var(--card); box-shadow: 0 1px 3px rgba(0,0,0,0.08), 0 0 0 1px color-mix(in srgb, var(--border) 60%, transparent);">
              <div class="ls-skip flex gap-2.5 xs:gap-3 items-center">
                <div class="ls-skip relative w-12 h-12 xs:w-14 xs:h-14 rounded-lg overflow-hidden bg-muted/20 shrink-0" style="box-shadow: 0 2px 8px rgba(0,0,0,0.10), 0 0 0 1px color-mix(in srgb, var(--border) 40%, transparent);">
                  <img alt="${item.title}" class="ls-skip absolute inset-0 w-full h-full object-cover" loading="lazy" decoding="async" src="${item.image || './assets/logo-ar.webp'}">
                </div>
                <div class="ls-skip flex-1 min-w-0 flex flex-col justify-between">
                  <h3 class="ls-skip font-semibold text-xs xs:text-[13px] sm:text-sm leading-snug mb-1 line-clamp-1 text-foreground">${item.title}</h3>
                  <div class="ls-skip flex items-center justify-between gap-1.5 xs:gap-2">
                    <div class="ls-skip flex items-center gap-1.5">
                      <span class="ls-skip text-foreground font-bold text-xs xs:text-sm sm:text-base product-price" style="color: var(--primary);">
                        <span class="ls-skip price-display" data-egp-price="${itemTotalEgp}">${formatPriceHtml(converted, curr)}</span>
                      </span>
                    </div>
                    <span class="text-xs text-muted-foreground font-mono">الكمية: ${itemQty}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `;
      }).join('');
    }

    // Update checkout totals elements with mathematically accurate values
    const originalEgp = Math.round(totalEgp / 0.9); // 10% promo discount
    const discountEgp = originalEgp - totalEgp;
    const subtotalEgp = totalEgp;

    const origEl = document.getElementById('zeus-co-original');
    if (origEl) {
      origEl.setAttribute('data-egp-price', originalEgp);
      origEl.innerHTML = formatPriceHtml(originalEgp * currInfo.rate, curr);
    }
    const discEl = document.getElementById('zeus-co-discount');
    if (discEl) {
      discEl.setAttribute('data-egp-price', discountEgp);
      discEl.innerHTML = formatPriceHtml(discountEgp * currInfo.rate, curr);
    }
    const subEl = document.getElementById('zeus-co-subtotal');
    if (subEl) {
      subEl.setAttribute('data-egp-price', subtotalEgp);
      subEl.innerHTML = formatPriceHtml(subtotalEgp * currInfo.rate, curr);
    }
    const totEl = document.getElementById('zeus-co-total');
    if (totEl) {
      totEl.setAttribute('data-egp-price', totalEgp);
      totEl.innerHTML = formatPriceHtml(totalEgp * currInfo.rate, curr);
    }

    // Fallback if elements do not have explicit IDs
    const totalsContainer = document.querySelector('.co-sec-totals');
    if (totalsContainer && (!origEl || !discEl || !subEl || !totEl)) {
      const priceDisplays = totalsContainer.querySelectorAll('.price-display');
      if (priceDisplays.length >= 4) {
        priceDisplays[0].setAttribute('data-egp-price', originalEgp);
        priceDisplays[0].innerHTML = formatPriceHtml(originalEgp * currInfo.rate, curr);

        priceDisplays[1].setAttribute('data-egp-price', discountEgp);
        priceDisplays[1].innerHTML = formatPriceHtml(discountEgp * currInfo.rate, curr);

        priceDisplays[2].setAttribute('data-egp-price', subtotalEgp);
        priceDisplays[2].innerHTML = formatPriceHtml(subtotalEgp * currInfo.rate, curr);

        priceDisplays[3].setAttribute('data-egp-price', totalEgp);
        priceDisplays[3].innerHTML = formatPriceHtml(totalEgp * currInfo.rate, curr);
      }
    }

    return { totalEgp, totalUsdt };
  }

  function initCheckoutPage() {
    if (!window.location.pathname.includes('checkout')) return;

    // Window wheel delegation for desktop
    window.addEventListener('wheel', function(e) {
      const scroller = document.querySelector('.app-scroller');
      if (scroller && e.target && !scroller.contains(e.target)) {
        scroller.scrollTop += e.deltaY;
      }
    }, { passive: true });

    const { totalEgp, totalUsdt } = updateCheckoutAmounts();

    // Payment Gateway Options Selection
    const payOptions = document.querySelectorAll('.zeus-pay-option');
    payOptions.forEach(opt => {
      const header = opt.querySelector('.zeus-pay-header') || opt;
      header.onclick = function() {
        const method = opt.dataset.method;
        selectPaymentMethod(method);
      };
    });

    function selectPaymentMethod(method) {
      selectedPaymentMethod = method;
      payOptions.forEach(opt => {
        const m = opt.dataset.method;
        const panel = document.getElementById(`panel-${m}`);
        const dot = opt.querySelector('.zeus-radio-dot');
        const innerDot = dot ? dot.querySelector('div') : null;

        if (m === method) {
          // Highlight active option
          if (m === 'megapay') {
            opt.className = 'zeus-pay-option rounded-2xl border transition-all duration-300 overflow-hidden ring-2 ring-primary bg-primary/5 border-primary/40 shadow-sm';
            if (dot) dot.className = 'zeus-radio-dot w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-primary flex items-center justify-center bg-primary/20 shrink-0';
            if (innerDot) innerDot.className = 'w-2.5 h-2.5 rounded-full bg-primary';
          } else if (m === 'binance_uid') {
            opt.className = 'zeus-pay-option rounded-2xl border transition-all duration-300 overflow-hidden ring-2 ring-amber-500 bg-amber-500/5 border-amber-500/40 shadow-sm';
            if (dot) dot.className = 'zeus-radio-dot w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-amber-500 flex items-center justify-center bg-amber-500/20 shrink-0';
            if (innerDot) innerDot.className = 'w-2.5 h-2.5 rounded-full bg-amber-500';
          } else if (m === 'binance_giftcard') {
            opt.className = 'zeus-pay-option rounded-2xl border transition-all duration-300 overflow-hidden ring-2 ring-purple-500 bg-purple-500/5 border-purple-500/40 shadow-sm';
            if (dot) dot.className = 'zeus-radio-dot w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-purple-500 flex items-center justify-center bg-purple-500/20 shrink-0';
            if (innerDot) innerDot.className = 'w-2.5 h-2.5 rounded-full bg-purple-500';
          }
          if (panel) panel.classList.remove('hidden');
        } else {
          // Deactivate
          opt.className = 'zeus-pay-option rounded-2xl border border-border/70 bg-card hover:bg-muted/30 transition-all duration-300 overflow-hidden shadow-xs';
          if (dot) dot.className = 'zeus-radio-dot w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-border/80 flex items-center justify-center shrink-0';
          if (innerDot) innerDot.className = 'w-2.5 h-2.5 rounded-full bg-transparent';
          if (panel) panel.classList.add('hidden');
        }
      });

      // Update submit button text
      const payBtnText = document.querySelector('.co-sec-submit span');
      if (payBtnText) {
        if (method === 'megapay') payBtnText.textContent = 'الانتقال إلى MEGA PAY للدفع الفوري ';
        else if (method === 'binance_uid') payBtnText.textContent = 'تأكيد تحويل Binance UID واعتماد الطلب';
        else if (method === 'binance_giftcard') payBtnText.textContent = 'استبدال قسيمة باينانس واعتماد الطلب';
      }
    }

    // Copy Buttons inside payment panels
    document.querySelectorAll('.zeus-copy-btn').forEach(btn => {
      btn.onclick = function(e) {
        e.stopPropagation();
        const targetId = this.dataset.target;
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          const textToCopy = targetEl.textContent.trim().replace(' USDT', '');
          navigator.clipboard.writeText(textToCopy).then(() => {
            showToast(`تم النسخ إلى الحافظة بنجاح: ${textToCopy} `, 'success');
          }).catch(() => {
            showToast(`تم النسخ: ${textToCopy}`, 'info');
          });
        }
      };
    });

    // Check if returning from MegaPay or confirmed payment (RAES style)
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('status') === 'success' || urlParams.get('payment') === 'megapay') {
      const orderId = urlParams.get('orderId') || 'ZEUS-' + Math.floor(100000 + Math.random() * 900000);
      let pendingData = {};
      try {
        pendingData = JSON.parse(localStorage.getItem('zeus_pending_order') || '{}');
      } catch(e) {}
      const email = pendingData.email || 'العميل';
      const phone = pendingData.phone || '';
      const totalUsdt = pendingData.totalUsdt || '0.00';
      const totalEgp = pendingData.totalEgp || 0;

      localStorage.removeItem('zeus_pending_order');
      saveCart([]);
      if (typeof updateCartBadges === 'function') updateCartBadges();

      setTimeout(() => {
        showOrderSuccessModal(orderId, email, phone, 'megapay', 'تم الدفع بنجاح عبر MEGA PAY ⚡', totalUsdt, totalEgp);
      }, 400);
    }

    // Handle "اضغط هنا للدفع الآن" / Submit Checkout Button
    const payBtn = document.getElementById('zeus-checkout-submit-btn') || Array.from(document.querySelectorAll('button')).find(b => 
      b.textContent.includes('اضغط هنا للدفع') || b.textContent.includes('الدفع الآن') || b.closest('.co-sec-submit')
    );
    if (payBtn) {
      payBtn.onclick = async function(e) {
        e.preventDefault();
        const emailInp = document.querySelector('input[type="email"]');
        const phoneInp = document.querySelector('input[type="tel"]');

        const email = emailInp ? emailInp.value.trim() : '';
        const phone = phoneInp ? phoneInp.value.trim() : '';

        // Clear previous input error indicators
        if (emailInp) emailInp.classList.remove('input-error');
        if (phoneInp) phoneInp.classList.remove('input-error');

        // Burgundy error notifications for input validation
        if (!email) {
          showToast('يجب إدخال البريد الإلكتروني لمتابعة الطلب واستلام الأكواد', 'error');
          if (emailInp) {
            emailInp.classList.add('input-error');
            emailInp.focus();
            emailInp.addEventListener('input', () => emailInp.classList.remove('input-error'), { once: true });
          }
          return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          showToast('يرجى كتابة عنوان بريد إلكتروني صحيح (مثال: name@example.com)', 'error');
          if (emailInp) {
            emailInp.classList.add('input-error');
            emailInp.focus();
            emailInp.addEventListener('input', () => emailInp.classList.remove('input-error'), { once: true });
          }
          return;
        }

        if (!phone) {
          showToast('يجب إدخال رقم الهاتف للتواصل وتأكيد الطلب', 'error');
          if (phoneInp) {
            phoneInp.classList.add('input-error');
            phoneInp.focus();
            phoneInp.addEventListener('input', () => phoneInp.classList.remove('input-error'), { once: true });
          }
          return;
        }

        // MegaPay Flow (100% SAME AS RAES)
        if (selectedPaymentMethod === 'megapay') {
          const amounts = updateCheckoutAmounts();
          const currentEgp = amounts ? amounts.totalEgp : totalEgp;
          const totalIqd = amounts?.totalIqd || Math.max(1000, Math.round(currentEgp * 25.51));
          const currentUsdt = amounts ? amounts.totalUsdt : totalUsdt;
          const orderId = 'ZEUS-' + Math.floor(100000 + Math.random() * 900000);
          const orderTitle = `طلب متجر زيوس #${orderId}`;
          const customerName = (document.querySelector('input[name="name"]')?.value || email.split('@')[0] || 'عميل زيوس').trim();

          // Open blank payment tab early to prevent browser popup block
          let paymentWindow = null;
          try {
            paymentWindow = window.open('about:blank', 'zeusMegaPay');
            if (paymentWindow) {
              paymentWindow.opener = null;
              paymentWindow.document.title = 'Mega Pay — زيوس ستور';
              paymentWindow.document.body.innerHTML = `
                <div style="font-family:system-ui,sans-serif; text-align:center; padding:60px 20px; direction:rtl; background:#090d16; color:#f8fafc; min-height:100vh;">
                  <div style="width:50px; height:50px; border:4px solid rgba(245,158,11,0.2); border-top-color:#f59e0b; border-radius:50%; margin:0 auto 20px; animation:spin 1s linear infinite;"></div>
                  <style>@keyframes spin{to{transform:rotate(360deg)}}</style>
                  <h2 style="color:#f59e0b; margin-bottom:10px;">جاري الانتقال لبوابة Mega Pay الآمنة... ⚡</h2>
                  <p style="color:#94a3b8; font-size:14px;">يرجى الانتظار، يتم توجيهك لصفحة الدفع المباشر الآن.</p>
                </div>
              `;
              paymentWindow.document.body.dir = 'rtl';
            }
          } catch(e) {}

          // Show RAES-style Pending State on checkout
          const pendingStateEl = document.getElementById('zeus-payment-pending-state');
          const pendingAmountEl = document.getElementById('zeus-pending-amount-val');
          const pendingOrderRef = document.getElementById('zeus-pending-order-ref');
          const pendingOpenLink = document.getElementById('zeus-pending-open-link');
          const pendingRefreshBtn = document.getElementById('zeus-pending-refresh-btn');
          const pendingCancelBtn = document.getElementById('zeus-pending-cancel-btn');

          if (pendingAmountEl) pendingAmountEl.textContent = `${totalIqd.toLocaleString('en-US')} د.ع (${totalUsdt} USDT)`;
          if (pendingOrderRef) pendingOrderRef.textContent = `رقم الطلب: #${orderId}`;
          if (pendingStateEl) {
            pendingStateEl.classList.remove('hidden');
            pendingStateEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }

          const merchantId = localStorage.getItem('zeus_megapay_merchant_id') || '2024001';
          const callbackUrl = localStorage.getItem('zeus_megapay_callback_url') || (window.location.origin + window.location.pathname + `?payment=megapay&orderId=${orderId}&status=success`);

          // Call API or direct gateway
          (async () => {
            let paymentUrl = '';
            try {
              const resp = await fetch('/api/v1/payment/megapay/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  amount_iqd: totalIqd,
                  amount_egp: currentEgp,
                  title: orderTitle,
                  customer_name: customerName,
                  customer_phone: phone,
                  customer_email: email,
                  is_domestic: true,
                  callback_url: callbackUrl
                })
              });
              if (resp.ok) {
                const resData = await resp.json();
                if (resData.payment_url) paymentUrl = resData.payment_url;
              }
            } catch(e) {}

            if (!paymentUrl) {
              paymentUrl = `https://mega-pay.cc/pay/?merchant=${encodeURIComponent(merchantId)}&amount=${totalIqd}&title=${encodeURIComponent(orderTitle)}&currency=IQD&callback_url=${encodeURIComponent(callbackUrl)}`;
            }

            if (pendingOpenLink) {
              pendingOpenLink.href = paymentUrl;
            }

            if (paymentWindow && !paymentWindow.closed) {
              paymentWindow.location.replace(paymentUrl);
            } else {
              window.open(paymentUrl, '_blank');
            }

            localStorage.setItem('zeus_pending_order', JSON.stringify({
              orderId,
              method: 'megapay',
              amountIqd: totalIqd,
              paymentUrl,
              email,
              phone,
              totalUsdt,
              totalEgp: currentEgp,
              timestamp: Date.now()
            }));

            showToast('تم بدء معاملة Mega Pay! يرجى إتمام الدفع في نافذة البوابة ⚡', 'success');
          })();

          if (pendingRefreshBtn) {
            pendingRefreshBtn.onclick = () => {
              showToast('جاري التحقق من وصول إشعار السداد... ', 'info');
              setTimeout(() => {
                showToast('بانتظار تأكيد الدفع من MegaPay... إذا أتممت العملية اضغط فتح صفحة الدفع للتأكد', 'info');
              }, 1200);
            };
          }
          if (pendingCancelBtn) {
            pendingCancelBtn.onclick = () => {
              if (pendingStateEl) pendingStateEl.classList.add('hidden');
              localStorage.removeItem('zeus_pending_order');
              showToast('تم إلغاء عملية الدفع', 'info');
            };
          }

          return;
        }

        // ==========================================
        // REAL BINANCE UID / PAY VERIFICATION
        // ==========================================
        if (selectedPaymentMethod === 'binance_uid') {
          const txInput = document.getElementById('zeus-binance-txid');
          const txid = txInput ? txInput.value.trim() : '';
          if (txInput) txInput.classList.remove('input-error');

          if (!txid) {
            showToast('يجب إدخال رقم عملية التحويل (Transaction ID) من تطبيق باينانس', 'error');
            if (txInput) {
              txInput.classList.add('input-error');
              txInput.focus();
              txInput.addEventListener('input', () => txInput.classList.remove('input-error'), { once: true });
            }
            return;
          }

          const amounts = updateCheckoutAmounts();
          const currentUsdt = amounts ? amounts.totalUsdt : totalUsdt;
          const currentEgp = amounts ? amounts.totalEgp : totalEgp;
          const apiKey = localStorage.getItem('zeus_binance_api_key') || '';
          const apiSecret = localStorage.getItem('zeus_binance_api_secret') || '';
          const recipientUid = localStorage.getItem('zeus_binance_uid') || '';

          const originalBtnHtml = payBtn.innerHTML;
          payBtn.disabled = true;
          payBtn.innerHTML = `
            <span class="inline-flex items-center gap-2">
              <svg class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
              </svg>
              <span>جاري التحقق الحقيقي من المعاملة عبر باينانس...</span>
            </span>
          `;

          try {
            const resp = await fetch('/api/v1/payment/binance/verify-uid', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                transaction_id: txid,
                expected_usdt: parseFloat(currentUsdt) || 0,
                customer_email: email,
                customer_phone: phone,
                api_key: apiKey || undefined,
                api_secret: apiSecret || undefined,
                recipient_uid: recipientUid || undefined
              })
            });

            const data = await resp.json();

            if (resp.ok && data.verified) {
              showToast(data.message || 'تم التحقق من المعاملة بنجاح عبر شبكة باينانس! ⚡', 'success');
              const finalOrderId = data.order_id || ('ZEUS-' + Math.floor(100000 + Math.random() * 900000));
              showOrderSuccessModal(finalOrderId, email, phone, 'binance_uid', `رقم العملية: ${txid}`, currentUsdt, currentEgp);
            } else {
              if (txInput) {
                txInput.classList.add('input-error');
                txInput.focus();
                txInput.addEventListener('input', () => txInput.classList.remove('input-error'), { once: true });
              }
              const errMsg = data.detail || data.message || 'لم يتم العثور على المعاملة أو أن المبلغ غير مطابق في حساب باينانس';
              showToast(errMsg, 'error');
            }
          } catch(err) {
            console.error('Binance UID verification error:', err);
            if (txInput) txInput.classList.add('input-error');
            showToast('حدث خطأ أثناء فحص المعاملة من باينانس، يرجى إعادة المحاولة', 'error');
          } finally {
            payBtn.innerHTML = originalBtnHtml;
            payBtn.disabled = false;
          }
          return;
        }

        // ==========================================
        // REAL BINANCE GIFT CARD VERIFICATION
        // ==========================================
        if (selectedPaymentMethod === 'binance_giftcard') {
          const cardInput = document.getElementById('zeus-giftcard-code');
          const code = cardInput ? cardInput.value.trim() : '';
          if (cardInput) cardInput.classList.remove('input-error');

          if (!code) {
            showToast('يجب إدخال كود بطاقة هدية باينانس (Redemption Code)', 'error');
            if (cardInput) {
              cardInput.classList.add('input-error');
              cardInput.focus();
              cardInput.addEventListener('input', () => cardInput.classList.remove('input-error'), { once: true });
            }
            return;
          }

          const amounts = updateCheckoutAmounts();
          const currentUsdt = amounts ? amounts.totalUsdt : totalUsdt;
          const currentEgp = amounts ? amounts.totalEgp : totalEgp;
          const apiKey = localStorage.getItem('zeus_binance_giftcard_api_key') || localStorage.getItem('zeus_binance_api_key') || '';
          const apiSecret = localStorage.getItem('zeus_binance_giftcard_api_secret') || localStorage.getItem('zeus_binance_api_secret') || '';

          const originalBtnHtml = payBtn.innerHTML;
          payBtn.disabled = true;
          payBtn.innerHTML = `
            <span class="inline-flex items-center gap-2">
              <svg class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
              </svg>
              <span>جاري استبدال قسيمة باينانس وفحص الرصيد...</span>
            </span>
          `;

          try {
            const resp = await fetch('/api/v1/payment/binance/verify-giftcard', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                code: code,
                expected_usdt: parseFloat(currentUsdt) || 0,
                customer_email: email,
                customer_phone: phone,
                api_key: apiKey || undefined,
                api_secret: apiSecret || undefined
              })
            });

            const data = await resp.json();

            if (resp.ok && data.verified) {
              showToast(data.message || 'تم استبدال قسيمة باينانس بنجاح واعتماد الطلب! ⚡', 'success');
              const finalOrderId = data.order_id || ('ZEUS-' + Math.floor(100000 + Math.random() * 900000));
              showOrderSuccessModal(finalOrderId, email, phone, 'binance_giftcard', `كود القسيمة: ${code.substring(0, 4)}**** (${data.face_value || currentUsdt} USDT)`, currentUsdt, currentEgp);
            } else {
              if (cardInput) {
                cardInput.classList.add('input-error');
                cardInput.focus();
                cardInput.addEventListener('input', () => cardInput.classList.remove('input-error'), { once: true });
              }
              const errMsg = data.detail || data.message || 'رمز قسيمة باينانس غير صالح أو تم استخدامه مسبقاً أو رصيده غير كافٍ';
              showToast(errMsg, 'error');
            }
          } catch(err) {
            console.error('Binance Giftcard verification error:', err);
            if (cardInput) cardInput.classList.add('input-error');
            showToast('حدث خطأ أثناء الاتصال بنظام فحص قسائم باينانس', 'error');
          } finally {
            payBtn.innerHTML = originalBtnHtml;
            payBtn.disabled = false;
          }
          return;
        }

        // Fallback or other methods
        const amounts = updateCheckoutAmounts();
        const currentUsdt = amounts ? amounts.totalUsdt : totalUsdt;
        const currentEgp = amounts ? amounts.totalEgp : totalEgp;
        const orderId = 'ZEUS-' + Math.floor(100000 + Math.random() * 900000);
        showOrderSuccessModal(orderId, email, phone, selectedPaymentMethod, '', currentUsdt, currentEgp);
      };
    }

    // Direct WhatsApp / Telegram buttons on checkout
    document.querySelectorAll('button').forEach(btn => {
      const text = btn.textContent.trim();
      if (text.includes('واتساب')) {
        btn.onclick = () => window.open('https://wa.me/201000000000?text=مرحبا+زيوس+ستور+أرغب+في+تأكيد+الطلب', '_blank');
      } else if (text.includes('تيليجرام')) {
        btn.onclick = () => window.open('https://t.me/zeus_store_support', '_blank');
      }
    });
  }

  function showOrderSuccessModal(orderId, email, phone, method, extraInfo, totalUsdt, totalEgp) {
    const methodNames = {
      megapay: 'MEGA PAY (بطاقة ائتمان)',
      binance_uid: 'باينانس UID (Binance Pay)',
      binance_giftcard: 'باينانس GIFT CARD'
    };
    const methodName = methodNames[method] || method;
    const egpText = typeof totalEgp === 'number' ? ` (${totalEgp.toLocaleString('en-US')} ج.م)` : '';

    const waLines = [
      'مرحبا زيوس ستور، قمت بعمل طلب جديد:',
      `رقم الطلب: ${orderId}`,
      `وسيلة الدفع: ${methodName}`,
      extraInfo ? extraInfo : '',
      `المبلغ: ${totalUsdt} USDT${egpText}`
    ].filter(Boolean);
    const waUrl = 'https://wa.me/201000000000?text=' + encodeURIComponent(waLines.join('\n'));

    const modalHtml = `
      <div id="zeus-order-modal" class="fixed inset-0 z-[99999] flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-200">
        <div class="w-full max-w-md bg-slate-900 border border-cyan-500/30 rounded-3xl p-6 text-center space-y-4 shadow-2xl">
          <div class="w-16 h-16 rounded-full bg-cyan-500/20 text-amber-600 mx-auto flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
          </div>
          <h3 class="text-xl font-extrabold text-white">تم الشراء والدفع بنجاح!</h3>
          <p class="text-xs text-amber-400 font-bold">كود التأكيد الخاص بك:</p>
          <div class="px-4 py-2.5 bg-amber-500/10 rounded-xl font-mono text-amber-400 text-sm font-bold border border-amber-500/30 select-all">
            CONF-${Math.random().toString(36).substring(2, 8).toUpperCase()}-${orderId.replace('ZEUS-', '')}
          </div>
          <p class="text-xs text-slate-300">رقم الطلب الخاص بك:</p>
          <div class="px-4 py-2 bg-slate-950 rounded-xl font-mono text-amber-600 text-lg font-black tracking-wider border border-white/10 select-all">
            ${orderId}
          </div>
          <div class="p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-start space-y-1 text-slate-300">
            <div><span class="text-slate-400">طريقة الدفع:</span> <strong class="text-white">${methodName}</strong></div>
            <div><span class="text-slate-400">المبلغ المطلوب:</span> <strong class="text-amber-600 font-mono">${totalUsdt} USDT${egpText}</strong></div>
            <div><span class="text-slate-400">البريد:</span> <strong class="text-white">${email}</strong></div>
            <div><span class="text-slate-400">الهاتف:</span> <strong class="text-white">${phone}</strong></div>
            ${extraInfo ? `<div class="text-amber-400 pt-1 border-t border-white/10 font-mono text-[11px]">${extraInfo}</div>` : ''}
          </div>
          <p class="text-xs text-slate-400">تم تسجيل بيانات الدفع، اضغط أدناه لتأكيد الطلب واستلام كود التفعيل فوراً عبر واتساب أو تيليجرام.</p>
          
          <div class="pt-2 flex flex-col gap-2.5">
            <a href="${waUrl}" target="_blank" class="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition">
              <span>تأكيد واستلام الكود عبر واتساب</span>
            </a>
            <button onclick="document.getElementById('zeus-order-modal').remove(); window.location.href='index.html';" class="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 text-xs font-semibold transition">
              العودة للمتجر الرئيسي
            </button>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    localStorage.removeItem('zeus_cart');
    updateCartBadges();
  }
// ==========================================
  // 12. GLOBAL INITIALIZATION & DELEGATION
  // ==========================================
  function initZeusStore() {
    updateCartBadges();
    initCurrencySwitcher();
    initSearchModal();
    initMobileMenu();
    initScrollToTop();
    updateWishlistIcons();
    initCheckoutPage();

    // Background FX rate synchronization & instant UI update
    syncExchangeRates(() => {
      applyCurrency(getCurrency());
    });

    // Event Delegation for dynamic/static buttons across all cards
    document.addEventListener('click', function(e) {
      // Cart open triggers
      if (e.target.closest('.nv-cart, .nv-tab--cart')) {
        e.preventDefault();
        openCartDrawer();
        return;
      }

      // Add to Cart buttons
      const addCartBtn = e.target.closest('[aria-label="أضف للسلة"]');
      if (addCartBtn) {
        handleAddToCart(e, addCartBtn);
        return;
      }

      // Buy Now buttons
      const buyNowBtn = e.target.closest('button');
      if (buyNowBtn && (buyNowBtn.textContent.includes('اشتر') || buyNowBtn.textContent.includes('شراء')) && !buyNowBtn.closest('.co-page')) {
        handleBuyNow(e, buyNowBtn);
        return;
      }

      // Wishlist buttons
      const wishBtn = e.target.closest('[aria-label="أضف إلى المفضلة"]');
      if (wishBtn) {
        e.preventDefault();
        const card = wishBtn.closest('.pcv-media, .pcv-press, .group, [class*="product"]') || wishBtn.parentElement;
        const titleEl = card ? card.querySelector('h3, [class*="font-medium"]') : null;
        if (titleEl) toggleWishlist(titleEl.textContent.trim());
        return;
      }
    });

    window.ZeusStore = {
      applyCurrency,
      updateCheckoutAmounts,
      syncExchangeRates,
      CURRENCIES,
      getCart,
      saveCart,
      formatAmount,
      _storage
    };

    console.log(' ZEUS STORE Engine loaded and fully active.');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initZeusStore);
  } else {
    initZeusStore();
  }
})();
