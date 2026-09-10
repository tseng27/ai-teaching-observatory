/* AI 教學觀察所｜Website V2 information architecture + speaking section */
(() => {
  const ready = (fn) => {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn, { once: true });
    else fn();
  };

  ready(() => {
    const style = document.createElement('style');
    style.textContent = `
      /* V2 information architecture */
      .menu{gap:4px}.menu a{font-size:.92rem;padding:10px 9px;white-space:nowrap}
      @media(max-width:1180px){.menu a{font-size:.86rem;padding:9px 7px}.nav{gap:12px}.cta{padding:10px 15px}}

      /* Speaking & collaboration */
      #speaking{position:relative;overflow:hidden;background:
        radial-gradient(circle at 82% 18%,rgba(139,160,131,.24),transparent 26%),
        radial-gradient(circle at 14% 86%,rgba(216,181,104,.20),transparent 28%),
        linear-gradient(180deg,rgba(255,253,248,.78),rgba(244,239,224,.94));
        border-top:1px solid var(--line)}
      #speaking:before{content:"";position:absolute;width:460px;height:460px;border-radius:50%;right:-210px;top:-230px;border:1px solid rgba(70,90,70,.12);box-shadow:0 0 0 46px rgba(70,90,70,.035),0 0 0 92px rgba(70,90,70,.02)}
      .speaking-intro{display:grid;grid-template-columns:.85fr 1.15fr;gap:52px;align-items:end;margin-bottom:34px}
      .speaking-intro h2{font-size:clamp(2.35rem,4.4vw,4.5rem);line-height:1.05;margin:8px 0 0;letter-spacing:-.035em}
      .speaking-intro .leadcopy{max-width:650px;color:var(--muted);font-size:1.05rem;margin:0}
      .speaking-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
      .speaking-card{position:relative;min-height:270px;padding:30px;border-radius:28px;background:rgba(255,254,249,.82);border:1px solid rgba(143,101,35,.15);box-shadow:0 18px 48px rgba(72,48,18,.07);overflow:hidden;transition:.3s ease}
      .speaking-card:hover{transform:translateY(-5px);box-shadow:0 26px 64px rgba(72,48,18,.11)}
      .speaking-card:after{content:"";position:absolute;width:130px;height:130px;border-radius:50%;right:-45px;bottom:-52px;background:radial-gradient(circle,rgba(139,160,131,.23),transparent 68%)}
      .speaking-no{font:700 .76rem/1.2 Georgia,serif;letter-spacing:.15em;color:#9b7535}
      .speaking-icon{width:52px;height:52px;border-radius:16px;display:grid;place-items:center;margin:28px 0 20px;background:linear-gradient(145deg,#eef2e9,#d9c79d);font-size:25px;border:1px solid rgba(91,112,83,.12)}
      .speaking-card h3{font-family:"Noto Serif TC","PMingLiU",serif;font-size:1.45rem;margin:0 0 10px;color:#344239}
      .speaking-card p{margin:0;color:var(--muted);font-size:.94rem}
      .speaking-formats{display:flex;gap:9px;flex-wrap:wrap;margin:28px 0 0}
      .speaking-formats span{padding:7px 11px;border-radius:999px;border:1px solid rgba(70,90,70,.18);background:rgba(255,255,255,.56);color:#536553;font-size:.8rem;font-weight:700}
      .speaking-cta{margin-top:26px;border-radius:30px;padding:30px 34px;background:linear-gradient(135deg,#35473d,#536754);color:#fff;display:grid;grid-template-columns:1fr auto;gap:26px;align-items:center;position:relative;overflow:hidden}
      .speaking-cta:before{content:"";position:absolute;inset:auto -70px -100px auto;width:260px;height:260px;border-radius:50%;background:radial-gradient(circle,rgba(238,213,159,.27),transparent 68%)}
      .speaking-cta small{display:block;color:#d9e1d7;letter-spacing:.14em;font-weight:800;margin-bottom:6px}.speaking-cta strong{font-family:"Noto Serif TC","PMingLiU",serif;font-size:clamp(1.35rem,2vw,1.9rem);font-weight:700}.speaking-actions{display:flex;gap:10px;flex-wrap:wrap;justify-content:flex-end;position:relative;z-index:1}
      .speaking-actions a{display:inline-flex;align-items:center;justify-content:center;padding:12px 18px;border-radius:999px;font-weight:800;transition:.25s}
      .speaking-actions .primary{background:#f0d69d;color:#334238}.speaking-actions .primary:hover{transform:translateY(-2px);background:#f7e4b8}.speaking-actions .secondary{border:1px solid rgba(255,255,255,.34);color:#fff}.speaking-actions .secondary:hover{background:rgba(255,255,255,.08)}
      @media(max-width:900px){.speaking-intro{grid-template-columns:1fr;gap:18px}.speaking-grid{grid-template-columns:1fr}.speaking-card{min-height:auto}.speaking-cta{grid-template-columns:1fr}.speaking-actions{justify-content:flex-start}}
    `;
    document.head.appendChild(style);

    const nav = document.querySelector('.menu');
    if (nav) {
      nav.innerHTML = `
        <a href="#observations">教學觀察</a>
        <a href="#courses">課程實驗</a>
        <a href="#tools">教學資源</a>
        <a href="#works">創作實驗室</a>
        <a href="#speaking">講座邀約</a>
        <a href="#about">關於觀察所</a>`;
    }

    const topCta = document.querySelector('header .cta');
    if (topCta) {
      topCta.textContent = '合作邀約';
      topCta.setAttribute('href', '#speaking');
    }

    const courseEyebrow = document.querySelector('#courses .eyebrow');
    if (courseEyebrow) courseEyebrow.textContent = 'COURSE EXPERIMENTS / 課程實驗';

    const toolsEyebrow = document.querySelector('#tools .eyebrow');
    if (toolsEyebrow) toolsEyebrow.textContent = 'TEACHING RESOURCES / 教學資源';

    const worksEyebrow = document.querySelector('#works .eyebrow');
    if (worksEyebrow) worksEyebrow.textContent = 'CREATIVE LAB / 創作實驗室';

    if (!document.getElementById('speaking')) {
      const section = document.createElement('section');
      section.id = 'speaking';
      section.innerHTML = `
        <div class="wrap">
          <div class="speaking-intro reveal">
            <div>
              <div class="eyebrow">SPEAKING & WORKSHOPS</div>
              <h2 class="serif">講座邀約<br>與合作</h2>
            </div>
            <p class="leadcopy">從第一線課堂實踐出發，分享藝術教育如何與生成式 AI、數位媒體與創作相遇。內容可依學校、教師社群、教育機構與藝文場域需求調整，讓分享不只是工具介紹，而是一場關於學習、創造與未來教育的對話。</p>
          </div>

          <div class="speaking-grid">
            <article class="speaking-card reveal">
              <div class="speaking-no">01 / EDUCATION</div>
              <div class="speaking-icon">✦</div>
              <h3>AI × 藝術教育</h3>
              <p>從高中美術教學現場出發，談生成式 AI 如何進入課程、改變觀看與創作，也重新思考 AI 時代「學習」與「手作」的意義。</p>
            </article>
            <article class="speaking-card reveal">
              <div class="speaking-no">02 / CREATION</div>
              <div class="speaking-icon">◉</div>
              <h3>AI × 創作實踐</h3>
              <p>以 AI 圖像、影像、音樂與跨媒體創作案例，分享從概念、視覺語言到生成流程的創作方法，連結藝術家觀點與新媒體實踐。</p>
            </article>
            <article class="speaking-card reveal">
              <div class="speaking-no">03 / FUTURE LEARNING</div>
              <div class="speaking-icon">⌁</div>
              <h3>數位教學 × 未來學習</h3>
              <p>結合 AR、VR、AI 與多媒體課程經驗，探討科技如何回到學生本位，支持觀察、表達、專題學習與真實情境中的創造力。</p>
            </article>
          </div>

          <div class="speaking-formats reveal" aria-label="合作形式">
            <span>專題講座</span><span>教師研習</span><span>實作工作坊</span><span>課程合作</span><span>策展與創作交流</span>
          </div>

          <div class="speaking-cta reveal">
            <div><small>INVITATION & COLLABORATION</small><strong>如果你正在規劃一場關於 AI、藝術與教育的對話，歡迎與我聯繫。</strong></div>
            <div class="speaking-actions">
              <a class="primary" href="https://www.facebook.com/educationforfuture/" target="_blank" rel="noopener">提出講座邀約 →</a>
              <a class="secondary" href="#about">了解觀察所</a>
            </div>
          </div>
        </div>`;

      const about = document.getElementById('about');
      if (about) about.insertAdjacentElement('afterend', section);
      else document.querySelector('main')?.appendChild(section);

      // Existing reveal observer was created before this section existed, so reveal it safely.
      const revealNodes = section.querySelectorAll('.reveal');
      if ('IntersectionObserver' in window) {
        const localObserver = new IntersectionObserver((entries) => entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('show');
        }), { threshold: .08 });
        revealNodes.forEach((node) => localObserver.observe(node));
      } else revealNodes.forEach((node) => node.classList.add('show'));
    }
  });
})();
