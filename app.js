/* ===========================
   1) Mindig működő Canvas-háttér
   =========================== */
const c = document.getElementById('bg');
const ctx = c.getContext('2d');
function resize(){
  c.width = window.innerWidth;
  c.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

// „3D-hatású” fényfoltok (radial gradient blobok), lassú lebegéssel
const blobs = Array.from({length: 5}).map((_,i)=>({
  x: Math.random()*c.width,
  y: Math.random()*c.height,
  r: 220 + Math.random()*180,
  vx: (Math.random()*0.6+0.2) * (Math.random()<0.5?-1:1),
  vy: (Math.random()*0.6+0.2) * (Math.random()<0.5?-1:1),
  hue: i%2 ? 200 : 205+Math.random()*30 // kékek
}));

function tick(){
  ctx.clearRect(0,0,c.width,c.height);

  // puha alap
  ctx.fillStyle = '#f6f7fb';
  ctx.fillRect(0,0,c.width,c.height);

  // fényfoltok
  blobs.forEach(b=>{
    b.x += b.vx; b.y += b.vy;
    if (b.x < -b.r) b.x = c.width + b.r;
    if (b.x > c.width + b.r) b.x = -b.r;
    if (b.y < -b.r) b.y = c.height + b.r;
    if (b.y > c.height + b.r) b.y = -b.r;

    const g = ctx.createRadialGradient(b.x, b.y, b.r*0.1, b.x, b.y, b.r);
    g.addColorStop(0, `rgba(0, ${120+Math.floor(b.hue)}, 255, 0.18)`);
    g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, Math.PI*2); ctx.fill();
  });

  requestAnimationFrame(tick);
}
tick();

/* ===========================
   2) Buborékok azonnali és scroll-os felbukkanása
   =========================== */
const bubbles = document.querySelectorAll('.bubble');
function showBubbles(){
  bubbles.forEach(b => b.classList.add('shown')); // class csak jelölő, ha kéne
}
showBubbles(); // betöltéskor
if ('IntersectionObserver' in window){
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.style.animationPlayState = 'running';
        io.unobserve(e.target);
      }
    });
  }, { threshold: .1 });
  bubbles.forEach(b=>{
    // kezdetben pause, majd IO oldja fel – ha akarsz teljes kontrollt:
    b.style.animationPlayState = 'paused';
    io.observe(b);
  });
} else {
  bubbles.forEach(b => b.style.animationPlayState = 'running');
}

/* ===========================
   3) Zászlók – most csak megjelenítés (HU aktív)
   =========================== */
const flagBtns = document.querySelectorAll('.flag');
flagBtns.forEach(btn=>{
  btn.addEventListener('click', ()=>{
    flagBtns.forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    // A szöveg marad magyar – később ide jöhet a tényleges i18n.
  });
});
