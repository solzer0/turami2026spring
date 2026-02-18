const toggle = document.getElementById("menu-toggle");
const menu = document.getElementById("menu");
const cover = document.querySelector(".menu-cover");

toggle.addEventListener("click", () => {
  menu.classList.toggle("active");
  cover.classList.toggle("active");
});
