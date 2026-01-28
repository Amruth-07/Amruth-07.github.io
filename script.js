/* ===============================
   SCROLL REVEAL
================================ */
const reveals = document.querySelectorAll(".reveal");

window.addEventListener("scroll", () => {
  reveals.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - 80) {
      el.classList.add("active");
    }
  });
});

/* ===============================
   PROJECT DETAILS CONTENT
================================ */

const oscilloscopeDetails = `
<h4>📌 Project Overview</h4>
<p>
This project implements a low-cost portable oscilloscope using an Arduino
microcontroller and an OLED display. It is capable of displaying basic
waveforms such as sine, square, and triangle waves.
</p>

<h4>⚙ Working Principle</h4>
<ul>
<li>Analog signals are sampled using Arduino ADC</li>
<li>Voltage values are mapped to screen pixels</li>
<li>Waveforms are drawn in real time on OLED</li>
</ul>

<h4>🧰 Components Used</h4>
<ul>
<li>Arduino Uno / Nano</li>
<li>OLED Display (SSD1306)</li>
<li>Signal Generator / Probe</li>
</ul>

<h4>🎯 Applications</h4>
<ul>
<li>Educational labs</li>
<li>Signal visualization</li>
<li>Embedded system debugging</li>
</ul>
`;

const agriguardDetails = `
<h4>📌 Project Overview</h4>
<p>
AgriGuard is an IoT-based smart farming system designed to automate irrigation
and improve farm security using ESP32.
</p>

<h4>⚙ Working Principle</h4>
<ul>
<li>Soil moisture sensor detects water level</li>
<li>ESP32 controls water pump automatically</li>
<li>Sensor data uploaded to ThingSpeak cloud</li>
</ul>

<h4>🧰 Components Used</h4>
<ul>
<li>ESP32</li>
<li>Soil Moisture Sensor</li>
<li>DHT11</li>
<li>Relay Module</li>
</ul>

<h4>🎯 Applications</h4>
<ul>
<li>Smart agriculture</li>
<li>Remote monitoring</li>
<li>Water conservation</li>
</ul>
`;

const testerDetails = `
<h4>📌 Project Overview</h4>
<p>
This project is an all-in-one electronic component tester that identifies
resistors, capacitors, diodes, and transistors automatically.
</p>

<h4>⚙ Working Principle</h4>
<ul>
<li>Component inserted between test pins</li>
<li>Arduino analyzes voltage and current</li>
<li>Results displayed on OLED screen</li>
</ul>

<h4>🧰 Components Used</h4>
<ul>
<li>Arduino</li>
<li>OLED Display</li>
<li>Test Pins</li>
</ul>

<h4>🎯 Applications</h4>
<ul>
<li>Electronics labs</li>
<li>Quick component testing</li>
<li>Repair & maintenance</li>
</ul>
`;

/* ===============================
   MODAL FUNCTIONS
================================ */

function openModal(title, content) {
  const modal = document.getElementById("projectModal");
  document.getElementById("modalTitle").innerText = title;
  document.getElementById("modalDesc").innerHTML = content;
  modal.style.display = "block";
}

function closeModal() {
  document.getElementById("projectModal").style.display = "none";
}

/* ===============================
   CODE VIEWER
================================ */

function openCode(title, fileName) {
  fetch(fileName)
    .then(res => res.text())
    .then(code => {
      openModal(
        title + " – Source Code",
        `<pre><code class="language-cpp">${escapeHtml(code)}</code></pre>`
      );
      Prism.highlightAll();
    })
    .catch(() => {
      openModal(title, "<p>❌ Code file not found</p>");
    });
}

/* ===============================
   HTML ESCAPE (IMPORTANT)
================================ */

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
