// THREE.js 3D háttér – finoman mozgó fénygömb

let scene, camera, renderer, sphere, light;

function init() {
  scene = new THREE.Scene();

  const canvas = document.querySelector('#bg');
  const width = window.innerWidth;
  const height = window.innerHeight;

  camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
  camera.position.z = 4;

  renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setSize(width, height);
  renderer.setClearColor(0xf6f7fb, 1);
  renderer.setPixelRatio(window.devicePixelRatio);

  // Fényes anyagú gömb
  const geometry = new THREE.SphereGeometry(1.2, 64, 64);
  const material = new THREE.MeshPhysicalMaterial({
    color: 0x00c2ff,
    metalness: 0.2,
    roughness: 0.2,
    clearcoat: 1,
    clearcoatRoughness: 0.1,
    transmission: 0.6,
    thickness: 0.6,
  });

  sphere = new THREE.Mesh(geometry, material);
  scene.add(sphere);

  // Lágy fények
  const ambient = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambient);

  light = new THREE.PointLight(0xffffff, 1.2);
  light.position.set(2, 3, 4);
  scene.add(light);

  animate();
}

function animate() {
  requestAnimationFrame(animate);

  // Finom mozgás és forgás
  const time = Date.now() * 0.001;
  sphere.rotation.y += 0.003;
  sphere.rotation.x = Math.sin(time * 0.3) * 0.15;
  sphere.position.y = Math.sin(time * 0.5) * 0.1;

  light.position.x = Math.sin(time * 0.7) * 3;
  light.position.y = Math.cos(time * 0.9) * 3;

  renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
});

init();
