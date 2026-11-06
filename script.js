/* =====================================
   1. CIRCUIT SWARM CURSOR
   Dots drift, link to each other, and swarm
   + connect to the cursor / finger.
===================================== */
const cv = document.getElementById("swarm"), cx = cv.getContext("2d");
const COLORS = ["0,200,255", "168,85,247", "0,255,136"];      // dark mode
const COLORS_LIGHT = ["0,134,179", "138,43,226", "0,163,92"];   // light mode
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
const mouse = { x: -999, y: -999, on: false };
let W, H, nodes = [];

function resize() {
  const d = window.devicePixelRatio || 1;
  W = innerWidth; H = innerHeight;
  cv.width = W * d; cv.height = H * d;
  cx.setTransform(d, 0, 0, d, 0, 0);
  const n = Math.min(120, Math.floor((W * H) / 12000));
  nodes = Array.from({ length: n }, (_, i) => {
    const bx = (Math.random() - 0.5) * 0.55, by = (Math.random() - 0.5) * 0.55;
    return { x: Math.random() * W, y: Math.random() * H, vx: bx, vy: by, bx, by,
             k: i % 3, r: 1.5 + Math.random() * 1.8 };
  });
}

function frame() {
  cx.clearRect(0, 0, W, H);
  for (const a of nodes) {
    const dx = mouse.x - a.x, dy = mouse.y - a.y, d = Math.hypot(dx, dy);
    a.vx += (a.bx - a.vx) * 0.02;
    a.vy += (a.by - a.vy) * 0.02;
    if (mouse.on && d < 190 && d > 1) {            // swarm: pull in + orbit
      a.vx += (dx / d) * 0.07 - (dy / d) * 0.03;
      a.vy += (dy / d) * 0.07 + (dx / d) * 0.03;
    }
    const s = Math.hypot(a.vx, a.vy);
    if (s > 2.8) { a.vx *= 2.8 / s; a.vy *= 2.8 / s; }
    a.x += a.vx; a.y += a.vy;
    if (a.x < 0 || a.x > W) a.vx *= -1;
    if (a.y < 0 || a.y > H) a.vy *= -1;
  }
  for (let i = 0; i < nodes.length; i++) {
    const a = nodes[i];
    cx.lineWidth = 1;
    for (let j = i + 1; j < nodes.length; j++) {   // node-to-node circuit lines
      const b = nodes[j], d = Math.hypot(a.x - b.x, a.y - b.y);
      if (d < 120) {
        cx.strokeStyle = `rgba(${pal[a.k]},${(1 - d / 120) * 0.32})`;
        cx.beginPath(); cx.moveTo(a.x, a.y); cx.lineTo(b.x, b.y); cx.stroke();
      }
    }
    if (mouse.on) {                                 // node-to-cursor lines
      const d = Math.hypot(a.x - mouse.x, a.y - mouse.y);
      if (d < 200) {
        cx.strokeStyle = `rgba(${pal[a.k]},${(1 - d / 200) * 0.85})`;
        cx.lineWidth = 1.4;
        cx.beginPath(); cx.moveTo(a.x, a.y); cx.lineTo(mouse.x, mouse.y); cx.stroke();
      }
    }
    cx.shadowBlur = root.getAttribute("data-theme") === "light" ? 0 : 8; cx.shadowColor = `rgb(${pal[a.k]})`;
    cx.fillStyle = `rgba(${pal[a.k]},.95)`;
    cx.beginPath(); cx.arc(a.x, a.y, a.r, 0, Math.PI * 2); cx.fill();
    cx.shadowBlur = 0;
  }
  if (mouse.on) {                                   // cursor core
    cx.strokeStyle = `rgba(${pal[2]},.95)`; cx.lineWidth = 1.5;
    cx.beginPath(); cx.arc(mouse.x, mouse.y, 8, 0, Math.PI * 2); cx.stroke();
    cx.fillStyle = `rgb(${pal[0]})`;
    cx.beginPath(); cx.arc(mouse.x, mouse.y, 3, 0, Math.PI * 2); cx.fill();
  }
  requestAnimationFrame(frame);
}

const setPos = (x, y) => { mouse.x = x; mouse.y = y; mouse.on = true; };
addEventListener("mousemove", e => setPos(e.clientX, e.clientY));
addEventListener("touchstart", e => setPos(e.touches[0].clientX, e.touches[0].clientY), { passive: true });
addEventListener("touchmove", e => setPos(e.touches[0].clientX, e.touches[0].clientY), { passive: true });
addEventListener("touchend", () => setTimeout(() => (mouse.on = false), 700));
document.addEventListener("mouseleave", () => (mouse.on = false));
addEventListener("resize", resize);
resize(); frame();

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
