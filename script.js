function openModal(title, file) {
  const modal = document.getElementById("projectModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalBody = document.getElementById("modalBody");

  modalTitle.innerText = title;
  modalBody.innerHTML = "Loading...";

  fetch(file)
    .then(res => {
      if (!res.ok) throw new Error("File not found");
      return res.text();
    })
    .then(data => {

      // ===== CODE MODE =====
      if (file.toLowerCase().includes("code")) {

        modalBody.innerHTML = `
          <button class="copy-btn" onclick="copyCode()">Copy Code</button>
          <pre><code>${escapeHTML(data)}</code></pre>
        `;

        if (window.hljs) hljs.highlightAll();
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
          else if (line.startsWith("### ")) {
            if (inList) { html += "</ul>"; inList = false; }
            html += `<h4>${line.replace("### ", "")}</h4>`;
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
      }
    })
    .catch(() => {
      modalBody.innerHTML = "❌ File not found!";
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
    icon.className = "fas fa-moon";
  } else {
    icon.className = "fas fa-sun";
  }
}
