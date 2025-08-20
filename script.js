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
  // Load header and footer, then initialize slider AFTER header is ready
  loadComponent("header", "components/header.html", initSlider);
  loadComponent("footer", "components/footer.html");

  // ==========================
  // HERO SLIDER FUNCTION
  // ==========================
  function initSlider() {
    let currentSlide = 0;
    const slides = document.querySelectorAll(".hero-slide");
    const prev = document.querySelector(".prev");
    const next = document.querySelector(".next");

    if (slides.length > 0) {
      // Show given slide
      function showSlide(index) {
        slides.forEach((slide, i) => {
          slide.classList.toggle("", i === index);
        });
      }

      // Next & Prev click
      if (next) {
        next.addEventListener("click", () => {
          currentSlide = (currentSlide + 1) % slides.length;
          showSlide(currentSlide);
        });
      }

      if (prev) {
        prev.addEventListener("click", () => {
          currentSlide = (currentSlide - 1 + slides.length) % slides.length;
          showSlide(currentSlide);
        });
      }

      // Auto-slide every 5s
      setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
      }, 5000);

      // Show first slide initially
      showSlide(currentSlide);
    }
  }
});