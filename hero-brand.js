/* AI 教學觀察所｜Premium photographic hero + real visual assets */
(() => {
  const V = '20260906-visual2';
  const asset = (name) => `assets/${name}?v=${V}`;

  const mount = () => {
    const hero = document.querySelector('.hero');
    const stage = document.querySelector('.hero .stage');
    if (!hero || !stage || stage.dataset.visualRebuilt === '1') return;
    stage.dataset.visualRebuilt = '1';

    const style = document.createElement('style');
    style.id = 'aito-premium-hero-style';
    style.textContent = `
      /* --- HERO: image-led art direction --- */
      .hero{grid-template-columns:.92fr 1.08fr;gap:34px;min-height:790px;padding-top:86px;padding-bottom:112px}
      .hero-copy{position:relative;z-index:5}
      .hero .eyebrow{letter-spacing:.28em}
      .hero h1{font-size:clamp(4.4rem,7.2vw,7.7rem);line-height:.88;max-width:650px}
      .hero h1 span{font-size:.22em;margin-top:25px;letter-spacing:.10em}
      .aito-hero-slogan{display:flex;align-items:center;gap:14px;margin:28px 0 6px;font:500 clamp(1.15rem,1.7vw,1.55rem)/1.55 "Noto Serif TC","PMingLiU",serif;color:#9a6c24;letter-spacing:.06em}
      .aito-hero-slogan:after{content:"";height:1px;width:72px;background:linear-gradient(90deg,#ad7927,transparent)}

      .stage{position:relative;min-height:650px;isolation:isolate;overflow:visible;display:grid;place-items:center;transform-style:preserve-3d}
      .aito-scene-bg{position:absolute;inset:5% -8% 3% -7%;z-index:-5;background-image:linear-gradient(90deg,rgba(255,249,233,.82),rgba(255,248,230,.10) 30%,rgba(36,57,48,.16) 100%),url('${asset('hero-stage-bg.webp')}');background-size:cover;background-position:center;border-radius:42px;filter:saturate(.92) contrast(.94);opacity:.78;-webkit-mask-image:radial-gradient(ellipse 78% 76% at 54% 49%,#000 50%,rgba(0,0,0,.88) 68%,transparent 100%);mask-image:radial-gradient(ellipse 78% 76% at 54% 49%,#000 50%,rgba(0,0,0,.88) 68%,transparent 100%)}
      .aito-scene-wash{position:absolute;inset:-4% -12%;z-index:-4;background:radial-gradient(circle at 51% 48%,rgba(255,211,94,.36),transparent 31%),radial-gradient(circle at 78% 43%,rgba(38,62,52,.16),transparent 35%);pointer-events:none}
      .aito-ring{position:absolute;left:50%;top:49%;border:1px solid rgba(191,139,52,.31);border-radius:50%;transform:translate(-50%,-50%);pointer-events:none;box-shadow:inset 0 0 44px rgba(223,175,77,.035)}
      .aito-ring.r1{width:470px;height:470px;animation:aitoOrbit 31s linear infinite}
      .aito-ring.r2{width:370px;height:370px;border-style:dashed;opacity:.65;animation:aitoOrbitBack 24s linear infinite}
      .aito-ring.r3{width:555px;height:555px;opacity:.28}
      .aito-ring:before,.aito-ring:after{content:"";position:absolute;width:8px;height:8px;border-radius:50%;background:#edc764;box-shadow:0 0 18px #e9b94a,0 0 36px rgba(237,199,100,.55)}
      .aito-ring:before{left:11%;top:20%}.aito-ring:after{right:14%;bottom:18%}

      .aito-emblem{position:relative;z-index:5;width:min(390px,56vw);aspect-ratio:560/440;display:grid;place-items:center;animation:aitoFloat 6s ease-in-out infinite;filter:drop-shadow(0 28px 33px rgba(81,49,7,.28));transform-style:preserve-3d}
      .aito-emblem:before{content:"";position:absolute;inset:6%;border-radius:50%;background:radial-gradient(circle,rgba(255,224,131,.58),rgba(221,166,57,.14) 46%,transparent 72%);filter:blur(17px);z-index:-1;animation:aitoAura 4.8s ease-in-out infinite}
      .aito-emblem img{width:100%;height:100%;object-fit:contain;display:block;filter:saturate(1.1) contrast(1.04) drop-shadow(0 10px 12px rgba(95,54,5,.16))}

      .aito-project{position:absolute;z-index:8;width:218px;padding:9px 9px 11px;background:rgba(255,252,242,.91);border:1px solid rgba(170,120,43,.30);box-shadow:0 22px 48px rgba(67,43,14,.16);backdrop-filter:blur(13px);border-radius:8px;transition:transform .32s cubic-bezier(.2,.8,.2,1),box-shadow .32s,background .32s;overflow:hidden;color:#3d3022}
      .aito-project:hover{background:rgba(255,255,250,.985);box-shadow:0 32px 70px rgba(67,43,14,.22);z-index:12}
      .aito-project figure{height:112px;margin:0 0 10px;border-radius:5px;overflow:hidden;background:#d8d0bc;position:relative}
      .aito-project figure:after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,transparent 52%,rgba(35,50,43,.10))}
      .aito-project img{width:100%;height:100%;object-fit:cover;display:block;filter:saturate(.92) contrast(.97)}
      .aito-project .ttl{display:flex;align-items:center;justify-content:space-between;gap:8px;font:700 1rem/1.4 "Noto Serif TC","PMingLiU",serif}
      .aito-project .sub{font-size:.72rem;color:#8d7d66;margin-top:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
      .aito-project .arr{width:28px;height:28px;border-radius:50%;display:grid;place-items:center;background:#f4e5bd;color:#855a1b;flex:0 0 auto;transition:.25s}
      .aito-project:hover .arr{background:#a87322;color:#fff;transform:translate(2px,-2px)}
      .aito-vr{left:-4%;top:10%;transform:rotate(-3.4deg)}
      .aito-future{right:-4%;top:7%;transform:rotate(2.6deg)}
      .aito-green{left:-7%;bottom:9%;transform:rotate(2.1deg)}
      .aito-ar{right:-7%;bottom:8%;transform:rotate(-2.4deg)}
      .aito-vr:hover,.aito-future:hover,.aito-green:hover,.aito-ar:hover{transform:translateY(-8px) rotate(0deg) scale(1.02)}

      .aito-node{position:absolute;z-index:7;width:53px;height:53px;border-radius:50%;display:grid;place-items:center;background:rgba(255,250,236,.9);border:1px solid rgba(187,135,51,.38);box-shadow:0 12px 27px rgba(94,61,16,.13),0 0 26px rgba(237,197,104,.18);font-size:22px;backdrop-filter:blur(10px)}
      .aito-node.n1{top:8%;left:43%}.aito-node.n2{right:14%;top:38%}.aito-node.n3{left:14%;bottom:30%}
      .aito-stage-caption{position:absolute;left:50%;bottom:1%;transform:translateX(-50%);text-align:center;font:600 9px/1.65 Georgia,serif;letter-spacing:.33em;color:rgba(105,72,25,.60);white-space:nowrap}

      /* image replacements below hero */
      #observations .cover>img,.work>img{width:100%;height:100%;display:block;object-fit:cover}
      #observations .cover>img{filter:saturate(.90) contrast(.98)}
      #observations .cover{background:#d7ccb8}
      #works .work>img{filter:saturate(.88) contrast(.98);transition:transform .7s cubic-bezier(.2,.8,.2,1)}
      #works .work:hover>img{transform:scale(1.035)}
      #works .work:first-child>img{object-position:center}

      .brand .mark{overflow:hidden;padding:4px;background:radial-gradient(circle at 40% 35%,#fff4cb,#d6aa4d 58%,#7f5719);border:1px solid rgba(157,108,34,.45)}
      .brand .mark img{width:100%;height:100%;object-fit:contain;transform:scale(.96);display:block}
      @keyframes aitoFloat{0%,100%{transform:translateY(0) rotate(-.35deg)}50%{transform:translateY(-11px) rotate(.35deg)}}
      @keyframes aitoAura{0%,100%{transform:scale(.95);opacity:.80}50%{transform:scale(1.07);opacity:1}}
      @keyframes aitoOrbit{to{transform:translate(-50%,-50%) rotate(360deg)}}
      @keyframes aitoOrbitBack{to{transform:translate(-50%,-50%) rotate(-360deg)}}

      @media(max-width:1120px){
        .hero{grid-template-columns:1fr;gap:14px}.hero h1{max-width:760px}.stage{min-height:670px;margin-top:4px}.aito-vr{left:5%}.aito-green{left:3%}.aito-future{right:5%}.aito-ar{right:3%}
      }
      @media(max-width:760px){
        .hero{padding-top:66px}.hero h1{font-size:clamp(3.6rem,16vw,6rem)}.stage{min-height:610px;transform:none!important}.aito-scene-bg{inset:8% -8%;opacity:.62}.aito-emblem{width:min(335px,72vw)}.aito-ring.r1{width:410px;height:410px}.aito-ring.r2{width:315px;height:315px}.aito-ring.r3{width:470px;height:470px}.aito-project{width:166px}.aito-project figure{height:82px}.aito-project .ttl{font-size:.83rem}.aito-project .sub{display:none}.aito-vr{left:0;top:11%}.aito-future{right:0;top:9%}.aito-green{left:0;bottom:10%}.aito-ar{right:0;bottom:9%}.aito-node{width:43px;height:43px;font-size:17px}
      }
      @media(max-width:520px){
        .stage{min-height:535px}.aito-scene-bg{inset:11% -16%}.aito-ring.r3{display:none}.aito-ring.r1{width:330px;height:330px}.aito-ring.r2{width:255px;height:255px}.aito-emblem{width:min(270px,72vw)}.aito-project{width:139px;padding:6px}.aito-project figure{height:68px;margin-bottom:6px}.aito-project .ttl{font-size:.72rem}.aito-project .arr{width:22px;height:22px}.aito-node{display:none}.aito-vr{left:-2%;top:8%}.aito-future{right:-2%;top:8%}.aito-green{left:-2%;bottom:8%}.aito-ar{right:-2%;bottom:8%}.aito-stage-caption{font-size:7px;letter-spacing:.22em}
      }
    `;
    document.head.appendChild(style);

    /* Refine copy without turning the hero into a baked image. */
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

    /* Completely rebuild the visual stage: no more CSS placeholder book or SVG card art. */
    stage.innerHTML = `
      <div class="aito-scene-bg" aria-hidden="true"></div>
      <div class="aito-scene-wash" aria-hidden="true"></div>
      <div class="aito-ring r3" aria-hidden="true"></div>
      <div class="aito-ring r1" aria-hidden="true"></div>
      <div class="aito-ring r2" aria-hidden="true"></div>

      <div class="aito-emblem" aria-label="AI 教學觀察所品牌識別">
        <img src="${asset('ai-teaching-observatory-mark.svg')}" alt="開放書本、燈泡與放大鏡構成的 AI 教學觀察所金色標誌">
      </div>

      <a class="aito-project aito-vr" href="#courses" aria-label="前往 VR 文化探索課程">
        <figure><img src="${asset('course-vr.jpg')}" alt="VR 文化探索視覺"></figure>
        <div class="ttl">VR 文化探索 <span class="arr">→</span></div><div class="sub">沉浸式體驗 × 文化觀察</div>
      </a>
      <a class="aito-project aito-future" href="#courses" aria-label="前往寄給未來的自己課程">
        <figure><img src="${asset('course-future.webp')}" alt="寄給未來的自己課程視覺"></figure>
        <div class="ttl">寄給未來的自己 <span class="arr">→</span></div><div class="sub">生活經驗 × 自我敘事</div>
      </a>
      <a class="aito-project aito-green" href="#courses" aria-label="前往智慧綠農專題">
        <figure><img src="${asset('course-green.webp')}" alt="智慧綠農專題視覺"></figure>
        <div class="ttl">智慧綠農專題 <span class="arr">→</span></div><div class="sub">科技 × 永續 × 在地生活</div>
      </a>
      <a class="aito-project aito-ar" href="#courses" aria-label="前往 AI 與 AR 教學課程">
        <figure><img src="${asset('course-ar.webp')}" alt="AI 與 AR 教學視覺"></figure>
        <div class="ttl">AI × AR 教學 <span class="arr">→</span></div><div class="sub">藝術 × 科技 × 虛實整合</div>
      </a>
      <span class="aito-node n1" aria-hidden="true">▤</span>
      <span class="aito-node n2" aria-hidden="true">✦</span>
      <span class="aito-node n3" aria-hidden="true">◌</span>
      <div class="aito-stage-caption">A MORE HUMAN TOMORROW<br>WITH AI</div>
    `;

    /* Use real generated photography/collage assets in the observation section. */
    const observationImages = [
      ['course-future.webp','寄給未來的自己教學視覺'],
      ['course-ar.webp','AI 與 AR 融合教學視覺'],
      ['course-vr.jpg','VR 文化探索教學視覺']
    ];
    document.querySelectorAll('#observations .card .cover').forEach((cover, i) => {
      const item = observationImages[i];
      if (!item) return;
      const tag = cover.querySelector('.tag');
      const tagHtml = tag ? tag.outerHTML : '';
      cover.innerHTML = `${tagHtml}<img src="${asset(item[0])}" alt="${item[1]}">`;
    });

    /* Replace the gallery's schematic SVGs with the same image language. */
    const workImages = [
      ['ai-teaching-observatory-mark.svg','AI 藝術與教學品牌視覺'],
      ['course-future.webp','明信片與自我敘事'],
      ['course-vr.jpg','VR 文化探索'],
      ['course-green.webp','智慧綠農視覺設計'],
      ['course-ar.webp','AR 動態作品']
    ];
    document.querySelectorAll('#works .work').forEach((work, i) => {
      const item = workImages[i];
      if (!item) return;
      const oldVisual = work.querySelector('svg, img');
      const img = document.createElement('img');
      img.src = asset(item[0]);
      img.alt = item[1];
      if (oldVisual) oldVisual.replaceWith(img); else work.prepend(img);
    });

    /* Keep the top-left brand crisp and consistent. */
    const navMark = document.querySelector('.brand .mark');
    if (navMark) navMark.innerHTML = `<img src="${asset('ai-teaching-observatory-mark.svg')}" alt="">`;

    /* Gentle internal parallax on the image-led hero. */
    if (!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches && !window.matchMedia?.('(pointer: coarse)').matches) {
      stage.addEventListener('pointermove', (e) => {
        const r = stage.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - .5;
        const y = (e.clientY - r.top) / r.height - .5;
        const emblem = stage.querySelector('.aito-emblem');
        if (emblem) emblem.style.transform = `translate3d(${x*9}px,${y*7-3}px,24px) rotateY(${x*2.3}deg) rotateX(${-y*1.7}deg)`;
      });
      stage.addEventListener('pointerleave', () => {
        const emblem = stage.querySelector('.aito-emblem');
        if (emblem) emblem.style.transform = '';
      });
    }
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount); else mount();
})();
