 /*const ledPatternDetails = `
<h3>Generating LED Patterns Using Arduino</h3>

<p>
This Arduino-based project generates different LED lighting patterns
using multiple LEDs mounted on a dotted PCB board.
Each LED is connected through a resistor to protect it from excess current.
</p>

<h4>Working Principle</h4>
<ul>
  <li>Arduino UNO digital pins are connected to multiple LEDs.</li>
  <li>The program turns LEDs ON and OFF in different sequences.</li>
  <li>Delay timing controls the speed of the pattern.</li>
  <li>By changing the sequence, different visual effects are created.</li>
</ul>

<h4>Features</h4>
<ul>
  <li>Running light pattern</li>
  <li>Blinking and wave effects</li>
  <li>Low-cost and easy to build</li>
  <li>Good beginner embedded project</li>
</ul>

<h4>Applications</h4>
<ul>
  <li>Decoration lighting</li>
  <li>Learning Arduino programming</li>
  <li>Basic light animation systems</li>
</ul>
`;


// ================= MODAL ELEMENTS =================
const modal = document.getElementById("projectModal");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const copyBtn = document.getElementById("copyBtn");

// store currently opened code text for copy
let currentCodeText = "";

// ================= OPEN DETAILS =================
function openDetails(fileName){
  modalTitle.innerText = "Project Details";
  copyBtn.style.display = "none"; // hide copy button for details

  fetch(fileName)
    .then(res => res.text())
    .then(html => {
      modalDesc.innerHTML = html;
      modal.style.display = "block";
    })
    .catch(err => {
      modalDesc.innerHTML = "<p style='color:red'>Unable to load details.</p>";
      modal.style.display = "block";
      console.error(err);
    });
}

// ================= OPEN CODE =================
function openCode(title, fileName){
  modalTitle.innerText = title + " - Source Code";
  copyBtn.style.display = "inline-block"; // show copy button

  fetch(fileName)
    .then(res => res.text())
    .then(code => {
      currentCodeText = code; // save for copy

      // escape HTML symbols
      const safeCode = code
        .replace(/</g,"&lt;")
        .replace(/>/g,"&gt;");

      modalDesc.innerHTML =
        `<pre><code class="language-cpp">${safeCode}</code></pre>`;

      modal.style.display = "block";

      // syntax highlight
      if(window.Prism){
        Prism.highlightAll();
      }
    })
    .catch(err => {
      modalDesc.innerHTML = "<p style='color:red'>Unable to load code.</p>";
      modal.style.display = "block";
      console.error(err);
    });
}

// ================= COPY CODE =================
function copyCode(){
  if(!currentCodeText) return;

  navigator.clipboard.writeText(currentCodeText)
    .then(()=>{
      copyBtn.innerText = "Copied!";
      setTimeout(()=>{ copyBtn.innerText = "📋 Copy Code"; },1500);
    });
}

// ================= CLOSE MODAL =================
function closeModal(){
  modal.style.display = "none";
}

// close when clicking outside modal box
window.onclick = function(event){
  if(event.target === modal){
    closeModal();
  }
};

// ================= SCROLL REVEAL =================
function revealOnScroll(){
  const reveals = document.querySelectorAll(".reveal");
  const trigger = window.innerHeight * 0.85;

  reveals.forEach(el=>{
    const top = el.getBoundingClientRect().top;
    if(top < trigger){
      el.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);
const ledPatternDetails = `
<h3>Generating LED Patterns Using Arduino</h3>
<p>
This project generates multiple LED lighting patterns using an Arduino UNO
and a series of LEDs connected through resistors on a dotted PCB board.
</p>

<h4>Working Principle</h4>
<ul>
<li>Arduino controls each LED through digital output pins.</li>
<li>LEDs are turned ON and OFF in different sequences.</li>
<li>Delays between operations create visual patterns.</li>
<li>Patterns repeat in a continuous loop.</li>
</ul>

<h4>Features</h4>
<ul>
<li>Multiple dynamic LED patterns</li>
<li>Simple and low-cost circuit</li>
<li>Easy to expand with more LEDs</li>
<li>Great for beginners in Arduino</li>
</ul>

<h4>Applications</h4>
<ul>
<li>Decorative lighting</li>
<li>Learning Arduino digital output</li>
<li>Signal indicators</li>
<li>Mini light shows</li>
</ul>
`;
function openModal(title, file) {
  document.getElementById("modalTitle").innerText = title;

  fetch(file)
    .then(response => response.text())
    .then(data => {
      document.getElementById("modalBody").innerHTML =
        "<pre>" + data.replace(/</g,"&lt;") + "</pre>";
      document.getElementById("projectModal").style.display = "block";
    });
}

function closeModal() {
  document.getElementById("projectModal").style.display = "none";
}
function openModal(title, file) {
  document.getElementById("modalTitle").innerText = title;

  fetch(file)
    .then(response => response.text())
    .then(data => {
      document.getElementById("modalBody").innerHTML =
        "<pre>" + data.replace(/</g,"&lt;") + "</pre>";
      document.getElementById("projectModal").style.display = "block";
    })
    .catch(() => {
      document.getElementById("modalBody").innerHTML =
        "File not found!";
      document.getElementById("projectModal").style.display = "block";
    });
}

function closeModal() {
  document.getElementById("projectModal").style.display = "none";
}
*/
// Open modal and load text/code from file
function openModal(title, file) {
  const modal = document.getElementById("projectModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalBody = document.getElementById("modalBody");
  const copyBtn = document.querySelector(".copy-btn");

  modalTitle.innerText = title;
  modalBody.innerHTML = "Loading...";
  copyBtn.style.display = "none"; // hide by default

  fetch(file)
    .then(res => {
      if (!res.ok) throw new Error("File not found");
      return res.text();
    })
    .then(data => {

      // ===== CODE MODE =====
      if (file.toLowerCase().includes("code")) {

        let code = data
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  .replace(/(#include|#define)/g, '<span class="pre">$1</span>')
  .replace(/\b(int|bool|void|const|unsigned|long|float|char)\b/g, '<span class="kw">$1</span>')
  .replace(/\b(\d+)\b/g, '<span class="num">$1</span>')
  .replace(/"(.*?)"/g, '<span class="str">"$1"</span>')
  .replace(/\/\/(.*)/g, '<span class="com">//$1</span>');

modalBody.innerHTML = `<pre><code>${code}</code></pre>`;

        copyBtn.style.display = "inline-block";

      } 
      // ===== DETAILS MODE =====
      else {
        let lines = data.split("\n");
        let html = "";
        let inList = false;

        lines.forEach(line => {
          line = line.trim();

          if (line.startsWith("## ")) {
            if (inList) { html += "</ul>"; inList = false; }
            html += `<h3>${line.replace("## ", "")}</h3>`;
          }
          else if (line.startsWith("- ")) {
            if (!inList) { html += "<ul>"; inList = true; }
            html += `<li>${line.replace("- ", "")}</li>`;
          }
          else if (line !== "") {
            if (inList) { html += "</ul>"; inList = false; }
            html += `<p>${line}</p>`;
          }
        });

        if (inList) html += "</ul>";

        modalBody.innerHTML = `<div class="details-text">${html}</div>`;
        copyBtn.style.display = "none";
      }
    })
    .catch(() => {
      modalBody.innerHTML = "❌ File not found!";
      copyBtn.style.display = "none";
    });

  modal.style.display = "block";
}

// Close modal
function closeModal() {
  document.getElementById("projectModal").style.display = "none";
}

// Close modal when clicking outside the content box
window.onclick = function (event) {
  const modal = document.getElementById("projectModal");
  const content = document.querySelector(".modal-content");

  if (event.target === modal) {
    closeModal();
  }
};

// Simple reveal animation on scroll (optional nice effect)
function revealOnScroll() {
  const reveals = document.querySelectorAll(".reveal");

  for (let i = 0; i < reveals.length; i++) {
    const windowHeight = window.innerHeight;
    const elementTop = reveals[i].getBoundingClientRect().top;
    const revealPoint = 100;

    if (elementTop < windowHeight - revealPoint) {
      reveals[i].classList.add("active");
    }
  }
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

function copyCode() {
  const text = document.getElementById("modalBody").innerText;
  navigator.clipboard.writeText(text);

  const toast = document.createElement("div");
  toast.innerText = "Code copied!";
  toast.className = "copy-toast";
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 2000);
}

function toggleTheme(){
  document.body.classList.toggle("light-mode");

  const icon = document.querySelector(".theme-toggle i");

  if(document.body.classList.contains("light-mode")){
    icon.classList.remove("fa-moon");
    icon.classList.add("fa-sun");   // show light symbol in light mode
  }else{
    icon.classList.remove("fa-sun");
    icon.classList.add("fa-moon");  // show dark symbol in dark mode
  }
}
