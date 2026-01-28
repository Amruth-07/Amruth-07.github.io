// Scroll reveal
window.addEventListener("scroll", () => {
  document.querySelectorAll(".reveal").forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight - 50) {
      el.classList.add("active");
    }
  });
});

// Open modal (Details OR Code)
function openModal(title, content) {
  document.getElementById("modalTitle").innerText = title;
  document.getElementById("modalDesc").innerHTML = content;
  document.getElementById("projectModal").style.display = "block";
}

// Close modal
function closeModal() {
  document.getElementById("projectModal").style.display = "none";
}

// 🔥 LOAD CODE FROM .txt FILE
function openCode(title, file) {
  fetch(file)
    .then(res => res.text())
    .then(code => {
      document.getElementById("modalTitle").innerText = title + " – Code";
      document.getElementById("modalDesc").innerHTML = `
        <pre style="
          text-align:left;
          background:#0b0b0b;
          padding:15px;
          border-radius:10px;
          overflow-x:auto;
          font-size:13px;
          line-height:1.5;
        "><code id="codeBlock">${code}</code></pre>

        <button onclick="copyCode()" style="
          margin-top:12px;
          padding:8px 16px;
          border:none;
          border-radius:20px;
          background:linear-gradient(135deg,#7f00ff,#00d4ff);
          color:white;
          cursor:pointer;
        ">📋 Copy Code</button>
      `;
      document.getElementById("projectModal").style.display = "block";
    });
}

// Copy button
function copyCode() {
  const text = document.getElementById("codeBlock").innerText;
  navigator.clipboard.writeText(text);
  alert("✅ Code copied!");
}
