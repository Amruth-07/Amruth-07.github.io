/* ===============================
   PROJECT MODAL (DETAILS / CODE)
================================ */

function openModal(title, file) {
  const modal = document.getElementById("projectModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalBody = document.getElementById("modalBody");
  const copyBtn = document.getElementById("copyBtn");

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

      /* ---------- SOURCE CODE (.txt) ---------- */
      if (file.endsWith(".txt")) {
        modalBody.innerHTML = `
        <div class="code.txt">
<pre class="language-c">
<code class="language-c">
${data.replace(/</g, "&lt;").replace(/>/g, "&gt;")}
</code>
</pre>
        `;
        copyBtn.style.display = "inline-block";

        if (window.Prism) {
          Prism.highlightAllUnder(modalBody);
        }
      }

      /* ---------- DETAILS (.html) ---------- */
      else {
        modalBody.innerHTML = `
<div class="details.html">
${data}
</div>
        `;
        copyBtn.style.display = "none";
      }
    })
    .catch(error => {
      modalBody.innerHTML = "❌ File not found!";
      copyBtn.style.display = "none";
      console.error(error);
    });

  modal.style.display = "block";
}

/* ===============================
   CLOSE MODAL
================================ */

function closeModal() {
  const modal = document.getElementById("projectModal");
  modal.style.display = "none";
}

/* Click outside modal to close */
window.addEventListener("click", function (event) {
  const modal = document.getElementById("projectModal");
  if (event.target === modal) {
    closeModal();
  }
});

/* ===============================
   COPY CODE BUTTON
================================ */

function copyBtn() {
  const codeBlock = document.querySelector("#modalBody code");
  if (!codeBlock) return;

  navigator.clipboard.writeText(codeBlock.innerText)
    .then(() => {
      const btn = document.getElementById("copyBtn");
      const oldText = btn.innerText;
      btn.innerText = "Copied ✓";

      setTimeout(() => {
        btn.innerText = oldText;
      }, 1500);
    });
}

/* ===============================
   THEME TOGGLE
================================ */

function toggleTheme() {
  document.body.classList.toggle("light-mode");

  const icon = document.querySelector(".theme-toggle i");
  if (!icon) return;

  icon.classList.toggle("fa-sun");
  icon.classList.toggle("fa-moon");
}



function toggleProjectImage(button){
  const card = button.closest(".project-card");
  const wrapper = card.querySelector(".project-image-wrapper");

  wrapper.classList.toggle("expanded");

  if(wrapper.classList.contains("expanded")){
    button.innerHTML = '<i class="fas fa-eye-slash"></i> Hide';
  } else {
    button.innerHTML = '<i class="fas fa-eye"></i> View';
  }
}

/* ===============================
   SCROLL REVEAL ANIMATION
================================ */

function revealOnScroll() {
  const reveals = document.querySelectorAll(".reveal");

  reveals.forEach(element => {
    const windowHeight = window.innerHeight;
    const elementTop = element.getBoundingClientRect().top;

    if (elementTop < windowHeight - 100) {
      element.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);

window.addEventListener("load", revealOnScroll);




