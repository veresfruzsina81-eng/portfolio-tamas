/* 1) Élethű 3D-hatású háttér (Canvas) – minden gépen megy */
const c = document.getElementById('bg'), ctx = c.getContext('2d');
function fit(){ c.width = innerWidth; c.height = innerHeight; }
fit(); addEventListener('resize', fit);

const blobs = Array.from({length:6}).map(()=>({
  x: Math.random()*c.width,
  y: Math.random()*c.height,
  r: 120 + Math.random()*160,
  vx: (Math.random()*0.25+0.08) * (Math.random()<0.5?-1:1),
  vy: (Math.random()*0.25+0.08) * (Math.random()<0.5?-1:1),
  tint: Math.random()<.5 ? [13,116,255] : [0,194,255]
}));
function drawBlob(b){
  const g = ctx.createRadialGradient(b.x-b.r*0.25, b.y-b.r*0.25, b.r*0.1, b.x, b.y, b.r);
  g.addColorStop(0, `rgba(${b.tint[0]},${b.tint[1]},${b.tint[2]},0.20)`);
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, Math.PI*2); ctx.fill();

  const h = ctx.createRadialGradient(b.x-b.r*0.35, b.y-b.r*0.35, 1, b.x-b.r*0.35, b.y-b.r*0.35, b.r*0.45);
  h.addColorStop(0, 'rgba(255,255,255,.35)');
  h.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = h;
  ctx.beginPath(); ctx.arc(b.x-b.r*0.25, b.y-b.r*0.25, b.r*0.55, 0, Math.PI*2); ctx.fill();
}
(function loop(){
  ctx.clearRect(0,0,c.width,c.height);
  ctx.fillStyle = '#f6f7fb'; ctx.fillRect(0,0,c.width,c.height);
  blobs.forEach(b=>{
    b.x+=b.vx; b.y+=b.vy;
    if(b.x<-b.r) b.x=c.width+b.r; if(b.x>c.width+b.r) b.x=-b.r;
    if(b.y<-b.r) b.y=c.height+b.r; if(b.y>c.height+b.r) b.y=-b.r;
    drawBlob(b);
  });
  requestAnimationFrame(loop);
})();

/* 2) Oldalsó fiók */
const drawer = document.getElementById('drawer');
document.getElementById('openDrawer')?.addEventListener('click', ()=>{
  drawer.classList.add('open'); drawer.setAttribute('aria-hidden','false');
});
document.getElementById('closeDrawer')?.addEventListener('click', ()=>{
  drawer.classList.remove('open'); drawer.setAttribute('aria-hidden','true');
});
document.addEventListener('keydown', e=>{ if(e.key==='Escape'){ drawer.classList.remove('open'); drawer.setAttribute('aria-hidden','true'); }});

/* 3) Kártyák beúsztatása scrollnál */
const reveals = document.querySelectorAll('.reveal');
if('IntersectionObserver' in window){
  const io = new IntersectionObserver(es=>{
    es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('show'); io.unobserve(e.target); }});
  },{threshold:.12});
  reveals.forEach(el=>io.observe(el));
}else{ reveals.forEach(el=>el.classList.add('show')); }

/* 4) Évszám */
document.getElementById('year').textContent = new Date().getFullYear();

/* 5) Zászlók – vizuális állapot (HU alap) */
document.querySelectorAll('.flag').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    document.querySelectorAll('.flag').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    // i18n később kapcsolható ide
  });
});
