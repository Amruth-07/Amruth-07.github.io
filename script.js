window.addEventListener("scroll", () => {
  document.querySelectorAll(".reveal").forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight - 50) {
      el.classList.add("active");
    }
  });
});
function openModal(title, content){
  document.getElementById("modalTitle").innerText = title;
  document.getElementById("modalDesc").innerHTML = content;
  document.getElementById("projectModal").style.display = "block";
}

function closeModal(){
  document.getElementById("projectModal").style.display = "none";
}
