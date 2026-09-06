/* AI 教學觀察所｜p5.js ambient interaction + immersive intro */
(() => {
  const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const coarse = window.matchMedia?.('(pointer: coarse)').matches;

  function installIntro() {
    if (reduceMotion) return;
    const seen = sessionStorage.getItem('aito-intro-seen');
    if (seen) return;

    const style = document.createElement('style');
    style.textContent = `
      #aito-intro{position:fixed;inset:0;z-index:9999;display:grid;place-items:center;background:
        radial-gradient(circle at 50% 46%,rgba(239,205,124,.34),transparent 28%),
        radial-gradient(circle at 20% 20%,rgba(117,141,105,.18),transparent 24%),
        linear-gradient(150deg,#19170f 0%,#2d281b 46%,#16231c 100%);overflow:hidden;color:#fff;transition:opacity .9s ease,visibility .9s ease}
      #aito-intro.hide{opacity:0;visibility:hidden;pointer-events:none}
      #aito-intro canvas{position:absolute;inset:0;width:100%;height:100%}
      .aito-intro-copy{position:relative;z-index:2;text-align:center;padding:24px;transform:translateY(12px);opacity:0;animation:aitoCopy 1.2s .28s cubic-bezier(.2,.8,.2,1) forwards}
      .aito-intro-mark{width:92px;height:92px;margin:0 auto 22px;border-radius:28px;border:1px solid rgba(235,197,111,.6);display:grid;place-items:center;font-size:42px;background:linear-gradient(145deg,rgba(255,244,208,.13),rgba(190,145,58,.22));box-shadow:0 0 0 8px rgba(255,255,255,.025),0 0 60px rgba(223,180,84,.22);backdrop-filter:blur(10px);animation:aitoGlow 2.3s ease-in-out infinite}
      .aito-intro-kicker{font:700 12px/1.4 system-ui,sans-serif;letter-spacing:.28em;color:#dfc98f;margin-bottom:15px}
      .aito-intro-title{font-family:"Noto Serif TC","PMingLiU",serif;font-size:clamp(42px,7vw,92px);line-height:1.05;letter-spacing:.06em;text-shadow:0 10px 40px rgba(0,0,0,.36)}
      .aito-intro-en{font:400 clamp(14px,1.4vw,20px)/1.5 Georgia,serif;letter-spacing:.15em;color:#e9ddb9;margin-top:12px}
      .aito-intro-line{width:0;height:1px;margin:22px auto 0;background:linear-gradient(90deg,transparent,#e8c873,transparent);animation:aitoLine 1.25s .75s ease forwards}
      .aito-intro-hint{margin-top:15px;font:500 12px/1.4 system-ui,sans-serif;letter-spacing:.15em;color:rgba(255,255,255,.54)}
      .aito-skip{position:absolute;right:24px;top:22px;z-index:3;border:1px solid rgba(255,255,255,.18);background:rgba(255,255,255,.07);color:rgba(255,255,255,.72);border-radius:999px;padding:8px 13px;cursor:pointer;backdrop-filter:blur(9px)}
      @keyframes aitoCopy{to{opacity:1;transform:none}}
      @keyframes aitoLine{to{width:min(360px,60vw)}}
      @keyframes aitoGlow{50%{transform:translateY(-5px) scale(1.025);box-shadow:0 0 0 8px rgba(255,255,255,.035),0 0 90px rgba(223,180,84,.36)}}
      @media(max-width:680px){.aito-intro-mark{width:76px;height:76px;border-radius:23px;font-size:34px}.aito-skip{right:14px;top:14px}.aito-intro-title{letter-spacing:.03em}}
    `;
    document.head.appendChild(style);

    const overlay = document.createElement('div');
    overlay.id = 'aito-intro';
    overlay.innerHTML = `
      <button class="aito-skip" type="button" aria-label="略過開場動畫">略過</button>
      <div class="aito-intro-copy">
        <div class="aito-intro-mark">✦</div>
        <div class="aito-intro-kicker">OBSERVE · CREATE · TEACH</div>
        <div class="aito-intro-title">AI 教學觀察所</div>
        <div class="aito-intro-en">AI Teaching Observatory</div>
        <div class="aito-intro-line"></div>
        <div class="aito-intro-hint">藝術教育 × AI × 課堂實踐</div>
      </div>`;
    document.body.appendChild(overlay);
    document.documentElement.style.overflow = 'hidden';

    let introSketch = null;
    if (window.p5) {
      introSketch = new p5((p) => {
        const pts = [];
        const dust = [];
        let born = 0;
        p.setup = () => {
          const c = p.createCanvas(window.innerWidth, window.innerHeight);
          c.parent(overlay);
          p.pixelDensity(Math.min(window.devicePixelRatio || 1, 1.5));
          p.frameRate(coarse ? 30 : 45);
          for (let i = 0; i < (coarse ? 64 : 110); i++) {
            const a = p.random(p.TWO_PI), rr = p.random(60, Math.min(p.width,p.height)*.42);
            pts.push({a,rr,sp:p.random(.0015,.005),s:p.random(1.2,3.7),o:p.random(40,130)});
          }
        };
        p.draw = () => {
          p.clear();
          const cx=p.width/2, cy=p.height/2;
          for (let i=0;i<pts.length;i++){
            const q=pts[i]; q.a += q.sp;
            const pulse = 1 + Math.sin(p.frameCount*.018+i)*.018;
            const x=cx+Math.cos(q.a)*q.rr*pulse;
            const y=cy+Math.sin(q.a)*q.rr*.56*pulse;
            if(i%7===0){
              p.noFill(); p.stroke(225,183,88,18); p.strokeWeight(.7);
              p.line(cx,cy,x,y);
            }
            p.noStroke(); p.fill(i%3===0?100:225,i%3===0?132:188,i%3===0?96:96,q.o); p.circle(x,y,q.s*2);
          }
          if(p.frameCount%3===0 && dust.length<70){
            dust.push({x:p.random(p.width),y:p.height+p.random(20,90),vy:p.random(.4,1.15),vx:p.random(-.18,.18),life:p.random(80,180),m:0,s:p.random(.7,2.1)});
          }
          for(let i=dust.length-1;i>=0;i--){
            const d=dust[i];d.x+=d.vx;d.y-=d.vy;d.m++;d.life--;
            p.noStroke();p.fill(238,202,125,Math.min(95,d.life));p.circle(d.x,d.y,d.s*2);
            if(d.life<=0||d.y<-10)dust.splice(i,1);
          }
          born++;
        };
        p.windowResized=()=>p.resizeCanvas(window.innerWidth,window.innerHeight);
      }, overlay);
    }

    let closed = false;
    const close = () => {
      if (closed) return;
      closed = true;
      sessionStorage.setItem('aito-intro-seen','1');
      overlay.classList.add('hide');
      document.documentElement.style.overflow = '';
      setTimeout(() => { introSketch?.remove(); overlay.remove(); style.remove(); }, 950);
    };
    overlay.querySelector('.aito-skip')?.addEventListener('click', close);
    setTimeout(close, coarse ? 2600 : 3300);
  }

  function mountSketch() {
    if (!window.p5) return;
    const hero = document.querySelector('.hero');
    if (!hero) return;

    new p5((p) => {
      let nodes = [];
      let sparks = [];
      let rings = [];
      const gold = [186, 137, 55];
      const green = [85, 112, 83];

      class Node {
        constructor() { this.reset(true); }
        reset(randomY = false) {
          this.x = p.random(p.width);
          this.y = randomY ? p.random(p.height) : p.height + 20;
          this.vx = p.random(-0.22, 0.22);
          this.vy = p.random(-0.18, 0.12);
          this.r = p.random(1.4, 4.2);
          this.phase = p.random(p.TWO_PI);
          this.mix = p.random();
        }
        update() {
          this.phase += 0.012;
          this.x += this.vx + Math.sin(this.phase) * 0.06;
          this.y += this.vy + Math.cos(this.phase * 0.7) * 0.04;
          if (!coarse && p.mouseX >= 0 && p.mouseX <= p.width && p.mouseY >= 0 && p.mouseY <= p.height) {
            const dx = p.mouseX - this.x;
            const dy = p.mouseY - this.y;
            const d2 = dx * dx + dy * dy;
            if (d2 < 18000 && d2 > 25) {
              const f = (1 - d2 / 18000) * 0.018;
              this.x += dx * f;
              this.y += dy * f;
            }
          }
          if (this.x < -30) this.x = p.width + 30;
          if (this.x > p.width + 30) this.x = -30;
          if (this.y < -30) this.y = p.height + 30;
          if (this.y > p.height + 30) this.y = -30;
        }
        draw() {
          const c = this.mix < .55 ? gold : green;
          p.noStroke();
          p.fill(c[0], c[1], c[2], 75);
          p.circle(this.x, this.y, this.r * 2.8);
          p.fill(255, 244, 212, 145);
          p.circle(this.x, this.y, this.r);
        }
      }

      class Spark {
        constructor(x, y) {
          this.x = x ?? p.random(p.width * .45, p.width);
          this.y = y ?? p.random(p.height * .05, p.height * .65);
          this.life = p.random(35, 90);
          this.max = this.life;
          this.vx = p.random(-.45, .45);
          this.vy = p.random(-1.0, -.25);
          this.s = p.random(1, 3.2);
        }
        update(){ this.x += this.vx; this.y += this.vy; this.life--; }
        draw(){
          const a = 180 * Math.max(0, this.life / this.max);
          p.noStroke(); p.fill(238, 190, 89, a); p.circle(this.x, this.y, this.s * 2);
        }
      }

      function sizeToHero() {
        const w = Math.max(1, hero.clientWidth);
        const h = Math.max(1, hero.clientHeight);
        p.resizeCanvas(w, h);
        const target = reduceMotion ? 14 : Math.min(coarse ? 34 : 54, Math.floor(w / 22));
        while (nodes.length < target) nodes.push(new Node());
        if (nodes.length > target) nodes.length = target;
      }

      p.setup = () => {
        const canvas = p.createCanvas(Math.max(1, hero.clientWidth), Math.max(1, hero.clientHeight));
        canvas.parent(hero);
        canvas.style('position', 'absolute');
        canvas.style('inset', '0');
        canvas.style('width', '100%');
        canvas.style('height', '100%');
        canvas.style('pointer-events', 'none');
        canvas.style('z-index', '0');
        canvas.elt.setAttribute('aria-hidden', 'true');
        hero.querySelectorAll(':scope > *:not(canvas)').forEach(el => {
          el.style.position = 'relative';
          el.style.zIndex = '2';
        });
        p.pixelDensity(Math.min(window.devicePixelRatio || 1, 1.5));
        p.frameRate(coarse ? 30 : 45);
        sizeToHero();
        new ResizeObserver(sizeToHero).observe(hero);
        if (reduceMotion) p.noLoop();
      };

      p.draw = () => {
        p.clear();
        for (let i = 0; i < 3; i++) {
          const y = p.height * (.25 + i * .18) + Math.sin(p.frameCount * .008 + i) * 18;
          p.noFill(); p.stroke(200, 156, 75, 14 - i * 2); p.strokeWeight(1.2); p.beginShape();
          for (let x = 0; x <= p.width; x += 28) {
            const yy = y + p.noise(x * .0025, i * 2, p.frameCount * .0025) * 48;
            p.curveVertex(x, yy);
          }
          p.endShape();
        }

        for (let i = 0; i < nodes.length; i++) {
          const a = nodes[i]; a.update();
          for (let j = i + 1; j < nodes.length; j++) {
            const b = nodes[j]; const d = p.dist(a.x, a.y, b.x, b.y);
            if (d < 118) {
              p.stroke(176, 130, 53, (1 - d / 118) * 38); p.strokeWeight(.75); p.line(a.x, a.y, b.x, b.y);
            }
          }
          a.draw();
        }

        if (!reduceMotion && p.frameCount % (coarse ? 7 : 4) === 0 && sparks.length < 45) sparks.push(new Spark());
        for (let i = sparks.length - 1; i >= 0; i--) {
          sparks[i].update(); sparks[i].draw();
          if (sparks[i].life <= 0) sparks.splice(i, 1);
        }

        for (let i = rings.length - 1; i >= 0; i--) {
          const r = rings[i]; r.life--;
          const t = 1 - r.life / 48;
          p.noFill(); p.stroke(190, 142, 57, (1 - t) * 120); p.strokeWeight(1.2); p.circle(r.x, r.y, 20 + t * 150);
          if (r.life <= 0) rings.splice(i, 1);
        }
      };

      p.mousePressed = () => {
        if (!reduceMotion && p.mouseX >= 0 && p.mouseX <= p.width && p.mouseY >= 0 && p.mouseY <= p.height) {
          rings.push({x:p.mouseX,y:p.mouseY,life:48});
          for (let i=0;i<10;i++) sparks.push(new Spark(p.mouseX + p.random(-12,12), p.mouseY + p.random(-12,12)));
        }
      };
    }, hero);
  }

  function addDomMotion() {
    if (reduceMotion) return;
    const stage = document.querySelector('.stage');
    const tiltTargets = document.querySelectorAll('.floatcard,.card,.path,.tool,.work');
    tiltTargets.forEach(el => {
      el.style.transformStyle = 'preserve-3d';
      el.style.willChange = 'transform';
      el.addEventListener('pointermove', e => {
        if (coarse) return;
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - .5;
        const y = (e.clientY - r.top) / r.height - .5;
        el.style.transform = `perspective(800px) rotateX(${-y*5}deg) rotateY(${x*6}deg) translateY(-4px)`;
      });
      el.addEventListener('pointerleave', () => { el.style.transform = ''; });
    });

    if (stage && !coarse) {
      window.addEventListener('pointermove', e => {
        const nx = e.clientX / innerWidth - .5;
        const ny = e.clientY / innerHeight - .5;
        stage.style.transform = `translate3d(${nx*8}px,${ny*7}px,0)`;
      }, {passive:true});
    }

    const bar = document.createElement('div');
    Object.assign(bar.style,{position:'fixed',left:'0',top:'0',height:'2px',width:'0',zIndex:'100',background:'linear-gradient(90deg,#b6842e,#f1d388,#6f8f67)',boxShadow:'0 0 12px rgba(190,145,60,.55)',pointerEvents:'none'});
    document.body.appendChild(bar);
    const sync = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      bar.style.width = `${max > 0 ? (scrollY/max)*100 : 0}%`;
    };
    addEventListener('scroll', sync, {passive:true}); sync();
  }

  const start = () => { installIntro(); mountSketch(); addDomMotion(); };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();