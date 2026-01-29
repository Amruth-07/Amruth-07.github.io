// create scene
const scene = new THREE.Scene();

// camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

// renderer
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);

// make canvas act as background
const canvas = renderer.domElement;
canvas.style.position = "fixed";
canvas.style.top = "0";
canvas.style.left = "0";
canvas.style.width = "100%";
canvas.style.height = "100%";
canvas.style.zIndex = "-1";        // push behind all content
canvas.style.pointerEvents = "none";

document.body.appendChild(canvas);

// star geometry
const starCount = 1500;
const geometry = new THREE.BufferGeometry();
const positions = new Float32Array(starCount * 3);

for (let i = 0; i < starCount * 3; i++) {
  positions[i] = (Math.random() - 0.5) * 200;
}

geometry.setAttribute(
  "position",
  new THREE.BufferAttribute(positions, 3)
);

// star material
const material = new THREE.PointsMaterial({
  color: 0xffffff,
  size: 0.7
});

// star field
const stars = new THREE.Points(geometry, material);
scene.add(stars);

// animation
function animate() {
  requestAnimationFrame(animate);

  stars.rotation.x += 0.0005;
  stars.rotation.y += 0.0007;

  renderer.render(scene, camera);
}

animate();

// resize support
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
