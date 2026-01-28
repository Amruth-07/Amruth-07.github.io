/* ===============================
   SCROLL REVEAL ANIMATION
================================ */
const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
  reveals.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - 80) {
      el.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();


/* ===============================
   PROJECT THEORY / DETAILS
================================ */

/* ---- PROJECT 1 ---- */
const oscilloscopeDetails = `
<h3>📟 Portable Oscilloscope using Arduino</h3>

<p>
A portable oscilloscope is a compact electronic instrument used to visualize
electrical signals in real time. This project is designed as a <b>low-cost
oscilloscope</b> using an Arduino microcontroller and an OLED display.
</p>

<h4>🔧 Working Principle</h4>
<ul>
  <li>The analog signal is applied to the Arduino ADC pin</li>
  <li>Arduino samples the signal using its built-in ADC</li>
  <li>Sampled values are mapped to pixel coordinates</li>
  <li>The waveform is drawn on the OLED display</li>
</ul>

<h4>📌 Features</h4>
<ul>
  <li>Displays sine, square, and triangle waveforms</li>
  <li>Portable and low power</li>
  <li>Real-time signal visualization</li>
  <li>Low-cost alternative to lab oscilloscopes</li>
</ul>

<h4>🧠 Applications</h4>
<ul>
  <li>Educational labs</li>
  <li>Signal testing</li>
  <li>Embedded system debugging</li>
</ul>
`;

/* ---- PROJECT 2 ---- */
const agriguardDetails = `
<h3>🌱 AgriGuard – Smart IoT System for Farming & Security</h3>

<p>
AgriGuard is an <b>IoT-based smart agriculture system</b> developed using ESP32.
It automates irrigation and improves farm security using sensors and cloud
monitoring.
</p>

<h4>🔧 Working Principle</h4>
<ul>
  <li>Soil moisture sensor checks water content</li>
  <li>ESP32 controls the water pump automatically</li>
  <li>DHT11 measures temperature & humidity</li>
  <li>Flame & LDR sensors provide security alerts</li>
  <li>Data is uploaded to ThingSpeak cloud</li>
</ul>

<h4>📌 Features</h4>
<ul>
  <li>Automatic irrigation system</li>
  <li>Real-time IoT monitoring</li>
  <li>Fire and intrusion detection</li>
  <li>Cloud-based visualization</li>
</ul>

<h4>🧠 Applications</h4>
<ul>
  <li>Smart farming</li>
  <li>Water conservation</li>
  <li>Farm security monitoring</li>
</ul>
`;

/* ---- PROJECT 3 ---- */
const testerDetails = `
<h3>🔌 All-in-One Electronic Component Tester</h3>

<p>
This project is an <b>automatic electronic component tester</b> that identifies
and tests basic electronic components using an Arduino-based system.
</p>

<h4>🔧 Working Principle</h4>
<ul>
  <li>Component is connected to test terminals</li>
  <li>Arduino applies test voltages</li>
  <li>Voltage/current response is measured</li>
  <li>Component type and value are calculated</li>
</ul>

<h4>📌 Features</h4>
<ul>
  <li>Tests resistors, capacitors, diodes</li>
  <li>Identifies transistor pin configuration</li>
  <li>Continuity checking</li>
  <li>LCD display output</li>
</ul>

<h4>🧠 Applications</h4>
<ul>
  <li>Electronics labs</li>
  <li>Component verification</li>
  <li>Repair and maintenance</li>
</ul>
`;


/* ===============================
   MODAL CONTROL
================================ */
function openModal(title, content) {
  document.getElementById("modalTitle").innerHTML = title;
  document.getElementById("modalDesc").innerHTML = content;
  document.getElementById("projectModal").style.display = "block";
}

function closeModal() {
  document.getElementById("projectModal").style.display = "none";
}


/* ===============================
   LOAD & SHOW CODE FILES
================================ */
function openCode(title, fileName) {
  fetch(fileName)
    .then(response => {
      if (!response.ok) {
        throw new Error("File not found");
      }
      return response.text();
    })
    .then(code => {
      document.getElementById("modalTitle").innerHTML = title + " – Source Code";
      document.getElementById("modalDesc").innerHTML = `
        <pre><code>${escapeHtml(code)}</code></pre>
      `;
      document.getElementById("projectModal").style.display = "block";
    })
    .catch(() => {
      document.getElementById("modalTitle").innerHTML = title;
      document.getElementById("modalDesc").innerHTML =
        "<p>⚠️ Code file not found. Please check filename.</p>";
      document.getElementById("projectModal").style.display = "block";
    });
}


/* ===============================
   HTML ESCAPE (SECURITY)
================================ */
function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  }
