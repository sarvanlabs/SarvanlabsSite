// common-head.js
(function () {
  // Avoid double-inserting (e.g., if included twice)
  if (document.documentElement.hasAttribute('data-common-head-loaded')) return;
  document.documentElement.setAttribute('data-common-head-loaded', 'true');

  // Allow overriding the include URL via data-include on the script tag
  const current = document.currentScript;
  const includeUrl = current && current.dataset.include ? current.dataset.include : './common-head.html';

  fetch(includeUrl, { cache: 'no-store' })
    .then(r => {
      if (!r.ok) throw new Error(`Failed to fetch ${includeUrl}: ${r.status}`);
      return r.text();
    })
    .then(html => {
      // Parse into a fragment
      const range = document.createRange();
      range.selectNode(document.head);
      const frag = range.createContextualFragment(html);

      // Recreate <script> tags so they execute
      frag.querySelectorAll('script').forEach(old => {
        const s = document.createElement('script');
        // Copy common attrs
        ['src','type','defer','async','crossorigin','referrerpolicy','nomodule','integrity']
          .forEach(a => { if (old.hasAttribute(a)) s.setAttribute(a, old.getAttribute(a)); });

        if (old.src) {
          s.src = old.src;
        } else {
          s.textContent = old.textContent;
        }
        old.replaceWith(s);
      });

      document.head.appendChild(frag);
    })
    .catch(err => console.error('[common-head] ', err));
})();
