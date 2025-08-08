//Fade-in on page load
window.addEventListener("DOMContentLoaded", function () {
  document.body.classList.add("fade-in");
});

// Consolidated DOMContentLoaded event listener
window.addEventListener("DOMContentLoaded", function () {
  // Navigation fade effect
  document.querySelectorAll("a[href]").forEach((link) => {
    // Only handle internal links
    if (link.hostname === window.location.hostname) {
      link.addEventListener("click", function (e) {
        // Ignore anchor links and external links
        if (
          link.getAttribute("target") === "_blank" ||
          link.href.startsWith("mailto:") ||
          link.href.startsWith("tel:")
        )
          return;

        e.preventDefault();
        document.body.classList.remove("fade-in");
        document.body.classList.add("fade-out");
        setTimeout(() => {
          window.location = link.href;
        }, 400); // Match the CSS transition duration
      });
    }
  });

  // Dark mode toggle logic
  const toggleButton = document.querySelector(".dark-mode-toggle");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const storedTheme = localStorage.getItem("theme");

  // Set initial theme
  if (storedTheme === "dark" || (!storedTheme && prefersDark)) {
    document.body.classList.add("dark-mode");
    if (toggleButton) {
      toggleButton.innerHTML = '<i class="fas fa-sun"></i>';
    }
  } else {
    document.body.classList.remove("dark-mode");
    if (toggleButton) {
      toggleButton.innerHTML = '<i class="fas fa-moon"></i>';
    }
  }

  // Toggle dark mode on button click
  if (toggleButton) {
    toggleButton.addEventListener("click", function () {
      document.body.classList.toggle("dark-mode");

      // Update icon based on current mode
      if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
        this.innerHTML = '<i class="fas fa-sun"></i>';
      } else {
        localStorage.setItem("theme", "light");
        this.innerHTML = '<i class="fas fa-moon"></i>';
      }
    });
  }

  // Last updated logic
  const lastUpdated = document.getElementById("lastUpdated");
  if (lastUpdated) {
    lastUpdated.textContent =
      "Last updated: " +
      new Date(document.lastModified).toLocaleDateString("en-GB");
  }

  // Lightbox functionality
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightbox-image");
  const lightboxClose = document.querySelector(".lightbox-close");
  const lightboxTriggers = document.querySelectorAll(".lightbox-trigger");

  // Open lightbox
  lightboxTriggers.forEach((trigger) => {
    trigger.addEventListener("click", function () {
      const imageSrc = this.getAttribute("data-image");
      lightboxImage.src = imageSrc;
      lightbox.classList.add("active");
      document.body.style.overflow = "hidden"; // Prevent scrolling
    });
  });

  // Close lightbox
  function closeLightbox() {
    lightbox.classList.remove("active");
    document.body.style.overflow = ""; // Restore scrolling
  }

  // Close on button click
  if (lightboxClose) {
    lightboxClose.addEventListener("click", closeLightbox);
  }

  // Close on background click
  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Close on Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && lightbox.classList.contains("active")) {
      closeLightbox();
    }
  });
});
