// /assets/js/header.js
(function () {
  // --- 1) Feature: fix anchors on the home page ---
  function setHomeAnchors() {
    const onHome =
      location.pathname === "/" ||
      location.pathname.endsWith("/index.html");

    if (!onHome) return;

    document.querySelectorAll('a[data-home-href]').forEach(a => {
      a.setAttribute('href', a.getAttribute('data-home-href'));
      a.classList.add('scroll');
    });
  }

  // Re-run when partials finish
  window.addEventListener('partials:loaded', setHomeAnchors);

  // If DOM already ready AND partials done, do it now
  if (document.readyState !== 'loading' && window.__partialsLoaded) {
    setHomeAnchors();
  }

  // --- 2) Load theme.js after BOTH page + partials are ready ---
  // guard so we don't inject more than once
  if (!window.__themeJsLoaderInstalled) {
    window.__themeJsLoaderInstalled = true;

    const pageLoaded = new Promise((resolve) => {
      if (document.readyState === 'complete') resolve();
      else window.addEventListener('load', resolve, { once: true });
    });

    const partialsReady = new Promise((resolve) => {
      if (window.__partialsLoaded) resolve();
      else window.addEventListener('partials:loaded', resolve, { once: true });
    });

    Promise.all([pageLoaded, partialsReady]).then(() => {
      // If theme.js already present (e.g., someone added a tag), skip
      const already = [...document.scripts].some(s =>
        (s.src || "").includes('/assets/js/theme.js')
      );
      if (already || window.__themeJsLoaded) return;

      const s = document.createElement('script');
      s.src = './assets/js/theme.js';
      s.onload = () => {
        window.__themeJsLoaded = true;
        if (window.theme?.init) window.theme.init();
      };
      s.onerror = (e) => console.error('Failed to load theme.js', e);
      document.head.appendChild(s);
    });
  }
})();
