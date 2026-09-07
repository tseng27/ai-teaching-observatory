/* AI 教學觀察所｜全站品牌 LOGO 替換 */
(() => {
  const VERSION = '20260907-logo1';
  const NEW_LOGO = `assets/aito-logo-gold.webp?v=${VERSION}`;

  const installStyle = () => {
    if (document.getElementById('aito-logo-patch-style')) return;
    const style = document.createElement('style');
    style.id = 'aito-logo-patch-style';
    style.textContent = `
      .brand .mark{
        width:52px!important;
        height:52px!important;
        padding:3px!important;
        overflow:hidden!important;
        display:grid!important;
        place-items:center!important;
        border-radius:15px!important;
        background:radial-gradient(circle at 38% 28%,#fff0a8 0%,#d99a28 42%,#74420e 100%)!important;
        border:1px solid rgba(150,96,22,.36)!important;
        box-shadow:0 9px 22px rgba(103,62,14,.19),inset 0 0 0 1px rgba(255,242,187,.34)!important;
      }
      .brand .mark img{
        width:100%!important;
        height:100%!important;
        object-fit:contain!important;
        transform:none!important;
        filter:drop-shadow(0 2px 3px rgba(61,32,3,.26)) saturate(1.06)!important;
      }
      .aito-emblem img{
        object-fit:contain!important;
        padding:2%!important;
      }
      #works .work img[src*="aito-logo-gold"]{
        object-fit:contain!important;
        padding:9%!important;
        background:radial-gradient(circle at 50% 35%,#f4d578,#b77418 48%,#3d2108 100%)!important;
      }
    `;
    document.head.appendChild(style);
  };

  const replaceLogos = () => {
    installStyle();

    const navMark = document.querySelector('.brand .mark');
    if (navMark && !navMark.querySelector('img[src*="aito-logo-gold"]')) {
      navMark.innerHTML = `<img src="${NEW_LOGO}" alt="AI 教學觀察所 LOGO">`;
    }

    document.querySelectorAll('img').forEach((img) => {
      const src = img.getAttribute('src') || '';
      if (src.includes('ai-teaching-observatory-mark.svg')) {
        img.src = NEW_LOGO;
        if (!img.alt) img.alt = 'AI 教學觀察所 LOGO';
      }
    });
  };

  replaceLogos();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', replaceLogos, {once:true});
  }

  const observer = new MutationObserver(() => replaceLogos());
  observer.observe(document.documentElement, {childList:true, subtree:true});
  window.addEventListener('load', () => {
    replaceLogos();
    setTimeout(() => observer.disconnect(), 6000);
  }, {once:true});
})();
