// Fade-in on page load
window.addEventListener("DOMContentLoaded", function () {
  document.body.classList.add("fade-in");
});

// Fade-out on navigation for internal links
window.addEventListener("DOMContentLoaded", function () {
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
});

// Dark mode toggle logic
window.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.querySelector(".dark-mode-toggle");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const storedTheme = localStorage.getItem("theme");

  // Set initial theme
  if (storedTheme === "dark" || (!storedTheme && prefersDark)) {
    document.body.classList.add("dark-mode");
  } else {
    document.body.classList.remove("dark-mode");
  }

  // Toggle dark mode on button click
  if (toggleButton) {
    toggleButton.addEventListener("click", function () {
      document.body.classList.toggle("dark-mode");
      if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
      } else {
        localStorage.setItem("theme", "light");
      }
    });
  }
});

window.addEventListener("DOMContentLoaded", function () {
  const lastUpdated = document.getElementById("lastUpdated");
  if (lastUpdated) {
    lastUpdated.textContent =
      "Last updated: " +
      new Date(document.lastModified).toLocaleDateString("en-GB");
  }
});
