/* AI 教學觀察所｜Hero brand art direction */
(() => {
  const mount = () => {
    const stage = document.querySelector('.hero .stage');
    if (!stage || stage.dataset.brandUpgraded === '1') return;
    stage.dataset.brandUpgraded = '1';

    const style = document.createElement('style');
    style.textContent = `
      .hero{grid-template-columns:.92fr 1.08fr;gap:48px}
      .stage{min-height:620px;isolation:isolate;overflow:visible}
      .stage:before{content:"";position:absolute;width:560px;height:560px;border-radius:50%;background:radial-gradient(circle at 50% 48%,rgba(255,228,151,.62) 0%,rgba(224,175,70,.20) 34%,rgba(255,255,255,0) 70%);filter:blur(8px);z-index:0;animation:brandAura 5.8s ease-in-out infinite}
      .stage:after{content:"OBSERVE  ·  CREATE  ·  TEACH";position:absolute;left:50%;bottom:12px;transform:translateX(-50%);font:600 10px/1.4 Georgia,serif;letter-spacing:.36em;color:rgba(117,79,24,.5);white-space:nowrap}
      .stage .glow{width:520px;height:520px;background:radial-gradient(circle,rgba(255,230,158,.44),rgba(211,164,62,.10) 45%,transparent 72%);z-index:0}
      .stage .orbit{width:500px;height:500px;border-color:rgba(165,116,42,.28);z-index:1}
      .stage .orbit:after{inset:52px;border-color:rgba(165,116,42,.11)}
      .hero-brand-emblem{position:relative;z-index:4;width:min(470px,74vw);aspect-ratio:560/440;display:grid;place-items:center;animation:emblemFloat 6.2s ease-in-out infinite;filter:drop-shadow(0 28px 34px rgba(86,55,12,.22))}
      .hero-brand-emblem:before{content:"";position:absolute;inset:7% 1% 2%;border-radius:50%;background:radial-gradient(circle,rgba(255,217,114,.38),rgba(216,166,61,.09) 44%,transparent 72%);filter:blur(18px);z-index:-1}
      .hero-brand-emblem img{width:100%;height:100%;object-fit:contain;display:block;filter:drop-shadow(0 16px 20px rgba(92,57,11,.18));mix-blend-mode:normal;image-rendering:auto}
      .hero-brand-badge{position:absolute;left:50%;bottom:-1%;transform:translateX(-50%);padding:7px 13px;border:1px solid rgba(166,113,31,.24);background:rgba(255,251,239,.78);backdrop-filter:blur(10px);font:700 9px/1 system-ui,sans-serif;letter-spacing:.22em;color:#8b6122;white-space:nowrap;box-shadow:0 10px 30px rgba(100,66,19,.09)}
      .stage .floatcard{width:186px;padding:9px;border-radius:5px;background:rgba(255,252,242,.88);border:1px solid rgba(169,120,43,.28);box-shadow:0 26px 60px rgba(70,44,10,.14);backdrop-filter:blur(12px);transition:transform .35s ease,box-shadow .35s ease,background .35s ease}
      .stage .floatcard:hover{background:rgba(255,255,249,.98);box-shadow:0 34px 76px rgba(70,44,10,.18)}
      .stage .floatcard .pic{height:86px;border-radius:2px;filter:saturate(.9) contrast(.98)}
      .stage .floatcard b{font-size:.86rem;font-weight:700;letter-spacing:.025em}
      .stage .floatcard:nth-of-type(1){right:-2px;top:54px;transform:rotate(2deg)}
      .stage .floatcard:nth-of-type(2){right:-12px;bottom:72px;transform:rotate(-2deg)}
      .stage .floatcard:nth-of-type(3){left:-12px;top:100px;transform:rotate(-3deg)}
      .stage .floatcard:nth-of-type(4){left:12px;bottom:56px;transform:rotate(2deg)}
      .stage .orb{background:rgba(255,251,241,.88);border-color:rgba(186,136,56,.42);backdrop-filter:blur(8px);box-shadow:0 12px 30px rgba(90,58,13,.12)}
      .brand .mark{overflow:hidden;padding:4px;background:radial-gradient(circle at 40% 35%,#fff4cb,#d6aa4d 58%,#7f5719);border:1px solid rgba(157,108,34,.45)}
      .brand .mark img{width:100%;height:100%;object-fit:contain;border-radius:50%;mix-blend-mode:normal;transform:scale(.95)}
      @keyframes emblemFloat{0%,100%{transform:translateY(0) rotate(-.3deg)}50%{transform:translateY(-10px) rotate(.3deg)}}
      @keyframes brandAura{0%,100%{transform:scale(.97);opacity:.78}50%{transform:scale(1.04);opacity:1}}
      @media(max-width:1050px){.hero{grid-template-columns:1fr}.stage{min-height:590px;margin-top:12px}.stage .floatcard:nth-of-type(1){right:6%}.stage .floatcard:nth-of-type(2){right:4%}.stage .floatcard:nth-of-type(3){left:5%}.stage .floatcard:nth-of-type(4){left:8%}}
      @media(max-width:720px){.stage{min-height:520px;margin-inline:0;transform:none!important}.stage:before,.stage .glow{width:420px;height:420px}.stage .orbit{width:400px;height:400px}.hero-brand-emblem{width:min(360px,80vw)}.stage .floatcard{width:145px}.stage .floatcard .pic{height:64px}.stage .floatcard b{font-size:.72rem}.stage .floatcard:nth-of-type(1){right:0;top:52px}.stage .floatcard:nth-of-type(2){right:0;bottom:62px}.stage .floatcard:nth-of-type(3){left:0;top:110px}.stage .floatcard:nth-of-type(4){left:0;bottom:44px}}
      @media(max-width:520px){.stage{min-height:460px}.stage .orbit,.stage .orb{display:none}.stage:before,.stage .glow{width:330px;height:330px}.hero-brand-emblem{width:min(310px,84vw)}.stage .floatcard{display:none}.stage:after{bottom:2px;font-size:8px}.hero-brand-badge{font-size:8px;letter-spacing:.15em}}
    `;
    document.head.appendChild(style);

    const oldBook = stage.querySelector('.book');
    if (oldBook) {
      const emblem = document.createElement('div');
      emblem.className = 'hero-brand-emblem';
      emblem.innerHTML = `<img src="assets/ai-teaching-observatory-mark.svg?v=20260906-3" alt="AI 教學觀察所金色識別標誌"><span class="hero-brand-badge">ART × AI × EDUCATION</span>`;
      oldBook.replaceWith(emblem);
    }

    const navMark = document.querySelector('.brand .mark');
    if (navMark) navMark.innerHTML = `<img src="assets/ai-teaching-observatory-mark.svg?v=20260906-3" alt="">`;
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount); else mount();
})();
