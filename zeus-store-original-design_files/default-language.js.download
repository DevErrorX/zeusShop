// Smart Language Detection - Runs before any other scripts
// Mobile: Arabic if device language is Arabic, English otherwise
// Desktop: Arabic if in Middle East, English otherwise
// User's explicit choice always takes priority
(function() {
  'use strict';

  // ─── Helpers ───────────────────────────────────────────────

  function getCookie(name) {
    var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
  }

  function setCookie(name, value) {
    document.cookie = name + '=' + value + ';path=/;max-age=31536000;SameSite=Lax';
  }

  function safeGetLS(key) {
    try { return localStorage.getItem(key); } catch (e) { return null; }
  }

  function safeSetLS(key, value) {
    try { localStorage.setItem(key, value); } catch (e) { /* ignore */ }
  }

  function safeRemoveLS(key) {
    try { localStorage.removeItem(key); } catch (e) { /* ignore */ }
  }

  // ─── API Base ──────────────────────────────────────────────

  function resolveApiBase() {
    var protocol = window.location.protocol;
    var hostname = window.location.hostname;
    var port = window.location.port;

    function inferXamppFolder() {
      try {
        var meta = document.querySelector('meta[name="xampp-folder"]');
        if (meta && meta.content) return meta.content;
        return 'SQAUDSstore';
      } catch (e) {
        return 'SQAUDSstore';
      }
    }

    var xamppFolder = inferXamppFolder();

    if (port === '3000') {
      return protocol + '//localhost/' + xamppFolder + '/api';
    }
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return '/' + xamppFolder + '/api';
    }
    return '/api';
  }

  // ─── Language Persistence ──────────────────────────────────

  function persistLanguage(lang) {
    setCookie('site_language', lang);
    safeSetLS('site_language', lang);
  }

  function applyLanguage(lang) {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }

  // ─── Device Detection ─────────────────────────────────────

  function isMobileDevice() {
    try {
      if (window.matchMedia) {
        var coarse = window.matchMedia('(pointer: coarse)').matches;
        var noHover = window.matchMedia('(hover: none)').matches;
        // 1. Coarse pointer + no hover = definite mobile/tablet (phone, tablet without mouse)
        if (coarse && noHover) return true;
        // 2. Fine pointer + hover = definite desktop/laptop (even with touchscreen)
        if (window.matchMedia('(pointer: fine)').matches &&
            window.matchMedia('(hover: hover)').matches) return false;
      }
      // 3. Narrow viewport = likely mobile
      if (window.innerWidth <= 768) return true;
      // 4. Touch capability on moderate screen (MDN recommended check)
      if (typeof navigator.maxTouchPoints === 'number' &&
          navigator.maxTouchPoints > 0 && window.innerWidth <= 1024) return true;
      // 5. UA fallback — MDN recommends checking for 'Mobi' string
      var ua = navigator.userAgent || '';
      return /Mobi/i.test(ua);
    } catch (e) {
      return false;
    }
  }

  // ─── Navigator Language Detection ─────────────────────────

  function isDeviceArabic() {
    try {
      var langs = (navigator.languages && navigator.languages.length)
        ? navigator.languages
        : [navigator.language];
      var primary = String(langs && langs[0] ? langs[0] : '').toLowerCase();
      // Check if primary language starts with 'ar' (ar, ar-SA, ar-EG, etc.)
      return primary.indexOf('ar') === 0;
    } catch (e) {
      return false;
    }
  }

  // ─── Timezone / Geo Detection ─────────────────────────────

  function getTimeZone() {
    try {
      return (Intl && Intl.DateTimeFormat)
        ? (Intl.DateTimeFormat().resolvedOptions().timeZone || '')
        : '';
    } catch (e) {
      return '';
    }
  }

  function isMiddleEastCountry(code) {
    var cc = String(code || '').toUpperCase();
    if (!cc) return false;
    // GCC + Levant + Iraq + Iran + Turkey + Egypt + Yemen + North Africa
    return (
      cc === 'AE' || cc === 'SA' || cc === 'EG' || cc === 'KW' || cc === 'QA' ||
      cc === 'BH' || cc === 'OM' || cc === 'YE' || cc === 'JO' || cc === 'LB' ||
      cc === 'SY' || cc === 'IQ' || cc === 'PS' || cc === 'IL' || cc === 'IR' ||
      cc === 'TR' || cc === 'LY' || cc === 'SD' || cc === 'TN' || cc === 'DZ' ||
      cc === 'MA'
    );
  }

  function isMiddleEastTimeZone(tz) {
    var t = String(tz || '');
    return (
      t === 'Asia/Riyadh' || t === 'Asia/Dubai' || t === 'Asia/Kuwait' ||
      t === 'Asia/Qatar' || t === 'Asia/Bahrain' || t === 'Asia/Muscat' ||
      t === 'Asia/Aden' || t === 'Asia/Amman' || t === 'Asia/Beirut' ||
      t === 'Asia/Damascus' || t === 'Asia/Baghdad' || t === 'Asia/Jerusalem' ||
      t === 'Asia/Gaza' || t === 'Asia/Hebron' || t === 'Asia/Tehran' ||
      t === 'Europe/Istanbul' || t === 'Africa/Cairo' || t === 'Africa/Tripoli' ||
      t === 'Africa/Khartoum' || t === 'Africa/Tunis' || t === 'Africa/Algiers' ||
      t === 'Africa/Casablanca'
    );
  }

  // ─── Geo Cache ─────────────────────────────────────────────

  var GEO_CACHE_KEY = 'geo_cache_v1';

  function loadGeoCache() {
    var raw = safeGetLS(GEO_CACHE_KEY);
    if (!raw) return null;
    try {
      var data = JSON.parse(raw);
      if (!data || typeof data !== 'object') return null;
      var ts = Number(data.ts);
      if (!isFinite(ts) || ts <= 0) return null;
      // Cache valid for 6 hours
      if ((Date.now() - ts) > 6 * 60 * 60 * 1000) return null;
      return data;
    } catch (e) {
      return null;
    }
  }

  function saveGeoCache(countryCode, city, region) {
    try {
      safeSetLS(GEO_CACHE_KEY, JSON.stringify({
        countryCode: String(countryCode || '').toUpperCase(),
        city: String(city || ''),
        region: String(region || ''),
        ts: Date.now()
      }));
    } catch (e) { /* ignore */ }
  }

  // ─── Smart Language Resolution ─────────────────────────────
  // Mobile: Arabic if device language is Arabic, else English
  // Desktop: Arabic if in Middle East (by geo/timezone), else English

  function resolveSmartLanguage() {
    var mobile = isMobileDevice();

    if (mobile) {
      // MOBILE: Follow device language
      return isDeviceArabic() ? 'ar' : 'en';
    }

    // DESKTOP: Follow geographic location
    // Try cached geo first
    var geo = loadGeoCache();
    if (geo && geo.countryCode) {
      return isMiddleEastCountry(geo.countryCode) ? 'ar' : 'en';
    }

    // Fallback: use timezone
    var tz = getTimeZone();
    if (tz) {
      return isMiddleEastTimeZone(tz) ? 'ar' : 'en';
    }

    // Last resort: follow device language
    return isDeviceArabic() ? 'ar' : 'en';
  }

  // ─── Main Execution ────────────────────────────────────────

  try {
    var appliedLang = null;

    // PRIORITY 1: User explicitly chose a language (via toggle button)
    var userExplicitChoice = safeGetLS('user_language_choice');
    if (userExplicitChoice === 'true') {
      var savedLang = safeGetLS('site_language');
      if (savedLang && (savedLang === 'ar' || savedLang === 'en')) {
        applyLanguage(savedLang);
        appliedLang = savedLang;
      }
    }

    // PRIORITY 2: Auto-detection
    if (!appliedLang) {
      var mobile = isMobileDevice();

      if (mobile) {
        // MOBILE: Always re-detect from device language (responds to system language changes)
        var deviceLang = isDeviceArabic() ? 'ar' : 'en';
        applyLanguage(deviceLang);
        persistLanguage(deviceLang);
        appliedLang = deviceLang;
      } else {
        // DESKTOP: Returning visitor keeps cached language
        var storedLang = safeGetLS('site_language');
        if (storedLang && (storedLang === 'ar' || storedLang === 'en')) {
          applyLanguage(storedLang);
          appliedLang = storedLang;
        } else {
          // DESKTOP: New visitor — geo/timezone/device fallback
          var detected = resolveSmartLanguage();
          applyLanguage(detected);
          persistLanguage(detected);
          appliedLang = detected;
        }
      }
    }

    // ─── Background: Refresh Geo Cache (for desktop accuracy on next visit) ──
    if (typeof fetch !== 'undefined') {
      setTimeout(function() {
        // Skip if user explicitly chose a language
        var userSelected = safeGetLS('user_language_choice');
        if (userSelected === 'true') return;

        var apiBase = resolveApiBase();
        var url = apiBase + '/geolocation.php';

        var controller;
        var timeoutId;
        try {
          controller = new AbortController();
          timeoutId = setTimeout(function() { controller.abort(); }, 2500);
        } catch (e) {
          controller = null;
        }

        var opts = {
          method: 'GET',
          headers: { 'Accept': 'application/json' },
          credentials: 'include'
        };
        if (controller) opts.signal = controller.signal;

        fetch(url, opts)
          .then(function(r) {
            if (timeoutId) clearTimeout(timeoutId);
            if (!r.ok) throw new Error('geo failed');
            return r.json();
          })
          .then(function(data) {
            var cc = data && data.countryCode ? String(data.countryCode).toUpperCase() : '';
            var city = data && data.city ? String(data.city) : '';
            var region = data && (data.region || data.regionName) ? String(data.region || data.regionName) : '';
            if (cc) {
              saveGeoCache(cc, city, region);
            }

            // Re-evaluate language with fresh geo data (desktop only)
            if (!isMobileDevice() && cc) {
              var desired = isMiddleEastCountry(cc) ? 'ar' : 'en';
              var current = document.documentElement.lang;
              if ((desired === 'ar' || desired === 'en') && current !== desired) {
                applyLanguage(desired);
                persistLanguage(desired);
                // Notify React components and LanguageManager of the change
                try {
                  if (window.LanguageManager) {
                    window.LanguageManager.currentLanguage = desired;
                  }
                  window.dispatchEvent(new CustomEvent('languageChanged', {
                    detail: { language: desired }
                  }));
                } catch (e) { /* ignore */ }
              }
            }
          })
          .catch(function() { /* ignore */ });
      }, 250);
    }

    // Clean up legacy keys that are no longer needed
    safeRemoveLS('admin_default_language');
    safeRemoveLS('auto_language_choice');
    safeRemoveLS('auto_language_policy');
    safeRemoveLS('auto_language_updated_at');

  } catch (e) {
    // Safe fallback - use device language
    try {
      var fallback = isDeviceArabic() ? 'ar' : 'en';
      document.documentElement.lang = fallback;
      document.documentElement.dir = fallback === 'ar' ? 'rtl' : 'ltr';
    } catch (e2) {
      document.documentElement.lang = 'en';
      document.documentElement.dir = 'ltr';
    }
  }
})();
