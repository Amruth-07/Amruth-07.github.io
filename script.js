/* =========================
   PROJECT MODAL FUNCTION
========================= */

function openModal(title, file) {
  const modal = document.getElementById("projectModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalBody = document.getElementById("modalBody");
  const copyBtn = document.getElementById("copyBtn");

  if (!modal || !modalTitle || !modalBody || !copyBtn) {
    console.error("Modal elements missing");
    return;
  }

  modalTitle.innerText = title;
  modalBody.innerHTML = "Loading...";
  copyBtn.style.display = "none";

  fetch(file)
    .then(res => {
      if (!res.ok) throw new Error("File not found");
      return res.text();
    })
    .then(data => {

      /* ========= CODE MODE (.txt) ========= */
      if (file.endsWith(".txt")) {

        modalBody.innerHTML = `
<pre class="language-c">
<code class="language-c">
${data.replace(/</g, "&lt;").replace(/>/g, "&gt;")}
</code>
</pre>
        `;

        copyBtn.style.display = "inline-block";

        // ⭐ FORCE PRISM COLORING
        Prism.highlightAllUnder(modalBody);
      }

      /* ========= DETAILS MODE (.html) ========= */
      else {
        modalBody.innerHTML = `
<div class="details-text">
${data}
</div>
        `;
        copyBtn.style.display = "none";
      }
    })
    .catch(err => {
      modalBody.innerHTML = "❌ File not found!";
      copyBtn.style.display = "none";
      console.error(err);
    });

  modal.style.display = "block";
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
  if (event.target === modal) closeModal();
};


/* =========================
   COPY CODE
========================= */

function copyCode() {
  const code = document.querySelector("#modalBody code");
  if (!code) return;

  navigator.clipboard.writeText(code.innerText);

  const btn = document.getElementById("copyBtn");
  const old = btn.innerText;
  btn.innerText = "Copied ✓";

  setTimeout(() => btn.innerText = old, 1500);
}


/* =========================
   THEME TOGGLE
========================= */

function toggleTheme() {
  document.body.classList.toggle("light-mode");

  const icon = document.querySelector(".theme-toggle i");
  if (!icon) return;

  icon.classList.toggle("fa-sun");
  icon.classList.toggle("fa-moon");
}


/* =========================
   SCROLL REVEAL
========================= */

function revealOnScroll() {
  document.querySelectorAll(".reveal").forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - 100) {
      el.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);
