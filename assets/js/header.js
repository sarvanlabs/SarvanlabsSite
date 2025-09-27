(function () {
  function setHomeAnchors() {
    const onHome = location.pathname === "/" ||
                   location.pathname.endsWith("/index.html");
                   
  if (!onHome) return;

  document.querySelectorAll('a[data-home-href]').forEach(a => {
      a.setAttribute('href', a.getAttribute('data-home-href'));
    });
  }

  // Run when DOM is ready if partials are already done…
  if (document.readyState !== 'loading' && window.__partialsLoaded) {
    setHomeAnchors();
  }

  // …and whenever partials finish injecting
  window.addEventListener('partials:loaded', setHomeAnchors);
})();