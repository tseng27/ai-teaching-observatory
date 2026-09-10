/* AI 教學觀察所｜module loader */
(() => {
  const load = (src) => {
    const s = document.createElement('script');
    s.src = src;
    s.defer = true;
    document.head.appendChild(s);
  };
  load('hero-v3.js?v=20260907-1');
  load('hero-logo-patch.js?v=20260907-1');
  load('social-hub.js?v=20260906-1');
  load('audience-copy.js?v=20260907-1');
  load('site-v2-patch.js?v=20260910-1');
})();