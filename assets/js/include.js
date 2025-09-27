document.addEventListener('DOMContentLoaded', async () => {
  const slots = document.querySelectorAll('[data-include]');
  await Promise.all([...slots].map(async el => {
    const url = el.getAttribute('data-include');
    try {
      const res = await fetch(url, { cache: 'no-cache' });
      if (!res.ok) throw new Error(res.status);
      const html = await res.text();
      el.outerHTML = html; // replace the placeholder itself
    } catch (e) {
      console.error('Include failed:', url, e);
    }
  }));

  // mark + notify
  window.__partialsLoaded = true;
  window.dispatchEvent(new Event('partials:loaded'));
});
