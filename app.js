// ===== WebGL ellenőrzés
function webglAvailable(){
  try{
    const canvas = document.createElement('canvas');
    return !!window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
  }catch(e){ return false; }
}

// ===== Three.js – VALÓDI 3D háttér (fényes, finoman mozgó gömb)
let scene, camera, renderer, sphere, l1, l2;
function init3D(){
  if(!webglAvailable()){
    document.getElementById('webgl-note').hidden = false;
    return;
  }
  const canvas = document.getElementById('bg');
  scene = new THREE.Scene();

  const w = window.innerWidth, h = window.innerHeight;
  camera = new THREE.PerspectiveCamera(60, w/h, 0.1, 100);
  camera.position.set(0, 0, 4);

  renderer = new THREE.WebGLRenderer({ canvas, antialias:true, alpha:false });
  renderer.setSize(w, h);
  renderer.setPixelRatio(window.devicePixelRatio || 1);
  renderer.setClearColor(0xf6f7fb, 1);

  const geo = new THREE.SphereGeometry(1.25, 96, 96);
  const mat = new THREE.MeshPhysicalMaterial({
    color: 0x9bd7ff, metalness: .2, roughness: .15,
    clearcoat: 1, clearcoatRoughness: .08, transmission: .6, thickness: .7
  });
  sphere = new THREE.Mesh(geo, mat);
  scene.add(sphere);

  scene.add(new THREE.AmbientLight(0xffffff, .7));
  l1 = new THREE.PointLight(0x66b2ff, .9); l1.position.set(2.2, 1.6, 2.4); scene.add(l1);
  l2 = new THREE.PointLight(0xffffff, .7); l2.position.set(-2.0, -1.4, 2.1); scene.add(l2);

  renderer.setAnimationLoop(()=>{
    const t = performance.now()*0.001;
    sphere.rotation.y += 0.003;
    sphere.rotation.x = Math.sin(t*0.35)*0.15;
    sphere.position.y = Math.sin(t*0.6)*0.12;
    l1.position.x = Math.sin(t*0.8)*3; l1.position.y = Math.cos(t*0.6)*2.0;
    l2.position.x = Math.cos(t*0.7)*-3; l2.position.y = Math.sin(t*0.9)*-2.0;
    renderer.render(scene, camera);
  });

  window.addEventListener('resize', ()=>{
    const W = window.innerWidth, H = window.innerHeight;
    camera.aspect = W/H; camera.updateProjectionMatrix(); renderer.setSize(W, H);
  });
}
window.addEventListener('DOMContentLoaded', init3D);

// ===== Oldalsó fiók vezérlés
const drawer = document.getElementById('drawer');
document.getElementById('openDrawer')?.addEventListener('click', ()=>{
  drawer.classList.add('open'); drawer.setAttribute('aria-hidden','false');
});
document.getElementById('closeDrawer')?.addEventListener('click', ()=>{
  drawer.classList.remove('open'); drawer.setAttribute('aria-hidden','true');
});
document.addEventListener('keydown', e=>{ if(e.key==='Escape'){ drawer.classList.remove('open'); drawer.setAttribute('aria-hidden','true'); }});

// ===== Zászlók – HU alap, csak vizuálisan (később jöhet i18n)
document.querySelectorAll('.flag').forEach(b=>{
  b.addEventListener('click', ()=>{
    document.querySelectorAll('.flag').forEach(x=>x.classList.remove('active'));
    b.classList.add('active');
  });
});
