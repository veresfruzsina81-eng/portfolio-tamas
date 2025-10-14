// Mobil menü nyit/zár
const toggle = document.querySelector('.nav-toggle');
const menu = document.querySelector('.nav-links');
if (toggle && menu){
  toggle.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
}

// Év frissítése a láblécen
const y = document.getElementById('year');
if (y) y.textContent = new Date().getFullYear();

// (Opcionális) űrlap visszajelzés Netlify-n
const form = document.querySelector('form[netlify]');
const note = document.getElementById('form-note');
if (form && note){
  form.addEventListener('submit', () => {
    note.textContent = 'Küldés folyamatban…';
  });
}

// Scroll reveal – IntersectionObserver
const els = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window){
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){ e.target.classList.add('show'); io.unobserve(e.target); }
    });
  }, {threshold:0.12});
  els.forEach(el=>io.observe(el));
} else {
  // Fallback
  els.forEach(el=>el.classList.add('show'));
}

// Egyszerű „autoplay” vélemény-slider (auto scroll oda-vissza)
const track = document.getElementById('tSlider');
if(track){
  let dir = 1;
  setInterval(()=>{
    track.scrollBy({left: dir*320, behavior:'smooth'});
    const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 2;
    const atStart = track.scrollLeft <= 2;
    if(atEnd) dir = -1;
    if(atStart) dir = 1;
  }, 3500);
}
