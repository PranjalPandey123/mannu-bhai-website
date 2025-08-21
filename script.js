// ==========================
// Load Header and Footer dynamically
// ==========================
function loadComponent(id, file, callback) {
  fetch(file)
    .then(res => {
      if (!res.ok) {
        throw new Error(`Failed to fetch ${file}: ${res.statusText}`);
      }
      return res.text();
    })
    .then(data => {
      document.getElementById(id).innerHTML = data;
      if (callback) callback(); // run callback after load
    })
    .catch(err => console.error(`Error loading ${file}:`, err));
}

// ==========================
// Initialize Site
// ==========================
window.addEventListener("load", () => {
  // Load header and footer
  loadComponent("header", "components/header.html", initHeader);
  loadComponent("footer", "components/footer.html");
  // ❌ Slider disabled for now (client wants only 1 banner)
  // loadComponent("header", "components/header.html", initSlider);
});

// ==========================
// Header (Hamburger + Dropdown)
// ==========================
function initHeader() {
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");
  const dropdownToggle = document.querySelector(".dropdown-toggle");

  if (menuToggle && navLinks) {
    // Toggle main nav on mobile
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("show");
      menuToggle.textContent = navLinks.classList.contains("show") ? "✖" : "☰";
    });
  }

  if (dropdownToggle) {
    // Toggle dropdown on mobile only
    dropdownToggle.addEventListener("click", (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        const dropdownMenu = dropdownToggle.nextElementSibling;
        dropdownMenu.classList.toggle("show");
      }
    });
  }
}

// ==========================
// HERO SLIDER FUNCTION (currently disabled)
// To re-enable: uncomment this function and call initSlider()
// ==========================

// function initSlider() {
//   let currentSlide = 0;
//   const slides = document.querySelectorAll(".hero-slide");
//   const prev = document.querySelector(".prev");
//   const next = document.querySelector(".next");
//   let autoSlideInterval;
//
//   if (slides.length === 0) return;
//
//   // Show slide by index
//   function showSlide(index) {
//     slides.forEach((slide, i) => {
//       slide.style.display = i === index ? "block" : "none";
//     });
//   }
//
//   // Next & Prev click handlers
//   function nextSlide() {
//     currentSlide = (currentSlide + 1) % slides.length;
//     showSlide(currentSlide);
//     resetAutoSlide();
//   }
//
//   function prevSlide() {
//     currentSlide = (currentSlide - 1 + slides.length) % slides.length;
//     showSlide(currentSlide);
//     resetAutoSlide();
//   }
//
//   if (next) next.addEventListener("click", nextSlide);
//   if (prev) prev.addEventListener("click", prevSlide);
//
//   // Auto-slide every 5s
//   function startAutoSlide() {
//     autoSlideInterval = setInterval(() => {
//       currentSlide = (currentSlide + 1) % slides.length;
//       showSlide(currentSlide);
//     }, 5000);
//   }
//
//   function resetAutoSlide() {
//     clearInterval(autoSlideInterval);
//     startAutoSlide();
//   }
//
//   // Pause on hover
//   const heroSection = document.querySelector(".hero");
//   if (heroSection) {
//     heroSection.addEventListener("mouseenter", () => clearInterval(autoSlideInterval));
//     heroSection.addEventListener("mouseleave", startAutoSlide);
//   }
//
//   // Show first slide initially
//   showSlide(currentSlide);
//   startAutoSlide();
// }
