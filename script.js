/* ================= SCROLL REVEAL ================= */
window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

function revealOnScroll(){
  document.querySelectorAll(".reveal").forEach(el => {
    const top = el.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if(top < windowHeight - 80){
      el.classList.add("active");
    }
  });
}

/* ================= MODAL HANDLING ================= */
function openModal(title, content){
  const modal = document.getElementById("projectModal");
  document.getElementById("modalTitle").innerText = title;
  document.getElementById("modalDesc").innerHTML = content;

  modal.style.display = "block";
  document.body.style.overflow = "hidden";
}

function closeModal(){
  document.getElementById("projectModal").style.display = "none";
  document.body.style.overflow = "auto";
}

/* Close modal on outside click */
window.addEventListener("click", function(e){
  const modal = document.getElementById("projectModal");
  if(e.target === modal){
    closeModal();
  }
});

/* ================= LOAD & SHOW CODE ================= */
function openCode(title, file){
  fetch(file)
    .then(res => res.text())
    .then(code => {
      const formattedCode = `
        <button onclick="copyCode()" class="copy-btn">📋 Copy</button>
        <pre><code class="language-c">${escapeHtml(code)}</code></pre>
      `;
      openModal(title + " – Code", formattedCode);
      Prism.highlightAll();
    })
    .catch(() => {
      openModal("Error", "<p>⚠ Code file not found.</p>");
    });
}

/* ================= COPY CODE ================= */
function copyCode(){
  const code = document.querySelector("#modalDesc code").innerText;
  navigator.clipboard.writeText(code).then(() => {
    alert("✅ Code copied to clipboard!");
  });
}

/* ================= HTML ESCAPE ================= */
function escapeHtml(text){
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/* ================= PROJECT DETAILS ================= */

/* Project 1 */
const oscilloscopeDetails = `
<b>Introduction</b>
<p>
A portable oscilloscope is an electronic instrument used to observe signal
voltages over time. This project implements a low-cost oscilloscope using Arduino.
</p>

<b>Working Principle</b>
<ul>
  <li>Analog signal applied to Arduino ADC pin</li>
  <li>ADC samples the input voltage</li>
  <li>Waveform plotted on OLED display</li>
</ul>

<b>Advantages</b>
<ul>
  <li>Low cost</li>
  <li>Portable</li>
  <li>Easy to understand</li>
</ul>

<b>Applications</b>
<p>
Educational labs, signal analysis, electronics testing.
</p>
`;

/* Project 2 */
const agriguardDetails = `
<b>Introduction</b>
<p>
AgriGuard is a smart IoT-based farming system that automates irrigation and
improves farm security using sensors and ESP32.
</p>

<b>Working Principle</b>
<ul>
  <li>Soil moisture sensor controls water pump</li>
  <li>DHT11 measures temperature & humidity</li>
  <li>Flame sensor detects fire</li>
  <li>Laser-LDR detects intrusion</li>
</ul>

<b>Advantages</b>
<ul>
  <li>Efficient water usage</li>
  <li>Improved safety</li>
  <li>Remote monitoring</li>
</ul>

<b>Applications</b>
<p>
Smart farming, greenhouses, home gardens.
</p>
`;

/* Project 3 */
const testerDetails = `
<b>Introduction</b>
<p>
An all-in-one component tester used to test resistors, capacitors, diodes,
transistors, and continuity.
</p>

<b>Working Principle</b>
<ul>
  <li>Arduino measures voltage and current</li>
  <li>Calculates component values</li>
  <li>Results shown on display</li>
</ul>

<b>Applications</b>
<p>
Electronics labs, component testing, troubleshooting.
</p>
`;

/* Project 4 */
const ledDetails = `
<b>Introduction</b>
<p>
This project demonstrates generating LED patterns using Arduino UNO with
10 LEDs mounted on a dotted PCB board.
</p>

<b>Working Principle</b>
<ul>
  <li>Digital pins control LEDs</li>
  <li>Different delay patterns create effects</li>
  <li>Resistors protect LEDs from overcurrent</li>
</ul>

<b>Applications</b>
<p>
Learning digital electronics, Arduino basics, LED control.
</p>
`;
