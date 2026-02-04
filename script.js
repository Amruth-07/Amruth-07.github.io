/* =====================================
   SCROLL REVEAL ANIMATION
   Reveals elements when they enter viewport
===================================== */

function revealOnScroll() {
  const reveals = document.querySelectorAll(".reveal");

  reveals.forEach(element => {
    const windowHeight = window.innerHeight;
    const elementTop = element.getBoundingClientRect().top;

    // Reveal when element is near viewport
    if (elementTop < windowHeight - 100) {
      element.classList.add("active");
    }
  });
}

// Run on scroll and on page load
window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

function toggleProjectImage(button) {
  const projectCard = button.closest(".project-card");
  const projectImage = projectCard.querySelector(".project-image");

  if (!projectImage) return;

  // Toggle full view class
  projectImage.classList.toggle("full-view");

  // Change icon (👁️ / 🙈)
  if (projectImage.classList.contains("full-view")) {
    button.innerHTML = "🙈 View";
  } else {
    button.innerHTML = "👁️ View";
  }
}
/* =====================================
   PROJECT IMAGE TOGGLE
   Expands / collapses project image
===================================== *

function toggleProjectImage(button) {

  // Find the parent project card
  const projectCard = button.closest(".project-card");

  // Find the image wrapper inside the card
  const imageWrapper = projectCard.querySelector(".project-image-wrapper");

  // Toggle expanded class (used in CSS)
  imageWrapper.classList.toggle("expanded");
}
/* =====================================
   OPEN PROJECT MODAL
   Loads Details (.html) or Code (.txt)
===================================== */

function openModal(title, file) {

  const modal = document.getElementById("projectModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalBody = document.getElementById("modalBody");
  const copyBtn = document.getElementById("copyBtn");

  // Set modal title
  modalTitle.innerText = title;

  // Show loading text initially
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
<pre class="language-c">
<code class="language-c">
${data.replace(/</g, "&lt;").replace(/>/g, "&gt;")}
</code>
</pre>
        `;

        // Show copy button only for code
        copyBtn.style.display = "inline-block";

        // Highlight code if Prism is loaded
        if (window.Prism) {
          Prism.highlightAllUnder(modalBody);
        }
      }

      /* ---------- DETAILS (.html) ---------- */
      else {
        modalBody.innerHTML = data;
        copyBtn.style.display = "none";
      }
    })
    .catch(error => {
      modalBody.innerHTML = "❌ File not found!";
      copyBtn.style.display = "none";
      console.error(error);
    });

  // Show modal
  modal.style.display = "block";
      }
/* =====================================
   CLOSE MODAL
===================================== */

function closeModal() {
  const modal = document.getElementById("projectModal");
  modal.style.display = "none";
}

/* Close modal when clicking outside content */
window.addEventListener("click", function (event) {
  const modal = document.getElementById("projectModal");

  if (event.target === modal) {
    closeModal();
  }
});
/* =====================================
   COPY CODE BUTTON
   Copies code text from modal
===================================== */

function copyCode() {

  // Select the code block inside modal
  const codeBlock = document.querySelector("#modalBody code");

  if (!codeBlock) return;

  navigator.clipboard.writeText(codeBlock.innerText)
    .then(() => {
      const btn = document.getElementById("copyBtn");
      const originalText = btn.innerText;

      // Temporary feedback
      btn.innerText = "Copied ✓";

      setTimeout(() => {
        btn.innerText = originalText;
      }, 1500);
    })
    .catch(err => {
      console.error("Copy failed:", err);
    });
}
/* =====================================
   THEME TOGGLE
   Switch between dark and light mode
===================================== */

function toggleTheme() {

  // Toggle light-mode class on body
  document.body.classList.toggle("light-mode");

  // Change icon accordingly
  const icon = document.querySelector(".theme-toggle i");

  if (!icon) return;

  icon.classList.toggle("fa-sun");
  icon.classList.toggle("fa-moon");
}

