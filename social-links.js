/* AI 教學觀察所｜module loader */
(() => {
  const load = (src) => {
    const s = document.createElement('script');
    s.src = src;
    s.defer = true;
    document.head.appendChild(s);
  };
  load('hero-brand.js?v=20260906-4');
  load('social-hub.js?v=20260906-1');
})();
