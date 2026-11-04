/* ===== 1. CIRCUIT SWARM CURSOR ===== */
const cv = document.getElementById("swarm"), cx = cv.getContext("2d");
const COLORS = ["0,200,255", "168,85,247", "0,255,136"];
const mouse = { x: -999, y: -999, on: false };
let W, H, nodes = [];

function resize() {
  const d = window.devicePixelRatio || 1;
  W = innerWidth; H = innerHeight;
  cv.width = W * d; cv.height = H * d;
  cx.setTransform(d, 0, 0, d, 0, 0);
  const n = Math.min(110, Math.floor((W * H) / 13000));
  nodes = Array.from({ length: n }, (_, i) => {
    const bx = (Math.random() - 0.5) * 0.5, by = (Math.random() - 0.5) * 0.5;
    return { x: Math.random() * W, y: Math.random() * H, vx: bx, vy: by, bx, by,
             c: COLORS[i % 3], r: 1.6 + Math.random() * 1.6 };
  });
}

function tick() {
  cx.clearRect(0, 0, W, H);
  for (const a of nodes) {
    const dx = mouse.x - a.x, dy = mouse.y - a.y, d = Math.hypot(dx, dy);
    a.vx += (a.bx - a.vx) * 0.02; a.vy += (a.by - a.vy) * 0.02;
    if (mouse.on && d < 180 && d > 1) {
      a.vx += (dx / d) * 0.06 - (dy / d) * 0.025;   // pull in + slight orbit
      a.vy += (dy / d) * 0.06 + (dx / d) * 0.025;
    }
    const s = Math.hypot(a.vx, a.vy);
    if (s > 2.6) { a.vx *= 2.6 / s; a.vy *= 2.6 / s; }
    a.x += a.vx; a.y += a.vy;
    if (a.x < 0 || a.x > W) a.vx *= -1;
    if (a.y < 0 || a.y > H) a.vy *= -1;
  }
  cx.lineWidth = 1;
  for (let i = 0; i < nodes.length; i++) {
    const a = nodes[i];
    for (let j = i + 1; j < nodes.length; j++) {
      const b = nodes[j], d = Math.hypot(a.x - b.x, a.y - b.y);
      if (d < 115) {
        cx.strokeStyle = `rgba(${a.c},${(1 - d / 115) * 0.28})`;
        cx.beginPath(); cx.moveTo(a.x, a.y); cx.lineTo(b.x, b.y); cx.stroke();
      }
    }
    if (mouse.on) {
      const d = Math.hypot(a.x - mouse.x, a.y - mouse.y);
      if (d < 190) {
        cx.strokeStyle = `rgba(${a.c},${(1 - d / 190) * 0.75})`;
        cx.lineWidth = 1.3;
        cx.beginPath(); cx.moveTo(a.x, a.y); cx.lineTo(mouse.x, mouse.y); cx.stroke();
        cx.lineWidth = 1;
      }
    }
    cx.fillStyle = `rgba(${a.c},.9)`;
    cx.beginPath(); cx.arc(a.x, a.y, a.r, 0, Math.PI * 2); cx.fill();
  }
  if (mouse.on) {
    cx.strokeStyle = "rgba(0,200,255,.9)"; cx.lineWidth = 1.5;
    cx.beginPath(); cx.arc(mouse.x, mouse.y, 7, 0, Math.PI * 2); cx.stroke();
    cx.fillStyle = "rgba(168,85,247,.95)";
    cx.beginPath(); cx.arc(mouse.x, mouse.y, 2.5, 0, Math.PI * 2); cx.fill();
  }
  requestAnimationFrame(tick);
}

const setPos = (x, y) => { mouse.x = x; mouse.y = y; mouse.on = true; };
addEventListener("mousemove", e => setPos(e.clientX, e.clientY));
addEventListener("touchstart", e => setPos(e.touches[0].clientX, e.touches[0].clientY), { passive: true });
addEventListener("touchmove", e => setPos(e.touches[0].clientX, e.touches[0].clientY), { passive: true });
addEventListener("touchend", () => setTimeout(() => (mouse.on = false), 600));
document.addEventListener("mouseleave", () => (mouse.on = false));
addEventListener("resize", resize);
resize(); tick();

/* ===== 2. SCROLL REVEAL ===== */
const io = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (en.isIntersecting) { en.target.classList.add("on"); io.unobserve(en.target); }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".rv").forEach((el, i) => {
  el.style.transitionDelay = (i % 4) * 0.07 + "s";
  io.observe(el);
});

/* ===== 3. THEME TOGGLE ===== */
const root = document.documentElement, themeBtn = document.getElementById("themeBtn");
function applyTheme(t) {
  root.dataset.theme = t;
  themeBtn.innerHTML = `<i class="fas fa-${t === "dark" ? "sun" : "moon"}"></i>`;
  try { localStorage.setItem("theme", t); } catch (e) {}
}
let saved = "light";
try { saved = localStorage.getItem("theme") || "light"; } catch (e) {}
applyTheme(saved);
themeBtn.onclick = () => applyTheme(root.dataset.theme === "dark" ? "light" : "dark");

/* ===== 4. PROJECT IMAGE EXPAND ===== */
function toggleImg(btn) {
  const wrap = btn.closest(".proj").querySelector(".pimg");
  const open = wrap.classList.toggle("open");
  btn.innerHTML = open ? '<i class="fas fa-eye-slash"></i> Hide' : '<i class="fas fa-eye"></i> View';
}

/* ===== 5. MODAL (DETAILS / CODE) ===== */
const modal = document.getElementById("projectModal");
function openModal(title, file) {
  const body = document.getElementById("modalBody"), copy = document.getElementById("copyBtn");
  document.getElementById("modalTitle").innerText = title;
  body.innerHTML = "Loading...";
  copy.style.display = "none";
  modal.style.display = "block";
  fetch(file)
    .then(r => { if (!r.ok) throw new Error("File not found"); return r.text(); })
    .then(data => {
      if (file.endsWith(".txt")) {
        body.innerHTML = `<pre class="language-cpp"><code class="language-cpp">${data.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</code></pre>`;
        copy.style.display = "inline-flex";
        if (window.Prism) Prism.highlightAllUnder(body);
      } else body.innerHTML = data;
    })
    .catch(() => (body.innerHTML = "❌ Could not load the requested file."));
}
function closeModal() { modal.style.display = "none"; }
modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });
addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });

function copyCode() {
  const code = document.querySelector("#modalBody code"), btn = document.getElementById("copyBtn");
  if (!code) return;
  navigator.clipboard.writeText(code.innerText).then(() => {
    const old = btn.innerText; btn.innerText = "Copied ✓";
    setTimeout(() => (btn.innerText = old), 1500);
  });
}

/* ===== 6. EMAILJS CONTACT FORM ===== */
addEventListener("load", () => {
  if (window.emailjs) emailjs.init({ publicKey: "TZWUr1PeHYnnlkkBN" });
  const form = document.getElementById("contact-form");
  form.addEventListener("submit", e => {
    e.preventDefault();
    emailjs.sendForm("service_9uitjh4", "template_re3hdru", form)
      .then(() => { alert("✅ Message sent successfully!"); form.reset(); })
      .catch(err => { alert("❌ Failed to send. Please try again later."); console.error(err); });
  });
});
