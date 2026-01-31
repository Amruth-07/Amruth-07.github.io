/* =========================
   PROJECT MODAL FUNCTION
========================= */

function openModal(title, file) {
  const modal = document.getElementById("projectModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalBody = document.getElementById("modalBody");
  const copyBtn = document.getElementById("copyBtn");

  // Safety check
  if (!modal || !modalTitle || !modalBody || !copyBtn) {
    console.error("Modal elements missing in HTML");
    return;
  }

  modalTitle.innerText = title;
  modalBody.innerHTML = "Loading...";
  copyBtn.style.display = "none";

  fetch(file)
    .then(response => {
      if (!response.ok) {
        throw new Error("File not found");
      }
      return response.text();
    })
    .then(data => {

      /* =========================
         CODE MODE (.txt files)
      ========================= */
      if (file.endsWith(".txt")) {

        const highlighted = Prism.highlight(
  data,
  Prism.languages.cpp,
  "cpp"
);

modalBody.innerHTML = `
<pre class="language-c">
  <code class="language-c">
${highlighted}
</code>
</pre>
`;

copyBtn.style.display = "inline-block";
      }

      /* =========================
         DETAILS MODE (.html files)
      ========================= */
      if (file.endsWith(".txt")) {

  modalBody.innerHTML = `
    <pre class="language-c">
      <code class="language-c">
${data.replace(/</g, "&lt;").replace(/>/g, "&gt;")}
      </code>
    </pre>
  `;

  copyBtn.style.display = "inline-block";
  Prism.highlightAllUnder(modalBody);
}

/* =========================
   CLOSE MODAL
========================= */

function closeModal() {
  const modal = document.getElementById("projectModal");
  if (modal) modal.style.display = "none";
}


/* =========================
   CLICK OUTSIDE TO CLOSE
========================= */

window.onclick = function (event) {
  const modal = document.getElementById("projectModal");
  if (event.target === modal) {
    closeModal();
  }
};


/* =========================
   COPY CODE FUNCTION
========================= */

function copyCode() {
  const codeBlock = document.querySelector("#modalBody pre");
  if (!codeBlock) return;

  navigator.clipboard.writeText(codeBlock.innerText);

  const btn = document.querySelector(".copy-btn");
  const oldText = btn.innerText;
  btn.innerText = "Copied ✓";

  setTimeout(() => {
    btn.innerText = oldText;
  }, 1500);
}


/* =========================
   THEME TOGGLE
========================= */

function toggleTheme() {
  document.body.classList.toggle("light-mode");

  const icon = document.querySelector(".theme-toggle i");
  if (!icon) return;

  if (document.body.classList.contains("light-mode")) {
    icon.classList.remove("fa-sun");
    icon.classList.add("fa-moon");
  } else {
    icon.classList.remove("fa-moon");
    icon.classList.add("fa-sun");
  }
}


/* =========================
   SCROLL REVEAL (SAFE)
========================= */

function revealOnScroll() {
  const reveals = document.querySelectorAll(".reveal");

  reveals.forEach(el => {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;
    const revealPoint = 100;

    if (elementTop < windowHeight - revealPoint) {
      el.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);
