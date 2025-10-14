/* ===== 1) Háttér: „üvegszerű” 3D-hatás CANVAS-szal (mindig megy) ===== */
const cnv = document.getElementById('bg');
const ctx = cnv.getContext('2d');
function size(){ cnv.width = innerWidth; cnv.height = innerHeight; }
size(); addEventListener('resize', size);

// fényes „glassy” buborékok (radial gradient + highlight), lassú úszással
const bubbles = Array.from({length: 6}).map(()=>({
  x: Math.random()*cnv.width,
  y: Math.random()*cnv.height,
  r: 120 + Math.random()*140,
  vx: (Math.random()*0.25+0.08) * (Math.random()<0.5?-1:1),
  vy: (Math.random()*0.25+0.08) * (Math.random()<0.5?-1:1),
  tint: Math.random()<.5 ? [13,116,255] : [0,194,255]
}));

function drawBubble(b){
  // fő kékes buboréktest
  const g = ctx.createRadialGradient(b.x- b.r*0.25, b.y- b.r*0.25, b.r*0.1, b.x, b.y, b.r);
  g.addColorStop(0, `rgba(${b.tint[0]},${b.tint[1]},${b.tint[2]},0.20)`);
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, Math.PI*2); ctx.fill();

  // kis „specular highlight” felül
  const h = ctx.createRadialGradient(b.x - b.r*0.35, b.y - b.r*0.35, 1, b.x - b.r*0.35, b.y - b.r*0.35, b.r*0.45);
  h.addColorStop(0, 'rgba(255,255,255,.35)');
  h.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = h;
  ctx.beginPath(); ctx.arc(b.x - b.r*0.25, b.y - b.r*0.25, b.r*0.55, 0, Math.PI*2); ctx.fill();
}

function animate(){
  ctx.clearRect(0,0,cnv.width,cnv.height);
  ctx.fillStyle = '#f6f7fb'; ctx.fillRect(0,0,cnv.width,cnv.height);

  bubbles.forEach(b=>{
    b.x += b.vx; b.y += b.vy;
    if (b.x < -b.r) b.x = cnv.width + b.r;
    if (b.x > cnv.width + b.r) b.x = -b.r;
    if (b.y < -b.r) b.y = cnv.height + b.r;
    if (b.y > cnv.height + b.r) b.y = -b.r;
    drawBubble(b);
  });

  requestAnimationFrame(animate);
}
animate();

/* ===== 2) Belépő „pop” a jobb oldali chipekre – szépen, lassabban ===== */
const chips = document.querySelectorAll('.chip.pop');
function reveal(){
  chips.forEach(el => el.classList.add('show'));
}
if ('IntersectionObserver' in window){
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if (e.isIntersecting){ e.target.classList.add('show'); io.unobserve(e.target); }
    });
  }, {threshold:.2});
  chips.forEach(el=>io.observe(el));
} else { reveal(); }

/* ===== 3) Zászlók – csak vizuális váltás (HU alap) ===== */
document.querySelectorAll('.flag').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    document.querySelectorAll('.flag').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    // (Ha később kell i18n, ide tudjuk kötni.)
  });
});
