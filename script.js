// Scroll reveal
window.addEventListener("scroll", () => {
  document.querySelectorAll(".reveal").forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight - 50) {
      el.classList.add("active");
    }
  });
});

// Open modal (Details OR Code)
function openModal(title, content) {
  document.getElementById("modalTitle").innerText = title;
  document.getElementById("modalDesc").innerHTML = content;
  document.getElementById("projectModal").style.display = "block";
}

// Close modal
function closeModal() {
  document.getElementById("projectModal").style.display = "none";
}

// 🔥 LOAD CODE FROM .txt FILE
function openCode(title, file) {
  fetch(file)
    .then(res => res.text())
    .then(code => {
      document.getElementById("modalTitle").innerText = title + " – Code";
      document.getElementById("modalDesc").innerHTML = `
        <pre style="
          text-align:left;
          background:#0b0b0b;
          padding:15px;
          border-radius:10px;
          overflow-x:auto;
          font-size:13px;
          line-height:1.5;
        "><code id="codeBlock">${code}</code></pre>

        <button onclick="copyCode()" style="
          margin-top:12px;
          padding:8px 16px;
          border:none;
          border-radius:20px;
          background:linear-gradient(135deg,#7f00ff,#00d4ff);
          color:white;
          cursor:pointer;
        ">📋 Copy Code</button>
      `;
      document.getElementById("projectModal").style.display = "block";
    });
}

// Copy button
function copyCode() {
  const text = document.getElementById("codeBlock").innerText;
  navigator.clipboard.writeText(text);
  alert("✅ Code copied!");
}
/* ===== SCROLL REVEAL ===== */
const reveals = document.querySelectorAll(".reveal");

window.addEventListener("scroll", () => {
  reveals.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - 80) {
      el.classList.add("active");
    }
  });
});

/* ===== PROJECT DETAILS CONTENT ===== */
const oscilloscopeDetails = `
<h4>🔧 Portable Oscilloscope using Arduino</h4>
<ul>
  <li>Arduino-based low-cost oscilloscope</li>
  <li>OLED display for waveform visualization</li>
  <li>Displays sine, square & triangle waves</li>
  <li>ADC sampling using Arduino</li>
</ul>
`;

const agriguardDetails = `
<h4>🌱 AgriGuard – Smart IoT System</h4>
<ul>
  <li>ESP32-based smart farming solution</li>
  <li>Automatic irrigation using soil moisture</li>
  <li>Flame & security monitoring</li>
  <li>Cloud monitoring via ThingSpeak</li>
</ul>
`;

const testerDetails = `
<h4>🔌 All-in-One Component Tester</h4>
<ul>
  <li>Tests resistors, capacitors & diodes</li>
  <li>Transistor & continuity checking</li>
  <li>Arduino-based measurement system</li>
  <li>LCD display for results</li>
</ul>
`;

/* ===== OPEN DETAILS MODAL ===== */
function openModal(title, content) {
  document.getElementById("modalTitle").innerHTML = title;
  document.getElementById("modalDesc").innerHTML = content;
  document.getElementById("projectModal").style.display = "block";
}

/* ===== CLOSE MODAL ===== */
function closeModal() {
  document.getElementById("projectModal").style.display = "none";
}

/* ===== OPEN CODE MODAL ===== */
function openCode(title, file) {
  fetch(file)
    .then(res => res.text())
    .then(code => {
      document.getElementById("modalTitle").innerHTML = title + " – Code";
      document.getElementById("modalDesc").innerHTML =
        `<pre><code>${escapeHtml(code)}</code></pre>`;
      document.getElementById("projectModal").style.display = "block";
    })
    .catch(() => {
      document.getElementById("modalDesc").innerHTML = "⚠️ Code file not found.";
    });
}

/* ===== HTML ESCAPE ===== */
function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
