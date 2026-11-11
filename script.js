/* =====================================
   1. OSCILLOSCOPE WAVE BACKGROUND (thin, soft-neon)
   Sine / triangle / square traces drift across the page;
   scanning beam dots ride along, and the waves bend
   and ripple around your cursor / finger.
===================================== */
const cv = document.getElementById("swarm"), cx = cv.getContext("2d");
const COLORS = ["124,212,255", "183,156,245", "126,240,189"];   // dark mode (soft neon)
const COLORS_LIGHT = ["43,143,199", "138,99,210", "31,169,122"]; // light mode
let pal = COLORS;

/* THEME TOGGLE (pure white / full black) */
const root = document.documentElement, themeBtn = document.getElementById("themeBtn");
function applyTheme(t) {
  root.setAttribute("data-theme", t);
  pal = t === "light" ? COLORS_LIGHT : COLORS;
  themeBtn.innerHTML = `<i class="fas fa-${t === "light" ? "moon" : "sun"}"></i>`;
  try { localStorage.setItem("theme", t); } catch (e) {}
}
themeBtn.onclick = () => applyTheme(root.getAttribute("data-theme") === "light" ? "dark" : "light");
applyTheme(root.getAttribute("data-theme") || "dark");

const mouse = { x: -999, y: -999, tx: -999, ty: -999, on: false };
let W, H, waves = [];
const still = matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Oscilloscope shapes: sine, triangle, (soft) square */
const SHAPES = [
  x => Math.sin(x),
  x => Math.asin(Math.sin(x)) * 2 / Math.PI,
  x => Math.tanh(3.5 * Math.sin(x))
];

function resize() {
  const d = Math.min(window.devicePixelRatio || 1, 2);
  W = innerWidth; H = innerHeight;
  cv.width = W * d; cv.height = H * d;
  cx.setTransform(d, 0, 0, d, 0, 0);
  const n = W < 600 ? 5 : 7;
  waves = Array.from({ length: n }, (_, i) => ({
    base: (H / (n + 1)) * (i + 1),
    amp: 22 + Math.random() * 30,
    freq: 0.004 + Math.random() * 0.006,
    speed: (0.5 + Math.random() * 0.9) * (i % 2 ? 1 : -1),
    phase: Math.random() * 6.28,
    shape: SHAPES[i % 3],
    k: i % 3,
    beam: Math.random() * W
  }));
}

function frame() {
  requestAnimationFrame(frame);
  if (document.hidden) return;
  const t = still ? 0 : performance.now() / 1000;
  cx.clearRect(0, 0, W, H);
  mouse.x += (mouse.tx - mouse.x) * 0.18;          // smooth cursor follow
  mouse.y += (mouse.ty - mouse.y) * 0.18;

  const yAt = (w, x) => {
    let y = w.base + w.amp * w.shape(x * w.freq * 6 + w.phase + t * w.speed);
    if (mouse.on) {                                  // cursor bends + ripples nearby waves
      const dx = x - mouse.x, dy = y - mouse.y, d2 = dx * dx + dy * dy;
      const k = Math.exp(-d2 / (2 * 150 * 150));
      y += (mouse.y - y) * 0.35 * k + Math.sin(Math.sqrt(d2) * 0.06 - t * 5) * 12 * k;
    }
    return y;
  };

  cx.lineWidth = 1;
  for (const w of waves) {
    cx.strokeStyle = `rgba(${pal[w.k]},.38)`;
    cx.beginPath();
    for (let x = 0; x <= W + 8; x += 6) {
      const y = yAt(w, x);
      x === 0 ? cx.moveTo(x, y) : cx.lineTo(x, y);
    }
    cx.stroke();
    // scanning beam dot travelling along the trace
    w.beam = (w.beam + 0.9 * Math.sign(w.speed) * (still ? 0 : 1) + W) % W;
    const by = yAt(w, w.beam);
    cx.fillStyle = `rgba(${pal[w.k]},.9)`;
    cx.beginPath(); cx.arc(w.beam, by, 2.2, 0, Math.PI * 2); cx.fill();
    cx.strokeStyle = `rgba(${pal[w.k]},.25)`;
    cx.beginPath(); cx.arc(w.beam, by, 6, 0, Math.PI * 2); cx.stroke();
  }
  if (mouse.on) {                                     // thin cursor ring
    cx.strokeStyle = `rgba(${pal[2]},.9)`; cx.lineWidth = 1;
    cx.beginPath(); cx.arc(mouse.x, mouse.y, 9, 0, Math.PI * 2); cx.stroke();
    cx.fillStyle = `rgb(${pal[0]})`;
    cx.beginPath(); cx.arc(mouse.x, mouse.y, 2, 0, Math.PI * 2); cx.fill();
  }
}

const setPos = (x, y) => {
  if (!mouse.on) { mouse.x = x; mouse.y = y; }
  mouse.tx = x; mouse.ty = y; mouse.on = true;
};
addEventListener("mousemove", e => setPos(e.clientX, e.clientY));
addEventListener("touchstart", e => setPos(e.touches[0].clientX, e.touches[0].clientY), { passive: true });
addEventListener("touchmove", e => setPos(e.touches[0].clientX, e.touches[0].clientY), { passive: true });
addEventListener("touchend", () => setTimeout(() => (mouse.on = false), 700));
document.addEventListener("mouseleave", () => (mouse.on = false));
addEventListener("resize", resize);
resize(); frame();

/* THIN SCROLL PROGRESS LINE */
const bar = document.getElementById("bar");
function progress() {
  const max = document.documentElement.scrollHeight - innerHeight;
  bar.style.width = (max > 0 ? (scrollY / max) * 100 : 0) + "%";
}
addEventListener("scroll", progress, { passive: true });
progress();

/* =====================================
   2. TYPING ROLE LINE
===================================== */
const roles = ["Embedded Systems Developer", "PCB Designer", "IoT Builder", "ECE Engineer"];
const typed = document.getElementById("typed");
let ri = 0, ci = 0, del = false;
function type() {
  const word = roles[ri];
  typed.textContent = word.slice(0, ci);
  if (!del && ci < word.length) ci++;
  else if (!del) { del = true; return setTimeout(type, 1400); }
  else if (ci > 0) ci--;
  else { del = false; ri = (ri + 1) % roles.length; }
  setTimeout(type, del ? 40 : 85);
}
type();

/* =====================================
   3. SCROLL REVEAL + STAT COUNTERS
===================================== */
const revealIO = new IntersectionObserver(list => {
  list.forEach(en => {
    if (en.isIntersecting) { en.target.classList.add("show"); revealIO.unobserve(en.target); }
  });
}, { threshold: 0.1 });
document.querySelectorAll(".rv").forEach(el => revealIO.observe(el));

const statsIO = new IntersectionObserver(list => {
  list.forEach(en => {
    if (!en.isIntersecting) return;
    en.target.querySelectorAll("[data-n]").forEach(el => {
      const end = +el.dataset.n; let n = 0;
      const t = setInterval(() => { el.textContent = ++n; if (n >= end) clearInterval(t); }, 180);
    });
    statsIO.unobserve(en.target);
  });
}, { threshold: 0.4 });
statsIO.observe(document.querySelector(".stats"));

/* =====================================
   4. BOTTOM DOCK ACTIVE LINK
===================================== */
const dockMap = { home: "home", about: "about", skills: "about", experience: "about",
                  projects: "projects", certs: "certs", interests: "certs", resume: "certs", contact: "contact" };
const dockLinks = document.querySelectorAll(".dock a");
const dockIO = new IntersectionObserver(list => {
  list.forEach(en => {
    if (!en.isIntersecting) return;
    const target = dockMap[en.target.id];
    dockLinks.forEach(a => a.classList.toggle("on", a.getAttribute("href") === "#" + target));
  });
}, { rootMargin: "-45% 0px -50% 0px" });
Object.keys(dockMap).forEach(id => { const el = document.getElementById(id); if (el) dockIO.observe(el); });

/* =====================================
   5. PROJECT IMAGE EXPAND
===================================== */
function toggleImg(btn) {
  const wrap = btn.closest(".pcard").querySelector(".pimg");
  const open = wrap.classList.toggle("open");
  btn.innerHTML = open ? '<i class="fas fa-eye-slash"></i> Hide' : '<i class="fas fa-eye"></i> View';
}

/* =====================================
   6. MODAL (DETAILS / CODE) + COPY
===================================== */
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

/* =====================================
   7. EMAILJS CONTACT FORM
===================================== */
addEventListener("load", () => {
  if (window.emailjs) emailjs.init({ publicKey: "TZWUr1PeHYnnlkkBN" });
  const form = document.getElementById("contact-form");
  form.addEventListener("submit", e => {
    e.preventDefault();
    emailjs.sendForm("service_9uitjh4", "template_re3hdru", form)
      .then(() => { alert("✅ Message sent successfully!"); form.reset(); })
      .catch(err => { alert("❌ Failed to send message. Please try again later."); console.error(err); });
  });
});
