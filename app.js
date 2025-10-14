// ===== 3D háttér (THREE.js) =====
let scene, camera, renderer, sphere, light1, light2;

function init3D(){
  const canvas = document.getElementById('bg');
  scene = new THREE.Scene();

  const w = window.innerWidth, h = window.innerHeight;
  camera = new THREE.PerspectiveCamera(60, w/h, 0.1, 100);
  camera.position.set(0, 0, 4);

  renderer = new THREE.WebGLRenderer({ canvas, antialias:true, alpha:false });
  renderer.setSize(w, h);
  renderer.setPixelRatio(window.devicePixelRatio || 1);
  renderer.setClearColor(0xf6f7fb, 1);

  const geo = new THREE.SphereGeometry(1.3, 96, 96);
  const mat = new THREE.MeshPhysicalMaterial({
    color: 0x9bd7ff,
    metalness: 0.15,
    roughness: 0.15,
    clearcoat: 1,
    clearcoatRoughness: 0.08,
    transmission: 0.65,
    thickness: 0.7
  });
  sphere = new THREE.Mesh(geo, mat);
  scene.add(sphere);

  const amb = new THREE.AmbientLight(0xffffff, 0.7);
  scene.add(amb);

  light1 = new THREE.PointLight(0x66b2ff, 0.9);
  light1.position.set(2.2, 1.8, 2.5);
  scene.add(light1);

  light2 = new THREE.PointLight(0xffffff, 0.7);
  light2.position.set(-2.2, -1.6, 2.2);
  scene.add(light2);

  animate();
}

function animate(){
  requestAnimationFrame(animate);
  const t = performance.now() * 0.001;

  sphere.rotation.y += 0.003;
  sphere.rotation.x = Math.sin(t * 0.35) * 0.15;
  sphere.position.y = Math.sin(t * 0.6) * 0.12;

  light1.position.x = Math.sin(t * 0.8) * 3;
  light1.position.y = Math.cos(t * 0.6) * 2.2;
  light2.position.x = Math.cos(t * 0.7) * -3;
  light2.position.y = Math.sin(t * 0.9) * -2;

  renderer.render(scene, camera);
}

window.addEventListener('resize', ()=>{
  const w = window.innerWidth, h = window.innerHeight;
  camera.aspect = w/h; camera.updateProjectionMatrix();
  renderer.setSize(w, h);
});

init3D();

// ===== Oldalsó fiók (drawer) =====
const drawer = document.getElementById('drawer');
const openBtn = document.getElementById('openDrawer');
const closeBtn = document.getElementById('closeDrawer');

openBtn?.addEventListener('click', ()=>{
  drawer.classList.add('open');
  drawer.setAttribute('aria-hidden','false');
});
closeBtn?.addEventListener('click', ()=>{
  drawer.classList.remove('open');
  drawer.setAttribute('aria-hidden','true');
});

// ESC bezárás
document.addEventListener('keydown', (e)=>{
  if(e.key === 'Escape') { drawer.classList.remove('open'); drawer.setAttribute('aria-hidden','true'); }
});

// ===== Nyelvváltó (HU/EN minimál) =====
const flags = document.querySelectorAll('.flag');
const dict = {
  en: {
    title: "Horváth Tamás",
    subtitle: "Apps • Websites • Webshops • Game Development",
    desc: "I build fast, clean and modern solutions across web, mobile and games.",
    contact: "Get in touch"
  },
  hu: {
    title: "Horváth Tamás",
    subtitle: "Applikáció • Weboldal • Webshop • Játékfejlesztés",
    desc: "Több területen jártas fejlesztőként modern, gyors és letisztult megoldásokat készítek — legyen szó webes integrációról, mobilalkalmazásról vagy játékról.",
    contact: "Lépj kapcsolatba"
  }
};
function applyLang(lang){
  document.querySelector('.text h1').textContent = dict[lang].title;
  document.querySelector('.subtitle').textContent = dict[lang].subtitle;
  document.querySelector('.desc').textContent = dict[lang].desc;
  document.querySelector('.btn').textContent = dict[lang].contact;
  flags.forEach(b=>b.classList.toggle('active', b.dataset.lang===lang));
  localStorage.setItem('lang', lang);
}
flags.forEach(b=>b.addEventListener('click', ()=> applyLang(b.dataset.lang)));
applyLang(localStorage.getItem('lang') || 'hu');
