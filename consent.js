/* My Photo Club: cookie consent (Google Consent Mode v2)
   - Default consent ("denied" unless the visitor accepted before) is set inline in <head>, before GTM.
   - This file shows the banner, stores the choice and tells GTM about it.
   - GTM listens to the custom event "mpc_consent_update". */
(function () {
  var KEY = 'mpc_consent';
  function getChoice() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function setChoice(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }

  function apply(choice) {
    var s = choice === 'granted' ? 'granted' : 'denied';
    gtag('consent', 'update', {
      ad_storage: s, ad_user_data: s, ad_personalization: s, analytics_storage: s
    });
    window.dataLayer.push({ event: 'mpc_consent_update', mpc_consent: s });
  }

  var root = document.currentScript && document.currentScript.getAttribute('data-root') || '';
  var banner;

  function build() {
    banner = document.createElement('div');
    banner.className = 'cookie-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Cookie consent');
    banner.innerHTML =
      '<p class="cookie-text">We use cookies to measure visits and our ads, only if you agree. ' +
      '<a href="' + root + 'privacy/#cookies">Learn more</a></p>' +
      '<div class="cookie-actions">' +
      '<button type="button" class="btn btn-outline cookie-btn" data-consent="denied">Reject</button>' +
      '<button type="button" class="btn btn-solid cookie-btn" data-consent="granted">Accept</button>' +
      '</div>';
    banner.addEventListener('click', function (e) {
      var v = e.target.getAttribute && e.target.getAttribute('data-consent');
      if (!v) return;
      setChoice(v);
      apply(v);
      hide();
    });
    document.body.appendChild(banner);
  }
  function show() { if (!banner) build(); banner.hidden = false; }
  function hide() { if (banner) banner.hidden = true; }

  document.addEventListener('click', function (e) {
    var t = e.target.closest && e.target.closest('[data-cookie-settings]');
    if (t) { e.preventDefault(); show(); }
  });

  if (!getChoice()) show();
})();
