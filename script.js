/* =====================================
   PART 1: SCROLL REVEAL ANIMATION
   Supports: .reveal, .reveal-left,
   .reveal-right, .reveal-scale, .reveal-fade
===================================== */
const REVEAL_SELECTORS = [
  ".reveal",
  ".reveal-left",
  ".reveal-right",
  ".reveal-scale",
  ".reveal-fade"
].join(", ");

function revealOnScroll() {
  const elements = document.querySelectorAll(REVEAL_SELECTORS);
  const windowHeight = window.innerHeight;

  elements.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < windowHeight - 80) {
      el.classList.add("active");
    }
  });

  // Section headline underline sweep — needs .active on the headline itself
  document.querySelectorAll(".section-headline").forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < windowHeight - 60) {
      el.classList.add("active");
    }
  });

  // Stagger hobby/skill pills inside visible wrappers
  document.querySelectorAll(".hobbies-wrapper, .hero-skills").forEach(wrapper => {
    const top = wrapper.getBoundingClientRect().top;
    if (top < windowHeight - 60) {
      wrapper.querySelectorAll(".hobby-pill, .skill-pill").forEach((pill, i) => {
        setTimeout(() => {
          pill.style.opacity = "1";
          pill.style.transform = "translateY(0) scale(1)";
        }, i * 70);
      });
    }
  });

  // Stagger contact social icons
  const socialSection = document.querySelector(".contact-social");
  if (socialSection) {
    const top = socialSection.getBoundingClientRect().top;
    if (top < windowHeight - 60) {
      socialSection.querySelectorAll("a").forEach((icon, i) => {
        setTimeout(() => {
          icon.style.opacity = "1";
          icon.style.transform = "translateY(0) scale(1)";
        }, i * 60);
      });
    }
  }
}

// Set initial hidden state for pills and social icons
function initAnimations() {
  document.querySelectorAll(".hobby-pill, .skill-pill").forEach(pill => {
    pill.style.opacity = "0";
    pill.style.transform = "translateY(20px) scale(0.9)";
    pill.style.transition = "opacity 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)";
  });

  document.querySelectorAll(".contact-social a").forEach(icon => {
    icon.style.opacity = "0";
    icon.style.transform = "translateY(15px) scale(0.85)";
    icon.style.transition = "opacity 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease";
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", () => {
  initAnimations();
  revealOnScroll();
});

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
    icon.classList.replace("fa-eye", "fa-eye-slash");
  } else {
    icon.classList.replace("fa-eye-slash", "fa-eye");
  }
}

/* =====================================
   PART 3: MODAL LOGIC (DETAILS & CODE)
===================================== */
function openModal(title, file) {
  const modal = document.getElementById("projectModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalBody = document.getElementById("modalBody");
  const copyBtn = document.getElementById("copyBtn");

  if (!modal || !modalTitle || !modalBody) return;

  modalTitle.innerText = title;
  modalBody.innerHTML = "Loading...";
  copyBtn.style.display = "none";

  fetch(file)
    .then(response => {
      if (!response.ok) throw new Error("File not found");
      return response.text();
    })
    .then(data => {
      if (file.endsWith(".txt")) {
        modalBody.innerHTML = `<pre class="language-c"><code class="language-c">${data.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</code></pre>`;
        copyBtn.style.display = "inline-block";
        if (window.Prism) Prism.highlightAllUnder(modalBody);
      } else {
        modalBody.innerHTML = `<div class="details-box">${data}</div>`;
      }
    })
    .catch(err => {
      modalBody.innerHTML = "❌ Error: Could not load the requested file.";
      console.error(err);
    });

  modal.style.display = "block";
}

function closeModal() {
  const modal = document.getElementById("projectModal");
  if (modal) modal.style.display = "none";
}

window.onclick = (event) => {
  const modal = document.getElementById("projectModal");
  if (event.target === modal) closeModal();
};

/* =====================================
   PART 4: COPY CODE TO CLIPBOARD
===================================== */
function copyCode() {
  const modalBody = document.getElementById("modalBody");
  const codeElement = modalBody.querySelector("code");
  if (!codeElement) return;

  const textToCopy = codeElement.innerText;
  const btn = document.getElementById("copyBtn");

  navigator.clipboard.writeText(textToCopy)
    .then(() => {
      const oldText = btn.innerText;
      btn.innerText = "Copied ✓";
      setTimeout(() => { btn.innerText = oldText; }, 1500);
    })
    .catch(err => {
      console.error("Copy failed:", err);
    });
}

/* =====================================
   PART 5: THEME TOGGLE (DARK/LIGHT)
===================================== */
function toggleTheme() {
  document.body.classList.toggle("light-mode");

  const icon = document.querySelector(".theme-toggle i");
  if (!icon) return;

  if (document.body.classList.contains("light-mode")) {
    icon.classList.replace("fa-sun", "fa-moon");
  } else {
    icon.classList.replace("fa-moon", "fa-sun");
  }
}

/* =====================================
   PART 6: EMAILJS CONTACT FORM
===================================== */
window.addEventListener("load", function () {
  if (window.emailjs) {
    emailjs.init("TZWUr1PeHYnnlkkBN");
  }

  const form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    emailjs.sendForm("service_9uitjh4", "template_re3hdru", form)
      .then(() => {
        alert("✅ Message sent successfully!");
        form.reset();
      })
      .catch((error) => {
        alert("❌ Failed to send message. Please try again later.");
        console.error("EmailJS Error:", error);
      });
  });
});
