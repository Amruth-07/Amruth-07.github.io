// ===== APPLE STYLE HERO 3D =====
const hero = document.getElementById("hero");

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);

camera.position.z = 8;

const renderer = new THREE.WebGLRenderer({
  alpha: true,
  antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

renderer.domElement.style.position = "absolute";
renderer.domElement.style.top = "0";
renderer.domElement.style.left = "0";
renderer.domElement.style.zIndex = "0";

hero.appendChild(renderer.domElement);

// ✨ Minimal particles
const geometry = new THREE.BufferGeometry();
const count = 900;

const positions = new Float32Array(count * 3);
for (let i = 0; i < count * 3; i++) {
  positions[i] = (Math.random() - 0.5) * 12;
}

geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

const material = new THREE.PointsMaterial({
  color: 0xffffff,
  size: 0.025,
  opacity: 0.6,
  transparent: true
});

const particles = new THREE.Points(geometry, material);
scene.add(particles);

// 🎥 Smooth animation
const clock = new THREE.Clock();

function animate() {
  const t = clock.getElapsedTime();
  particles.rotation.y = t * 0.05;
  particles.rotation.x = t * 0.02;
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();

// 📱 Resize support
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
