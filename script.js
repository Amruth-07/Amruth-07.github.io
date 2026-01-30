// ================= MODAL ELEMENTS =================
const modal = document.getElementById("projectModal");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const copyBtn = document.getElementById("copyBtn");

// store currently opened code text for copy
let currentCodeText = "";

// ================= OPEN DETAILS =================
function openDetails(fileName){
  modalTitle.innerText = "Project Details";
  copyBtn.style.display = "none"; // hide copy button for details

  fetch(fileName)
    .then(res => res.text())
    .then(html => {
      modalDesc.innerHTML = html;
      modal.style.display = "block";
    })
    .catch(err => {
      modalDesc.innerHTML = "<p style='color:red'>Unable to load details.</p>";
      modal.style.display = "block";
      console.error(err);
    });
}

// ================= OPEN CODE =================
function openCode(title, fileName){
  modalTitle.innerText = title + " - Source Code";
  copyBtn.style.display = "inline-block"; // show copy button

  fetch(fileName)
    .then(res => res.text())
    .then(code => {
      currentCodeText = code; // save for copy

      // escape HTML symbols
      const safeCode = code
        .replace(/</g,"&lt;")
        .replace(/>/g,"&gt;");

      modalDesc.innerHTML =
        `<pre><code class="language-cpp">${safeCode}</code></pre>`;

      modal.style.display = "block";

      // syntax highlight
      if(window.Prism){
        Prism.highlightAll();
      }
    })
    .catch(err => {
      modalDesc.innerHTML = "<p style='color:red'>Unable to load code.</p>";
      modal.style.display = "block";
      console.error(err);
    });
}

// ================= COPY CODE =================
function copyCode(){
  if(!currentCodeText) return;

  navigator.clipboard.writeText(currentCodeText)
    .then(()=>{
      copyBtn.innerText = "Copied!";
      setTimeout(()=>{ copyBtn.innerText = "📋 Copy Code"; },1500);
    });
}

// ================= CLOSE MODAL =================
function closeModal(){
  modal.style.display = "none";
}

// close when clicking outside modal box
window.onclick = function(event){
  if(event.target === modal){
    closeModal();
  }
};

// ================= SCROLL REVEAL =================
function revealOnScroll(){
  const reveals = document.querySelectorAll(".reveal");
  const trigger = window.innerHeight * 0.85;

  reveals.forEach(el=>{
    const top = el.getBoundingClientRect().top;
    if(top < trigger){
      el.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);
