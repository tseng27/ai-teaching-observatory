/* AI 教學觀察所｜p5.js ambient interaction layer */
(() => {
  const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const coarse = window.matchMedia?.('(pointer: coarse)').matches;

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

  const start = () => { mountSketch(); addDomMotion(); };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();