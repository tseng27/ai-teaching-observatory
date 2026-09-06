/* AI 教學觀察所｜Facebook + YouTube social hub */
(() => {
  const mount = () => {
    if (document.getElementById('social-network')) return;

    const style = document.createElement('style');
    style.textContent = `
      #social-network{position:relative;overflow:hidden;background:linear-gradient(145deg,#172922 0%,#243b31 52%,#172b24 100%);color:#f6efdf;padding:112px 0}
      #social-network:before{content:"SOCIAL";position:absolute;right:-1vw;top:8px;font:400 clamp(8rem,17vw,17rem)/1 Georgia,serif;color:rgba(255,255,255,.026);letter-spacing:-.04em;pointer-events:none}
      #social-network:after{content:"";position:absolute;left:-12%;bottom:-32%;width:50vw;height:50vw;border-radius:50%;border:1px solid rgba(231,199,132,.08);box-shadow:0 0 0 70px rgba(231,199,132,.016),0 0 0 140px rgba(231,199,132,.01);pointer-events:none}
      .social-wrap{width:min(1280px,92%);margin:auto;position:relative;z-index:1}
      .social-head{display:grid;grid-template-columns:1.08fr .92fr;gap:52px;align-items:end;margin-bottom:46px;border-bottom:1px solid rgba(242,220,174,.18);padding-bottom:34px}
      .social-kicker{font:700 11px/1.4 system-ui,sans-serif;letter-spacing:.32em;color:#d7bb7c;margin-bottom:12px}
      .social-head h2{font-family:"Noto Serif TC","PMingLiU",serif;font-size:clamp(2.8rem,5vw,4.9rem);line-height:1.06;margin:0;letter-spacing:-.045em;font-weight:600}
      .social-head p{margin:0;color:#c7cfc8;font-family:"Noto Serif TC","PMingLiU",serif;line-height:2;font-size:1rem;max-width:540px}
      .social-platform{margin-top:40px}
      .platform-title{display:flex;justify-content:space-between;gap:20px;align-items:end;margin-bottom:16px}
      .platform-title h3{margin:0;font:600 1.32rem/1.4 "Noto Serif TC","PMingLiU",serif;color:#fff5df;letter-spacing:.04em}
      .platform-title span{font:600 10px/1 system-ui,sans-serif;letter-spacing:.22em;color:#aeb9b1;text-transform:uppercase}
      .social-grid{display:grid;border-top:1px solid rgba(242,220,174,.18);border-bottom:1px solid rgba(242,220,174,.18)}
      .social-grid.facebook{grid-template-columns:repeat(4,1fr)}
      .social-grid.youtube{grid-template-columns:repeat(3,1fr)}
      .social-card{position:relative;min-height:310px;padding:30px 26px 30px;border-right:1px solid rgba(242,220,174,.15);overflow:hidden;transition:background .35s ease,transform .35s ease;isolation:isolate}
      .social-card:last-child{border-right:0}
      .social-card:before{content:"";position:absolute;inset:0;background:radial-gradient(circle at 78% 18%,rgba(226,189,109,.16),transparent 35%);opacity:0;transition:.35s;z-index:-1}
      .social-card.youtube-card:before{background:radial-gradient(circle at 78% 18%,rgba(211,79,67,.15),transparent 36%)}
      .social-card:hover{background:rgba(255,255,255,.055);transform:translateY(-7px)}
      .social-card:hover:before{opacity:1}
      .social-index{font:500 11px/1 Georgia,serif;letter-spacing:.18em;color:#bca36d;margin-bottom:46px}
      .social-icon{width:46px;height:46px;border:1px solid rgba(236,208,147,.4);border-radius:50%;display:grid;place-items:center;font:600 21px/1 Georgia,serif;color:#f4dca5;margin-bottom:22px;background:rgba(255,255,255,.025)}
      .youtube-card .social-icon{border-color:rgba(226,133,121,.42);color:#ffd9d1;font-family:Arial,sans-serif;font-size:16px}
      .social-card h3{font-family:"Noto Serif TC","PMingLiU",serif;font-size:1.34rem;line-height:1.35;margin:0 0 10px;color:#fff6e4;font-weight:600}
      .social-handle{font:500 10.5px/1.45 system-ui,sans-serif;letter-spacing:.06em;color:#d2b875;margin-bottom:17px;word-break:break-all}
      .youtube-card .social-handle{color:#d8a69d}
      .social-card p{margin:0;color:#c2ccc5;font-size:.94rem;line-height:1.9;padding-right:28px}
      .social-card p strong{color:#f2dfad;font-weight:700}
      .youtube-card p strong{color:#f1c2b8}
      .social-arrow{position:absolute;right:22px;bottom:22px;width:38px;height:38px;border:1px solid rgba(235,205,141,.25);display:grid;place-items:center;border-radius:50%;color:#e4c982;transition:.3s}
      .social-card:hover .social-arrow{background:#d5b46f;color:#1f342b;border-color:#d5b46f;transform:translate(3px,-3px)}
      .youtube-card:hover .social-arrow{background:#d66d5e;border-color:#d66d5e;color:#fff}
      .social-note{margin-top:28px;display:flex;justify-content:space-between;gap:24px;color:#9eaaa2;font-size:.8rem;letter-spacing:.04em}
      .social-footer-links{display:flex;gap:12px;flex-wrap:wrap;margin-top:12px;max-width:720px}
      .social-footer-links a{font-size:.76rem;color:#cfc2a8;border-bottom:1px solid rgba(207,194,168,.28);padding-bottom:2px}
      .social-footer-links a:hover{color:#f0dba5;border-color:#f0dba5}
      @media(max-width:1000px){.social-head{grid-template-columns:1fr}.social-grid.facebook,.social-grid.youtube{grid-template-columns:1fr 1fr}.social-card:nth-child(even){border-right:0}.social-grid.facebook .social-card:nth-child(-n+2),.social-grid.youtube .social-card:nth-child(-n+2){border-bottom:1px solid rgba(242,220,174,.15)}.social-grid.youtube .social-card:last-child{grid-column:1/-1;border-right:0}}
      @media(max-width:620px){#social-network{padding:84px 0}.social-grid.facebook,.social-grid.youtube{grid-template-columns:1fr}.social-card,.social-grid.youtube .social-card:last-child{grid-column:auto;border-right:0;border-bottom:1px solid rgba(242,220,174,.15);min-height:250px}.social-card:last-child{border-bottom:0}.social-index{margin-bottom:28px}.social-note,.platform-title{flex-direction:column;align-items:flex-start}}
    `;
    document.head.appendChild(style);

    const facebookLinks = [
      {label:'AI 藝術創新實驗室',handle:'facebook.com/tsengkuocheng',url:'https://www.facebook.com/tsengkuocheng',desc:'<strong>我的 AI 藝術創作</strong>｜記錄生成式 AI 藝術、數位創作、作品實驗與創作思考。'},
      {label:'ELARA 女子團體',handle:'profile id · 61584961148067',url:'https://www.facebook.com/profile.php?id=61584961148067',desc:'<strong>我的虛擬女子偶像團體</strong>｜記錄 ELARA 的角色形象、視覺企劃、音樂與虛擬偶像創作。'},
      {label:'藍曬美學',handle:'facebook.com/cyanotype2017',url:'https://www.facebook.com/cyanotype2017/',desc:'<strong>我的藍曬資料與分享</strong>｜整理 Cyanotype 藍曬技法、創作案例、美學研究與相關資料。'},
      {label:'K&J 的美好日記',handle:'facebook.com/kandj.wanderlife',url:'https://www.facebook.com/kandj.wanderlife/',desc:'<strong>記錄我的生活旅遊</strong>｜保存旅行、風景、日常生活與 K&J 一起走過的美好片段。'}
    ];

    const youtubeLinks = [
      {label:'AI 教學觀察所｜YouTube',handle:'youtube.com/@AI教學觀察所',url:'https://www.youtube.com/@AI%E6%95%99%E5%AD%B8%E8%A7%80%E5%AF%9F%E6%89%80',desc:'<strong>我的 AI 教學紀錄頻道</strong>｜整理課堂實踐、AI 融入教學、教學觀察與數位學習案例。'},
      {label:'iMusicLab｜AI 音樂創作',handle:'youtube.com/@iMusicLab-f2k',url:'https://www.youtube.com/@iMusicLab-f2k',desc:'<strong>我的 AI 音樂創作頻道</strong>｜分享 AI 音樂、歌曲實驗、聲音創作與相關影音作品。'},
      {label:'AI 藝術創新實驗室｜YouTube',handle:'youtube.com/@AI藝術創新實驗室-t8d',url:'https://www.youtube.com/@AI%E8%97%9D%E8%A1%93%E5%89%B5%E6%96%B0%E5%AF%A6%E9%A9%97%E5%AE%A4-t8d/videos',desc:'<strong>我的 AI 藝術創作頻道</strong>｜收錄生成式 AI 影像、藝術創作、動畫實驗與作品展示。'}
    ];

    const cards = (items,platform) => items.map((item,i)=>`<a class="social-card ${platform==='YOUTUBE'?'youtube-card':''}" href="${item.url}" target="_blank" rel="noopener noreferrer" aria-label="前往 ${item.label}"><div class="social-index">0${i+1} / ${platform}</div><div class="social-icon">${platform==='YOUTUBE'?'▶':'f'}</div><h3>${item.label}</h3><div class="social-handle">${item.handle}</div><p>${item.desc}</p><span class="social-arrow">↗</span></a>`).join('');

    const section = document.createElement('section');
    section.id = 'social-network';
    section.innerHTML = `<div class="social-wrap reveal"><div class="social-head"><div><div class="social-kicker">SOCIAL NETWORK / 社群與頻道</div><h2>從教學、藝術創作，<br>走向音樂、旅行與生活。</h2></div><p>這裡整理我的 Facebook 與 YouTube 創作入口。不同平台承載不同面向：AI 教學、AI 藝術、虛擬偶像、藍曬、音樂創作，以及生活旅行紀錄。</p></div><div class="social-platform"><div class="platform-title"><h3>Facebook｜四個創作與生活面向</h3><span>FACEBOOK NETWORK</span></div><div class="social-grid facebook">${cards(facebookLinks,'FACEBOOK')}</div></div><div class="social-platform"><div class="platform-title"><h3>YouTube｜三個影音創作頻道</h3><span>YOUTUBE CHANNELS</span></div><div class="social-grid youtube">${cards(youtubeLinks,'YOUTUBE')}</div></div><div class="social-note"><span>AI Teaching Observatory · Social & Media Hub</span><span>4 個 Facebook ＋ 3 個 YouTube 頻道</span></div></div>`;

    const works = document.getElementById('works');
    if (works) works.before(section); else document.querySelector('main')?.appendChild(section);

    const menu = document.querySelector('.menu');
    if (menu && !menu.querySelector('a[href="#social-network"]')) {
      const a = document.createElement('a'); a.href = '#social-network'; a.textContent = '社群連結';
      const about = menu.querySelector('a[href="#about"]'); if (about) menu.insertBefore(a, about); else menu.appendChild(a);
    }

    const allLinks = [...facebookLinks, ...youtubeLinks];
    const foot = document.querySelector('.foot');
    if (foot) {
      const nav = document.createElement('div'); nav.className = 'social-footer-links';
      nav.innerHTML = allLinks.map(item=>`<a href="${item.url}" target="_blank" rel="noopener noreferrer">${item.label}</a>`).join('');
      const left = foot.firstElementChild; if (left) left.appendChild(nav);
    }

    if (window.IntersectionObserver) {
      const io = new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('show')}),{threshold:.08});
      section.querySelectorAll('.reveal').forEach(el=>io.observe(el));
    } else section.querySelectorAll('.reveal').forEach(el=>el.classList.add('show'));
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount); else mount();
})();
