/* start navbar */
const btn = document.getElementById("navbtn");
const menu = document.getElementById("menu");
const overlay = document.getElementById("overlay");
const closeBtn = document.getElementById("closeBtn");

/* OPEN + CLOSE TOGGLE */
navbtn.addEventListener("click", () => {
  const isActive = menu.classList.contains("active");

  if (isActive) {
    closeMenu();
  } else {
    navbtn.classList.add("active");
    menu.classList.add("active");
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }
});

/* CLOSE MENU */
function closeMenu() {
  navbtn.classList.remove("active");
  menu.classList.remove("active");
  overlay.classList.remove("active");
  document.body.style.overflow = "";
}

/* EVENTS */
overlay.addEventListener("click", closeMenu);

if (closeBtn) {
  closeBtn.addEventListener("click", closeMenu);
}

document.querySelectorAll(".menu a").forEach(link => {
  link.addEventListener("click", closeMenu);
});


/* end start navbar */

