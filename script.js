/* =====================================
   PART 1: SCROLL REVEAL ANIMATION
===================================== */
function revealOnScroll() {
  const reveals = document.querySelectorAll(".reveal");

  reveals.forEach(element => {
    const windowHeight = window.innerHeight;
    const elementTop = element.getBoundingClientRect().top;

    // Triggers the animation when the element is 100px into the viewport
    if (elementTop < windowHeight - 100) {
      element.classList.add("active");
    }
  });
}

// Event listeners for scrolling and initial page load
window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

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

  // Swaps the eye icon based on the expanded state
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

  // Fetches the external content (HTML for details or TXT for code)
  fetch(file)
    .then(response => {
      if (!response.ok) throw new Error("File not found");
      return response.text();
    })
    .then(data => {
      if (file.endsWith(".txt")) {
        // Formats code for Prism.js highlighting
        modalBody.innerHTML = `<pre class="language-c"><code class="language-c">${data.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</code></pre>`;
        copyBtn.style.display = "inline-block";
        if (window.Prism) Prism.highlightAllUnder(modalBody);
      } else {
        // Loads standard HTML for project details
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

// Close modal when clicking outside of the content area
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

  // Matches the logic to your light-mode CSS classes
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
  // Initialize EmailJS with your User ID
  if (window.emailjs) {
    emailjs.init("TZWUr1PeHYnnlkkBN"); 
  }

  const form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Uses your specific Service and Template IDs
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
