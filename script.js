/* =====================================
   PART 0: THEME ON PAGE LOAD
===================================== */
document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  const icon = document.querySelector(".theme-toggle i");

  if (savedTheme === "dark") {
    document.body.classList.remove("light-mode");
    icon.classList.replace("fa-sun", "fa-moon");
  } else {
    document.body.classList.add("light-mode");
    icon.classList.replace("fa-moon", "fa-sun");
  }
});

/* =====================================
   PART 1: SCROLL REVEAL
===================================== */
function revealOnScroll() {
  document.querySelectorAll(".reveal").forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight - 100) {
      el.classList.add("active");
    }
  });
}
window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

/* =====================================
   PART 2: PROJECT IMAGE TOGGLE
===================================== */
function toggleProjectImage(button) {
  const card = button.closest(".project-card");
  const wrapper = card.querySelector(".project-image-wrapper");
  const icon = button.querySelector("i");

  wrapper.classList.toggle("expanded");
  icon.classList.toggle("fa-eye");
  icon.classList.toggle("fa-eye-slash");
}

/* =====================================
   PART 3: OPEN MODAL NEAR CLICKED BUTTON
===================================== */
function openModal(title, file, event) {
  event.preventDefault();

  const modal = document.getElementById("projectModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalBody = document.getElementById("modalBody");
  const copyBtn = document.getElementById("copyBtn");

  modalTitle.innerText = title;
  modalBody.innerHTML = "Loading...";
  copyBtn.style.display = "none";

  fetch(file)
    .then(res => {
      if (!res.ok) throw new Error("File not found");
      return res.text();
    })
    .then(data => {
      if (file.endsWith(".txt")) {
        modalBody.innerHTML = `
<pre class="language-c"><code class="language-c">
${data.replace(/</g, "&lt;").replace(/>/g, "&gt;")}
</code></pre>`;
        copyBtn.style.display = "inline-block";
        Prism.highlightAllUnder(modalBody);
      } else {
        modalBody.innerHTML = `<div class="details-box">${data}</div>`;
      }
    })
    .catch(() => {
      modalBody.innerHTML = "❌ File not found!";
    });

  /* POSITION NEAR BUTTON */
  modal.style.display = "block";
  modal.style.position = "absolute";

  const btnRect = event.currentTarget.getBoundingClientRect();
  const modalRect = modal.getBoundingClientRect();

  let top = btnRect.bottom + window.scrollY + 10;
  let left = btnRect.left + window.scrollX;

  if (left + modalRect.width > window.innerWidth) {
    left = window.innerWidth - modalRect.width - 10;
  }

  if (top + modalRect.height > window.scrollY + window.innerHeight) {
    top = btnRect.top + window.scrollY - modalRect.height - 10;
  }

  modal.style.top = `${top}px`;
  modal.style.left = `${left}px`;
}

/* =====================================
   PART 4: CLOSE MODAL
===================================== */
function closeModal() {
  document.getElementById("projectModal").style.display = "none";
}

/* Click outside modal to close */
window.addEventListener("click", e => {
  const modal = document.getElementById("projectModal");
  if (e.target === modal) closeModal();
});

/* =====================================
   PART 5: COPY CODE
===================================== */
function copyCode() {
  const code = document.querySelector("#modalBody code");
  navigator.clipboard.writeText(code.innerText);

  const btn = document.getElementById("copyBtn");
  btn.innerText = "Copied ✓";
  setTimeout(() => (btn.innerText = "Copy Code"), 1500);
}

/* =====================================
   PART 6: THEME TOGGLE
===================================== */
function toggleTheme() {
  document.body.classList.toggle("light-mode");
  const icon = document.querySelector(".theme-toggle i");

  if (document.body.classList.contains("light-mode")) {
    icon.classList.replace("fa-moon", "fa-sun");
    localStorage.setItem("theme", "light");
  } else {
    icon.classList.replace("fa-sun", "fa-moon");
    localStorage.setItem("theme", "dark");
  }
}

/* =====================================
   PART 7: EMAILJS
===================================== */
emailjs.init("TZWUr1PeHYnnlkkBN");

document.getElementById("contact-form").addEventListener("submit", function (e) {
  e.preventDefault();

  emailjs.sendForm("service_9uitjh4", "template_re3hdru", this)
    .then(() => {
      alert("Message Sent Successfully!");
      this.reset();
    })
    .catch(() => {
      alert("Message Failed!");
    });
});
/* =====================================
   PART 0: THEME ON PAGE LOAD
===================================== */
document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  const icon = document.querySelector(".theme-toggle i");

  if (savedTheme === "dark") {
    document.body.classList.remove("light-mode");
    icon.classList.replace("fa-sun", "fa-moon");
  } else {
    document.body.classList.add("light-mode");
    icon.classList.replace("fa-moon", "fa-sun");
  }
});

/* =====================================
   PART 1: SCROLL REVEAL
===================================== */
function revealOnScroll() {
  document.querySelectorAll(".reveal").forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight - 100) {
      el.classList.add("active");
    }
  });
}
window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

/* =====================================
   PART 2: PROJECT IMAGE TOGGLE
===================================== */
function toggleProjectImage(button) {
  const card = button.closest(".project-card");
  const wrapper = card.querySelector(".project-image-wrapper");
  const icon = button.querySelector("i");

  wrapper.classList.toggle("expanded");
  icon.classList.toggle("fa-eye");
  icon.classList.toggle("fa-eye-slash");
}

/* =====================================
   PART 3: OPEN MODAL NEAR CLICKED BUTTON
===================================== */
function openModal(title, file, event) {
  event.preventDefault();

  const modal = document.getElementById("projectModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalBody = document.getElementById("modalBody");
  const copyBtn = document.getElementById("copyBtn");

  modalTitle.innerText = title;
  modalBody.innerHTML = "Loading...";
  copyBtn.style.display = "none";

  fetch(file)
    .then(res => {
      if (!res.ok) throw new Error("File not found");
      return res.text();
    })
    .then(data => {
      if (file.endsWith(".txt")) {
        modalBody.innerHTML = `
<pre class="language-c"><code class="language-c">
${data.replace(/</g, "&lt;").replace(/>/g, "&gt;")}
</code></pre>`;
        copyBtn.style.display = "inline-block";
        Prism.highlightAllUnder(modalBody);
      } else {
        modalBody.innerHTML = `<div class="details-box">${data}</div>`;
      }
    })
    .catch(() => {
      modalBody.innerHTML = "❌ File not found!";
    });

  /* POSITION NEAR BUTTON */
  modal.style.display = "block";
  modal.style.position = "absolute";

  const btnRect = event.currentTarget.getBoundingClientRect();
  const modalRect = modal.getBoundingClientRect();

  let top = btnRect.bottom + window.scrollY + 10;
  let left = btnRect.left + window.scrollX;

  if (left + modalRect.width > window.innerWidth) {
    left = window.innerWidth - modalRect.width - 10;
  }

  if (top + modalRect.height > window.scrollY + window.innerHeight) {
    top = btnRect.top + window.scrollY - modalRect.height - 10;
  }

  modal.style.top = `${top}px`;
  modal.style.left = `${left}px`;
}

/* =====================================
   PART 4: CLOSE MODAL
===================================== */
function closeModal() {
  document.getElementById("projectModal").style.display = "none";
}

/* Click outside modal to close */
window.addEventListener("click", e => {
  const modal = document.getElementById("projectModal");
  if (e.target === modal) closeModal();
});

/* =====================================
   PART 5: COPY CODE
===================================== */
function copyCode() {
  const code = document.querySelector("#modalBody code");
  navigator.clipboard.writeText(code.innerText);

  const btn = document.getElementById("copyBtn");
  btn.innerText = "Copied ✓";
  setTimeout(() => (btn.innerText = "Copy Code"), 1500);
}

/* =====================================
   PART 6: THEME TOGGLE
===================================== */
function toggleTheme() {
  document.body.classList.toggle("light-mode");
  const icon = document.querySelector(".theme-toggle i");

  if (document.body.classList.contains("light-mode")) {
    icon.classList.replace("fa-moon", "fa-sun");
    localStorage.setItem("theme", "light");
  } else {
    icon.classList.replace("fa-sun", "fa-moon");
    localStorage.setItem("theme", "dark");
  }
}

/* =====================================
   PART 7: EMAILJS
===================================== */
emailjs.init("TZWUr1PeHYnnlkkBN");

document.getElementById("contact-form").addEventListener("submit", function (e) {
  e.preventDefault();

  emailjs.sendForm("service_9uitjh4", "template_re3hdru", this)
    .then(() => {
      alert("Message Sent Successfully!");
      this.reset();
    })
    .catch(() => {
      alert("Message Failed!");
    });
});
