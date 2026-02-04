// Main JS for UI behavior: preloader, settings, audio, menu, and scroll interactions.
// Cache frequently used DOM nodes near the top for clarity and performance.
var audio = document.getElementById("audioPlayer"),
  loader = document.getElementById("preloader"),
  mybutton = document.getElementById("backtotopbutton"),
  emptyArea = document.getElementById("emptyarea"),
  mobileTogglemenu = document.getElementById("mobiletogglemenu");

// Decorative console signature
console.log(
  "%c Designed and Developed by Zain Latif ",
  "background-image: linear-gradient(90deg,#8000ff,#6bc5f8); color: white;font-weight:900;font-size:1rem; padding:20px;"
);

// -------------------------
// Initialization (high priority)
// -------------------------
// Hide preloader and show initial popup when page finishes loading.
window.addEventListener("load", function () {
  loader.style.display = "none"; // hide preloader element
  var hi = document.querySelector(".Hi");
  if (hi) hi.classList.add("popup"); // show first-time popup animation
});

// -------------------------
// Navigation / Scroll behaviors (high priority)
// -------------------------
// Cache sections and nav items used to update active nav state on scroll.
const sections = document.querySelectorAll("section"),
  navLi = document.querySelectorAll(".navbar .navbar-tabs .navbar-tabs-ul li"),
  mobilenavLi = document.querySelectorAll(
    ".mobiletogglemenu .mobile-navbar-tabs-ul li"
  );

// Update the active nav items based on the current scroll position.
function updateActiveNavOnScroll() {
  let current = "";
  sections.forEach((sec) => {
    let top = sec.offsetTop;
    if (pageYOffset >= top - 200) current = sec.getAttribute("id");
  });

  // Mobile nav: add/remove active class
  mobilenavLi.forEach((li) => {
    li.classList.remove("activeThismobiletab");
    if (li.classList.contains(current)) li.classList.add("activeThismobiletab");
  });

  // Desktop nav: add/remove active class
  navLi.forEach((li) => {
    li.classList.remove("activeThistab");
    if (li.classList.contains(current)) li.classList.add("activeThistab");
  });
}

window.addEventListener("scroll", updateActiveNavOnScroll);


// -------------------------
// Menu / UI controls (medium priority)
// -------------------------
// Toggle the mobile hamburger menu and animation bars.
function hamburgerMenu() {
  document.body.classList.toggle("stopscrolling");
  document.getElementById("mobiletogglemenu").classList.toggle("show-toggle-menu");
  document.getElementById("burger-bar1").classList.toggle("hamburger-animation1");
  document.getElementById("burger-bar2").classList.toggle("hamburger-animation2");
  document.getElementById("burger-bar3").classList.toggle("hamburger-animation3");
}

// Hide mobile menu when a link (li) is clicked; reset hamburger animation.
function hidemenubyli() {
  document.body.classList.toggle("stopscrolling");
  document.getElementById("mobiletogglemenu").classList.remove("show-toggle-menu");
  document.getElementById("burger-bar1").classList.remove("hamburger-animation1");
  document.getElementById("burger-bar2").classList.remove("hamburger-animation2");
  document.getElementById("burger-bar3").classList.remove("hamburger-animation3");
}

// -------------------------
// Settings / accessibility (lower priority)
// -------------------------
// Toggle settings panel visibility and individual toggle containers.
function settingtoggle() {
  document.getElementById("setting-container").classList.toggle("settingactivate");
  document.getElementById("visualmodetogglebuttoncontainer").classList.toggle("visualmodeshow");
  document.getElementById("soundtogglebuttoncontainer").classList.toggle("soundmodeshow");
}

// Toggle play/pause for background audio according to the sound switch state.
function playpause() {
  var soundSwitch = document.getElementById("switchforsound");
  if (soundSwitch && soundSwitch.checked === false) {
    audio.pause();
  } else {
    audio.play();
  }
}

// Toggle light/dark visual mode and invert elements that need it.
function visualmode() {
  document.body.classList.toggle("light-mode");
  document.querySelectorAll(".needtobeinvert").forEach(function (el) {
    el.classList.toggle("invertapplied");
  });
}

// -------------------------
// Scroll-to-top button helpers (utility)
// -------------------------
// Show or hide the 'back to top' button based on scroll position.
function scrollFunction() {
  if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// Smooth jump to top (instant in this codebase).
function scrolltoTopfunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

// Keep backward-compatible onscroll assignment for existing usage elsewhere.
window.onscroll = function () {
  scrollFunction();
};

// -------------------------
// Misc (lowest priority)
// -------------------------
// Prevent default context menu on images (right-click disable for images only).
document.addEventListener(
  "contextmenu",
  function (e) {
    if (e.target && e.target.nodeName === "IMG") e.preventDefault();
  },
  false
);
