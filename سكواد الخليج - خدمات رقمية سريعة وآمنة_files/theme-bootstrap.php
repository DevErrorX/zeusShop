(function () {
  try {
    var payload = {"source":"server","loadingScreen":{"show":false},"activeThemeId":"crimson","theme":"crimson","colorScheme":"light","activeTemplateId":"classic","headerVariant":"navbar","footerVariant":"auto","cardVariant":"flash","cardBuyNow":true,"reviewsVariant":"marquee","partnersVariant":"showcase","headingVariant":"centered","cartStyle":"auto","successVariant":"seamless","failedVariant":"seamless","payStatusVariant":"auto","checkoutVariant":"auto","productVariant":"spotlight","transitionDuration":100,"enableAnimations":true,"cssVars":{"--primary":"#cf413b","--primary-gradient":"#cf413b","--primary-rgb":"207, 65, 59","--accent":"#c92600","--accent-gradient":"#c92600","--background":"#ffffff","--background-gradient":"#ffffff","--card":"#ffffff","--card-gradient":"#ffffff","--secondary":"#fff3f1","--secondary-gradient":"#fff3f1","--muted":"#fff9f8","--muted-gradient":"#fff9f8","--destructive":"#dc2626","--destructive-gradient":"#dc2626","--success":"#16a34a","--success-gradient":"#16a34a","--warning":"#d97706","--warning-gradient":"#d97706","--info":"#d75b1d","--info-gradient":"#d75b1d","--primary-foreground":"#ffffff","--accent-foreground":"#ffffff","--foreground":"#0f172a","--card-foreground":"#0f172a","--secondary-foreground":"#1e293b","--muted-foreground":"#334155","--destructive-foreground":"#ffffff","--success-foreground":"#000000","--warning-foreground":"#000000","--info-foreground":"#000000","--border":"#ecd9d6","--input":"#e2cbc8","--ring":"#f29480","--popover":"#ffffff","--popover-foreground":"#0f172a","--sidebar":"#ffffff","--sidebar-foreground":"#0f172a","--sidebar-primary":"#cf413b","--sidebar-primary-foreground":"#ffffff","--sidebar-accent":"#fff3f1","--sidebar-accent-foreground":"#0f172a","--sidebar-border":"#ecd9d6","--sidebar-ring":"#f29480","--chart-1":"#dd574e","--chart-2":"#c26300","--chart-3":"#df7da9","--chart-4":"#81bf59","--chart-5":"#7781f4","--primary-50":"#fff3f2","--primary-100":"#ffebe9","--primary-200":"#ffdbd6","--primary-300":"#fbc1b9","--primary-400":"#f7a096","--primary-500":"#f1786e","--primary-600":"#cf413b","--primary-700":"#b02927","--primary-800":"#8c1c1b","--primary-900":"#691211","--accent-50":"#fff4f1","--accent-100":"#ffece7","--accent-200":"#ffdbd3","--accent-300":"#fac1b5","--accent-400":"#f6a18f","--accent-500":"#f07a63","--accent-600":"#d33e23","--accent-700":"#b32609","--accent-800":"#8d1d07","--accent-900":"#681405","--ambient-mesh":"radial-gradient(ellipse 120% 70% at 15% 12%, rgba(207, 65, 59, 0.20) 0%, transparent 60%), radial-gradient(ellipse 70% 88% at 88% 22%, rgba(201, 38, 0, 0.16) 0%, transparent 58%)","--ambient-aurora":"radial-gradient(circle at center, rgba(207, 65, 59, 0.22) 0%, transparent 70%)","--hero-gradient":"linear-gradient(135deg, #ffffff 0%, #fffaf9 50%, #ffecea 100%)","--gradient-from":"#ffffff","--gradient-to":"#ffecea","--gradient-via":"#fffaf9","--color-scheme":"light"},"daylightAccentColor":"#d92a2a","daylightCssVars":{"--daylight-primary-dynamic":"#cf413b","--daylight-accent-dynamic":"#c92600","--daylight-secondary-dynamic":"#fff3f1","--daylight-secondary-foreground-dynamic":"#1e293b","--daylight-muted-dynamic":"#fff9f8","--daylight-muted-foreground-dynamic":"#334155","--daylight-border-dynamic":"#ecd9d6","--daylight-input-dynamic":"#e2cbc8","--daylight-ring-dynamic":"#f29480","--daylight-info-dynamic":"#d75b1d","--daylight-gradient-via-dynamic":"#fffaf9","--daylight-gradient-to-dynamic":"#ffecea","--daylight-chart-1-dynamic":"#dd574e","--daylight-chart-2-dynamic":"#c26300","--daylight-chart-3-dynamic":"#df7da9","--daylight-chart-4-dynamic":"#81bf59","--daylight-chart-5-dynamic":"#7781f4","--daylight-primary-50-dynamic":"#fff3f2","--daylight-accent-50-dynamic":"#fff3f0","--daylight-primary-100-dynamic":"#ffebe9","--daylight-accent-100-dynamic":"#ffeae5","--daylight-primary-200-dynamic":"#ffdbd6","--daylight-accent-200-dynamic":"#ffd7ce","--daylight-primary-300-dynamic":"#fbc1b9","--daylight-accent-300-dynamic":"#f9b9aa","--daylight-primary-400-dynamic":"#f7a096","--daylight-accent-400-dynamic":"#f29480","--daylight-primary-500-dynamic":"#f1786e","--daylight-accent-500-dynamic":"#ed6a50","--daylight-primary-600-dynamic":"#cf413b","--daylight-accent-600-dynamic":"#c92600","--daylight-primary-700-dynamic":"#b02927","--daylight-accent-700-dynamic":"#a21d00","--daylight-primary-800-dynamic":"#8c1c1b","--daylight-accent-800-dynamic":"#811500","--daylight-primary-900-dynamic":"#691212","--daylight-accent-900-dynamic":"#620d00"}};
    var root = document.documentElement;
    if (!root) return;

    window.__SQ_THEME_BOOTSTRAP__ = payload;

    // Animations & transition duration
    if (payload.enableAnimations === false) {
      root.style.setProperty('--theme-transition', '0ms');
      root.classList.add('no-theme-transitions');
    } else {
      root.style.setProperty('--theme-transition', String(payload.transitionDuration || 300) + 'ms');
      root.classList.remove('no-theme-transitions');
    }

    // Active theme id
    var themeId = payload.activeThemeId || payload.theme || 'midnight';
    root.setAttribute('data-theme', themeId);
    if (payload.colorScheme === 'light' || payload.colorScheme === 'dark') {
      root.style.colorScheme = payload.colorScheme;
      // Category class — lets CSS rules target ALL dark or ALL light
      // themes without hard-coding each theme id.
      if (payload.colorScheme === 'light') {
        root.classList.add('theme-light');
        root.classList.remove('theme-dark');
      } else {
        root.classList.add('theme-dark');
        root.classList.remove('theme-light');
      }
    }

    // Active template id — drives layout switching (classic / obsidian)
    var templateId = payload.activeTemplateId || 'classic';
    root.setAttribute('data-template', templateId);
    try { localStorage.setItem('cached_template', templateId); } catch (e) {}

    // Header / footer / product-card chrome variants — independent of the
    // template. "auto"/empty means "follow the template's own design", so we
    // only set the attribute for an explicit variant (and clear it otherwise).
    var headerVariant = payload.headerVariant || 'auto';
    var footerVariant = payload.footerVariant || 'auto';
    var cardVariant = payload.cardVariant || 'auto';
    if (headerVariant && headerVariant !== 'auto') { root.setAttribute('data-header', headerVariant); }
    else { root.removeAttribute('data-header'); }
    if (footerVariant && footerVariant !== 'auto') { root.setAttribute('data-footer', footerVariant); }
    else { root.removeAttribute('data-footer'); }
    if (cardVariant && cardVariant !== 'auto') { root.setAttribute('data-card', cardVariant); }
    else { root.removeAttribute('data-card'); }
    // Aurora card "Buy Now" split-CTA toggle (admin switch in the Theme tab).
    var cardBuyNow = payload.cardBuyNow === true;
    if (cardBuyNow) { root.setAttribute('data-card-buynow', ''); }
    else { root.removeAttribute('data-card-buynow'); }
    // Testimonials section design variant (classic/marquee/wall/spotlight).
    var reviewsVariant = payload.reviewsVariant || 'auto';
    if (reviewsVariant && reviewsVariant !== 'auto') { root.setAttribute('data-reviews', reviewsVariant); }
    else { root.removeAttribute('data-reviews'); }
    // Partners/trust-badges section design variant (marquee/grid/trustbar/showcase).
    var partnersVariant = payload.partnersVariant || 'auto';
    if (partnersVariant && partnersVariant !== 'auto') { root.setAttribute('data-partners', partnersVariant); }
    else { root.removeAttribute('data-partners'); }
    // Homepage shelf-heading design variant (classic/centered/underline/badge).
    var headingVariant = payload.headingVariant || 'auto';
    if (headingVariant && headingVariant !== 'auto') { root.setAttribute('data-heading', headingVariant); }
    else { root.removeAttribute('data-heading'); }
    // Cart drawer skin (classic/obsidian/glass/compact/editorial/receipt/aurora/neon/luxe).
    var cartStyle = payload.cartStyle || 'auto';
    if (cartStyle && cartStyle !== 'auto') { root.setAttribute('data-cartstyle', cartStyle); }
    else { root.removeAttribute('data-cartstyle'); }
    // Checkout result-page designs (success / failed / payment-status). Each is an
    // independent admin-selectable design from the shared 6-design family.
    var successVariant = payload.successVariant || 'auto';
    if (successVariant && successVariant !== 'auto') { root.setAttribute('data-paysuccess', successVariant); }
    else { root.removeAttribute('data-paysuccess'); }
    var failedVariant = payload.failedVariant || 'auto';
    if (failedVariant && failedVariant !== 'auto') { root.setAttribute('data-payfailed', failedVariant); }
    else { root.removeAttribute('data-payfailed'); }
    var payStatusVariant = payload.payStatusVariant || 'auto';
    if (payStatusVariant && payStatusVariant !== 'auto') { root.setAttribute('data-paystatus', payStatusVariant); }
    else { root.removeAttribute('data-paystatus'); }
    // Main checkout page LAYOUT design (classic/stacked/wizard/accordion/split/compact).
    var checkoutVariant = payload.checkoutVariant || 'auto';
    if (checkoutVariant && checkoutVariant !== 'auto') { root.setAttribute('data-checkout', checkoutVariant); }
    else { root.removeAttribute('data-checkout'); }
    // Product DETAIL-page LAYOUT design (classic/editorial/immersive/minimal/boutique/spotlight/gallery).
    var productVariant = payload.productVariant || 'auto';
    if (productVariant && productVariant !== 'auto') { root.setAttribute('data-product', productVariant); }
    else { root.removeAttribute('data-product'); }
    try {
      localStorage.setItem('cached_header_variant', headerVariant);
      localStorage.setItem('cached_footer_variant', footerVariant);
      localStorage.setItem('cached_card_variant', cardVariant);
      localStorage.setItem('cached_card_buynow', cardBuyNow ? '1' : '0');
      localStorage.setItem('cached_reviews_variant', reviewsVariant);
      localStorage.setItem('cached_partners_variant', partnersVariant);
      localStorage.setItem('cached_heading_variant', headingVariant);
      localStorage.setItem('cached_cart_style', cartStyle);
      localStorage.setItem('cached_success_variant', successVariant);
      localStorage.setItem('cached_failed_variant', failedVariant);
      localStorage.setItem('cached_paystatus_variant', payStatusVariant);
      localStorage.setItem('cached_checkout_variant', checkoutVariant);
      localStorage.setItem('cached_product_variant', productVariant);
    } catch (e) {}

    // Apply pro CSS vars (preferred) — covers all tokens incl. gradients.
    if (payload.cssVars && typeof payload.cssVars === 'object') {
      for (var key in payload.cssVars) {
        if (Object.prototype.hasOwnProperty.call(payload.cssVars, key) && key.indexOf('--') === 0) {
          root.style.setProperty(key, String(payload.cssVars[key]));
        }
      }
    } else if (themeId === 'daylight') {
      // Legacy fallback for daylight accent
      if (payload.daylightCssVars && typeof payload.daylightCssVars === 'object') {
        for (var k2 in payload.daylightCssVars) {
          if (Object.prototype.hasOwnProperty.call(payload.daylightCssVars, k2) && k2.indexOf('--daylight-') === 0) {
            root.style.setProperty(k2, String(payload.daylightCssVars[k2]));
          }
        }
      } else if (payload.daylightAccentColor) {
        root.style.setProperty('--daylight-primary-dynamic', String(payload.daylightAccentColor));
        root.style.setProperty('--daylight-accent-dynamic', String(payload.daylightAccentColor));
      }
    }

    // Obsidian template — apply dark surface CSS vars inline (zero FOUC).
    // The CSS !important rules in global.css are the authoritative source;
    // these inline overrides just prevent a white flash before CSS loads.
    if (templateId === 'obsidian') {
      var obsVars = {
        '--background':'#0A0A0A','--foreground':'#EDEDEF',
        '--card':'#141414','--card-foreground':'#EDEDEF',
        '--secondary':'#1C1C1C','--secondary-foreground':'rgba(237,237,239,0.65)',
        '--muted':'#1C1C1C','--muted-foreground':'rgba(237,237,239,0.62)',
        '--border':'rgba(255,255,255,0.08)','--input':'#1C1C1C',
        '--popover':'#1A1A1A','--popover-foreground':'#EDEDEF',
        '--accent-foreground':'#fff',
        '--gradient-from':'#0A0A0A','--gradient-via':'#0D0D0D','--gradient-to':'#0A0A0A',
        '--hero-gradient':'linear-gradient(160deg, #0A0A0A 0%, #111 50%, #0A0A0A 100%)',
        '--shadow-color':'0 0% 0%'
      };
      for (var obsK in obsVars) {
        if (Object.prototype.hasOwnProperty.call(obsVars, obsK)) {
          root.style.setProperty(obsK, obsVars[obsK]);
        }
      }
      root.style.colorScheme = 'dark';
    }

    // ── Loading-screen (splash) gate ────────────────────────────────────────
    // Decided server-side so it is correct on the very FIRST visit (no cache yet).
    // 'ls-skip' on <html> suppresses BOTH the pre-hydration cover (see layout.tsx)
    // AND the React loading screen → instant progressive render when disabled.
    // When enabled we REMOVE ls-skip so a stale cached value can't hide a wanted loader.
    try {
      var lsShow = !(payload.loadingScreen && payload.loadingScreen.show === false);
      window.__SQ_LS__ = { show: lsShow };
      if (lsShow) { root.classList.remove('ls-skip'); }
      else { root.classList.add('ls-skip'); }
    } catch (e) {}

    // Cache for next visit
    try {
      localStorage.setItem('cached_theme', themeId);
      localStorage.setItem('cached_theme_transition', String(payload.transitionDuration || 300));
      localStorage.setItem('cached_theme_animations', payload.enableAnimations === false ? 'false' : 'true');
      if (payload.cssVars) {
        localStorage.setItem('cached_theme_css_vars', JSON.stringify(payload.cssVars));
      } else {
        localStorage.removeItem('cached_theme_css_vars');
      }
      if (themeId === 'daylight') {
        if (payload.daylightCssVars) {
          localStorage.setItem('cached_daylight_palette', JSON.stringify(payload.daylightCssVars));
        }
        if (payload.daylightAccentColor) {
          localStorage.setItem('cached_daylight_primary', String(payload.daylightAccentColor));
          localStorage.setItem('cached_daylight_accent', String(payload.daylightAccentColor));
        }
      } else {
        localStorage.removeItem('cached_daylight_palette');
        localStorage.removeItem('cached_daylight_primary');
        localStorage.removeItem('cached_daylight_accent');
      }
    } catch (storageError) {}
  } catch (error) {
    try { document.documentElement.setAttribute('data-theme', 'midnight'); } catch (e) {}
    window.__SQ_THEME_BOOTSTRAP__ = { source: 'server', failed: true };
  }
})();