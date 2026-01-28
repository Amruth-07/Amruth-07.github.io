/* =========================
   SCROLL REVEAL ANIMATION
========================= */
const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
  reveals.forEach(el => {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;
    if (elementTop < windowHeight - 80) {
      el.classList.add("active");
    }
  });
}
window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

/* =========================
   PROJECT DETAILS (THEORY)
========================= */
const oscilloscopeDetails = `
<h4>📌 Overview</h4>
<p>
This project implements a low-cost portable oscilloscope using an Arduino
microcontroller and OLED display. It is designed to visualize analog
waveforms such as sine, square, and triangle signals.
</p>

<h4>⚙️ Working Principle</h4>
<ul>
  <li>The analog signal is sampled using Arduino ADC.</li>
  <li>Samples are mapped to OLED pixel coordinates.</li>
  <li>Waveform is plotted in real time.</li>
</ul>

<h4>🧠 Applications</h4>
<ul>
  <li>Educational labs</li>
  <li>Signal analysis</li>
  <li>Embedded debugging</li>
</ul>
`;

const agriguardDetails = `
<h4>📌 Overview</h4>
<p>
AgriGuard is an IoT-based smart farming system using ESP32 to automate irrigation
and improve farm security.
</p>

<h4>⚙️ Working Principle</h4>
<ul>
  <li>Soil moisture sensor monitors water level.</li>
  <li>ESP32 controls pump automatically.</li>
  <li>Data is sent to ThingSpeak cloud.</li>
</ul>

<h4>🧠 Applications</h4>
<ul>
  <li>Smart agriculture</li>
  <li>Water conservation</li>
  <li>Remote monitoring</li>
</ul>
`;

const testerDetails = `
<h4>📌 Overview</h4>
<p>
An all-in-one electronic component tester that identifies resistors,
capacitors, diodes, transistors, and checks continuity.
</p>

<h4>⚙️ Working Principle</h4>
<ul>
  <li>Component is inserted into test pins.</li>
  <li>Arduino measures voltage and current.</li>
  <li>OLED displays component type and value.</li>
</ul>

<h4>🧠 Applications</h4>
<ul>
  <li>Electronics labs</li>
  <li>Fault detection</li>
  <li>Component verification</li>
</ul>
`;

/* =========================
   OPEN DETAILS MODAL
========================= */
function openModal(title, content) {
  document.getElementById("modalTitle").innerHTML = title;
  document.getElementById("modalDesc").innerHTML = content;
  document.getElementById("projectModal").style.display = "block";
}

/* =========================
   OPEN CODE MODAL (FETCH)
========================= */
function openCode(title, file) {
  fetch(file)
    .then(res => res.text())
    .then(code => {
      document.getElementById("modalTitle").innerHTML =
        title + " – Source Code";

      document.getElementById("modalDesc").innerHTML = `
<pre><code class="language-c">${escapeHtml(code)}</code></pre>
      `;

      document.getElementById("projectModal").style.display = "block";

      // Prism highlight
      Prism.highlightAll();
    })
    .catch(() => {
      document.getElementById("modalDesc").innerHTML =
        "<p style='color:red'>Code file not found</p>";
    });
}

/* =========================
   CLOSE MODAL
========================= */
function closeModal() {
  document.getElementById("projectModal").style.display = "none";
}

/* =========================
   HTML ESCAPE (IMPORTANT)
========================= */
function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
