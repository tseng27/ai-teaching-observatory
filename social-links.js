/* AI 教學觀察所｜Facebook social network links */
(() => {
  const mount = () => {
    if (document.getElementById('social-network')) return;

    const style = document.createElement('style');
    style.textContent = `
      #social-network{position:relative;overflow:hidden;background:linear-gradient(145deg,#192a23 0%,#263c32 54%,#192d25 100%);color:#f6efdf;padding:110px 0}
      #social-network:before{content:"SOCIAL";position:absolute;right:-1vw;top:8px;font:400 clamp(8rem,17vw,17rem)/1 Georgia,serif;color:rgba(255,255,255,.025);letter-spacing:-.04em;pointer-events:none}
      #social-network:after{content:"";position:absolute;left:-12%;bottom:-42%;width:52vw;height:52vw;border-radius:50%;border:1px solid rgba(231,199,132,.09);box-shadow:0 0 0 70px rgba(231,199,132,.018),0 0 0 140px rgba(231,199,132,.012);pointer-events:none}
      .social-wrap{width:min(1280px,92%);margin:auto;position:relative;z-index:1}
      .social-head{display:grid;grid-template-columns:1.1fr .9fr;gap:50px;align-items:end;margin-bottom:52px;border-bottom:1px solid rgba(242,220,174,.18);padding-bottom:34px}
      .social-kicker{font:700 11px/1.4 system-ui,sans-serif;letter-spacing:.32em;color:#d7bb7c;margin-bottom:12px}
      .social-head h2{font-family:"Noto Serif TC","PMingLiU",serif;font-size:clamp(2.8rem,5vw,4.9rem);line-height:1.06;margin:0;letter-spacing:-.045em;font-weight:600}
      .social-head p{margin:0;color:#c7cfc8;font-family:"Noto Serif TC","PMingLiU",serif;line-height:2;font-size:1rem;max-width:520px}
      .social-grid{display:grid;grid-template-columns:repeat(4,1fr);border-top:1px solid rgba(242,220,174,.18);border-bottom:1px solid rgba(242,220,174,.18)}
      .social-card{position:relative;min-height:300px;padding:32px 26px 30px;border-right:1px solid rgba(242,220,174,.15);overflow:hidden;transition:background .35s ease,transform .35s ease,color .35s ease;isolation:isolate}
      .social-card:last-child{border-right:0}
      .social-card:before{content:"";position:absolute;inset:0;background:radial-gradient(circle at 78% 18%,rgba(226,189,109,.15),transparent 35%);opacity:0;transition:.35s;z-index:-1}
      .social-card:hover{background:rgba(255,255,255,.055);transform:translateY(-7px)}
      .social-card:hover:before{opacity:1}
      .social-index{font:500 11px/1 Georgia,serif;letter-spacing:.18em;color:#bca36d;margin-bottom:54px}
      .social-icon{width:44px;height:44px;border:1px solid rgba(236,208,147,.4);border-radius:50%;display:grid;place-items:center;font:600 21px/1 Georgia,serif;color:#f4dca5;margin-bottom:24px;background:rgba(255,255,255,.025)}
      .social-card h3{font-family:"Noto Serif TC","PMingLiU",serif;font-size:1.35rem;line-height:1.35;margin:0 0 11px;color:#fff6e4;font-weight:600}
      .social-handle{font:500 11px/1.4 system-ui,sans-serif;letter-spacing:.08em;color:#d2b875;margin-bottom:18px;word-break:break-all}
      .social-card p{margin:0;color:#bfc9c2;font-size:.9rem;line-height:1.8}
      .social-arrow{position:absolute;right:22px;bottom:22px;width:38px;height:38px;border:1px solid rgba(235,205,141,.25);display:grid;place-items:center;border-radius:50%;color:#e4c982;transition:.3s}
      .social-card:hover .social-arrow{background:#d5b46f;color:#1f342b;border-color:#d5b46f;transform:translate(3px,-3px)}
      .social-note{margin-top:26px;display:flex;justify-content:space-between;gap:24px;color:#9eaaa2;font-size:.8rem;letter-spacing:.04em}
      .social-footer-links{display:flex;gap:13px;flex-wrap:wrap;margin-top:10px}
      .social-footer-links a{font-size:.78rem;color:#cfc2a8;border-bottom:1px solid rgba(207,194,168,.28);padding-bottom:2px}
      .social-footer-links a:hover{color:#f0dba5;border-color:#f0dba5}
      @media(max-width:1000px){.social-grid{grid-template-columns:1fr 1fr}.social-card:nth-child(2){border-right:0}.social-card:nth-child(-n+2){border-bottom:1px solid rgba(242,220,174,.15)}.social-head{grid-template-columns:1fr}}
      @media(max-width:620px){#social-network{padding:84px 0}.social-grid{grid-template-columns:1fr}.social-card{border-right:0;border-bottom:1px solid rgba(242,220,174,.15);min-height:245px}.social-card:last-child{border-bottom:0}.social-index{margin-bottom:28px}.social-note{flex-direction:column}}
    `;
    document.head.appendChild(style);

    const links = [
      {
        label:'曾國正｜Facebook',
        handle:'facebook.com/tsengkuocheng',
        url:'https://www.facebook.com/tsengkuocheng',
        desc:'個人動態、教學分享與創作交流的 Facebook 入口。'
      },
      {
        label:'Facebook 專頁',
        handle:'profile id · 61584961148067',
        url:'https://www.facebook.com/profile.php?id=61584961148067',
        desc:'另一個 Facebook 主題專頁入口，方便從網站直接前往。'
      },
      {
        label:'Cyanotype 2017',
        handle:'facebook.com/cyanotype2017',
        url:'https://www.facebook.com/cyanotype2017/',
        desc:'Cyanotype 主題社群與相關創作內容的延伸入口。'
      },
      {
        label:'K&J Wanderlife',
        handle:'facebook.com/kandj.wanderlife',
        url:'https://www.facebook.com/kandj.wanderlife/',
        desc:'旅行、生活與影像紀錄的 Facebook 社群入口。'
      }
    ];

    const section = document.createElement('section');
    section.id = 'social-network';
    section.innerHTML = `
      <div class="social-wrap reveal">
        <div class="social-head">
          <div>
            <div class="social-kicker">FACEBOOK NETWORK / 社群連結</div>
            <h2>從教學、創作，<br>走向生活與觀看。</h2>
          </div>
          <p>這裡整理我不同面向的 Facebook 社群入口。網站作為內容的長期策展與整理，而社群則保留即時分享、交流與生活的流動。</p>
        </div>
        <div class="social-grid">
          ${links.map((item,i)=>`<a class="social-card" href="${item.url}" target="_blank" rel="noopener noreferrer" aria-label="前往 ${item.label}">
            <div class="social-index">0${i+1} / FACEBOOK</div>
            <div class="social-icon">f</div>
            <h3>${item.label}</h3>
            <div class="social-handle">${item.handle}</div>
            <p>${item.desc}</p>
            <span class="social-arrow">↗</span>
          </a>`).join('')}
        </div>
        <div class="social-note"><span>AI Teaching Observatory · Social Network</span><span>四個 Facebook 入口已整合至本站</span></div>
      </div>`;

    const works = document.getElementById('works');
    if (works) works.before(section); else document.querySelector('main')?.appendChild(section);

    const menu = document.querySelector('.menu');
    if (menu && !menu.querySelector('a[href="#social-network"]')) {
      const a = document.createElement('a');
      a.href = '#social-network';
      a.textContent = '社群連結';
      const about = menu.querySelector('a[href="#about"]');
      if (about) menu.insertBefore(a, about); else menu.appendChild(a);
    }

    const foot = document.querySelector('.foot');
    if (foot) {
      const nav = document.createElement('div');
      nav.className = 'social-footer-links';
      nav.innerHTML = links.map(item=>`<a href="${item.url}" target="_blank" rel="noopener noreferrer">${item.label}</a>`).join('');
      const left = foot.firstElementChild;
      if (left) left.appendChild(nav);
    }

    if (window.IntersectionObserver) {
      const io = new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('show')}),{threshold:.08});
      section.querySelectorAll('.reveal').forEach(el=>io.observe(el));
    } else {
      section.querySelectorAll('.reveal').forEach(el=>el.classList.add('show'));
    }
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount); else mount();
})();
