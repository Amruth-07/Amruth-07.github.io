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
   PROJECT THEORY / DETAILS
================================ */

/* ---- PROJECT 1 ---- */
const oscilloscopeDetails = `
<h3>ðŸ“Ÿ Portable Oscilloscope using Arduino</h3>

<p>
A portable oscilloscope is a compact electronic instrument used to visualize
electrical signals in real time. This project is designed as a <b>low-cost
oscilloscope</b> using an Arduino microcontroller and an OLED display.
</p>

<h4>ðŸ”§ Working Principle</h4>
<ul>
  <li>The analog signal is applied to the Arduino ADC pin</li>
  <li>Arduino samples the signal using its built-in ADC</li>
  <li>Sampled values are mapped to pixel coordinates</li>
  <li>The waveform is drawn on the OLED display</li>
</ul>

<h4>ðŸ“Œ Features</h4>
<ul>
  <li>Displays sine, square, and triangle waveforms</li>
  <li>Portable and low power</li>
  <li>Real-time signal visualization</li>
  <li>Low-cost alternative to lab oscilloscopes</li>
</ul>

<h4>ðŸ§  Applications</h4>
<ul>
  <li>Educational labs</li>
  <li>Signal testing</li>
  <li>Embedded system debugging</li>
</ul>
`;

/* ---- PROJECT 2 ---- */
const agriguardDetails = `
<h3>ðŸŒ± AgriGuard â€“ Smart IoT System for Farming & Security</h3>

<p>
AgriGuard is an <b>IoT-based smart agriculture system</b> developed using ESP32.
It automates irrigation and improves farm security using sensors and cloud
monitoring.
</p>

<h4>ðŸ”§ Working Principle</h4>
<ul>
  <li>Soil moisture sensor checks water content</li>
  <li>ESP32 controls the water pump automatically</li>
  <li>DHT11 measures temperature & humidity</li>
  <li>Flame & LDR sensors provide security alerts</li>
  <li>Data is uploaded to ThingSpeak cloud</li>
</ul>

<h4>ðŸ“Œ Features</h4>
<ul>
  <li>Automatic irrigation system</li>
  <li>Real-time IoT monitoring</li>
  <li>Fire and intrusion detection</li>
  <li>Cloud-based visualization</li>
</ul>

<h4>ðŸ§  Applications</h4>
<ul>
  <li>Smart farming</li>
  <li>Water conservation</li>
  <li>Farm security monitoring</li>
</ul>
`;

/* ---- PROJECT 3 ---- */
const testerDetails = `
<h3>ðŸ”Œ All-in-One Electronic Component Tester</h3>

<p>
This project is an <b>automatic electronic component tester</b> that identifies
and tests basic electronic components using an Arduino-based system.
</p>

<h4>ðŸ”§ Working Principle</h4>
<ul>
  <li>Component is connected to test terminals</li>
  <li>Arduino applies test voltages</li>
  <li>Voltage/current response is measured</li>
  <li>Component type and value are calculated</li>
</ul>

<h4>ðŸ“Œ Features</h4>
<ul>
  <li>Tests resistors, capacitors, diodes</li>
  <li>Identifies transistor pin configuration</li>
  <li>Continuity checking</li>
  <li>LCD display output</li>
</ul>

<h4>ðŸ§  Applications</h4>
<ul>
  <li>Electronics labs</li>
  <li>Component verification</li>
  <li>Repair and maintenance</li>
</ul>
`;

/* ---- PROJECT 4 ---- */
const ledPatternDetails = `
<h4>ðŸ“Œ Project Overview</h4>
<p>
The <b>Generating LED Patterns Using Arduino</b> project demonstrates how multiple LEDs
can be controlled using an Arduino UNO to create different lighting patterns.
It helps beginners understand digital output control, timing, and sequencing.
</p>

<h4>âš™ï¸ Components Used</h4>
<ul>
  <li>Arduino UNO</li>
  <li>10 Ã— LEDs (Different colors)</li>
  <li>10 Ã— Resistors (220Î©)</li>
  <li>Dotted PCB Board</li>
  <li>Connecting Wires</li>
</ul>

<h4>ðŸ”Œ Working Principle</h4>
<p>
Each LED is connected to a digital output pin of the Arduino through a current-limiting resistor.
The Arduino sends HIGH and LOW signals in a programmed sequence, creating
patterns such as running lights, blinking, and alternate LEDs.
</p>

<h4>ðŸŽ¯ Applications</h4>
<ul>
  <li>Learning Arduino digital I/O</li>
  <li>Decorative LED lighting</li>
  <li>Signal indicators</li>
  <li>Embedded systems practice</li>
</ul>
`;
/* ===============================
   MODAL FUNCTIONS
================================ */

function openModal(title, content) {
  document.getElementById("modalTitle").innerText = title;
  document.getElementById("modalDesc").innerHTML = content;
  document.getElementById("projectModal").style.display = "block";

  // Hide copy button for details
  document.getElementById("copyBtn").style.display = "none";
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

      document.getElementById("modalTitle").innerText =
        title + " â€“ Source Code";

      document.getElementById("modalDesc").innerHTML = `
<pre><code class="language-cpp">${escapeHtml(code)}</code></pre>
      `;

      document.getElementById("projectModal").style.display = "block";

      // Show copy button
      document.getElementById("copyBtn").style.display = "inline-block";

      Prism.highlightAll();
    })
    .catch(() => {
      openModal(title, "<p>âŒ Code file not found</p>");
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
function copyCode() {
  const codeElement = document.querySelector("#modalDesc code");
  if (!codeElement) return;

  navigator.clipboard.writeText(codeElement.innerText)
    .then(() => {
      const btn = document.getElementById("copyBtn");
      btn.innerText = "âœ… Copied!";
      setTimeout(() => btn.innerText = "ðŸ“‹ Copy Code", 1500);
    });
}
