// ===== THREE.js 3D háttér biztonságosan, fallbackkel =====
let scene, camera, renderer, sphere, light1, light2;

function hasWebGL(){
  try{
    const c = document.createElement('canvas');
    return !!window.WebGLRenderingContext && (c.getContext('webgl') || c.getContext('experimental-webgl'));
  }catch(e){ return false; }
}

function init3D(){
  if (!hasWebGL()){ console.warn('WebGL nem elérhető – fallback háttér megy.'); return; }
  document.getElementById('bg-fallback').style.display = 'none';

  const canvas = document.getElementById('bg');
  scene = new THREE.Scene();

  const w = window.innerWidth, h = window.innerHeight;
  camera = new THREE.PerspectiveCamera(60, w/h, 0.1, 100);
  camera.position.set(0, 0, 4);

  renderer = new THREE.WebGLRenderer({ canvas, antialias:true });
  renderer.setSize(w, h);
  renderer.setPixelRatio(window.devicePixelRatio || 1);
  renderer.setClearColor(0xf6f7fb, 1);

  const geo = new THREE.SphereGeometry(1.3, 96, 96);
  const mat = new THREE.MeshPhysicalMaterial({
    color: 0x9bd7ff, metalness: 0.15, roughness: 0.15,
    clearcoat: 1, clearcoatRoughness: 0.08, transmission: 0.65, thickness: 0.7
  });
  sphere = new THREE.Mesh(geo, mat);
  scene.add(sphere);

  const amb = new THREE.AmbientLight(0xffffff, 0.7);
  scene.add(amb);
  light1 = new THREE.PointLight(0x66b2ff, 0.9); light1.position.set(2.2, 1.8, 2.5); scene.add(light1);
  light2 = new THREE.PointLight(0xffffff, 0.7); light2.position.set(-2.2, -1.6, 2.2); scene.add(light2);

  renderer.setAnimationLoop(()=>{
    const t = performance.now()*0.001;
    sphere.rotation.y += 0.003;
    sphere.rotation.x = Math.sin(t*0.35)*0.15;
    sphere.position.y = Math.sin(t*0.6)*0.12;
    light1.position.x = Math.sin(t*0.8)*3; light1.position.y = Math.cos(t*0.6)*2.2;
    light2.position.x = Math.cos(t*0.7)*-3; light2.position.y = Math.sin(t*0.9)*-2;
    renderer.render(scene, camera);
  });

  window.addEventListener('resize', ()=>{
    const W = window.innerWidth, H = window.innerHeight;
    camera.aspect = W/H; camera.updateProjectionMatrix(); renderer.setSize(W, H);
  });
}
init3D();

// ===== Oldalsó fiók (drawer) =====
const drawer = document.getElementById('drawer');
document.getElementById('openDrawer')?.addEventListener('click', ()=>{
  drawer.classList.add('open'); drawer.setAttribute('aria-hidden','false');
});
document.getElementById('closeDrawer')?.addEventListener('click', ()=>{
  drawer.classList.remove('open'); drawer.setAttribute('aria-hidden','true');
});
document.addEventListener('keydown', e=>{ if(e.key==='Escape'){ drawer.classList.remove('open'); drawer.setAttribute('aria-hidden','true'); }});

// ===== Buborékok felúsztatása (IntersectionObserver) =====
const bubbles = document.querySelectorAll('.bubble');
if ('IntersectionObserver' in window){
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('show'); io.unobserve(e.target); }});
  },{threshold:.15});
  bubbles.forEach(b=>io.observe(b));
} else { bubbles.forEach(b=>b.classList.add('show')); }

// ===== Nyelvváltó (HU/EN) – buborék szövegekkel együtt =====
const flags = document.querySelectorAll('.flag');
const dict = {
  hu: {
    title:"Horváth Tamás",
    subtitle:"Applikáció • Weboldal • Webshop • Játékfejlesztés",
    desc:"Több területen jártas fejlesztőként modern, gyors és letisztult megoldásokat készítek — legyen szó webes integrációról, mobilalkalmazásról vagy játékról.",
    contact:"Lépj kapcsolatba",
    bubble:{
      app:"Applikációk – natív és cross-platform megoldások, gyors prototípus és stabil release.",
      web:"Weboldal – villámgyors, SEO-barát, Netlify/Vercel deploy és analitika.",
      shop:"Webshop – Woo/Shopify/Magento, fizetés, készlet, konverzió-mérés.",
      game:"Játékfejlesztés – Unity/Unreal, demó → Google Play, monetizációs tanácsok."
    }
  },
  en: {
    title:"Tamás Horváth",
    subtitle:"Apps • Websites • Webshops • Game Development",
    desc:"I deliver fast, clean and modern solutions across web, mobile and games — from integrations to polished releases.",
    contact:"Get in touch",
    bubble:{
      app:"Apps – native & cross-platform, rapid prototyping and stable releases.",
      web:"Web – ultra-fast, SEO-friendly, Netlify/Vercel deploy with analytics.",
      shop:"E-commerce – Woo/Shopify/Magento, payments, inventory, conversion tracking.",
      game:"Game dev – Unity/Unreal, demo → Google Play, monetization advice."
    }
  }
};
function applyLang(lang){
  document.querySelector('[data-i18n="title"]').textContent = dict[lang].title;
  document.querySelector('[data-i18n="subtitle"]').textContent = dict[lang].subtitle;
  document.querySelector('[data-i18n="desc"]').textContent = dict[lang].desc;
  document.querySelector('[data-i18n="contact"]').textContent = dict[lang].contact;
  const keys = ['app','web','shop','game'];
  document.querySelectorAll('.bubble').forEach((b,i)=>{ b.textContent = dict[lang].bubble[keys[i]]; });
  flags.forEach(f=>f.classList.toggle('active', f.dataset.lang===lang));
  localStorage.setItem('lang', lang);
}
flags.forEach(f=>f.addEventListener('click', ()=> applyLang(f.dataset.lang)));
applyLang(localStorage.getItem('lang') || 'hu');
