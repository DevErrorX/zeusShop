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
  // 1.1 STORE SETTINGS SYNC (WHATSAPP, ETC.)
  // ==========================================
  let activeStoreSettings = {
    whatsapp: '+4447723274122',
    telegram: 'https://t.me/+5lDejdeKjEJjNTg0'
  };

  function applyPublicSettings(settings) {
    if (!settings) return;
    activeStoreSettings = Object.assign(activeStoreSettings, settings);
    if (settings.whatsapp) {
      const cleanDigits = settings.whatsapp.replace(/[^0-9]/g, '');
      const waUrl = `https://wa.me/${cleanDigits}`;
      document.querySelectorAll('a[href*="wa.me"]').forEach(a => {
        a.href = waUrl;
        const numSpan = a.querySelector('.tabular-nums');
        if (numSpan) numSpan.textContent = cleanDigits;
      });
    }
    if (settings.telegram) {
      const tgUrl = settings.telegram.startsWith('http') ? settings.telegram : `https://t.me/${settings.telegram.replace('@', '')}`;
      document.querySelectorAll('a[aria-label="telegram"], a[title="Telegram"]').forEach(a => {
        a.href = tgUrl;
      });
    }
    if (settings.announcement_text) {
      document.querySelectorAll('.ann-item__text').forEach(el => {
        el.textContent = ' ' + settings.announcement_text;
      });
    }
  }

  function syncPublicSettings() {
    try {
      const cached = JSON.parse(localStorage.getItem('zeus_public_settings') || 'null');
      if (cached) applyPublicSettings(cached);
    } catch(e) {}

    fetch('/api/v1/public-settings')
      .then(r => r.json())
      .then(data => {
        if (data && data.whatsapp) {
          applyPublicSettings(data);
          try { localStorage.setItem('zeus_public_settings', JSON.stringify(data)); } catch(e) {}
        }
      })
      .catch(() => {});
  }
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
  let selectedPaymentMethod = 'kashier';

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

    // Update amounts in Kashier panel & buttons (100% SAME AS RAES)
    const kashierEgpEl = document.getElementById('zeus-kashier-egp-amount');
    if (kashierEgpEl) kashierEgpEl.textContent = `${totalEgp.toLocaleString('en-US')} ج.م`;
    const kashierAmountHint = document.getElementById('zeus-kashier-amount-hint');
    if (kashierAmountHint) {
      kashierAmountHint.innerHTML = `
        <div class="text-[10.5px] text-muted-foreground font-mono">
          معاملة معتمدة ومحمية مباشرة عبر بوابة كاشير (Kashier Payment Gateway)
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
      selectedPaymentMethod = 'kashier';
      payOptions.forEach(opt => {
        const panel = document.getElementById('panel-kashier');
        const dot = opt.querySelector('.zeus-radio-dot');
        const innerDot = dot ? dot.querySelector('div') : null;

        opt.className = 'zeus-pay-option rounded-2xl border transition-all duration-300 overflow-hidden ring-2 ring-primary bg-primary/5 border-primary/40 shadow-sm';
        if (dot) dot.className = 'zeus-radio-dot w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-primary flex items-center justify-center bg-primary/20 shrink-0';
        if (innerDot) innerDot.className = 'w-2.5 h-2.5 rounded-full bg-primary';
        if (panel) panel.classList.remove('hidden');
      });

      // Update submit button text
      const payBtnText = document.querySelector('.co-sec-submit span');
      if (payBtnText) {
        payBtnText.textContent = 'الانتقال إلى الدفع عبر كاشير (Kashier - Visa / Mastercard / Apple Pay)';
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

    // Check if returning from Kashier Gateway callback
    const urlParams = new URLSearchParams(window.location.search);
    const isKashierReturn = urlParams.has('kashier_return') || urlParams.has('paymentStatus');

    if (isKashierReturn) {
      const orderId = urlParams.get('order_id') || urlParams.get('orderId') || urlParams.get('merchantOrderId') || '';
      
      // Clean query parameters from URL so refreshes don't re-trigger
      try {
        window.history.replaceState({}, '', window.location.pathname);
      } catch(e) {}

      // Anti-spoofing - Verify exclusively against server orders.db
      if (orderId) {
        fetch(`/api/v1/order/${encodeURIComponent(orderId)}/status`)
          .then(res => res.json())
          .then(data => {
            if (data && data.is_paid) {
              localStorage.removeItem('zeus_pending_order');
              saveCart([]);
              if (typeof updateCartBadges === 'function') updateCartBadges();

              // Redirect directly to order.html which shows confirmation code and redirects to @abxc18
              window.location.href = `/order.html?order_id=${encodeURIComponent(orderId)}`;
            } else if (data && (data.order_status === 'failed' || data.order_status === 'cancelled')) {
              showToast('⚠️ فشلت عملية الدفع أو تم إلغاؤها من البنك (لم يتم خصم أي مبالغ). يمكنك إعادة المحاولة ⚡', 'error');
              const pendingStateEl = document.getElementById('zeus-payment-pending-state');
              if (pendingStateEl) pendingStateEl.classList.add('hidden');
              localStorage.removeItem('zeus_pending_order');
            } else {
              showToast('جاري التحقق وبانتظار وصول إشعار السداد المعتمد من بوابة الدفع... ⚡', 'info');
            }
          })
          .catch(() => {
            showToast('بانتظار تأكيد الدفع... ⚡', 'info');
          });
      }
    }

    // ==============================================================
    // Kashier HMAC-SHA256 & Hosted Checkout URL Generation Engine
    // ==============================================================
    function pureJsSha256(ascii) {
      function rightRotate(value, amount) {
        return (value >>> amount) | (value << (32 - amount));
      }
      const mathPow = Math.pow;
      const maxWord = mathPow(2, 32);
      let result = '';
      const words = [];
      const asciiBitLength = ascii.length * 8;
      const initialHash = [
        0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a,
        0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19
      ];
      const k = [
        0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
        0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
        0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
        0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
        0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
        0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
        0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
        0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
      ];
      ascii += '\x80';
      while ((ascii.length % 64) - 56) ascii += '\x00';
      for (let i = 0; i < ascii.length; i++) {
        const j = ascii.charCodeAt(i);
        words[i >> 2] |= j << ((3 - i) % 4) * 8;
      }
      words[words.length] = (asciiBitLength / maxWord) | 0;
      words[words.length] = asciiBitLength;

      let hash = [...initialHash];
      for (let j = 0; j < words.length;) {
        const w = words.slice(j, j += 16);
        const oldHash = [...hash];
        for (let i = 0; i < 64; i++) {
          const w15 = w[i - 15], w2 = w[i - 2];
          const a = hash[0], e = hash[4];
          const temp1 = (hash[7]
            + (rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25))
            + ((e & hash[5]) ^ ((~e) & hash[6]))
            + k[i]
            + (w[i] = (i < 16) ? w[i] : (
                w[i - 16]
                + (rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15 >>> 3))
                + w[i - 7]
                + (rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2 >>> 10))
              ) | 0
            )) | 0;
          const temp2 = ((rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22))
            + ((a & hash[1]) ^ (a & hash[2]) ^ (hash[1] & hash[2]))) | 0;
          hash = [(temp1 + temp2) | 0, hash[0], hash[1], hash[2], (hash[3] + temp1) | 0, hash[4], hash[5], hash[6]];
        }
        for (let i = 0; i < 8; i++) {
          hash[i] = (hash[i] + oldHash[i]) | 0;
        }
      }
      for (let i = 0; i < 8; i++) {
        for (let j = 3; j >= 0; j--) {
          const b = (hash[i] >> (j * 8)) & 255;
          result += ((b < 16) ? '0' : '') + b.toString(16);
        }
      }
      return result;
    }

    function pureJsHexToBin(hex) {
      let bytes = '';
      for (let i = 0; i < hex.length; i += 2) {
        bytes += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
      }
      return bytes;
    }

    function pureJsHmacSha256(key, message) {
      const blockSize = 64;
      if (key.length > blockSize) {
        key = pureJsHexToBin(pureJsSha256(key));
      }
      while (key.length < blockSize) {
        key += '\x00';
      }
      let oKeyPad = '';
      let iKeyPad = '';
      for (let i = 0; i < blockSize; i++) {
        oKeyPad += String.fromCharCode(key.charCodeAt(i) ^ 0x5c);
        iKeyPad += String.fromCharCode(key.charCodeAt(i) ^ 0x36);
      }
      const innerHash = pureJsHexToBin(pureJsSha256(iKeyPad + message));
      return pureJsSha256(oKeyPad + innerHash);
    }

    // Note: All payment session creation is strictly Server-to-Server via /api/v1/payment/kashier/create

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

        // Kashier Flow (Condition 1: Server-Authoritative Price Calculation & Direct S2S Session)
        if (selectedPaymentMethod === 'kashier' || selectedPaymentMethod === 'megapay') {
          const cart = getCart();
          const itemsPayload = (cart && cart.length > 0) ? cart.map(it => ({
            id: it.id || 'zeus-cod-60',
            quantity: it.quantity || 1
          })) : [{ id: 'zeus-cod-60', quantity: 1 }];

          const orderId = 'ZEUS-' + Math.floor(100000 + Math.random() * 900000);
          const orderTitle = `طلب متجر زيوس #${orderId}`;
          const customerName = (document.querySelector('input[name="name"]')?.value || email.split('@')[0] || 'عميل زيوس').trim();

          // Open blank payment tab early to prevent browser popup block
          let paymentWindow = null;
          try {
            paymentWindow = window.open('about:blank', 'zeusKashier');
            if (paymentWindow) {
              paymentWindow.opener = null;
              paymentWindow.document.title = 'Kashier — زيوس ستور';
              paymentWindow.document.body.innerHTML = `
                <div style="font-family:system-ui,sans-serif; text-align:center; padding:60px 20px; direction:rtl; background:#090d16; color:#f8fafc; min-height:100vh;">
                  <div style="width:50px; height:50px; border:4px solid rgba(207,65,59,0.2); border-top-color:#cf413b; border-radius:50%; margin:0 auto 20px; animation:spin 1s linear infinite;"></div>
                  <style>@keyframes spin{to{transform:rotate(360deg)}}</style>
                  <h2 style="color:#f1786e; margin-bottom:10px;">جاري الانتقال لبوابة كاشير (Kashier) الآمنة... ⚡</h2>
                  <p style="color:#94a3b8; font-size:14px;">يرجى الانتظار، يتم توجيهك لصفحة الدفع المباشر الآن.</p>
                </div>
              `;
              paymentWindow.document.body.dir = 'rtl';
            }
          } catch(e) {}

          // Show Pending State on checkout
          const pendingStateEl = document.getElementById('zeus-payment-pending-state');
          const pendingAmountEl = document.getElementById('zeus-pending-amount-val');
          const pendingOrderRef = document.getElementById('zeus-pending-order-ref');
          const pendingOpenLink = document.getElementById('zeus-pending-open-link');
          const pendingRefreshBtn = document.getElementById('zeus-pending-refresh-btn');
          const pendingCancelBtn = document.getElementById('zeus-pending-cancel-btn');

          if (pendingOrderRef) pendingOrderRef.textContent = `رقم الطلب: #${orderId}`;
          if (pendingStateEl) {
            pendingStateEl.classList.remove('hidden');
            pendingStateEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }

          const callbackUrl = window.location.origin + '/order.html?order_id=' + orderId + '&kashier_return=1';

          (async () => {
            let paymentUrl = '';
            try {
              // Server calculates all prices and creates session Server-to-Server
              const resp = await fetch('/api/v1/payment/kashier/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  items: itemsPayload,
                  currency: 'USD',
                  title: orderTitle,
                  customer_name: customerName,
                  customer_phone: phone,
                  customer_email: email,
                  order_id: orderId,
                  callback_url: callbackUrl
                })
              });
              if (resp.ok) {
                const resData = await resp.json();
                if (resData.session_url || resData.payment_url) {
                  paymentUrl = resData.session_url || resData.payment_url;
                  if (pendingAmountEl && resData.amount) {
                    pendingAmountEl.textContent = `${resData.amount} ${resData.currency || 'USD'}`;
                  }
                }
              } else {
                const errData = await resp.json().catch(() => ({}));
                showToast(errData.detail || 'تعذر بدء جلسة الدفع الآمنة، يرجى المحاولة لاحقاً', 'error');
                if (paymentWindow && !paymentWindow.closed) paymentWindow.close();
                return;
              }
            } catch(e) {
              showToast('خطأ في الاتصال بالسيرفر لإتمام الدفع', 'error');
              if (paymentWindow && !paymentWindow.closed) paymentWindow.close();
              return;
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
              method: 'kashier',
              paymentUrl,
              email,
              phone,
              timestamp: Date.now()
            }));

            showToast('تم بدء معاملة كاشير (Kashier) الآمنة! يرجى إتمام الدفع في نافذة البوابة ⚡', 'success');
          })();

          if (pendingRefreshBtn) {
            pendingRefreshBtn.onclick = () => {
              showToast('جاري التحقق من السيرفر... ', 'info');
              fetch(`/api/v1/order/${encodeURIComponent(orderId)}/status`)
                .then(r => r.json())
                .then(st => {
                  if (st && st.is_paid) {
                    window.location.href = `/order.html?order_id=${encodeURIComponent(orderId)}`;
                  } else {
                    showToast('بانتظار تأكيد الدفع من كاشير... إذا أتممت العملية اضغط فتح صفحة الدفع للتأكد', 'info');
                  }
                })
                .catch(() => {
                  showToast('بانتظار تأكيد الدفع من كاشير...', 'info');
                });
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
        btn.onclick = () => {
          const cleanDigits = (activeStoreSettings.whatsapp || '+4447723274122').replace(/[^0-9]/g, '');
          window.open(`https://wa.me/${cleanDigits}?text=مرحبا+زيوس+ستور+أرغب+في+تأكيد+الطلب`, '_blank');
        };
      } else if (text.includes('تيليجرام')) {
        btn.onclick = () => {
          const tgUrl = activeStoreSettings.telegram || 'https://t.me/zeus_store_support';
          window.open(tgUrl.startsWith('http') ? tgUrl : `https://t.me/${tgUrl.replace('@', '')}`, '_blank');
        };
      }
    });
  }

  function showOrderSuccessModal(orderId, email, phone, method, extraInfo, totalUsdt, totalEgp, confirmationCode) {
    const methodName = 'بطاقة دفع بنكية (Visa / Mastercard)';
    const egpText = typeof totalEgp === 'number' ? ` (${totalEgp.toLocaleString('en-US')} ج.م)` : '';
    const confCode = confirmationCode || orderId;

    const tgMsg = encodeURIComponent(`مرحباً، تم الدفع في ZEUS STORE. كود التأكيد: ${confCode}`);
    const tgUrl = `https://t.me/abxc18?text=${tgMsg}`;

    const modalHtml = `
      <div id="zeus-order-modal" class="fixed inset-0 z-[99999] flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-200">
        <div class="w-full max-w-md bg-slate-900 border border-cyan-500/30 rounded-3xl p-6 text-center space-y-4 shadow-2xl">
          <div class="w-16 h-16 rounded-full bg-cyan-500/20 text-amber-500 mx-auto flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
          </div>
          <h3 class="text-xl font-extrabold text-white">تم الشراء والدفع بنجاح!</h3>
          <p class="text-xs text-amber-400 font-bold">كود التأكيد الخاص بك:</p>
          <div class="px-4 py-2.5 bg-amber-500/10 rounded-xl font-mono text-amber-400 text-base font-bold border border-amber-500/30 select-all tracking-wider">
            ${confCode}
          </div>
          <p class="text-xs text-slate-300">رقم الطلب الخاص بك:</p>
          <div class="px-4 py-2 bg-slate-950 rounded-xl font-mono text-amber-500 text-sm font-black tracking-wider border border-white/10 select-all">
            ${orderId}
          </div>
          <div class="p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-start space-y-1 text-slate-300">
            <div><span class="text-slate-400">طريقة الدفع:</span> <strong class="text-white">${methodName}</strong></div>
            <div><span class="text-slate-400">المبلغ المطلوب:</span> <strong class="text-amber-400 font-mono">${totalUsdt} USDT${egpText}</strong></div>
            <div><span class="text-slate-400">البريد:</span> <strong class="text-white">${email}</strong></div>
            <div><span class="text-slate-400">الهاتف:</span> <strong class="text-white">${phone}</strong></div>
            ${extraInfo ? `<div class="text-amber-400 pt-1 border-t border-white/10 font-mono text-[11px]">${extraInfo}</div>` : ''}
          </div>
          <p class="text-xs text-slate-400">تم تأكيد الدفع بنجاح، اضغط أدناه لإرسال كود التأكيد واستلام كود التفعيل فوراً عبر تيليجرام.</p>
          
          <div class="pt-2 flex flex-col gap-2.5">
            <a href="${tgUrl}" target="_blank" class="w-full py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition">
              <span>إرسال كود التأكيد عبر تيليجرام (@abxc18)</span>
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
    syncPublicSettings();

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
