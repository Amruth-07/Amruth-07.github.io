/* =====================================
   PART 1: SCROLL REVEAL ANIMATION
===================================== */

function revealOnScroll() {
function revealOnScroll() {
  const reveals = document.querySelectorAll(".reveal");

  reveals.forEach(element => {
    const windowHeight = window.innerHeight;
    const elementTop = element.getBoundingClientRect().top;

    if (elementTop < windowHeight - 50) {
      element.classList.add("active");
    } else {
      element.classList.remove("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);;

/* =====================================
   PART 2: PROJECT IMAGE TOGGLE (VIEW)
===================================== */

function toggleProjectImage(button) {
  const card = button.closest(".project-card");
  if (!card) return;

  const wrapper = card.querySelector(".project-image-wrapper");
  if (!wrapper) return;

  wrapper.classList.toggle("expanded");

  const icon = button.querySelector("i");
  if (!icon) return;

  if (wrapper.classList.contains("expanded")) {
    icon.classList.remove("fa-eye");
    icon.classList.add("fa-eye-slash");
  } else {
    icon.classList.remove("fa-eye-slash");
    icon.classList.add("fa-eye");
  }
}

/* =====================================
   PART 3: OPEN MODAL (DETAILS + CODE)
===================================== */

function openModal(title, file) {
  const modal = document.getElementById("projectModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalBody = document.getElementById("modalBody");
  const copyBtn = document.getElementById("copyBtn");

  if (!modal || !modalTitle || !modalBody || !copyBtn) return;

  modalTitle.innerText = title;
  modalBody.innerHTML = "Loading...";
  copyBtn.style.display = "none";

  fetch(file)
    .then(response => {
      if (!response.ok) throw new Error("File not found");
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

        copyBtn.style.display = "inline-block";

        if (window.Prism) {
          Prism.highlightAllUnder(modalBody);
        }
      }

      /* ---------- DETAILS (.html) ---------- */
      else {
        modalBody.innerHTML = `
<div class="details-box">
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

/* =====================================
   PART 4: CLOSE MODAL
===================================== */

function closeModal() {
  const modal = document.getElementById("projectModal");
  if (!modal) return;

  modal.style.display = "none";
}

/* Click outside modal to close */
window.addEventListener("click", function (event) {
  const modal = document.getElementById("projectModal");
  if (!modal) return;

  if (event.target === modal) {
    closeModal();
  }
});

/* =====================================
   PART 5: COPY CODE BUTTON
===================================== */

function copyCode() {
  const codeBlock = document.querySelector("#modalBody code");
  if (!codeBlock) return;

  navigator.clipboard.writeText(codeBlock.innerText)
    .then(() => {
      const btn = document.getElementById("copyBtn");
      if (!btn) return;

      const oldText = btn.innerText;
      btn.innerText = "Copied ✓";

      setTimeout(() => {
        btn.innerText = oldText;
      }, 1500);
    })
    .catch(err => {
      console.error("Copy failed:", err);
    });
}

/* =====================================
   PART 6: THEME TOGGLE (DARK/LIGHT)
===================================== */

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

/* =====================================
   PART 7: EMAILJS CONTACT FORM
===================================== */

window.addEventListener("load", function () {

  if (window.emailjs) {
    emailjs.init("TZWUr1PeHYnnlkkBN"); 
  }

  const form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    emailjs.sendForm(
      "service_9uitjh4",
      "template_re3hdru,
      form
    )
      .then(() => {
        alert("✅ Message sent successfully!");
        form.reset();
      })
      .catch((error) => {
        alert("❌ Message not sent! Check EmailJS setup.");
        console.error("EmailJS Error:", error);
      });
  });

});


