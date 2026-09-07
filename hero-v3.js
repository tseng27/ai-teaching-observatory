/* AI 教學觀察所｜Hero v3 — light, depth, breathing mark, borderless floating courses */
(() => {
  const VERSION = '20260907-hero3';
  const asset = (name) => `assets/${name}?v=${VERSION}`;

  const mount = () => {
    const hero = document.querySelector('.hero');
    const stage = document.querySelector('.hero .stage');
    if (!hero || !stage || stage.dataset.heroV3 === '1') return;
    stage.dataset.heroV3 = '1';

    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const coarse = window.matchMedia?.('(pointer: coarse)').matches;

    const style = document.createElement('style');
    style.id = 'aito-hero-v3-style';
    style.textContent = `
      .hero{grid-template-columns:.9fr 1.1fr;gap:40px;min-height:820px;padding-top:92px;padding-bottom:120px;overflow:visible}
      .hero-copy{position:relative;z-index:7}
      .hero .eyebrow{letter-spacing:.28em}
      .hero h1{font-size:clamp(4.25rem,7vw,7.6rem);line-height:.9;max-width:650px}
      .hero h1 span{font-size:.22em;margin-top:24px;letter-spacing:.1em}
      .aito-hero-slogan{display:flex;align-items:center;gap:14px;margin:27px 0 8px;font:500 clamp(1.08rem,1.55vw,1.42rem)/1.55 "Noto Serif TC","PMingLiU",serif;color:#946821;letter-spacing:.06em}
      .aito-hero-slogan:after{content:"";height:1px;width:76px;background:linear-gradient(90deg,#aa7628,transparent)}

      .hero .stage{position:relative;min-height:655px;isolation:isolate;overflow:visible;display:grid;place-items:center;transform-style:preserve-3d}
      .aito-room{position:absolute;inset:3% -7% 2% -7%;z-index:-7;border-radius:42px;overflow:hidden;pointer-events:none;box-shadow:inset 0 0 0 1px rgba(124,88,36,.08)}
      .aito-room-bg{position:absolute;inset:0;background-image:linear-gradient(90deg,rgba(255,249,236,.72),rgba(255,251,240,.12) 38%,rgba(37,56,47,.17) 100%),url('${asset('hero-stage-bg.webp')}');background-size:cover;background-position:center;filter:saturate(.88) contrast(.95) brightness(1.04);transform:scale(1.02)}
      .aito-room-vignette{position:absolute;inset:0;background:radial-gradient(ellipse 80% 68% at 53% 50%,transparent 42%,rgba(72,52,28,.08) 76%,rgba(52,39,23,.18) 100%)}
      .aito-sunwash{position:absolute;inset:-10% -7% -8% -14%;z-index:-5;background:radial-gradient(circle at 18% 25%,rgba(255,248,220,.9),rgba(255,222,139,.36) 18%,transparent 44%),radial-gradient(circle at 60% 46%,rgba(255,215,111,.28),transparent 35%);pointer-events:none;mix-blend-mode:screen}
      .aito-beam{position:absolute;z-index:-3;left:-3%;top:6%;width:72%;height:52%;transform:rotate(11deg);transform-origin:left top;background:linear-gradient(103deg,rgba(255,255,244,.58) 0%,rgba(255,238,188,.28) 30%,rgba(255,223,146,.08) 64%,transparent 100%);clip-path:polygon(0 0,100% 18%,82% 100%,0 72%);filter:blur(1.5px);opacity:.84;mix-blend-mode:screen;animation:aitoBeamBreath 8s ease-in-out infinite}
      .aito-beam.two{left:8%;top:22%;width:58%;height:34%;opacity:.28;transform:rotate(7deg);animation-delay:-3.5s}
      .aito-floor-glow{position:absolute;z-index:-2;left:20%;right:4%;bottom:4%;height:28%;background:radial-gradient(ellipse at 50% 82%,rgba(255,216,126,.4),transparent 67%);filter:blur(15px);opacity:.75}

      .aito-dust{position:absolute;inset:0;z-index:0;pointer-events:none;overflow:hidden;border-radius:42px}
      .aito-dust i{position:absolute;display:block;width:3px;height:3px;border-radius:50%;background:rgba(255,243,202,.85);box-shadow:0 0 8px rgba(255,228,153,.7);opacity:0;animation:aitoDust var(--dur,9s) linear var(--delay,0s) infinite}

      .aito-book-base{position:absolute;left:50%;top:57%;width:360px;height:154px;transform:translate(-50%,-50%);z-index:2;filter:drop-shadow(0 31px 28px rgba(72,46,17,.24));pointer-events:none}
      .aito-book-base:before,.aito-book-base:after{content:"";position:absolute;bottom:8px;width:52%;height:126px;background:linear-gradient(180deg,#fffdf4 0%,#f1dfb5 74%,#c59a4d 100%);border:1px solid rgba(147,99,28,.38);box-shadow:inset 0 -12px 24px rgba(153,102,35,.09)}
      .aito-book-base:before{left:0;border-radius:16px 2px 5px 48px;transform:skewY(6deg) rotate(-2deg);transform-origin:right bottom}
      .aito-book-base:after{right:0;border-radius:2px 16px 48px 5px;transform:skewY(-6deg) rotate(2deg);transform-origin:left bottom}
      .aito-book-spine{position:absolute;left:50%;bottom:12px;width:2px;height:114px;background:linear-gradient(180deg,rgba(125,82,25,.08),rgba(125,82,25,.5),rgba(125,82,25,.08));transform:translateX(-50%);z-index:2}

      .aito-emblem{position:absolute;left:50%;top:42%;z-index:5;width:min(300px,44vw);aspect-ratio:1/1;display:grid;place-items:center;translate:-50% -50%;animation:aitoRise 6.2s ease-in-out infinite;transform-style:preserve-3d;will-change:translate,filter}
      .aito-emblem:before{content:"";position:absolute;inset:7%;border-radius:50%;background:radial-gradient(circle,rgba(255,244,194,.9) 0%,rgba(240,194,87,.38) 38%,rgba(204,140,36,.12) 58%,transparent 74%);filter:blur(18px);z-index:-1;animation:aitoMarkGlow 6.2s ease-in-out infinite}
      .aito-emblem:after{content:"";position:absolute;width:42%;height:8%;left:29%;bottom:-3%;border-radius:50%;background:radial-gradient(ellipse,rgba(117,73,21,.28),transparent 70%);filter:blur(8px);animation:aitoShadow 6.2s ease-in-out infinite}
      .aito-emblem img{width:100%;height:100%;object-fit:contain;display:block;filter:saturate(1.08) contrast(1.03) drop-shadow(0 10px 16px rgba(90,54,11,.18));animation:aitoLogoPulse 6.2s ease-in-out infinite}

      .aito-course{position:absolute;z-index:7;width:184px;color:#3e3327;background:none!important;border:0!important;box-shadow:none!important;backdrop-filter:none!important;text-decoration:none;will-change:translate;animation:aitoCourseFloat 7s ease-in-out infinite;transition:filter .3s ease,scale .3s ease;isolation:isolate}
      .aito-course:hover{filter:drop-shadow(0 18px 22px rgba(68,43,14,.22));scale:1.035;z-index:12}
      .aito-course figure{position:relative;width:100%;aspect-ratio:1.48/1;margin:0 0 9px;border-radius:18px;overflow:hidden;background:#d9cfb9;box-shadow:0 19px 35px rgba(58,39,18,.2),0 0 0 1px rgba(255,255,255,.44);transform:translateZ(0)}
      .aito-course figure:after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(255,255,255,.08),transparent 42%,rgba(39,34,27,.16));pointer-events:none}
      .aito-course img{width:100%;height:100%;object-fit:cover;display:block;filter:saturate(.9) contrast(.98);transition:transform .6s cubic-bezier(.2,.8,.2,1),filter .4s ease}
      .aito-course:hover img{transform:scale(1.045);filter:saturate(1) contrast(1)}
      .aito-course .ttl{font:700 .93rem/1.35 "Noto Serif TC","PMingLiU",serif;letter-spacing:.025em;text-shadow:0 1px 14px rgba(255,252,242,.96),0 1px 3px rgba(255,252,242,.92)}
      .aito-course .sub{margin-top:2px;font-size:.68rem;line-height:1.45;color:#786a57;text-shadow:0 1px 10px rgba(255,252,242,.95)}
      .aito-course .arrow{display:inline-block;margin-left:5px;color:#97681f;transition:transform .25s ease}
      .aito-course:hover .arrow{transform:translate(3px,-2px)}
      .aito-vr{left:0;top:11%;rotate:-4deg;animation-delay:-1.3s}
      .aito-future{right:-1%;top:8%;rotate:3deg;animation-delay:-3.2s}
      .aito-green{left:-3%;bottom:9%;rotate:2deg;animation-delay:-4.6s}
      .aito-ar{right:-3%;bottom:8%;rotate:-3deg;animation-delay:-2.1s}

      .aito-caption{position:absolute;left:50%;bottom:1%;translate:-50% 0;text-align:center;font:600 8.5px/1.7 Georgia,serif;letter-spacing:.34em;color:rgba(94,67,32,.56);white-space:nowrap;z-index:3;text-shadow:0 1px 10px rgba(255,252,240,.9)}
      .brand .mark{overflow:hidden;padding:4px;background:radial-gradient(circle at 40% 35%,#fff4cb,#d6aa4d 58%,#7f5719);border:1px solid rgba(157,108,34,.45)}
      .brand .mark img{width:100%;height:100%;object-fit:contain;display:block;transform:scale(.96)}

      @keyframes aitoBeamBreath{0%,100%{opacity:.62;filter:blur(1.5px)}50%{opacity:.95;filter:blur(.7px)}}
      @keyframes aitoDust{0%{opacity:0;transform:translate3d(0,16px,0)}12%{opacity:.75}70%{opacity:.38}100%{opacity:0;transform:translate3d(var(--drift,22px),-105px,0)}}
      @keyframes aitoRise{0%,100%{translate:-50% -48%}50%{translate:-50% -54%}}
      @keyframes aitoMarkGlow{0%,100%{transform:scale(.92);opacity:.55}50%{transform:scale(1.12);opacity:1}}
      @keyframes aitoLogoPulse{0%,100%{filter:saturate(1.03) contrast(1.02) drop-shadow(0 8px 12px rgba(90,54,11,.15))}50%{filter:saturate(1.16) contrast(1.05) brightness(1.06) drop-shadow(0 0 20px rgba(235,186,72,.55)) drop-shadow(0 13px 20px rgba(90,54,11,.18))}}
      @keyframes aitoShadow{0%,100%{transform:scaleX(1.1);opacity:.42}50%{transform:scaleX(.82);opacity:.25}}
      @keyframes aitoCourseFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-9px)}}

      @media(max-width:1120px){
        .hero{grid-template-columns:1fr;gap:12px}.hero h1{max-width:760px}.hero .stage{min-height:690px;margin-top:0}.aito-room{inset:3% 1% 2%}.aito-vr{left:7%}.aito-green{left:5%}.aito-future{right:7%}.aito-ar{right:5%}
      }
      @media(max-width:760px){
        .hero{padding-top:68px;padding-bottom:92px}.hero h1{font-size:clamp(3.55rem,16vw,5.7rem)}.hero .stage{min-height:610px;transform:none!important}.aito-room{inset:7% -5% 4%;border-radius:30px}.aito-beam{width:86%;height:48%;left:-12%}.aito-book-base{width:300px;height:136px}.aito-book-base:before,.aito-book-base:after{height:108px}.aito-emblem{width:min(250px,58vw);top:43%}.aito-course{width:154px}.aito-course .ttl{font-size:.8rem}.aito-course .sub{display:none}.aito-vr{left:0;top:10%}.aito-future{right:0;top:9%}.aito-green{left:0;bottom:9%}.aito-ar{right:0;bottom:9%}
      }
      @media(max-width:520px){
        .hero .stage{min-height:535px}.aito-room{inset:9% -9% 5%}.aito-book-base{width:245px;height:112px}.aito-book-base:before,.aito-book-base:after{height:88px}.aito-emblem{width:min(205px,56vw);top:43%}.aito-course{width:128px}.aito-course figure{border-radius:13px;margin-bottom:6px}.aito-course .ttl{font-size:.68rem}.aito-vr{left:-1%;top:7%}.aito-future{right:-1%;top:7%}.aito-green{left:-1%;bottom:7%}.aito-ar{right:-1%;bottom:7%}.aito-caption{font-size:6.5px;letter-spacing:.22em}
      }
      @media(prefers-reduced-motion:reduce){.aito-beam,.aito-dust i,.aito-emblem,.aito-emblem:before,.aito-emblem:after,.aito-emblem img,.aito-course{animation:none!important}}
    `;
    document.head.appendChild(style);

    const copy = hero.querySelector(':scope > div:first-child');
    if (copy) {
      copy.classList.add('hero-copy');
      if (!copy.querySelector('.aito-hero-slogan')) {
        const slogan = document.createElement('div');
        slogan.className = 'aito-hero-slogan';
        slogan.textContent = '用 AI 看見更大的教育可能';
        const lead = copy.querySelector('.lead');
        if (lead) copy.insertBefore(slogan, lead);
      }
    }

    const course = (cls, file, title, sub, alt) => `
      <a class="aito-course ${cls}" href="#courses" aria-label="前往${title}課程">
        <figure><img src="${asset(file)}" alt="${alt}"></figure>
        <div class="ttl">${title}<span class="arrow">↗</span></div>
        <div class="sub">${sub}</div>
      </a>`;

    stage.innerHTML = `
      <div class="aito-room" aria-hidden="true">
        <div class="aito-room-bg"></div>
        <div class="aito-room-vignette"></div>
        <div class="aito-dust"></div>
      </div>
      <div class="aito-sunwash" aria-hidden="true"></div>
      <div class="aito-beam" aria-hidden="true"></div>
      <div class="aito-beam two" aria-hidden="true"></div>
      <div class="aito-floor-glow" aria-hidden="true"></div>
      <div class="aito-book-base" aria-hidden="true"><span class="aito-book-spine"></span></div>
      <div class="aito-emblem" aria-label="AI 教學觀察所品牌標誌">
        <img src="${asset('ai-teaching-observatory-mark.svg')}" alt="AI 教學觀察所標誌">
      </div>
      ${course('aito-vr','course-vr.jpg','VR 文化探索','沉浸式體驗 × 文化觀察','VR 文化探索課程視覺')}
      ${course('aito-future','course-future.webp','寄給未來的自己','生活經驗 × 自我敘事','寄給未來的自己課程視覺')}
      ${course('aito-green','course-green.webp','智慧綠農專題','科技 × 永續 × 在地生活','智慧綠農專題課程視覺')}
      ${course('aito-ar','course-ar.webp','AI × AR 教學','藝術 × 科技 × 虛實整合','AI 與 AR 教學課程視覺')}
      <div class="aito-caption">A MORE HUMAN TOMORROW · WITH AI</div>
    `;

    const dust = stage.querySelector('.aito-dust');
    if (dust && !reduceMotion) {
      const count = coarse ? 16 : 30;
      for (let i = 0; i < count; i++) {
        const d = document.createElement('i');
        d.style.left = `${8 + Math.random() * 76}%`;
        d.style.top = `${24 + Math.random() * 58}%`;
        d.style.setProperty('--dur', `${7 + Math.random() * 7}s`);
        d.style.setProperty('--delay', `${-Math.random() * 10}s`);
        d.style.setProperty('--drift', `${-18 + Math.random() * 42}px`);
        const size = 1.2 + Math.random() * 2.4;
        d.style.width = `${size}px`;
        d.style.height = `${size}px`;
        dust.appendChild(d);
      }
    }

    const navMark = document.querySelector('.brand .mark');
    if (navMark) navMark.innerHTML = `<img src="${asset('ai-teaching-observatory-mark.svg')}" alt="">`;

    if (!reduceMotion && !coarse) {
      const layers = [...stage.querySelectorAll('.aito-course')];
      const emblem = stage.querySelector('.aito-emblem');
      stage.addEventListener('pointermove', (e) => {
        const r = stage.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - .5;
        const y = (e.clientY - r.top) / r.height - .5;
        layers.forEach((el, i) => {
          const depth = [15, 11, 9, 13][i] || 10;
          el.style.translate = `${x * depth}px ${y * depth}px`;
        });
        if (emblem) emblem.style.transform = `perspective(900px) rotateY(${x * 2.2}deg) rotateX(${-y * 1.6}deg)`;
      });
      stage.addEventListener('pointerleave', () => {
        layers.forEach((el) => { el.style.translate = ''; });
        if (emblem) emblem.style.transform = '';
      });
    }
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount, {once:true});
  else mount();
})();
